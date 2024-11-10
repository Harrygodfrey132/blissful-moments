<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

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
            'billing_cycle' => 'required|integer|in:30,180,365',
            'price' => 'required|numeric|min:0',
        ]);

        // Create a new plan using the validated data
        Plan::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'billing_cycle' => $validated['billing_cycle'],
            'price' => $validated['price'],
        ]);

        // Redirect back or to a different page with a success message
        return to_route('plans.index')->with('success', 'Plan created successfully.');
    }

    public function edit(Plan $user)
    {
        return view('admin.users.edit', compact('user'));
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
}
