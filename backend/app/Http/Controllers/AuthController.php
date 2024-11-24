<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:8',
                'confirmPassword' => 'required|same:password',
                'termsAndCondition' => 'required',
            ]);

            $user = User::create([
                'name' => $data['firstName'] . ' ' . $data['lastName'],
                'email' => $data['email'],
                'password' => $data['password'],
                'role_id' => User::USER
            ]);

            // Generate a token
            $token = $user->createToken($user->name);

            return response()->json([
                'message' => 'Registration successful',
                'token' => $token->plainTextToken,
            ], 200);
        } catch (\Throwable $th) {
            dump($th); die;
            return response()->json([
                'message' => 'Something went wrong! Unable to register',
            ], 500);
        }
    }
}
