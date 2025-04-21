<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Mail\UserContributionRequest;
use App\Mail\UserGalleryUploadRequest;
use App\Mail\VisitorContributionRequest;
use App\Models\GalleryFolder;
use App\Models\GalleryImage;
use App\Models\GalleryImageRequest;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryUploadRequestController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        $pendingUploads = GalleryImageRequest::where('user_id', $user->id)
            ->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $pendingUploads
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page_id' => 'required',
            'user_id' => 'required',
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'folder' => 'nullable|string|max:255',
            'images.*' => 'required|mimes:jpeg,png,jpg,heic|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $imagePaths = [];

        // Store images and save file paths
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store("gallery-uploads", 'public');
                $imagePaths[] = url(Storage::url($path));
            }
        }

        $pendingUpload = GalleryImageRequest::create([
            'page_id' => $request->page_id,
            'user_id' => $request->user_id,
            'name' => $request->fullName,
            'email' => $request->email,
            'folder' => $request->folder,
            'images' => json_encode($imagePaths), // Store paths as JSON
        ]);

        // Send Emails to user and visitor
        $userTemplate = Template::where('name', Template::GALLERY_CONTRIBUTION_REQUEST_EMAIL)->first();
        $visitorTemplate = Template::where('name', Template::REQUEST_SUBMISSION_CONFIRMATION_EMAIL)->first();
        Mail::to($pendingUpload->user->email)->send(new UserGalleryUploadRequest($pendingUpload, $userTemplate));
        Mail::to($pendingUpload->email)->send(new VisitorContributionRequest($pendingUpload, $visitorTemplate));
        return response()->json([
            'message' => 'Images uploaded successfully, waiting for approval.',
            'pending_upload_id' => $pendingUpload->id,
        ], 200);
    }

    public function updateStatus(Request $request)
    {
        try {
            $id = $request->id;
            $status = $request->status;

            if ($status == AppConstant::ACCEPTED) {
                $this->approveUpload($id);
                return response()->json(['message' => 'Upload approved successfully.'], 200);
            } else {
                $this->declineUpload($id);
                return response()->json(['message' => 'Upload declined successfully.'], 200);
            }
        } catch (\Exception $e) {
            Log::error('Error updating status: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while updating status.'], 500);
        }
    }

    public function approveUpload($id)
    {
        try {
            $pendingUpload = GalleryImageRequest::find($id);

            if (!$pendingUpload) {
                return response()->json(['error' => 'Pending upload not found'], 404);
            }

            // Ensure the folder exists
            $folder = GalleryFolder::firstOrCreate(
                ['gallery_id' => $pendingUpload->page->gallery->id, 'name' => $pendingUpload->folder]
            );

            // Convert JSON images back to an array
            $imagePaths = json_decode($pendingUpload->images, true) ?? [];

            if (!is_array($imagePaths)) {
                return response()->json(['error' => 'Invalid image data'], 400);
            }

            // Move images to the actual table
            foreach ($imagePaths as $imagePath) {
                GalleryImage::create([
                    'gallery_id' => $pendingUpload->page->gallery->id,
                    'folder_id' => $folder->id,
                    'image_path' => $imagePath,
                ]);
            }

            // Update status in the temporary table
            $pendingUpload->status = AppConstant::ACCEPTED;
            $pendingUpload->save();

            return response()->json(['message' => 'Images approved and moved successfully.'], 200);
        } catch (\Exception $e) {
            Log::error('Error approving upload: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while approving upload.'], 500);
        }
    }

    public function declineUpload($id)
    {
        try {
            $pendingUpload = GalleryImageRequest::find($id);

            if (!$pendingUpload) {
                return response()->json(['error' => 'Pending upload not found'], 404);
            }

            // Convert JSON images back to an array
            $imagePaths = json_decode($pendingUpload->images, true);

            // Delete images from storage
            foreach ($imagePaths as $imagePath) {
                $relativePath = str_replace(url('/storage/'), 'public/', $imagePath); // Convert to relative path
                if (Storage::exists($relativePath)) {
                    Storage::delete($relativePath);
                }
            }

            // Update status in the temporary table
            $pendingUpload->status = AppConstant::DECLINED;
            $pendingUpload->save();

            return response()->json(['message' => 'Upload request declined and images removed.'], 200);
        } catch (\Exception $e) {
            Log::error('Error declining upload: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while declining upload.'], 500);
        }
    }
}
