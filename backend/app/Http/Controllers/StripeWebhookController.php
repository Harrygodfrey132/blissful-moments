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

                // Extract the payment details from the session
                $paymentIntent = $session->payment_intent;
                $paymentStatus = $session->payment_status;
                $amount = $session->amount_total / 100; // Amount is in cents
                $planType = $session->metadata->plan_type;
                $planName = $session->metadata->plan_name;

                // Store the order in the database
                $this->storeOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName);
            case 'invoice.payment_failed':
                $invoice = $event->data->object;
                Log::warning('Invoice payment failed', ['invoice_id' => $invoice->id]);
                break;

            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object;
                break;
            default:
                Log::info('Unhandled Stripe event', ['event_type' => $event->type]);
        }

        // Return a success response
        return response('Webhook received', 200);
    }

    private function storeOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName)
    {
        try {
            // Retrieve the user from the metadata customer_id
            $user = User::where('id', $session->metadata->customer_id)->firstOrFail();
            $orderId = 'BM' . date('YmdHis') . rand(1000, 9999);
            // Store the order in the database
            $order = Order::create([
                'order_id' => $orderId,
                'user_id' => $user->id,
                'amount' => $amount,
                'stripe_payment_intent' => $paymentIntent,
                'stripe_payment_status' => $paymentStatus,
                'plan_type' => $this->getPlanType($planType),
                'plan_name' => $planName,
                'plan_amount' => $amount,
                'order_total' => $amount,
                'order_tax' => 0,
                'next_renewal_date' => $this->getNextRenewalDate($planType),
            ]);

            $qrCode = $this->generatePageQrCode($user->page->slug);

            // Update the user's page status to registered
            $user->page->update([
                'is_registered' => true,
                'qr_code' => $qrCode,
                'next_renewal_date' => $this->getNextRenewalDate($planType),
            ]);

            $user->update([
                'subscription_status' => AppConstant::ACTIVE
            ]);

            $orderEmailTemplate = Template::where('name', Template::ORDER_CONFIRMATION_EMAIL)->first();
            Mail::to($user->email)->send(new OrderConfirmationEmail($user, $order , $orderEmailTemplate));
        } catch (\Throwable $th) {
            Log::error("Error while saving Order Data", [
                'exception' => $th->getMessage(),
                'session' => $session,
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
