<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
public function index(Request $request)
    {
        $search = $request->input('search', '');
        // Fetch users based on the search query
        $users = User::whereNot('id', Auth::id())
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            })
            ->paginate(5);

        if ($request->ajax()) {
            // Return only the table rows
            return view('admin.users.partials.user-table', compact('users', 'search'));
        }

        // Default response when not an AJAX request
        return view('admin.users.index', compact('users', 'search'));
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
}
