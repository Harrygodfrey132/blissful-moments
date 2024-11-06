<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::whereNot('id', Auth::id())->get();
        return view('admin.users.index', compact('users'));
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
