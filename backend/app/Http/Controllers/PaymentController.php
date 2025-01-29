<?php

namespace App\Http\Controllers;

use App\Helper\ConfigHelper;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\PaymentIntent;

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
        // Set your Stripe Secret Key
        Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

        try {
            $customerId = $request->customer_id;

            // Plan details (replace with dynamic values based on your application)
            $planName = $request->plan_name;
            $planType = '12';
            $planAmount = $request->plan_amount;

            // Create a Checkout Session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => 'Page Registration',
                            ],
                            'unit_amount' => $planAmount,
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => 'payment',
                'success_url' => env('FRONTEND_URL') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL') . '/cancel',
                'metadata' => [
                    'customer_id' => $customerId,  // Add customer ID
                    'plan_type' => $planType,     // Add plan type (e.g. 'monthly', 'quarterly')
                    'plan_name' => $planName,     // Add plan type (e.g. 'monthly', 'quarterly')
                    'plan_amount' => $planAmount,  // Add plan amount (in cents)
                ],
            ]);

            return response()->json(['sessionId' => $session->id, 'stripePublicKey' => ConfigHelper::getConfig('conf_stripe_public_key')]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
