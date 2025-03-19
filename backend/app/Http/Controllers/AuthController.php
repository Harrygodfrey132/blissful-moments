<?php

namespace App\Http\Controllers;

use App\Events\EmailSent;
use App\Helper\ConfigHelper;
use App\Mail\AccountVerificationEmail;
use App\Mail\PasswordResetEmail;
use App\Mail\WelcomeEmail;
use App\Models\OTP;
use App\Models\Template;
use App\Models\User;
use App\Models\UserDetail;
use App\Notifications\AccountVerificationNotification;
use App\Notifications\WelcomeEmailNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

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
            $otp = $this->generateOTP($user->email, $user->id);
            $this->sendEmailNotifications($user, $otp);
            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'isVerified' => $user->is_verified,
                'token' => $token->plainTextToken,
            ], 200);
        } catch (\Throwable $th) {
            Log::info('Error sending email notifications', ['error' => $th]);
            return response()->json([
                'message' => 'Something went wrong! Unable to register',
            ], 500);
        }
    }

    private function generateOTP($email,  $userId = null)
    {
        // Generate a random 4-digit OTP
        $otpValue = random_int(1000, 9999);

        // Define OTP expiration (e.g., 10 minutes from now)
        $expiry_time = (int) ConfigHelper::getConfig('conf_otp_expiration_time');

        // If the value is null, 0, or any falsy value, default to 10
        if (!$expiry_time) {
            $expiry_time = 10;
        }

        $expiresAt = now()->addMinutes($expiry_time);

        // Store the OTP in the database
        OTP::create([
            'user_id' => $userId,
            'email' => $email,
            // 'otp' => $otpValue,
            'otp' => 1111,
            'expires_at' => $expiresAt,
        ]);

        return $otpValue;
    }

    private function sendEmailNotifications($user, $otp, $sendWelcomeEmail = true)
    {
        try {
            if ($sendWelcomeEmail) {
                $welcomeTemplate = Template::where('name', Template::WELCOME_EMAIL)->first();
                Mail::to($user->email)->send(new WelcomeEmail($user, $welcomeTemplate));
            }
            $accountVerificationEmail = Template::where('name', Template::ACCOUNT_VERIFICATION_EMAIL)->first();
            Mail::to($user->email)->send(new AccountVerificationEmail($user, $accountVerificationEmail, $otp));
        } catch (\Throwable $th) {
            Log::error('Error sending email notifications', ['error' => $th]);
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

    public function validateOTP(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);

        $otp = OTP::where('email', $validated['email'])
            ->where('otp', $validated['code'])
            ->with('user')
            ->first();

        if (!$otp) {
            return response()->json(['status' => false, 'message' => 'Invalid OTP'], 401);
        }

        $expiresAt = Carbon::parse($otp->expires_at);
        $currentTime = now();


        if ($expiresAt->lt($currentTime)) {
            $otp->delete();
            return response()->json(['status' => false, 'message' => 'OTP has expired.'], 401);
        }

        // Mark OTP as used and delete it
        $otp->user->email_verified_at = now();
        $otp->user->save();
        $otp->delete();

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
            $user = User::with(['userDetails', 'page', 'orderDetails'])->where('email', $email)->first();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $isVerified = $user->email_verified_at !== null;
            return response()->json(['user' => $user, 'isVerified' => $isVerified]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid or tampered data'], 400);
        }
    }

    public function sendPasswordResetOTP(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email:rfc,dns|exists:users,email',

        ]);
        $user = User::where('email', $validated['email'])->firstOrFail();
        $otp = $this->generateOTP($validated['email'], $user->id);

        $emailTemplate = Template::where('name', Template::PASSWORD_RESET_EMAIL)->first();

        try {
            Mail::to($user->email)->send(new PasswordResetEmail($user, $emailTemplate, $otp));
        } catch (\Throwable $th) {
            Log::info("Erro while sending Email ", $th);
        }
        return response()->json([
            'message' => 'OTP sent successfully to the registered email address.',
            'email' => Crypt::encrypt($user->email)
        ], 200);
    }

    public function validateResetPasswordOTP(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required',
            'code' => 'required'
        ]);

        $email = Crypt::decrypt($validated['token']);
        $otp = OTP::where('email', $email)
            ->where('otp', $validated['code'])
            ->first();

        if (!$otp) {
            return response()->json(['status' => false, 'message' => 'Invalid OTP'], 401);
        }

        if (!$otp->isValid()) {
            return response()->json(['status' => false, 'message' => 'OTP is expired or already used.'], 401);

            return ['status' => false, 'message' => 'OTP is expired or already used.'];
        }

        // Mark OTP as used
        $otp->update(['is_used' => true]);
        $otp->user->save();
        return response()->json([
            'status' => true,
            'message' => 'OTP verified successfully.',
            'token' => $validated['token']
        ], 200);
    }

    public function validatePasswordResetToken(Request $request)
    {
        $validated = $request->validate(['token' => 'required']);
        $email = Crypt::decrypt($validated['token']);
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json(['status' => false, 'message' => 'Invalid Token'], 401);
        }
        return response()->json([
            'status' => true,
            'message' => 'TOken Validated.',
        ], 200);
    }

    public function updateNewPassword(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            $email = Crypt::decrypt($validated['token']);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid or tampered token.',
            ], 400);
        }

        // Find the user by email
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ], 404);
        }

        // Update the user's password
        $user->password = Hash::make($validated['password']);

        if (!$user->save()) {
            return response()->json([
                'status' => false,
                'message' => 'Unable to update password.',
            ], 500);
        }

        // Respond with success
        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully.',
        ], 200);
    }

    public function resendOTP(Request $request)
    {
        try {
            // Validate request input
            $request->validate([
                'email' => 'required|email|exists:users,email',
            ]);

            $user = User::where('email', $request->email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            OTP::where('user_id', $user->id)->delete();
            $otpValue = $this->generateOTP($user->email , $user->id);
            $this->sendEmailNotifications($user, $otpValue, false);
            return response()->json([
                'message' => 'Code sent successfully',
                'user' => $user,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong while resending OTP.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
