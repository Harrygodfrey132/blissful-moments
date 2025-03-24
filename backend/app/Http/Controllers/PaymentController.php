<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Customer;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        // Validate the request
        $request->validate([
            'amount' => 'required|integer|min:1',
        ]);

        try {
            Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function createCheckoutSession(Request $request)
    {
        try {
            // Set your Stripe Secret Key
            Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

            // Fetch user
            $customerId = $request->customer_id;
            $user = User::findOrFail($customerId);

            // Check if the user already availed the free trial
            $isTrialAvailable = !$user->is_free_trial_availed;
            $freeTrialMonths = (int) ConfigHelper::getConfig('conf_free_trial_period') ?? 3;
            $freeTrialDays = $isTrialAvailable ? ($freeTrialMonths * 30) : 0; // Apply trial only if not availed

            // Get the active plan and its 1-month variation
            $plan = Plan::where('status', AppConstant::ACTIVE)->firstOrFail();
            $planVariation = $plan->planVariations()->where('duration', 1)->firstOrFail();

            // Create or retrieve Stripe customer
            if (!$user->stripe_customer_id) {
                $billingDetails = $request->billing_details ?? [];
                $customer = Customer::create([
                    'email' => $user->email,
                    'name' => ($billingDetails['first_name'] ?? '') . ' ' . ($billingDetails['last_name'] ?? ''),
                    'phone' => $billingDetails['phone'] ?? '',
                    'address' => [
                        'line1' => $billingDetails['address'] ?? '',
                        'line2' => $billingDetails['apartment'] ?? '',
                        'city' => $billingDetails['city'] ?? '',
                        'state' => $billingDetails['region'] ?? '',
                        'postal_code' => $billingDetails['postal_code'] ?? '',
                        'country' => $billingDetails['country'] ?? '',
                    ],
                ]);

                $user->update(['stripe_customer_id' => $customer->id]);
            } else {
                $customer = Customer::retrieve($user->stripe_customer_id);
            }

            // Decrypt Order ID
            $orderId = Crypt::decryptString($request->order_id);

            // Create Stripe Checkout Session
            $sessionData = [
                'payment_method_types' => ['card'],
                'mode' => 'subscription',
                'customer' => $customer->id,
                'line_items' => [
                    [
                        'price' => $planVariation->stripe_price_id,
                        'quantity' => 1,
                    ],
                ],
                'success_url' => env('FRONTEND_URL') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL') . '/cancel',
                'metadata' => [
                    'customer_id' => $customerId,
                    'plan_type' => $planVariation->duration,
                    'plan_name' => $plan->name,
                    'plan_amount' => $planVariation->price,
                    'order_id' => $orderId,
                    'is_trial' => $isTrialAvailable ? 'yes' : 'no'
                ],
            ];

            // Add free trial if not availed
            if ($isTrialAvailable) {
                $sessionData['subscription_data'] = [
                    'trial_period_days' => $freeTrialDays,
                ];
            }

            $session = Session::create($sessionData);


            return response()->json([
                'sessionId' => $session->id,
                'stripePublicKey' => ConfigHelper::getConfig('conf_stripe_public_key')
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
