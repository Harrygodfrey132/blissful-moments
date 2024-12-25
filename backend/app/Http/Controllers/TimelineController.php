<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use App\Models\TimelineEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TimelineController extends Controller
{
    /**
     * Save or update timeline event details for the user's page.
     */
    public function saveTimeline(Request $request)
    {
        try {
            DB::beginTransaction();  // Start transaction

            // Validate incoming data
            $validatedData = $request->validate([
                'tagline' => 'nullable|string|max:255',
                'events' => 'nullable|array',
            ]);

            $user = $request->user();
            $page = $user->page;

            // Check if the page already has a timeline
            $timeline = $page->timeline()->first();

            // If no timeline exists, create a new one
            if (!$timeline) {
                $timeline = Timeline::create([
                    'page_id' => $page->id,
                    'tagline' => $validatedData['tagline'] ?? null,  // Save tagline if provided
                ]);
            }

            // Save tagline if provided
            if (isset($validatedData['tagline'])) {
                $timeline->update([
                    'tagline' => $validatedData['tagline'],
                ]);
            }

            // Save events if provided
            if (isset($validatedData['events'])) {
                // Delete old events before creating new ones
                $timeline->events()->delete();

                // Create new events
                foreach ($validatedData['events'] as $eventData) {
                    // Combine day, month, and year into a single date (event_date)
                    $eventDate = sprintf('%04d-%02d-%02d', $eventData['year'], $eventData['month'], $eventData['day']);
                    return response()->json($eventDate);

                    // Create new event under this timeline
                    $timeline->events()->create([
                        'event_date' => $eventDate,
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
            return response()->json(['message' => 'Event deleted successfully' , 'page_data' => $request->user()->page], 200);
        } catch (\Exception $e) {
            // Return a 500 server error
            return response()->json(['message' => 'An error occurred while deleting the event'], 500);
        }
    }
}
