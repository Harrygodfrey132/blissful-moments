<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Models\Page;
use App\Models\UrlRedirect;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

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
                'name' => [
                    'required',
                    'string',
                    Rule::unique('pages')->ignore(Page::where('user_id', $request->user_id)->value('id'))
                ],
                'is_private' => 'required|boolean',
                'password' => 'nullable|string|required_if:is_private,true|min:8',
            ]);

            // Find existing page
            $page = Page::where('user_id', $validated['user_id'])->first();

            if (!$page) {
                // Create new page
                $page = DB::transaction(function () use ($validated) {
                    $page = Page::create([
                        'user_id' => $validated['user_id'],
                        'name' => $validated['name'],
                        'is_private' => $validated['is_private'],
                        'password' => $validated['is_private'] ? Hash::make($validated['password']) : null,
                        'first_name' => "First Name"
                    ]);

                    // Create related data
                    $page->personalQuote()->create([
                        'page_id' => $page->id,
                        'quote' => "Share something special for your loved one."
                    ]);

                    $page->gallery()->create([
                        'gallery_name' => "Gallery",
                        'user_id' => $validated['user_id']
                    ]);

                    $page->obituaries()->create([
                        'tagline' => "A special memory for a special person.",
                        'content' => "Add a heartfelt message.",
                        'page_id' => $page->id
                    ]);

                    $page->socialMediaData()->create([
                        'page_id' => $page->id,
                        'content' => "This page is a lasting tribute to " . $page->first_name .
                            ". Please share it so others can contribute and reminisce."
                    ]);

                    $timeline = $page->timeline()->create([
                        'tagline' => "Your Timeline Goes Here",
                        'page_id' => $page->id,
                        'status' => AppConstant::IN_ACTIVE
                    ]);

                    $timeline->events()->create([
                        'timeline_id' => $timeline->id,
                        'event_date' => now(),
                        'title' => "New Event",
                        'description' => "Event description",
                        'location' => "Event location"
                    ]);

                    $favourite = $page->favourites()->create([
                        'page_id' => $page->id,
                        'tagline' => "A place to remember " . $page->first_name . "'s milestones",
                        'status' => AppConstant::IN_ACTIVE
                    ]);

                    $favourite->favouriteEvents()->create([
                        'favourite_id' => $favourite->id,
                        'title' => "Default Title",
                        'description' => "Default Description"
                    ]);

                    $page->contributions()->create([
                        'page_id' => $page->id,
                        'tagline' => "This is a place to celebrate the life of " . $page->first_name .
                            " and their impact on all of us. I remind you to post respectfully.",
                        'status' => AppConstant::IN_ACTIVE
                    ]);


                    return $page;
                });
            } else {
                // If name is changing, store the old URL for redirection
                if ($page->slug && $page->slug !== $validated['name']) {
                    // Find the last custom URL (latest page name)
                    $lastRedirect = UrlRedirect::where('custom_url', $page->slug)->orderByDesc('id')->first();

                    // If a redirect exists, chain it; otherwise, create a new redirect
                    $originalUrl = $lastRedirect ? $lastRedirect->original_url : $page->slug;

                    // Create the redirect chain
                    UrlRedirect::create([
                        'original_url' => $originalUrl, // Always chain from the last known original
                        'custom_url' => $validated['name'], // Point to the latest page name
                    ]);
                }

                // Update page with new name
                $page->update([
                    'name' => $validated['name'],
                    'is_private' => $validated['is_private'],
                    'password' => $validated['is_private'] ? Hash::make($validated['password']) : $page->password,
                ]);
            }

            return response()->json([
                'message' => 'Record updated successfully.',
                'page' => $page->refresh(),
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Error creating/updating page', [
                'error' => $th->getMessage(),
                'stack' => $th->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Unable to create page: ' . $th->getMessage(),
            ], 500);
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

            // Validate the incoming data
            $validated = $request->validate([
                'firstName' => 'nullable|string|max:255',
                'middleName' => 'nullable|string|max:255',
                'lastName' => 'nullable|string|max:255',
                'location' => 'nullable|string|max:255',
                'date_of_birth' => 'nullable',
                'death_date' => 'nullable',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
            ]);

            // Check if first name is changing
            $isFirstNameUpdated = isset($validated['firstName']) && $validated['firstName'] !== $page->first_name;

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
                if (array_key_exists($requestField, $validated)) {
                    $updateData[$modelField] = $validated[$requestField] === '' ? '' : $validated[$requestField];
                }
            }

            // Handling profile picture upload if provided
            if ($request->hasFile('profile_picture')) {
                $updateData['profile_picture'] = $this->handleProfilePictureUpload($request);
            }

            // Update page information
            $page->update($updateData);

            // If the first name is updated, update related content
            if ($isFirstNameUpdated) {
                $firstName = $validated['firstName'];

                $page->socialMediaData()->update([
                    'content' => "This page is a lasting tribute to $firstName. Please share it so others can contribute and reminisce."
                ]);

                $page->favourites()->update([
                    'tagline' => "A place to remember $firstName's milestones"
                ]);

                $page->contributions()->update([
                    'tagline' => "This is a place to celebrate the life of $firstName and their impact on all of us. I remind you to post respectfully."
                ]);
            }

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

        $isPageAvailable = !Page::where('name', $name)->exists();
        $isRedirectAvailable = !UrlRedirect::where('custom_url', $name)->exists();
        $isAvailable = $isPageAvailable && $isRedirectAvailable;

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
        try {
            // Validate incoming request
            $validated = $request->validate([
                'background_image' => 'required|max:4096', // 4MB max size
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
                    'page_data' => $page->refresh(),
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'No image was uploaded.',
            ], 400);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            Log::error('Validation Errors:', $e->errors());
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('File Upload Error:', ['exception' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while uploading the image.',
            ], 500);
        }
    }


    public function uploadBackgroundMusic(Request $request)
    {
        $request->validate([
            'background_music' => 'required|file|mimes:mp3,wav,ogg|max:4096',
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

    public function deleteBackgroundMusic(Request $request)
    {

        $user = $request->user();
        $page = $user->page;

        if ($page->background_music) {
            $existingFilePath = str_replace(url('/storage'), '', $page->background_music);
            $existingFilePath = ltrim($existingFilePath, '/');
            Storage::disk('public')->delete($existingFilePath);
        }

        $page->update(['background_music' => null]);

        return response()->json([
            'success' => true,
            'message' => 'Background image uploaded successfully.',
            'page_data' => $page->refresh(),
        ]);
    }

    public function show($pageName)
    {
        $currentUrl = $pageName;

        $redirect = UrlRedirect::where('custom_url', $currentUrl)
            ->first();
        if ($redirect) {
            $currentUrl = $redirect->original_url;
        }
        // Fetch page data from the database based on the resolved page name
        $page = Page::where('slug', $currentUrl)->activeNotSuspended()->first();

        if ($page) {
            return response()->json([
                'page_data' => $page,
            ]);
        }

        return response()->json(['error' => 'Page not found'], 404);
    }


    public function verifyPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'page_id' => 'required|',
        ]);

        $page = Page::where('id', $request->page_id)->activeNotSuspended()->first();
        if (Hash::check($request->password, $page->password)) {
            return response()->json([
                'success' => true,
                'message' => 'Password verified successfully.',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid password.',
        ], 401);
    }
}
