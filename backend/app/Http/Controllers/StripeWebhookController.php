<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Mail\InvoiceEmail;
use App\Mail\OrderConfirmation;
use App\Mail\OrderConfirmationEmail;
use Stripe\Stripe;
use Stripe\Webhook;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class StripeWebhookController extends Controller
{

    public function handleWebhook(Request $request)
    {
        Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent(
                $request->getContent(),
                $sig_header,
                ConfigHelper::getConfig('conf_stripe_webhook_secret')
            );
        } catch (\Exception $e) {
            Log::error('Webhook signature verification failed', ['error' => $e->getMessage()]);
            return response('Webhook error: ' . $e->getMessage(), 400);
        }

        $eventType = $event->type;
        $eventData = $event->data->object;

        match ($eventType) {
            'checkout.session.completed' => $this->handleCheckoutSessionCompleted($eventData),
            'invoice.payment_succeeded' => $this->handleInvoicePaymentSucceeded($eventData),
            'invoice.payment_failed' => $this->handleInvoicePaymentFailed($eventData),
            'customer.subscription.created', 'customer.subscription.updated' => $this->handleSubscriptionUpdated($eventData),
            'customer.subscription.deleted' => $this->handleSubscriptionCanceled($eventData),
            default => Log::info('Unhandled Stripe event', ['event_type' => $eventType]),
        };

        return response('Webhook received', 200);
    }

    private function handleCheckoutSessionCompleted($session)
    {
        $customerId = $session->customer ?? null;
        $subscriptionId = $session->subscription ?? null;

        $user = User::where('stripe_customer_id', $customerId)->first();

        if ($user && $subscriptionId) {
            $user->update([
                'stripe_subscription_id' => $subscriptionId,
                'subscription_status' => AppConstant::ACTIVE,
            ]);
        }

        $this->updateOrder($session);
    }

    private function handleSubscriptionUpdated($subscription)
    {
        $user = User::where('stripe_subscription_id', $subscription->id)->first();

        if ($user) {
            $status = ($subscription->status === 'active') ? AppConstant::ACTIVE : AppConstant::IN_ACTIVE;
            $trialEnd = !empty($subscription->trial_end) ? Carbon::createFromTimestamp($subscription->trial_end) : null;

            // If the trial is active, keep the user active
            if ($trialEnd && $trialEnd->isFuture()) {
                $status = AppConstant::ACTIVE;
                $user->update(['is_free_trial_availed' => true]);
            }

            $user->update([
                'subscription_status' => $status,
                'next_renewal_date' => Carbon::createFromTimestamp($subscription->current_period_end),
            ]);

            // Ensure an order is created for free trial subscriptions
            Order::updateOrCreate(
                ['user_id' => $user->id, 'stripe_payment_status' => 'trial'],
                [
                    'amount' => 0.00,
                    'order_total' => 0.00,
                    'order_tax' => 0,
                    'stripe_payment_status' => 'trial',
                    'next_renewal_date' => Carbon::createFromTimestamp($subscription->current_period_end),
                    'created_at' => now(),
                ]
            );

            Log::info('Subscription updated', [
                'user_id' => $user->id,
                'status' => $status,
                'next_renewal_date' => $user->next_renewal_date,
            ]);
        }
    }

    private function handleInvoicePaymentSucceeded($invoice)
    {
        $user = User::where('stripe_subscription_id', $invoice->subscription)->first();
        if ($user) {
            $order = Order::create([
                'user_id' => $user->id,
                'amount' => ($invoice->amount_paid ?? 0) / 100,
                'stripe_payment_intent' => $invoice->payment_intent ?? null,
                'stripe_payment_status' => 'succeeded',
                'plan_type' => $invoice->lines->data[0]->plan->interval ?? 'monthly',
                'plan_name' => $invoice->lines->data[0]->plan->nickname ?? 'Unknown Plan',
                'plan_amount' => ($invoice->lines->data[0]->plan->amount ?? 0) / 100,
                'order_total' => ($invoice->amount_paid ?? 0) / 100,
                'order_tax' => ($invoice->tax ?? 0) / 100,
                'next_renewal_date' => Carbon::createFromTimestamp($invoice->lines->data[0]->period->end),
            ]);


            $user->update([
                'subscription_status' => AppConstant::ACTIVE,
                'next_renewal_date' => Carbon::createFromTimestamp($invoice->lines->data[0]->period->end),
                'is_free_trial_availed' => true
            ]);

            // Generate PDF Invoice
            $pdf = Pdf::loadView('emails.invoice', [
                'invoice_number' => $invoice->id,
                'customer_name' => $user->name,
                'plan_name' => $order->plan_name,
                'plan_amount' => $order->plan_amount,
                'date' => now()->format('Y-m-d')
            ]);

            $pdfPath = storage_path("app/invoices/invoice_{$invoice->id}.pdf");
            $pdf->save($pdfPath);

            Mail::to($user->email)->send(new InvoiceEmail($user, $pdfPath));
        }
    }

    private function handleInvoicePaymentFailed($invoice)
    {
        $subscriptionId = $invoice->subscription;
        $user = User::where('stripe_subscription_id', $subscriptionId)->first();

        if ($user) {
            $user->update([
                'subscription_status' => AppConstant::IN_ACTIVE,
            ]);
            $user->page->update([
                'is_suspended' => AppConstant::ACTIVE
            ]);
            // Send a failed payment notification
            Mail::to($user->email)->send(new OrderConfirmationEmail($user, null, Template::where('name', Template::ORDER_FAILED_EMAIL)->first()));

            Log::warning('Subscription payment failed', [
                'user_id' => $user->id
            ]);
        }
    }
    private function handleSubscriptionCanceled($subscription)
    {
        $user = User::where('stripe_subscription_id', $subscription->id)->first();

        if ($user) {
            // If the user canceled but still has a trial period left, keep them active
            if (!empty($subscription->trial_end) && Carbon::createFromTimestamp($subscription->trial_end)->isFuture()) {
                $user->update([
                    'subscription_status' => AppConstant::ACTIVE,
                    'next_renewal_date' => Carbon::createFromTimestamp($subscription->trial_end)
                ]);

                Log::info('User canceled subscription but still in free trial', [
                    'user_id' => $user->id,
                    'trial_end' => $user->next_renewal_date
                ]);
            } else {
                // Otherwise, mark the subscription as inactive
                $user->update([
                    'subscription_status' => AppConstant::IN_ACTIVE,
                ]);

                $user->page->update([
                    'is_suspended' => AppConstant::ACTIVE
                ]);
                Log::info('User canceled subscription after free trial', [
                    'user_id' => $user->id
                ]);
            }
        }
    }

    private function updateOrder($session)
    {
        try {
            // Extract the payment details from the session
            $paymentIntent = $session->payment_intent ?? null;
            $paymentStatus = $session->payment_status ?? 'trial';
            $amount = isset($session->amount_total) ? $session->amount_total / 100 : 0.00; // Amount is in cents
            $planType = $session->metadata->plan_type ?? null;
            $planName = $session->metadata->plan_name ?? null;
            $orderId = $session->metadata->order_id ?? null;
            $isTrial = isset($session->metadata->is_trial) && $session->metadata->is_trial == 'true';

            // Retrieve the order from the database using the order_id
            $order = Order::where('order_id', $orderId)->firstOrFail();
            $user = $order->user;

            // Update the order payment status and other details
            $order->update([
                'stripe_payment_intent' => $paymentIntent,
                'stripe_payment_status' => $paymentStatus,
                'amount' => $amount,
                'plan_type' => $this->getPlanType($planType),
                'plan_name' => $planName,
                'plan_amount' => $amount,
                'order_total' => $amount,
                'order_tax' => 0,
                'created_at' => now(),
                'next_renewal_date' => $this->getNextRenewalDate($planType)
            ]);

            if ($isTrial || $paymentStatus === 'paid') {
                // Ensure the user remains active during the trial or after successful payment
                $user->page->update([
                    'is_registered' => true,
                    'next_renewal_date' => $this->getNextRenewalDate($planType),
                    'is_suspended' => false,
                    'expired_at' => null
                ]);

                // Generate QR code for the user's page
                $qrCode = $this->generatePageQrCode($user->page->slug);
                $user->page->update(['qr_code' => $qrCode]);

                // Update the user's subscription status
                $user->update([
                    'subscription_status' => AppConstant::ACTIVE,
                    'is_free_trial_availed' => $isTrial ? true : $user->is_free_trial_availed
                ]);

                // Send an order confirmation email
                $orderEmailTemplate = Template::where('name', Template::ORDER_CONFIRMATION_EMAIL)->first();
                Mail::to($user->email)->send(new OrderConfirmationEmail($user, $order, $orderEmailTemplate));
            } else {
                // Send an order failed email
                $orderEmailTemplate = Template::where('name', Template::ORDER_FAILED_EMAIL)->first();
                Mail::to($user->email)->send(new OrderConfirmationEmail($user, $order, $orderEmailTemplate));

                // If payment failed, mark the user as suspended
                $user->update(['subscription_status' => AppConstant::IN_ACTIVE]);
            }
        } catch (\Throwable $th) {
            Log::error("Error while updating Order Data", [
                'exception' => $th->getMessage(),
                'session' => $session,
            ]);
        }
    }
    private function updateOrderPaymentStatus($orderId, $status)
    {
        try {
            $order = Order::where('order_id', $orderId)->firstOrFail();
            $order->update([
                'stripe_payment_status' => AppConstant::PAYMENT_FAILED,
            ]);

            // Optionally update the user's subscription status to 'suspended' if payment failed
            if ($status === 'failed') {
                $order->user->update([
                    'subscription_status' => AppConstant::IN_ACTIVE,
                ]);
            }
        } catch (\Throwable $th) {
            Log::error("Error while updating Order Payment Status", [
                'exception' => $th->getMessage(),
                'order_id' => $orderId,
            ]);
        }
    }
    private function getNextRenewalDate($planType)
    {
        return match ($planType) {
            '1' => Carbon::now()->addMonth(),
            '3' => Carbon::now()->addMonths(3),
            '6' => Carbon::now()->addMonths(6),
            '12' => Carbon::now()->addYear(),
            default => Carbon::now(),
        };
    }
    private function getPlanType($planType)
    {
        $plan_type = null;

        switch ($planType) {
            case '1':
                $plan_type = "monthly";
                break;
            case '3':
                $plan_type = "quarterly";
                break;
            case '6':
                $plan_type = "semi_annual";
                break;
            case '12':
                $plan_type = "annual";
                break;
        }
        return $plan_type;
    }


    private function generatePageQrCode($pageSlug)
    {
        // Example data to encode in the QR code
        $data =  env('FRONTEND_URL') . '/memory/' . $pageSlug;

        // Generate the QR code
        $qrCode = QrCode::size(300)->generate($data);

        // Define the file path and name
        $fileName = $pageSlug . '.png';
        $path = 'qrcodes/' . $fileName;

        // Store the QR code in the public directory
        Storage::disk('public')->put($path, $qrCode);

        // Return the publicly accessible URL
        return url(Storage::url($path));
    }
}
