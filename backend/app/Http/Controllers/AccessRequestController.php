<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Mail\AccessRequest as MailAccessRequest;
use App\Models\AccessRequest;
use App\Models\Submission;
use App\Models\Template;
use App\Notifications\AccessRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class AccessRequestController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $page = $user->page;
        $accessRequests = null;
        if ($page) {
            $accessRequests = AccessRequest::where('page_id', $page->id)
                ->latest()->get();
        }
        return response()->json([
            'status' => 'success',
            'data' => $accessRequests
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'page_id' => 'required',
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'sections' => 'required|array',
            ]);

            AccessRequest::create([
                'page_id' => $validated['page_id'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'sections' => json_encode($validated['sections'])
            ]);

            return response()->json(['message' => 'Access request submitted successfully.'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()]);
        }
    }

    public function updateStatus(Request $request)
    {
        $id = $request->id;
        $status = $request->action;

        // Find the contribution request by ID
        $accessRequest = AccessRequest::findOrFail($id);
        $hours = (int) ConfigHelper::getConfig('conf_edit_page_expiration_time') ?? 24 ;
        $expiry_time =  now()->addHours($hours);
        // Update the status to 'accepted' or declined (based on the action)
        $accessRequest->update(['status' => $status]);

        // Check if the request is accepted
        if ($status === 1) {
            $data = [
                'page_id' => $accessRequest->page_id,
                'sections' => json_decode($accessRequest->sections),
                'email' => $accessRequest->email,
                'token' => Str::random(40),
                'expires_at' => $expiry_time,
                'access_request_id' => $accessRequest->id
            ];
            $encryptedData = Crypt::encryptString(json_encode($data));
            $editUrl = URL::to(env('FRONTEND_URL') . '/memory/edit?data=' . urlencode($encryptedData));
            // Save the token in the database (or generate it dynamically based on user data)
            $accessRequest->update(['access_link' => $editUrl, 'expires_at' => now()->addHours(24), 'access_token' => urlencode($encryptedData)]);
            // Create a unique URL for editing (include the token and any relevant data in the URL)

            // Send the email to the user with the unique link
            $template = Template::find(Template::EDIT_PAGE_ACCCESS_EMAIL);
            Mail::to($accessRequest->email)->send(new MailAccessRequest($accessRequest , $editUrl , $expiry_time , $template));

            return response()->json([
                'success' => true,
                'message' => 'Access request updated successfully. Email has been sent.',
            ], 200);
        }

        // Return a JSON response
        return response()->json([
            'success' => true,
            'message' => 'Access request updated successfully.',
        ], 200);
    }

    public function verifyData(Request $request)
    {
        try {
            // Get the encrypted data from the POST body
            $encryptedData = $request->input('data');
            // Decrypt the data
            $decrypted = Crypt::decryptString($encryptedData);

            // Convert the decrypted data to an array
            $data = json_decode($decrypted, true);
            // Validate token expiration and other logic
            if ($data['expires_at'] < now()) {
                return response()->json([
                    'success' => false,
                    'message' => 'The link has expired.',
                ], 400);
            }

            // Process the sections and send response
            $sections = $data['sections'];
            $submittedData = Submission::where('access_request_id', $data['access_request_id'])->first();
            return response()->json([
                'success' => true,
                'sections' => $sections,
                'submitted_data' => $submittedData ?? null
            ], 200);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to decrypt data.',
            ], 400);
        }
    }


    // Visitor: Access the requested module
    public function submitUserChanges(Request $request)
    {

        $data = $request->validate([
            'quote' => 'nullable|string',
            'obituary' => 'nullable|string',
            'timeline' => 'nullable',
            'gallery' => 'nullable',
            'favourites' => 'nullable',
            'favourites.favourites' => 'nullable',
            'favourites.tagline' => 'nullable|string',
            'encryptedData' => 'required|string',
        ]);

        // Decrypt and parse the encrypted data
        try {
            $decrypted = Crypt::decryptString($data['encryptedData']);
            $decryptedData = json_decode($decrypted, true);

            if (!isset($decryptedData['access_request_id'])) {
                return response()->json(['status' => false, 'message' => 'Invalid encrypted data'], 422);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Failed to decrypt data'], 422);
        }

        // Prepare favourites data
        $favourites = [
            'favourites' => $data['favourites']['favourites'] ?? [],
            'tagline' => $data['favourites']['tagline'] ?? null,
        ];

        // Save submission data
        try {
            $submission = Submission::create([
                'access_request_id' => $decryptedData['access_request_id'],
                'quote' => $data['quote'],
                'obituary' => $data['obituary'],
                'timeline' => json_encode($data['timeline'] ?? []),
                'gallery' => json_encode($data['gallery'] ?? []),
                'favourites' => json_encode($favourites), // Store favourites as JSON
                'status' => 0, // Set initial status to "Pending"
            ]);

            // Update access request status
            $accessRequest = AccessRequest::find($decryptedData['access_request_id']);
            if ($accessRequest) {
                $accessRequest->update(['status' => AppConstant::SUBMITTED]);
            }

            return response()->json(['status' => true, 'message' => 'Submission saved successfully'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::info('Error while saving data', [
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
                'trace' => $e->getTraceAsString(),
            ]);
        } catch (\Throwable $th) {
            Log::info('Error while saving data', [
                'message' => $th->getMessage(),
                'trace' => $th->getTraceAsString(),
            ]);
        }
    }
    public function updateUserChanges(Request $request)
    {
        try {
            // Validate request data
            $data = $request->validate([
                'status' => 'required|integer',
                'access_request_id' => 'required|exists:access_requests,id',
            ]);

            // Retrieve the access request
            $accessRequest = AccessRequest::find($data['access_request_id']);
            $user = $request->user();
            $page = $user->page;

            if (!$accessRequest) {
                return response()->json(['status' => false, 'message' => 'Access request not found'], 404);
            }

            // Process based on the status
            if ($data['status'] === 1) { // 1 means accepted
                $submittedData = Submission::where('access_request_id', $data['access_request_id'])->get();

                if (!empty($submittedData->quote)) {
                    if ($page->personalQuote) {
                        $page->personalQuote()->update([
                            'quote' => $submittedData->quote,
                        ]);
                    }
                }

                if (!empty($submittedData->obituary)) {
                    if ($page->obituaries) {
                        $page->obituaries()->update([
                            'content' => $submittedData->obituary,
                        ]);
                    }
                }

                // if (!empty($submittedData->favourites)) {
                //     if ($page->favourites->favouriteEvents) {
                //         $page->obituaries()->update([
                //             'content' => $submittedData->obituary,
                //         ]);
                //     }
                // }

            }

            // Update the status of the access request
            $accessRequest->update([
                'status' => $data['status'] == 1
                    ? AppConstant::ACCEPTED_CHANGES
                    : AppConstant::DECLINED_CHANGES,
            ]);

            return response()->json(['status' => true, 'message' => 'Submission saved successfully'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log and return validation error response
            Log::error('Validation error while saving data', [
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ]);

            return response()->json(['status' => false, 'message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Throwable $th) {
            // Log and return a generic error response
            Log::error('Error while saving data', [
                'message' => $th->getMessage(),
                'trace' => $th->getTraceAsString(),
            ]);

            return response()->json(['status' => false, 'message' => 'Failed to process request'], 500);
        }
    }
}
