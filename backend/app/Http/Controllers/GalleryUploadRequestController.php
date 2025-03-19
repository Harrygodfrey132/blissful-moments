<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Models\GalleryFolder;
use App\Models\GalleryImage;
use App\Models\GalleryImageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GalleryUploadRequestController extends Controller
{
    public function index(Request $request){

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
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'folder' => 'nullable|string|max:255',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
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
            'name' => $request->fullName,
            'email' => $request->email,
            'folder' => $request->name,
            'images' => json_encode($imagePaths), // Store paths as JSON
        ]);

        return response()->json([
            'message' => 'Images uploaded successfully, waiting for approval.',
            'pending_upload_id' => $pendingUpload->id,
        ], 200);
    }


    public function approveUpload($id)
    {
        $pendingUpload = GalleryImageRequest::find($id);

        if (!$pendingUpload) {
            return response()->json(['error' => 'Pending upload not found'], 404);
        }

        // Ensure the folder exists
        $folder = GalleryFolder::where('page_id', $pendingUpload->page_id)->firstOrCreate(['name' => $pendingUpload->folder]);

        // Convert JSON images back to an array
        $imagePaths = json_decode($pendingUpload->images, true);

        // Move images to the actual table
        foreach ($imagePaths as $imagePath) {
            GalleryImage::create([
                'gallery_id' => $pendingUpload->page->gallery->id,
                'folder_id' => $folder->id,
                'image_path' => $imagePath,
            ]);
        }

        // Delete the request from temporary table
        $pendingUpload->status = AppConstant::ACCEPTED;
        $pendingUpload->save();

        return response()->json(['message' => 'Images approved and moved successfully.'], 200);
    }

    public function declineUpload($id)
    {
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

        // Delete the request from database
        $pendingUpload->status = AppConstant::DECLINED;
        $pendingUpload->save();

        return response()->json(['message' => 'Upload request declined and images removed.'], 200);
    }
}
