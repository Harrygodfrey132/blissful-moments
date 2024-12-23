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

        // Start transaction to ensure consistency
        DB::beginTransaction();

        try {
            $uploadedImages = collect($request->file('images'))->map(function ($image) use ($validated) {
                // Generate unique file name
                $fileName = uniqid() . '_' . time() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('gallery', $fileName, 'public');
                $fileUrl = Storage::url($path);

                // Save image record in database
                return GalleryImage::create([
                    'gallery_id' => $validated['gallery_id'],
                    'folder_id' => $validated['folder_id'] ?? null, // Optional folder ID
                    'image_path' => $fileUrl,
                    'caption' => null,
                ]);
            });

            DB::commit(); // Commit transaction if everything is successful

            // Return response
            $page = $request->user()->page;

            return response()->json([
                'success' => true,
                'message' => 'Images uploaded successfully.',
                'page_data' => $page->refresh(),
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction on error
            return response()->json([
                'success' => false,
                'message' => 'Error uploading images: ' . $e->getMessage(),
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
            ['name' => $validated['name'], 'gallery_id' => $validated['gallery_id']]
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
        $page = $user->page;
        $image = GalleryImage::findOrFail($id);
        $image->update(['folder_id' => $request->folder_id]);
        return response()->json(['message' => 'Image assigned to folder', 'page_data' => $page->refresh()]);
    }

    public function unassignedImages($id)
    {
        $images = GalleryImage::where('gallery_id', $id)->whereNull('folder_id')->get();
        return response()->json($images);
    }

    public function folders()
    {
        return response()->json("here");
    }
}
