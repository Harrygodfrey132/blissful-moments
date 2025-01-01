<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Stripe\Webhook;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        // Set your Stripe secret key
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        // Get the Stripe signature header
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            // Use Stripe's Webhook signature verification to ensure the event is valid
            $event = Webhook::constructEvent(
                $request->getContent(),
                $sig_header,
                env('STRIPE_WEBHOOK_SECRET')
            );
        } catch (\Exception $e) {
            // Log the error if the signature is invalid or any other error
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
                $planType = $session->metadata->plan_type; // Assuming you stored this in metadata
                $planName = $session->metadata->plan_name;
                // Store the order in the database
                $this->storeOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName);

                break;
                // Handle other event types if needed (like failed payments, refunds, etc.)
        }

        return response('Webhook received', 200);
    }

    private function storeOrder($session, $paymentIntent, $paymentStatus, $amount, $planType, $planName)
    {
        // You can store any other relevant info in the order as needed
        try {
            $user = User::where('id', $session->metadata->customer_id);

            Order::create([
                'user_id' => $user->id,
                'amount' => $amount,
                'stripe_payment_intent' => $paymentIntent,
                'stripe_payment_status' => $paymentStatus,
                'plan_type' => $this->getPlanType($planType),
                'plan_name' => $planName,
                'plan_amount' => $amount,
                'next_renewal_date' => $this->getNextRenewalDate($planType),
            ]);

            $user->page->update(['is_registered' => true]);
        } catch (\Throwable $th) {
            Log::info("Error while saving Order Data", $th->getMessage());
        }
    }

    private function getNextRenewalDate($planType)
    {
        $nextRenewalDate = Carbon::now();

        switch ($planType) {
            case '30':
                $nextRenewalDate->addMonth();
                break;
            case '60':
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
}
