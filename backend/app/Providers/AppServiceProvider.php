<?php

namespace App\Providers;

use App\Events\EmailSent;
use App\Helper\ConfigHelper;
use App\Listeners\LogEmailToDatabase;
use App\Models\Configuration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ConfigHelper::class, function ($app) {
            return new ConfigHelper();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        require_once app_path('Helper/helpers.php');


        // Fetch SMTP settings from the database
        $smtpSettings = Configuration::whereIn('conf_key', [
            'mail_driver',
            'conf_smtp_host',
            'conf_smtp_port',
            'conf_smtp_username',
            'conf_smtp_password',
            'conf_smtp_encryption',
            'mail_from_address',
            'mail_from_name'
        ])->pluck('conf_value', 'conf_key');

        // Override mail config dynamically
        Config::set('mail.mailers.smtp.host', $smtpSettings['conf_smtp_host'] ?? env('MAIL_HOST'));
        Config::set('mail.mailers.smtp.port', $smtpSettings['conf_smtp_port'] ?? env('MAIL_PORT'));
        Config::set('mail.mailers.smtp.username', $smtpSettings['conf_smtp_username'] ?? env('MAIL_USERNAME'));
        Config::set('mail.mailers.smtp.password', $smtpSettings['conf_smtp_password'] ?? env('MAIL_PASSWORD'));
        Config::set('mail.mailers.smtp.encryption', $smtpSettings['conf_smtp_encryption'] ?? env('MAIL_ENCRYPTION'));
        Config::set('mail.from.address', $smtpSettings['mail_from_address'] ?? env('MAIL_FROM_ADDRESS'));
        Config::set('mail.from.name', $smtpSettings['mail_from_name'] ?? env('MAIL_FROM_NAME'));



        if (!app()->runningInConsole()) {
            View::composer('*', function ($view) {
                $view->with('authenticatedUser', Auth::user());
            });
        }

        Event::listen(
            EmailSent::class,
            LogEmailToDatabase::class
        );
    }
}
