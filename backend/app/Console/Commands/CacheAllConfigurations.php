<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use App\Models\Configuration;

class CacheAllConfigurations extends Command
{
    protected $signature = 'config:cache-all';
    protected $description = 'Cache all configurations from the database';

    public function handle()
    {
        $configurations = Configuration::all();
        foreach ($configurations as $config) {
            Cache::forever("config_{$config->conf_key}", $config->conf_value);
        }
        $this->info('All configurations have been cached successfully.');
    }
}
