<?php

namespace App\Http\Controllers;

use App\Models\User;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve all filter data from the request
        $data = [
            'search' => $request->input('search', ''),
            'status' => $request->input('status', ''),
            'start_date' => $request->input('start_date', ''),
            'end_date' => $request->input('end_date', ''),
        ];

        $users = User::with('userDetails')->userSearchFilter($data)->latest()->paginate(10);

        // Return AJAX response if the request is AJAX
        if ($request->ajax()) {
            return view('admin.users.partials.user-table', compact('users', 'data'));
        }

        // Default response for non-AJAX requests
        return view('admin.users.index', compact('users', 'data'));
    }

    public function edit(User $user)
    {
        return view('admin.users.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        try {
            // Update the user with the validated data
            $user->update($validatedData);

            // Return a success response
            return response()->json([
                'success' => true,
                'message' => 'User updated successfully!'
            ]);
        } catch (\Exception $e) {
            // Catch any exception that occurs during the update
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function delete(User $user)
    {
        if (!$user->delete()) {
            return back()->with('error', 'Something went wrong! Unable to delete record');
        }
        return back()->with('success', 'Record has been removed successfully!');
    }

    public function multiDelete(Request $request)
    {
        $ids = $request->input('ids');  // Get the array of IDs

        if (empty($ids)) {
            return response()->json(['message' => 'No IDs provided'], 400);
        }
        // Decrypt the IDs
        try {
            $decryptedIds = array_map(function ($id) {
                return decrypt($id);  // Decrypt each ID in the array
            }, $ids);
        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return response()->json(['message' => 'Invalid encrypted IDs'], 400);
        }
        User::whereIn('id', $decryptedIds)->delete();
        flash()->success('Users deleted successfully!');
        return response()->json(['message' => 'Users deleted successfully']);
    }


    public function updateStatus(Request $request, User $user)
    {

        $request->validate([
            'status' => 'required|boolean',
        ]);

        try {
            $user->status = $request->status;
            $user->save();
            return response()->json(['success' => true, 'message' => 'Status updated successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to update status.'], 500);
        }
    }

    public function checkValidation(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the user has validated their email
        $isVerified = $user->email_verified_at !== null;

        return response()->json(['isVerified' => $isVerified]);
    }


    public function updatePassword(Request $request)
    {
        try {
            // Validate the input
            $request->validate([
                'current_password' => 'required',
                'new_password' => 'required|min:8', // Ensure new password meets criteria
            ]);
    
            $user = $request->user();
    
            // Check if the provided current password matches the stored password
            if (Hash::check($request->current_password, $user->password)) {
                // Update the password
                $user->update([
                    'password' => bcrypt($request->new_password) // Encrypt the new password
                ]);
    
                return response()->json([
                    'success' => true,
                    'message' => 'Password updated successfully.',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'The current password is incorrect.',
                ], 400); // Return 400 Bad Request
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the password. Please try again later.',
                'error' => $e->getMessage(), // Include error message for debugging
            ], 500); // Return 500 Internal Server Error
        }
    }
    
}
