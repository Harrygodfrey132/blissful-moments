<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Ensure the user is authenticated
        $user = $request->user();

        // Validate incoming request
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'stripe_payment_intent' => 'required|string',
            'stripe_payment_status' => 'required|string',
            'plan_type' => 'required|in:monthly,quarterly,semi_annual,annual',
            'plan_amount' => 'required|numeric|min:1',
        ]);

        // Calculate next renewal date based on plan type
        $nextRenewalDate = Carbon::now(); // Start from the current date
        switch ($request->plan_type) {
            case 'monthly':
                $nextRenewalDate = $nextRenewalDate->addMonth();
                break;
            case 'quarterly':
                $nextRenewalDate = $nextRenewalDate->addMonths(3);
                break;
            case 'semi_annual':
                $nextRenewalDate = $nextRenewalDate->addMonths(6);
                break;
            case 'annual':
                $nextRenewalDate = $nextRenewalDate->addYear();
                break;
        }

        // Create the order and store it in the database
        $order = Order::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'stripe_payment_intent' => $request->stripe_payment_intent,
            'stripe_payment_status' => $request->stripe_payment_status,
            'plan_type' => $request->plan_type,
            'plan_amount' => $request->plan_amount,
            'next_renewal_date' => $nextRenewalDate,
        ]);

        // Return response
        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ]);
    }

    // Method to get orders for the user
    public function getUserOrders()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->get();
        return response()->json($orders);
    }
}
