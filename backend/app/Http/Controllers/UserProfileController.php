<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Validate the request data
        $data = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'country' => 'required|string|max:255',
            'streetAddress' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'region' => 'nullable|string|max:255',
            'postalCode' => 'nullable|string|max:255',
        ]);

        // Concatenate first and last names to set the 'name' field
        $name = $data['firstName'] . ' ' . $data['lastName'];

        try {
            // Update the user information
            $user->update([
                'name' => $name,
                'email' => $data['email'],
            ]);

            // Access the related userDetail
            $userDetail = $user->userDetails; // Fetch the related UserDetail model

            // Update the userDetails if it exists
            if ($userDetail) {
                $userDetail->update([
                    'first_name' => $data['firstName'],
                    'last_name' => $data['lastName'],
                    'country' => $data['country'],
                    'street_address' => $data['streetAddress'] ?? null,
                    'city' => $data['city'] ?? null,
                    'region' => $data['region'] ?? null,
                    'postal_code' => $data['postalCode'] ?? null,
                ]);
            } else {
                // If no userDetail exists, create one
                $user->userDetails()->create([
                    'first_name' => $data['firstName'],
                    'last_name' => $data['lastName'],
                    'country' => $data['country'],
                    'street_address' => $data['streetAddress'] ?? null,
                    'city' => $data['city'] ?? null,
                    'region' => $data['region'] ?? null,
                    'postal_code' => $data['postalCode'] ?? null,
                ]);
            }

            return response()->json(['message' => 'Profile updated successfully.', 'user_data' => $user]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update profile. Please try again.'], 500);
        }
    }
}
