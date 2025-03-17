<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Mail\OrderConfirmation;
use App\Mail\OrderConfirmationEmail;
use Stripe\Stripe;
use Stripe\Webhook;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class StripeWebhookController extends Controller
{

    public function handleWebhook(Request $request)
    {
        // Set your Stripe secret key
        Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

        // Get the Stripe signature header
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            // Verify the webhook signature
            $event = Webhook::constructEvent(
                $request->getContent(),
                $sig_header,
                ConfigHelper::getConfig('conf_stripe_webhook_secret')
            );
        } catch (\Exception $e) {
            // Log the error and return a response with the error message
            Log::error('Webhook signature verification failed', [
                'error' => $e->getMessage(),
                'payload' => $request->getContent()
            ]);

            return response('Webhook error: ' . $e->getMessage(), 400);
        }

        // Handle different event types
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;

                $subscriptionId = $session->subscription ?? null;
                $customerId = $session->customer ?? null;

                // Extract the payment details from the session
                $paymentIntent = $session->payment_intent;
                $paymentStatus = $session->payment_status;
                $amount = $session->amount_total / 100; // Amount is in cents
                $planType = $session->metadata->plan_type;
                $planName = $session->metadata->plan_name;
                $orderId = $session->metadata->order_id;

                if ($subscriptionId && $customerId) {
                    // Find user by Stripe customer ID
                    $user = User::where('stripe_customer_id', $customerId)->first();

                    if ($user) {
                        $user->update(['stripe_subscription_id' => $subscriptionId]);
                    }
                }

                // Update the existing order based on the session data
                $this->updateOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName, $orderId);
                break;

            case 'invoice.payment_failed':
                $invoice = $event->data->object;
                Log::warning('Invoice payment failed', ['invoice_id' => $invoice->id]);
                $this->updateOrderPaymentStatus($invoice->metadata->order_id, 'failed');
                break;

            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object;
                // Optionally, handle the case where a payment intent has succeeded
                break;

            default:
                Log::info('Unhandled Stripe event', ['event_type' => $event->type]);
        }

        // Return a success response
        return response('Webhook received', 200);
    }

    private function updateOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName, $orderId)
    {
        try {
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
                'next_renewal_date' => now()->addYear()
            ]);

            // If payment is successful, generate a QR code and update the user's page
            if ($paymentStatus === 'paid') {
                $user->page->update([
                    'is_registered' => true,
                    'next_renewal_date' => $this->getNextRenewalDate($planType),
                    'is_suspended' => false,
                    'expired_at' => null
                ]);

                // Generate QR code for the user's page
                $qrCode = $this->generatePageQrCode($user->page->slug);

                // Update the page with the QR code
                $user->page->update([
                    'qr_code' => $qrCode
                ]);

                // Update the user's subscription status to ACTIVE
                $user->update([
                    'subscription_status' => AppConstant::ACTIVE,
                ]);

                // Send an order confirmation email
                $orderEmailTemplate = Template::where('name', Template::ORDER_CONFIRMATION_EMAIL)->first();
                Mail::to($user->email)->send(new OrderConfirmationEmail($user, $order, $orderEmailTemplate));
            } else {
                // Send an order confirmation email
                $orderEmailTemplate = Template::where('name', Template::ORDER_FAILED_EMAIL)->first();
                Mail::to($user->email)->send(new OrderConfirmationEmail($user, $order, $orderEmailTemplate));
                // If payment failed, mark the user as suspended
                $user->update([
                    'subscription_status' => AppConstant::IN_ACTIVE,
                ]);
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
        $nextRenewalDate = Carbon::now();

        switch ($planType) {
            case '1':
                $nextRenewalDate->addMonth();
                break;
            case '3':
                $nextRenewalDate->addMonths(3);
                break;
            case '6':
                $nextRenewalDate->addMonths(6);
                break;
            case '12':
                $nextRenewalDate->addYear();
                break;
        }

        return $nextRenewalDate;
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
