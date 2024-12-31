<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SocialMediaController extends Controller
{
    public function saveSocialMediaData(Request $request)
    {
        try {

            // Validate the incoming request
            $validatedData = $request->validate([
                'status' => 'required|boolean',
                'content' => 'required|string'
            ]);

            // Get the authenticated user's page
            $user = $request->user();
            $page = $user->page;

            if (!$page) {
                return response()->json(['message' => 'No page associated with the user'], 404);
            }

            // Use updateOrCreate to simplify the logic
            SocialMedia::updateOrCreate(
                ['page_id' => $page->id], // Matching condition
                [
                    'status' => $validatedData['status'],
                    'content' => $validatedData['content']
                ]
            );

            // Refresh and return updated page data
            return response()->json([
                'message' => 'Record saved successfully!',
                'page_data' => $page->refresh()
            ], 200);
        } catch (\Throwable $th) {
            // Log the error using print_r for details
            Log::error('Error saving social media data: ' . print_r([
                'error_message' => $th->getMessage(),
                'trace' => $th->getTraceAsString()
            ], true));

            return response()->json([
                'message' => 'Unable to save record. Please try again later.'
            ], 500);
        }
    }
}
