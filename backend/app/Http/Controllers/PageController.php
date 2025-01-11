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
        try {
            $validated = $request->validate([
                'user_id' => 'required|integer',
                'name' => 'required|string|unique:pages',
                'is_private' => 'required|boolean',
                'password' => 'nullable|string|required_if:is_private,true',
            ]);

            // Initialize the page variable outside the transaction
            $page = null;

            DB::transaction(function () use ($validated, &$page) {

                $page = Page::create([
                    'user_id' => $validated['user_id'],
                    'name' => $validated['name'],
                    'is_private' => $validated['is_private'],
                    'password' => $validated['is_private'] ? bcrypt($validated['password']) : null,
                ]);

                $page->personalQuote()->create([
                    'page_id' => $page->id,
                    'quote' => "Share Something special for loved one"
                ]);

                $page->gallery()->create([
                    'gallery_name' => "Gallery",
                    'user_id' => $validated['user_id']
                ]);

                $page->obituaries()->create([
                    'tagline' => "Enter a memorable tagline here.",
                    'content' => "Add a heartfelt message about your loved one.",
                    'page_id' => $page->id,
                ]);

                $timeline = $page->timeline()->create([
                    'tagline' => "Your Timeline Goes Here",
                    'page_id' => $page->id
                ]);

                $timeline->events()->create([
                    'timeline_id' => $timeline->id,
                    'event_date' => now(),
                    'title' => "New Event",
                    'description' => "Event description",
                    'location' => "Event location"
                ]);

                $page->socialMediaData()->create([
                    'page_id' => $page->id,
                    'content' => "This page is a forever tribute to . Please spread the page so others can contribute and reminise"
                ]);

                $favourite = $page->favourites()->create([
                    'page_id' => $page->id,
                    'tagline' => "A place to remember John's favourite things",
                ]);

                $favourite->favouriteEvents()->create([
                    'favourite_id' => $favourite->id,
                    'title' => "Default Title",
                    'description' => "Default Description"
                ]);

                $page->contributions()->create([
                    'page_id' => $page->id,
                    'tagline' => "This is a place to celebrate the life of and their impact on all of us. Please post respectfully."
                ]);
            });

            return response()->json([
                'message' => 'Page created successfully.',
                'page' => $page,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Unable to create page: ' . $th->getMessage(),
            ]);
        }
    }

    /**
     * Update personal information for the user's page.
     */
    public function updatePersonalInformation(Request $request)
    {
        try {
            $user = $request->user();
            $page = $user->page;
            Log::info("Requested Data", [print_r($request->all(), true)]);
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
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'false',
                'message' => 'Something went wrong. Unable to Save Data.' . $th->getMessage(),
                'page_data' => $page->refresh(),
            ]);
        }
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
        ], 200);
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

    public function uploadBackgroundMusic(Request $request)
    {
        $request->validate([
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

    public function show($pageName)
    {
        // Fetch page data from the database based on the page name
        $page = Page::where('slug', $pageName)->first();

        // If the page is found, return the data
        if ($page) {
            return response()->json([
                'page_data' => $page->refresh(),
            ]);
        }

        // If the page is not found, return a 404 error
        return response()->json(['error' => 'Page not found'], 404);
    }
}
