<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use App\Models\Obituary;
use App\Models\Page;
use App\Models\Timeline;
use App\Models\TimelineEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PageController extends Controller
{
    /**
     * Store page settings for a user.
     */
    public function storePageSettings(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'name' => 'required|string|unique:pages',
            'is_private' => 'required|boolean',
            'password' => 'nullable|string|required_if:is_private,true',
        ]);

        $page = Page::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'is_private' => $validated['is_private'],
            'password' => $validated['is_private'] ? bcrypt($validated['password']) : null,
        ]);

        return response()->json([
            'message' => 'Page created successfully.',
            'page' => $page,
        ], 201);
    }

    /**
     * Update personal information for the user's page.
     */
    public function updatePersonalInformation(Request $request)
    {
        $user = $request->user();
        $page = $user->page;

        // Validate the incoming data
        $validated = $request->validate([
            'firstName' => 'nullable|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date_format:Y-m-d',
            'death_date' => 'nullable|date_format:Y-m-d',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Collect the data to be updated
        $updateData = [];

        // Dynamically map the validated fields to the model attributes
        $fieldsMap = [
            'firstName' => 'first_name',
            'middleName' => 'middle_name',
            'lastName' => 'last_name',
            'location' => 'address',
            'date_of_birth' => 'date_of_birth',
            'death_date' => 'death_date',
        ];

        foreach ($fieldsMap as $requestField => $modelField) {
            // If the field is set in the validated data, assign it (check if it's an empty string)
            if (array_key_exists($requestField, $validated)) {
                $updateData[$modelField] = $validated[$requestField] === '' ? '' : $validated[$requestField];
            }
        }

        // Handling profile picture upload if provided
        if ($request->hasFile('profile_picture')) {
            $updateData['profile_picture'] = $this->handleProfilePictureUpload($request);
        }

        // Update page information with the data that has changed
        $page->update($updateData);

        // Return response with updated data
        return response()->json([
            'status' => 'success',
            'message' => 'Personal information updated successfully.',
            'page_data' => $page->refresh(),
        ]);
    }

    // Helper method for handling profile picture upload
    private function handleProfilePictureUpload(Request $request)
    {
        $file = $request->file('profile_picture');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('profile_pictures', $fileName, 'public');
        return url(Storage::url($path));
    }

    /**
     * Check if a user has a page.
     */
    public function checkPage(Request $request)
    {
        $page = $request->user()->page;

        return response()->json([
            'page' => $page,
        ], $page ? 200 : 404);
    }

    /**
     * Check if a page name is available.
     */
    public function checkPageNameAvailability(Request $request)
    {
        $name = $request->query('domain');

        if (!$name) {
            return response()->json(['error' => 'Domain is required.'], 400);
        }

        $isAvailable = !Page::where('name', $name)->exists();

        return response()->json([
            'isAvailable' => $isAvailable,
            'message' => $isAvailable ? 'Domain is available.' : 'Domain is not available.',
        ]);
    }

    /**
     * Upload background image for the user's page.
     */
    public function uploadBackgroundImage(Request $request)
    {
        $validated = $request->validate([
            'background_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = $request->user();
        $page = $user->page;

        if ($request->hasFile('background_image')) {
            $file = $request->file('background_image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('images', $fileName, 'public');
            $fileUrl = url(Storage::url($path));

            $page->update(['background_image' => $fileUrl]);

            return response()->json([
                'success' => true,
                'message' => 'Background image uploaded successfully.',
                'page_data' => $page,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No image was uploaded.',
        ], 400);
    }

    /**
     * Save or update the user's personal quote.
     */
    public function saveQuote(Request $request)
    {
        try {
            $validated = $request->validate([
                'quote' => 'required|string|max:255',
            ]);
            $page = $request->user()->page;
            $page->personalQuote()->updateOrCreate([], ['quote' => $validated['quote']]);

            return response()->json([
                'message' => 'Quote saved successfully.',
                'page_data' => $page->refresh(),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }

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

    /**
     * Save or update timeline event details for the user's page.
     */
    public function saveTimeline(Request $request)
    {
        try {
            DB::beginTransaction();  // Start transaction

            $validatedData = $request->validate([
                'tagline' => 'nullable|string|max:255',
                'events' => 'required|array',
                'events.*.day' => 'required|integer|min:1|max:31',
                'events.*.month' => 'required|integer|min:1|max:12',
                'events.*.year' => 'required|integer',
                'events.*.title' => 'required|string|max:255',
                'events.*.description' => 'required|string',
                'events.*.location' => 'required|string|max:255',
            ]);

            $user = $request->user();
            $page = $user->page;

            // Check if the page already has a timeline
            $timeline = $page->timeline()->first();

            if ($timeline) {
                // If timeline exists, update the existing timeline's tagline
                $timeline->update([
                    'tagline' => $validatedData['tagline'],
                ]);

                // Delete old events for this timeline
                $timeline->events()->delete();

                // Create new events
                foreach ($validatedData['events'] as $eventData) {
                    // Combine day, month, and year into a single date (event_date)
                    $eventDate = sprintf('%04d-%02d-%02d', $eventData['year'], $eventData['month'], $eventData['day']);

                    // Create new event under this timeline
                    $timeline->events()->create([
                        'event_date' => $eventDate,
                        'title' => $eventData['title'],
                        'description' => $eventData['description'],
                        'location' => $eventData['location'],
                    ]);
                }

                DB::commit();  // Commit transaction
                return response()->json(['message' => 'Timeline updated successfully', 'timeline' => $timeline], 200);
            } else {
                // If no timeline exists, create a new timeline for the page
                $timeline = Timeline::create([
                    'page_id' => $page->id,
                    'tagline' => $validatedData['tagline'],
                ]);

                // Create new events under this new timeline
                foreach ($validatedData['events'] as $eventData) {
                    // Combine day, month, and year into a single date (event_date)
                    $eventDate = sprintf('%04d-%02d-%02d', $eventData['year'], $eventData['month'], $eventData['day']);

                    // Create new event under this timeline
                    $timeline->events()->create([
                        'event_date' => $eventDate,
                        'title' => $eventData['title'],
                        'description' => $eventData['description'],
                        'location' => $eventData['location'],
                    ]);
                }

                DB::commit();  // Commit transaction
                return response()->json([
                    'message' => 'Timeline created successfully',
                    'timeline' => $timeline,
                    'page_data' => $page->refresh()
                ], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error occurred while saving timeline: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error occurred while saving timeline',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadBackgroundMusic(Request $request)
    {
        $validatedData = $request->validate([
            'background_music' => 'required|file|mimes:mp3,wav,ogg|max:10240',
        ]);

        $user = $request->user();
        $page = $user->page;

        if ($request->hasFile('background_music')) {
            $file = $request->file('background_music');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('background_music', $fileName, 'public');
            $fileUrl = url(Storage::url($path));

            $page->update(['background_music' => $fileUrl]);

            return response()->json([
                'success' => true,
                'message' => 'Background image uploaded successfully.',
                'page_data' => $page->refresh(),
            ]);
        }

        return response()->json([
            'message' => 'No file uploaded.',
        ], 400);
    }
}
