<?php

namespace App\Http\Controllers;

use App\Events\EmailSent;
use App\Helper\ConfigHelper;
use App\Mail\AccountVerificationEmail;
use App\Mail\WelcomeEmail;
use App\Models\OTP;
use App\Models\Template;
use App\Models\User;
use App\Models\UserDetail;
use App\Notifications\AccountVerificationNotification;
use App\Notifications\WelcomeEmailNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
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
            $otp = $this->generateAndSendOTP($user->email, $user->id);
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

    private function generateAndSendOTP($email,  $userId = null)
    {
        // Generate a random 4-digit OTP
        $otpValue = random_int(1000, 9999);

        // Define OTP expiration (e.g., 5 minutes from now)
        $expiry_time = (int)(ConfigHelper::getConfig('conf_otp_expiration_time') ?? 10);
        $expiresAt = now()->addMinutes($expiry_time);

        // Store the OTP in the database
        $otp = OTP::create([
            'user_id' => $userId,
            'email' => $email,
            // 'otp' => $otpValue,
            'otp' => "1111",
            'expires_at' => $expiresAt,
        ]);

        return $otp;
    }

    private function sendEmailNotifications($user, $otp)
    {
        try {
            // Define templates and their corresponding email classes
            $templates = [
                Template::WELCOME_EMAIL => WelcomeEmail::class,
                Template::ACCOUNT_VERIFICATION_EMAIL => AccountVerificationEmail::class
            ];

            // Loop through each template and send the corresponding email
            foreach ($templates as $templateName => $emailClass) {
                // Retrieve template and validate
                $template = Template::where('name', $templateName)->firstOrFail();
                $email = new $emailClass($user, $template, $otp);

                // Get the replaced body from the content method of the Mailable class
                $replacedBody = $email->content()->with['body']; // Access the body directly from content()
    
                // Send email using the corresponding email class
                Mail::to($user->email)->send($email);
                // Send email using the corresponding email class
                // Mail::to($user->email)->send(new $emailClass($user, $template, $otp));

                // Dispatch event for the email
                event(new EmailSent(
                    $template->subject,
                    $user->name,
                    $user->email,
                    $replacedBody
                ));
            }
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
}
