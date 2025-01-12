<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        try {
            $data = $request->all();
            foreach ($data as $key => $value) {
                if (strpos($key, 'conf_') === 0) {
                    Configuration::updateOrCreate(
                        ['conf_key' => $key],
                        ['conf_value' => $value]
                    );
                }
            }
            return back()->with('success', 'Record updated successfully!');
        } catch (\Throwable $th) {
            return back()->with('error', 'Something went wrong. Unable to update record!');
        }
    }
}
