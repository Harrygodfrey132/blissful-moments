<?php

namespace App\Http\Controllers;

use App\Models\GalleryFolder;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{

    /**
     * Save or update gallery name for the user's page.
     */
    public function saveGalleryName(Request $request)
    {
        $validated = $request->validate([
            'gallery_name' => 'required|string|max:255',
        ]);

        $page = $request->user()->page;
        $gallery = $page->gallery()->firstOrCreate([], ['gallery_name' => $validated['gallery_name']]);

        $gallery->update(['gallery_name' => $validated['gallery_name']]);

        return response()->json([
            'success' => true,
            'message' => 'Gallery name updated successfully.',
            'page_data' => $page->refresh(),
        ]);
    }

    /**
     * Upload images to the user's gallery.
     */
    public function uploadGalleryImages(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'images.*' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'gallery_id' => 'required|integer|exists:galleries,id',
            'folder_id' => 'nullable|integer|exists:gallery_folders,id',
        ]);

        // Check if files exist
        if (!$request->hasFile('images')) {
            return response()->json(['success' => false, 'message' => 'No images found in the request.'], 422);
        }

        try {
            DB::beginTransaction();

            collect($request->file('images'))->map(function ($image) use ($validated) {
                $fileName = uniqid() . '_' . time() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('public/gallery', $fileName);
                $fileUrl = url(Storage::url($path));

                return GalleryImage::create([
                    'gallery_id' => $validated['gallery_id'],
                    'folder_id' => $validated['folder_id'] ?? null,
                    'image_path' => $fileUrl,
                    'caption' => null,
                ]);
            });

            DB::commit();

            // Return response
            $page = $request->user()->page;

            return response()->json([
                'success' => true,
                'message' => 'Images uploaded successfully.',
                'page_data' => $page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error uploading images.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Save or update gallery folder for the user's page.
     */
    public function updateCreateFolderName(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'gallery_id' => 'required|exists:galleries,id',
        ]);

        $page = $request->user()->page;

        GalleryFolder::updateOrCreate(
            ['id' => $request->input('folder_id')],
            [
                'name' => $validated['name'],
                'gallery_id' => $validated['gallery_id'],
                'user_id' => $request->user()->id
            ]
        );


        return response()->json([
            'success' => true,
            'message' => 'Folder created/updated successfully.',
            'folder' => $page->refresh(),
        ]);
    }

    public function destroyFolder(Request $request, $id)
    {
        $folder = GalleryFolder::findOrFail($id);
        // Unassign images
        GalleryImage::where('folder_id', $folder->id)->update(['folder_id' => null]);
        $folder->delete();
        $page = $request->user()->page;

        return response()->json(['message' => 'Folder deleted', 'page_data' => $page]);
    }

    public function assignFolder(Request $request, $id)
    {
        $user = $request->user();

        // Validate the folder ID
        $validated = $request->validate([
            'folder_id' => 'required|integer|exists:gallery_folders,id',
        ]);

        $image = GalleryImage::where('id', $id)
            ->whereHas('gallery', function ($query) use ($user) {
                $query->where('page_id', $user->page->id);
            })
            ->firstOrFail();

        // Assign the folder
        $image->update(['folder_id' => $validated['folder_id']]);

        return response()->json([
            'message' => 'Image assigned to folder successfully.',
            'page_data' => $user->page->refresh(),
        ]);
    }


    public function unassignFolder(Request $request, $id)
    {
        $user = $request->user();

        $image = GalleryImage::where('id', $id)
            ->whereHas('gallery', function ($query) use ($user) {
                $query->where('page_id', $user->page->id);
            })
            ->firstOrFail();

        // Unassign the folder by setting `folder_id` to null
        $image->update(['folder_id' => null]);

        return response()->json([
            'message' => 'Folder unassigned successfully.',
            'page_data' => $user->page->refresh(), // Refresh the page data to reflect changes
        ]);
    }


    public function destroyImage(Request $request)
    {
        $validated = $request->validate([
            'image_id' => 'required|integer|exists:gallery_images,id',
        ]);

        try {
            // Find the image record
            $image = GalleryImage::findOrFail($validated['image_id']);

            // Delete the file from storage
            $imagePath = str_replace(url('/storage'), 'public', $image->image_path);
            if (Storage::exists($imagePath)) {
                Storage::delete($imagePath);
            }

            // Delete the image record from the database
            $image->delete();

            // Optionally refresh and return updated page data
            $page = $request->user()->page;

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully.',
                'page_data' => $page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting image.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function folders()
    {
        return response()->json("here");
    }
}
