<?php

namespace App\Http\Controllers;

use App\Mail\UserContributionRequest;
use App\Mail\VisitorContributionRequest;
use App\Mail\VisitorRequestStatusEmail;
use App\Models\ContributionData;
use App\Models\ContributionRequest;
use App\Models\Template;
use App\Notifications\UserContributionRequestNotification;
use App\Notifications\VisitorRequestStatusNotification;
use App\Notifications\VisitorSubmissionRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContributionRequestController extends Controller
{
    // Show all pending contribution requests to the admin
    public function index(Request $request)
    {
        $user = $request->user();
        $contributionRequests = ContributionRequest::where('user_id', $user->id)
            ->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $contributionRequests
        ]);
    }


    // Show the form to create a new contribution request (for users)
    public function create()
    {
        return view('contribution_requests.create');
    }

    // Store a new contribution request in the database
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contribution_id' => 'required',
            'user_id' => 'required',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'fullName' => 'required|string|max:255',
            'email' => 'required|email',
        ]);

        // If validation fails, return a JSON response with error details
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422); // HTTP status code 422 for validation error
        }

        // Get the validated data
        $validatedData = $validator->validated();

        // Create the contribution request using $validatedData
        $contributionRequest = ContributionRequest::create([
            'contribution_id' => $validatedData['contribution_id'],
            'user_id' => $validatedData['user_id'],
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'full_name' => $validatedData['fullName'],
            'email' => $validatedData['email'],
            'status' => ContributionRequest::PENDING,
        ]);

        // Send Emails to user and visitor
        $userTemplate = Template::find(Template::CONTRIBUTION_REQUEST_EMAIL);
        $visitorTemplate = Template::find(Template::REQUEST_SUBMISSION_CONFIRMATION_EMAIL);
        Mail::to($contributionRequest->user->email)->send(new UserContributionRequest($contributionRequest, $userTemplate));
        Mail::to($contributionRequest->email)->send(new VisitorContributionRequest($contributionRequest, $visitorTemplate));

        // Return a success response with the created data
        return response()->json([
            'status' => 'success',
            'message' => 'Contribution request submitted successfully.',
            'data' => $contributionRequest
        ], 200);
    }


    // Accept a contribution request
    public function updateStatus(Request $request)
    {
        $id = $request->id;
        $status = $request->action;

        // Find the contribution request by ID
        $contributionRequest = ContributionRequest::findOrFail($id);

        // Update the status to 'accepted' or declined (based on the action)
        $contributionRequest->update(['status' => $status]);

        // Check if status is set to accepted (1)
        if ($contributionRequest->status == 1) {
            // Insert the relevant data into the ContributionData table
            ContributionData::create([
                'contribution_id' => $contributionRequest->contribution_id,
                'name' => $contributionRequest->name,
                'description' => $contributionRequest->description,
            ]);

        } else {
        }
        $template = Template::find(Template::REQUEST_STATUS_UPDATE_EMAIL);
        Mail::to($contributionRequest->email)->send(new VisitorRequestStatusEmail($contributionRequest, $template));
        // Return a JSON response
        return response()->json([
            'success' => true,
            'message' => 'Contribution request updated successfully.',
            'data' => $contributionRequest
        ], 200);
    }
}
