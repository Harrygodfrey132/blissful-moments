<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use App\Models\TimelineEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TimelineController extends Controller
{

    /**
     * Save or update timeline event details for the user's page.
     */
    public function saveTimeline(Request $request)
    {
        try {
            DB::beginTransaction();  // Start transaction

            $user = $request->user();
            $page = $user->page;

            // Extract timeline data from the request
            $timelineData = $request->input('timeline', []);

            // If no 'timeline' is passed, fallback to just the tagline
            if (!$timelineData) {
                $timelineData = ['tagline' => $request->input('tagline') , 'status' => $request->input('status')];
            }

            // Check if the page already has a timeline
            $timeline = $page->timeline()->first();

            // If no timeline exists, create a new one
            if (!$timeline) {
                $timeline = Timeline::create([
                    'page_id' => $page->id,
                    'tagline' => $timelineData['tagline'] ?? null,
                    'status' => $timelineData['status'] ?? true,
                ]);
            }

            // Save or update tagline if provided
            if (isset($timelineData['tagline'])) {
                $timeline->update([
                    'tagline' => $timelineData['tagline'],
                    'status' => $timelineData['status'],
                ]);
            }

            // Save events if provided
            if (isset($timelineData['events']) && is_array($timelineData['events'])) {
                // Delete old events before creating new ones
                $timeline->events()->delete();

                // Create new events
                foreach ($timelineData['events'] as $eventData) {
                    $timeline->events()->create([
                        'timeline_id' => $timeline->id,
                        'event_date' => $eventData['event_date'],
                        'title' => $eventData['title'],
                        'description' => $eventData['description'],
                        'location' => $eventData['location'],
                    ]);
                }
            }

            DB::commit();  // Commit transaction

            return response()->json([
                'message' => 'Timeline saved/updated successfully',
                'page_data' => $page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();  // Rollback transaction in case of error
            return response()->json([
                'message' => 'Error occurred while saving timeline',
                'error' => $e->getMessage(),
            ]);
        }
    }


    public function deleteTimeline(Request $request)
    {

        // Validate the incoming request to ensure event_id is present
        $validated = $request->validate([
            'event_id' => 'required|exists:timeline_events,id', // Validates event_id exists in timeline_events table
        ]);

        try {
            // Find the event by the provided event_id
            $event = TimelineEvent::find($validated['event_id']);

            // If the event doesn't exist, return a 404 error
            if (!$event) {
                return response()->json(['message' => 'Event not found'], 404);
            }

            // Delete the event
            $event->delete();

            // Return a success response
            return response()->json(['message' => 'Event deleted successfully', 'page_data' => $request->user()->page], 200);
        } catch (\Exception $e) {
            // Return a 500 server error
            return response()->json(['message' => 'An error occurred while deleting the event'], 500);
        }
    }
}
