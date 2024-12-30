<?php

namespace App\Http\Controllers;

use App\Models\Obituary;
use Illuminate\Http\Request;

class ObituaryController extends Controller
{
    /**
     * Save or update obituary details for the user's page.
     */
    public function saveObituary(Request $request)
    {
        $validated = $request->validate([
            'tagline' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        $page = $request->user()->page;
        $obituary = $page->obituaries()->firstOrNew();

        $obituary->fill($validated);
        $obituary->save();

        return response()->json([
            'message' => 'Obituary updated successfully.',
        ], 200);
    }


    public function updateStatus(Request $request)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'obituary_id' => 'required|integer|exists:obituaries,id',
                'status' => 'required|boolean',
            ]);

            // Retrieve the gallery and user
            $obituaryId = $validated['obituary_id'];
            $status = $validated['status'];
            $user = $request->user();

            // Find the gallery by ID
            $obituary = Obituary::findOrFail($obituaryId);

            // Update the gallery status
            if ($obituary->update(['status' => $status])) {
                return response()->json([
                    'message' => 'Obituary status updated successfully',
                    'page_data' => $user->page->refresh(),
                ], 200);
            }

            // Handle unexpected failure during update
            return response()->json([
                'message' => 'Failed to update gallery status',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
