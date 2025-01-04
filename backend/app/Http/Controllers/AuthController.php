<?php

namespace App\Http\Controllers;

use App\Models\OTP;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

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

            $name = $data['firstName'] . ' ' . $data['lastName'];

            $user = User::create([
                'name' => $name,
                'email' => $data['email'],
                'password' => $data['password'],
                'role_id' => User::USER
            ]);

            UserDetail::create([
                'user_id' => $user->id,
                'first_name' => $data['firstName'],
                'last_name' => $data['lastName']
            ]);

            // Generate a token
            $token = $user->createToken($user->name);

            //  Generate and send OTP to registered email
            $this->generateAndSendOTP($user->email, $user->id);

            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'isVerified' => $user->is_verified,
                'token' => $token->plainTextToken,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong! Unable to register',
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $user = User::where('email', $request->email)->first();
                if (!$user->status) {
                    return response()->json([
                        'message' => 'Your Account is not active. Please contact administrator.',
                    ], 500);
                }
                $token = $user->createToken($user->email)->plainTextToken;
                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => $user,
                    'isVerified' => $user->is_verified
                ], 200);
            } else {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    private function generateAndSendOTP($email, $userId = null)
    {
        // Generate a random 4-digit OTP
        $otpValue = random_int(1000, 9999);

        // Define OTP expiration (e.g., 5 minutes from now)
        $expiresAt = now()->addMinutes(5);

        // Store the OTP in the database
        $otp = OTP::create([
            'user_id' => $userId,
            'email' => $email,
            // 'otp' => $otpValue,
            'otp' => "1111",
            'expires_at' => $expiresAt,
        ]);

        // Send the OTP via email
        // Mail::raw("Your OTP is: $otpValue", function ($message) use ($email) {
        //     $message->to($email)
        //         ->subject('Your OTP Verification Code');
        // });

        return $otp;
    }

    public function validateOTP(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'code' => 'required'
        ]);

        $otp = OTP::where('email', $validated['email'])
            ->where('otp', $validated['code'])
            ->first();

        if (!$otp) {
            return response()->json(['status' => false, 'message' => 'Invalid OTP'], 401);
        }

        // if (!$otp->isValid()) {
        //     return response()->json(['status' => false, 'message' => 'OTP is expired or already used.'], 401);

        //     return ['status' => false, 'message' => 'OTP is expired or already used.'];
        // }

        // Mark OTP as used
        $otp->update(['is_used' => true]);
        $otp->user->email_verified_at = now();
        $otp->user->save();
        return response()->json([
            'status' => true,
            'message' => 'OTP verified successfully.',
            'isVerified' => $otp->user->is_verified
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function getUser(Request $request)
    {
        try {
            $email = $request->input('email');
            $user = User::with('userDetails')->where('email', $email)->first();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $isVerified = $user->email_verified_at !== null;
            return response()->json(['user' => $user, 'isVerified' => $isVerified]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid or tampered data'], 400);
        }
    }
}
