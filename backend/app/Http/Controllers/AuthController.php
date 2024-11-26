<?php

namespace App\Http\Controllers;

use App\Models\OTP;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

            // Generate a token
            $token = $user->createToken($user->name);

            //  Generate and send OTP to registered email
            $this->generateAndSendOTP($user->email, $user->id);

            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'isValidated' => false,
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
                    'user' => $user
                ], 200);
            } else {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    public function verifyOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|digits:6',
        ]);

        $result = $this->validateOTP($request->email, $request->otp);

        return response()->json($result);
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
            'otp' => $otpValue,
            'expires_at' => $expiresAt,
        ]);

        // Send the OTP via email
        // Mail::raw("Your OTP is: $otpValue", function ($message) use ($email) {
        //     $message->to($email)
        //         ->subject('Your OTP Verification Code');
        // });

        return $otp;
    }

    private function validateOTP($email, $otpInput)
    {
        $otp = OTP::where('email', $email)
            ->where('otp', $otpInput)
            ->first();

        if (!$otp) {
            return ['status' => false, 'message' => 'Invalid OTP.'];
        }

        if (!$otp->isValid()) {
            return ['status' => false, 'message' => 'OTP is expired or already used.'];
        }

        // Mark OTP as used
        $otp->update(['is_used' => true]);

        return ['status' => true, 'message' => 'OTP verified successfully.'];
    }
}
