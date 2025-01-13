<?php

namespace App\Http\Controllers;

use App\Models\AccessRequest;
use Illuminate\Http\Request;

class AccessRequestController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $page = $user->page;
        $accessRequests = AccessRequest::where('page_id', $page->id)
            ->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $accessRequests
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'page_id' => 'required',
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'sections' => 'required|array',
            ]);

            AccessRequest::create([
                'page_id' => $validated['page_id'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'sections' => json_encode($validated['sections'])
            ]);

            return response()->json(['message' => 'Access request submitted successfully.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()]);
        }
    }

    public function updateStatus(Request $request)
    {
        $id = $request->id;
        $status = $request->action;

        // Find the contribution request by ID
        $accessRequest = AccessRequest::findOrFail($id);

        // Update the status to 'accepted' or declined (based on the action)
        $accessRequest->update(['status' => $status]);

        // Return a JSON response
        return response()->json([
            'success' => true,
            'message' => 'Access request updated successfully.',
        ], 200);
    }

    // Visitor: Access the requested module
    public function access($accessLink)
    {
        $accessRequest = AccessRequest::where('access_link', $accessLink)
            ->where('status', 'approved')
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$accessRequest) {
            return response()->json(['message' => 'Invalid or expired access link.'], 403);
        }

        return response()->json(['message' => 'Access granted.', 'section' => $accessRequest->section]);
    }
}
