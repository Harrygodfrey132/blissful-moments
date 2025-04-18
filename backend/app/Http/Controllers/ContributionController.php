<?php

namespace App\Http\Controllers;

use App\Models\ContributionData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContributionController extends Controller
{
    public function updateTagline(Request $request)
    {
        try {
            $request->validate([
                'tagline' => 'required|string',
                'status' => 'required|boolean',
            ]);

            $user = $request->user();
            $page = $user->page;

            $page->contributions->update([
                'tagline' => $request->tagline,
                'status' => $request->status,
            ]);

            return response()->json([
                'message' => 'Tagline and status updated successfully!',
                'page_data' => $page->refresh()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    public function storeContributionData(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable',
        ]);

        $fileUrl = '';

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('contributions', 'public');
            $fileUrl = url(Storage::url($imagePath));
        }
        $user = $request->user();
        $page = $user->page;
        try {
            // Save the contribution
            ContributionData::create([
                'contribution_id' => $page->contributions->id,
                'name' => $validated['name'],
                'description' => $validated['description'],
                'image' => $fileUrl
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Contribution added successfully',
                'page_data' => $user->page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add contribution',
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function updateContributionData(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
            'name' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:5000',
            'image' => 'nullable',
        ]);

        try {
            // Find the contribution by ID
            $contribution = ContributionData::findOrFail($validated['id']);

            // Update fields if provided
            if (isset($validated['name'])) {
                $contribution->name = $validated['name'];
            }

            if (isset($validated['message'])) {
                $contribution->description = $validated['message'];
            }

            // Save the changes
            $contribution->save();

            return response()->json([
                'success' => true,
                'message' => 'Contribution updated successfully',
                'page_data' => $request->user()->page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            // Handle unexpected errors
            return response()->json([
                'success' => false,
                'message' => 'Failed to update contribution',
                'error' => $e->getMessage(),
            ]);
        }
    }


    public function destroy($id)
    {
        // Find the contribution by ID
        $contribution = ContributionData::find($id);

        if (!$contribution) {
            return response()->json(['message' => 'Contribution not found'], 404);
        }

        // Delete the contribution
        $contribution->delete();

        return response()->json(['message' => 'Contribution deleted successfully'], 200);
    }
}
