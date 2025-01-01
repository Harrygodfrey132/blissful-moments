<?php

namespace App\Http\Controllers;

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
            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount, // Amount in cents
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
        Stripe::setApiKey(env('STRIPE_SECRET_KEY')); // Make sure to set your secret key in .env

        try {
            // Create a Checkout Session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'usd',  // or your preferred currency
                            'product_data' => [
                                'name' => 'Page Registration', // Example product name
                            ],
                            'unit_amount' => 500, // Amount in cents (e.g. $5.00)
                        ],
                        'quantity' => 1,
                    ],
                ],
                'mode' => 'payment',
                'success_url' => route('checkout.success', ['session_id' => '{CHECKOUT_SESSION_ID}']),
                'cancel_url' => route('checkout.cancel'),
            ]);

            return response()->json(['sessionId' => $session->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Add success and cancel methods for handling the response
    public function success(Request $request)
    {
        return view('checkout.success', ['session_id' => $request->session_id]);
    }

    public function cancel()
    {
        return view('checkout.cancel');
    }
}
