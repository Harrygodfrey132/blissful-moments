<?php

use App\Console\Commands\SendSubscriptionReminder;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command(SendSubscriptionReminder::class)->dailyAt('00:00');
Schedule::command('telescope:prune')->daily();