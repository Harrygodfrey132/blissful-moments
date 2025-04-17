<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Models\Plan;
use App\Models\PlanVariation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class PlanController extends Controller
{
    public function index(Request $request)
    {
        $data = [
            'search' => $request->input('search', ''),
            'status' => $request->input('status', ''),
            'start_date' => $request->input('start_date', ''),
            'end_date' => $request->input('end_date', ''),
        ];

        $plans = Plan::plansSearchFilter($data)->paginate(10);

        if ($request->ajax()) {
            return view('admin.plans.partials.plans-table', compact('plans', 'data'));
        }
        return view('admin.plans.index', compact('plans', 'data'));
    }

    public function create()
    {
        return view('admin.plans.create');
    }

    // Store function for handling the form submission
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'required|array|min:1',
            'features.*' => 'required|string|max:255',
            'variations' => 'required|array',
            'variations.*.price' => 'required|numeric|min:0',
        ]);

        $stripeSecretKey = ConfigHelper::getConfig('conf_stripe_secret_key');

        // Check if Stripe is configured
        if (empty($stripeSecretKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Stripe is not configured. Please configure Stripe first.'
            ], 400);
        }

        // Set Stripe API Key
        Stripe::setApiKey($stripeSecretKey);

        // Create Stripe Product
        try {
            // Create Stripe Product
            $stripeProduct = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            // Create a new Plan in Database
            $plan = Plan::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'features' => $validated['features'],
                'stripe_product_id' => $stripeProduct->id,
            ]);

            // Loop through each duration and store it in Stripe & Database
            foreach ($validated['variations'] as $duration => $variation) {
                // Create a Stripe Price for this plan duration
                $stripePrice = Price::create([
                    'unit_amount' => $variation['price'] * 100, // Convert to cents
                    'currency' => 'gbp',
                    'recurring' => ['interval' => 'month', 'interval_count' => $duration],
                    'product' => $stripeProduct->id,
                ]);

                // Store Plan Variation in Database
                PlanVariation::create([
                    'plan_id' => $plan->id,
                    'duration' => $duration, // e.g., 1, 3, 6, 12 months
                    'price' => $variation['price'],
                    'stripe_price_id' => $stripePrice->id, // Store Stripe Price ID
                ]);
            }

            // Return response
            if ($request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Plan created successfully!',
                ]);
            }
            return to_route('plans.index')->with('success', 'Plan created successfully.');
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the plan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function edit(Plan $plan)
    {
        return view('admin.plans.edit', compact('plan'));
    }

    public function update(Request $request, Plan $plan)
    {
        try {
            // Validate the incoming data
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'features' => 'required|array|min:1',
                'features.*' => 'required|string|max:255',
                'variations' => 'required|array',
                'variations.*.price' => 'required|numeric|min:0',
            ]);

            // Set Stripe API Key
            Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

            // Fetch the Stripe Product and update it
            $stripeProduct = Product::retrieve($plan->stripe_product_id);
            $stripeProduct->name = $validated['name'];
            $stripeProduct->description = $validated['description'] ?? null;
            $stripeProduct->save();

            // Update the plan in the database
            $plan->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'features' => json_encode($validated['features']), // Update features as JSON
            ]);

            // Loop through each variation (duration & price)
            foreach ($validated['variations'] as $duration => $variation) {
                // Check if the variation already exists
                $existingVariation = PlanVariation::where('plan_id', $plan->id)
                    ->where('duration', $duration)
                    ->first();

                if ($existingVariation) {
                    // Deactivate the old Stripe Price (Stripe doesn't allow price updates)
                    $stripePrice = Price::retrieve($existingVariation->stripe_price_id);
                    $stripePrice->active = false;
                    $stripePrice->save();

                    // Create a new Stripe Price
                    $newStripePrice = Price::create([
                        'unit_amount' => $variation['price'] * 100, // Convert to cents
                        'currency' => 'gbp',
                        'recurring' => ['interval' => 'month', 'interval_count' => $duration],
                        'product' => $stripeProduct->id,
                    ]);

                    // Update the existing plan variation in the database
                    $existingVariation->update([
                        'price' => $variation['price'],
                        'stripe_price_id' => $newStripePrice->id, // Store new Stripe Price ID
                    ]);
                } else {
                    // Create a new Stripe Price for a new variation
                    $newStripePrice = Price::create([
                        'unit_amount' => $variation['price'] * 100,
                        'currency' => 'gbp',
                        'recurring' => ['interval' => 'month', 'interval_count' => $duration],
                        'product' => $stripeProduct->id,
                    ]);

                    // Store new variation in the database
                    PlanVariation::create([
                        'plan_id' => $plan->id,
                        'duration' => $duration,
                        'price' => $variation['price'],
                        'stripe_price_id' => $newStripePrice->id,
                    ]);
                }
            }

            return back()->with('success', 'Plan updated successfully!');
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Plan update failed: ' . $e->getMessage());

            return back()->with('error', 'Something went wrong! Please try again.');
        }
    }

    public function delete(Plan $plan)
    {
        if (!$plan->delete()) {
            return back()->with('error', 'Something went wrong! Unable to delete record');
        }
        return back()->with('success', 'Record has been removed successfully!');
    }

    public function multiDelete(Request $request)
    {
        $ids = $request->input('ids');  // Get the array of IDs

        if (empty($ids)) {
            return response()->json(['message' => 'No IDs provided'], 400);
        }
        // Decrypt the IDs
        try {
            $decryptedIds = array_map(function ($id) {
                return decrypt($id);  // Decrypt each ID in the array
            }, $ids);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json(['message' => 'Invalid encrypted IDs'], 400);
        }
        Plan::whereIn('id', $decryptedIds)->delete();
        flash()->success('Records deleted successfully!');
        return response()->json(['message' => 'Users deleted successfully']);
    }

    public function updateStatus(Request $request, Plan $plan)
    {

        $request->validate([
            'status' => 'required|boolean',
        ]);

        try {
            $plan->status = $request->status;
            $plan->save();
            return response()->json(['success' => true, 'message' => 'Status updated successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update status.'], 500);
        }
    }

    /**
     * Frontend Plans Listing
     */

    public function plansListing()
    {
        $plans = Plan::where('status', AppConstant::ACTIVE)->get();

        return response()->json(['plans' => $plans]);
    }

    public function toggleSuspend(User $user)
    {
        $user->page->is_suspended = !$user->page->is_suspended;
        $user->page->save();

        return response()->json([
            'success' => true,
            'message' => $user->is_suspended ? 'User suspended successfully' : 'User unsuspended successfully'
        ]);
    }
}
