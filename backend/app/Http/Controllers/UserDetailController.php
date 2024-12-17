<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserDetailController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validation for image upload
            // Add other validation rules for other fields like name, address, etc.
        ]);

        $userDetail = $request->user()->userDetail;

        if ($request->hasFile('profile_picture')) {
            $imagePath = $request->file('profile_picture')->store('profile_pictures', 'public');
            $userDetail->profile_picture = $imagePath;
        }

        $userDetail->first_name = $request->input('first_name');
        $userDetail->last_name = $request->input('last_name');
        $userDetail->email = $request->input('email');
        $userDetail->country = $request->input('country');
        $userDetail->street_address = $request->input('street_address');
        $userDetail->city = $request->input('city');
        $userDetail->region = $request->input('region');
        $userDetail->postal_code = $request->input('postal_code');

        $userDetail->save();

        return response()->json(['message' => 'Profile updated successfully!']);
    }
}
