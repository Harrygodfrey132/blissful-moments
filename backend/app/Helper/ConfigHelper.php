<?php

namespace App\Helper;

use App\Models\Configuration;

class ConfigHelper
{
    public static function getConfig(string $key)
    {
        $sanitizedKey = strtoupper($key);
        $configuration = Configuration::where('conf_key', $sanitizedKey)->first();
        return $configuration->conf_value ?? '';
    }
}
