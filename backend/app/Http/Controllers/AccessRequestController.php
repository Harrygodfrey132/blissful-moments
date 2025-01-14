<?php

namespace App\Http\Controllers;

use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
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

        // Update the status to 'accepted' or declined (based on the action)
        $accessRequest->update(['status' => $status]);

        // Check if the request is accepted
        if ($status === 1) {
            $data = [
                'page_id' => $accessRequest->page_id,
                'sections' => json_decode($accessRequest->sections), // sections stored as JSON array
                'email' => $accessRequest->email,
                'token' => Str::random(40),
                'expires_at' => now()->addHours(24)
            ];
            $encryptedData = Crypt::encryptString(json_encode($data));
            $editUrl = URL::to(env('FRONTEND_URL') . '/memory/edit?data=' . urlencode($encryptedData));
            // Save the token in the database (or generate it dynamically based on user data)
            $accessRequest->update(['access_link' => $editUrl, 'expires_at' => now()->addHours(24)]);

            // Create a unique URL for editing (include the token and any relevant data in the URL)

            // Send the email to the user with the unique link
            // Mail::to($accessRequest->user->email)->send(new AccessRequestMail($editUrl));

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

            return response()->json([
                'success' => true,
                'sections' => $sections, // These sections will be used to render the components
            ], 200);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to decrypt data.',
            ], 400);
        }
    }


    // Visitor: Access the requested module
    public function access($accessLink)
    {
        $accessRequest = AccessRequest::where('access_link', $accessLink)
            ->where('status', 'approved')
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$accessRequest) {
            return response()->json(['message' => 'Invalid or expired access link.'], 403);
        }

        return response()->json(['message' => 'Access granted.', 'section' => $accessRequest->section]);
    }
}
