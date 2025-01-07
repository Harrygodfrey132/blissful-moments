<?php

namespace App\Http\Controllers;

use App\Models\FavouriteEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavouriteController extends Controller
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

            $page->favourites->update([
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


    public function updateFavouriteEvents(Request $request)
    {
        try {
            $favouriteEvents = $request->input('favourite_events');

            foreach ($favouriteEvents as $event) {
                FavouriteEvent::updateOrCreate(
                    ['id' => $event['id']],
                    [
                        'title' => $event['title'],
                        'description' => $event['description'],
                        'favourite_id' => $event['favourite_id'],
                    ]
                );
            }

            $pageData = $request->user()->page->refresh();
            return response()->json(['page_data' => $pageData], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Unable to save data", $th->getMessage()]);
        }
    }

    public function deleteFavouriteEvent($id, Request $request)
    {
        try {
            $user = $request->user();
            $favouriteEvent = FavouriteEvent::where('id', $id)->first();

            if (!$favouriteEvent) {
                return response()->json([
                    'message' => 'Favourite event not found or not authorized to delete',
                ]);
            }

            // Delete the event
            $favouriteEvent->delete();

            return response()->json([
                'message' => 'Favourite event deleted successfully',
                'page_data' => $user->page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the favourite event',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
