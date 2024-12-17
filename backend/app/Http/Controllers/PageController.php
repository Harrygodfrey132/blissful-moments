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

        $validated = $request->validate([
            'firstName' => 'nullable|string|max:255',
            'middleName' => 'nullable|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'deathDate' => 'nullable|date_format:Y-m-d',
            'profilePicture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = collect([
            'first_name' => $validated['firstName'] ?? null,
            'middle_name' => $validated['middleName'] ?? null,
            'last_name' => $validated['lastName'] ?? null,
            'address' => $validated['location'] ?? null,
            'date_of_birth' => $validated['dateOfBirth'] ?? null,
            'death_date' => $validated['deathDate'] ?? null,
        ])->filter()->toArray();

        if ($request->hasFile('profilePicture')) {
            $file = $request->file('profilePicture');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('profile_pictures', $fileName, 'public');
            $fileUrl = url(Storage::url($path));
            $updateData['profile_picture'] = $fileUrl;
        }

        if (!empty($updateData)) {
            $page->update($updateData);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Personal information updated successfully.',
            'page_data' => $page->refresh(),
        ]);
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
            $fileUrl = Storage::url($path);

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
        $validated = $request->validate([
            'quote' => 'required|string|max:255',
        ]);

        $page = $request->user()->page;
        $page->personalQuote()->updateOrCreate([], ['quote' => $validated['quote']]);

        return response()->json([
            'message' => 'Quote saved successfully.',
            'page_data' => $page,
        ]);
    }

    /**
     * Save or update gallery name for the user's page.
     */
    public function saveGalleryName(Request $request)
    {
        $validated = $request->validate([
            'gallery_name' => 'required|string|max:255',
        ]);

        $page = $request->user()->page;
        $gallery = $page->galleries()->firstOrCreate([], ['gallery_name' => $validated['gallery_name']]);

        $gallery->update(['gallery_name' => $validated['gallery_name']]);

        return response()->json([
            'success' => true,
            'message' => 'Gallery name updated successfully.',
            'page_data' => $page,
        ]);
    }

    /**
     * Upload images to the user's gallery.
     */
    public function uploadGalleryImages(Request $request)
    {
        $validated = $request->validate([
            'images.*' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'gallery_id' => 'required|integer|exists:galleries,id',
        ]);

        $uploadedImages = collect($request->file('images'))->map(function ($image) use ($validated) {
            $fileName = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('gallery', $fileName, 'public');
            $fileUrl = Storage::url($path);

            return GalleryImage::create([
                'gallery_id' => $validated['gallery_id'],
                'image_path' => $fileUrl,
                'caption' => null,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Images uploaded successfully.',
            'uploaded_images' => $uploadedImages,
        ], 200);
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
                return response()->json(['message' => 'Timeline created successfully', 'timeline' => $timeline], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();  // Rollback transaction on error
            Log::error('Error occurred while saving timeline: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error occurred while saving timeline',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
