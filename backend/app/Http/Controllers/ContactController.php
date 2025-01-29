<?php

namespace App\Http\Controllers;

use App\Helper\ConfigHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function requestDemo(Request $request)
    {
        $recaptchaToken = $request->input('recaptcha_token');

        // Verify reCAPTCHA with Google
        $googleResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret'   => ConfigHelper::getConfig('conf_google_captcha_secret_key'),
            'response' => $recaptchaToken,
        ]);

        $googleResult = $googleResponse->json();

        if (!$googleResult['success']) {
            return response()->json(['message' => 'CAPTCHA verification failed.'], 400);
        }

        // If CAPTCHA passes, process form (e.g., send email)
        // Mail::to($request->email)->send(new DemoRequestMail($request->all()));

        return response()->json(['message' => 'Demo request submitted successfully.'], 200);
    }
}
