<?php

namespace App\Http\Controllers;

use App\Helper\ConfigHelper;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ConfigurationController extends Controller
{
    public function index()
    {
        return view('admin.configuration.index');
    }

    public function emailSettings()
    {
        return view('admin.configuration.email-setting');
    }

    public function smtpSettings()
    {
        return view('admin.configuration.smtp');
    }

    public function thirdPartySettings()
    {
        return view('admin.configuration.third-party-settings');
    }

    public function generalSettings()
    {
        return view('admin.configuration.general-settings');
    }


    public function store(Request $request)
    {
        try {
            $data = $request->all();

            foreach ($data as $key => $value) {
                if (strpos($key, 'conf_') === 0) {
                    // Update or create the configuration record
                    Configuration::updateOrCreate(
                        ['conf_key' => $key],
                        ['conf_value' => $value]
                    );

                    // Update cache for this specific configuration key
                    $sanitizedKey = strtoupper($key);
                    Cache::put("config_{$sanitizedKey}", $value);
                }
            }

            return back()->with('success', 'Record updated successfully!');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong. Unable to update record!');
        }
    }

    /**
     * FrontEnd Data
     */

    public function fetchReCaptchaKey()
    {
        $site_key = ConfigHelper::getConfig('conf_google_captcha_site_key');

        return response([
            'site_key' => $site_key,
        ], 200);
    }
}
