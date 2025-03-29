<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Models\Order;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class OrderController extends Controller
{

    public function adminOrderListing(Request $request)
    {
        // Retrieve all filter data from the request
        $data = [
            'search' => $request->input('search', ''),
        ];

        $orders = Order::orderSearchFilter($data)->latest()->paginate(20);

        // Return AJAX response if the request is AJAX
        if ($request->ajax()) {
            return view('admin.orders.partials.order-table', compact('orders', 'data'));
        }

        return view('admin.orders.index', compact('orders', 'data'));
    }

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
    public function getUserOrders(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->latest()->paginate(10); // Set the number of items per page (e.g., 10)

        // Return paginated data with metadata
        return response()->json([
            'order_data' => $orders
        ]);
    }

    public function createUserOrder(Request $request)
    {
        $user = $request->user();
        $orderId = generateUniqueOrderId();

        // Check for an existing order with 'payment awaiting' status
        $existingOrder = Order::where('user_id', $user->id)
            ->where('stripe_payment_status', AppConstant::PAYMENT_AWAITING)
            ->first();

        // If an existing order is found and it's less than 24 hours old, return the same order ID
        if ($existingOrder && $existingOrder->created_at > now()->subHours(24)) {
            $encryptedOrderId = Crypt::encryptString($existingOrder->order_id);
            return response()->json([
                'success' => true,
                'message' => 'Order already exists and is still awaiting payment',
                'order_id' => $encryptedOrderId,
            ]);
        }

        // If the existing order is older than 24 hours, update the payment status to 'failed'
        if ($existingOrder) {
            $existingOrder->update([
                'stripe_payment_status' => AppConstant::PAYMENT_FAILED
            ]);
        }

        $isTrialAvailable = !$user->is_free_trial_availed;
        $freeTrialMonths = (int) ConfigHelper::getConfig('conf_free_trial_period') ?? 30;
        $renewalDays =  $isTrialAvailable ? $freeTrialMonths : 0;

        // Get the active plan and its 1-month variation
        $plan = Plan::where('status', AppConstant::ACTIVE)->firstOrFail();
        $planVariation = $plan->planVariations()->where('duration', 1)->firstOrFail();
        // Create a new order
        $order = Order::create([
            'order_id' => $orderId,
            'user_id' => $user->id,
            'amount' => $isTrialAvailable ? 0.00  : $planVariation->price,
            'stripe_payment_intent' => "",
            'stripe_payment_status' => AppConstant::PAYMENT_AWAITING,
            'plan_type' => $isTrialAvailable ? "Free Trial" : "Monthly",
            'plan_name' => $isTrialAvailable ? "Free Trial" : $plan->name,
            'plan_amount' =>  $isTrialAvailable ? 0.00  : $planVariation->price,
            'order_total' =>  $isTrialAvailable ? 0.00  : $planVariation->price, // Fixed issue
            'order_tax' => 0.00,
            'next_renewal_date' => now()->addDays($renewalDays),
        ]);

        $encryptedOrderId = Crypt::encryptString($order->order_id);
        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'order_id' => $encryptedOrderId,
        ]);
    }


    public function getOrderDetails(Request $request)
    {
        try {
            $user = $request->user();
            $encryptedOrderId = $request->get('order_id');

            if (!$encryptedOrderId) {
                return response()->json(['error' => 'Order ID is required'], 400);
            }

            $orderId = Crypt::decryptString($encryptedOrderId);

            $order = Order::where('order_id', $orderId)
                ->where('user_id', $user->id)
                ->first();

            if (!$order) {
                return response()->json(['error' => 'Order not found or unauthorized'], 403);
            }

            return response()->json(['order' => $order]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid order ID'], 400);
        }
    }
}
