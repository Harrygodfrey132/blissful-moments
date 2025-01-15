<?php

namespace App\Helper;

use Illuminate\Support\Facades\Cache;
use App\Models\Configuration;

class ConfigHelper
{
    /**
     * Get the configuration value for a given key.
     *
     * @param string $key The configuration key.
     * @return mixed The configuration value or an empty string if not found.
     */
    public static function getConfig(string $key)
    {
        $sanitizedKey = strtoupper($key);
        // Cache the configuration value to avoid repeated DB queries
        return Cache::rememberForever("config_{$sanitizedKey}", function () use ($sanitizedKey) {
            $configuration = Configuration::where('conf_key', $sanitizedKey)->first();
            dd($configuration);
            return $configuration->conf_value ?? '';
        });
    }

    /**
     * Clear the cached configuration for a specific key.
     *
     * @param string $key The configuration key.
     * @return void
     */
    public static function clearConfigCache(string $key)
    {
        $sanitizedKey = strtoupper($key);
        Cache::forget("config_{$sanitizedKey}");
    }
}
