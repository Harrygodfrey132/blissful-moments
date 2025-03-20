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
            'conf_mail_driver',
            'conf_mail_host',
            'conf_mail_port',
            'conf_mail_username',
            'conf_mail_password',
            'conf_mail_encryption',
            'conf_mail_from_address',
            'conf_mailgun_domain',
            'conf_mail_from_name'
        ])->pluck('conf_value', 'conf_key');

        // Override mail config dynamically
        Config::set('mail.mailers.smtp.host', $smtpSettings['conf_mail_host'] ?? env('MAIL_HOST'));
        Config::set('mail.mailers.smtp.port', (int) $smtpSettings['conf_mail_port'] ?? env('MAIL_PORT'));
        Config::set('mail.mailers.smtp.username', $smtpSettings['conf_mail_username'] ?? env('MAIL_USERNAME'));
        Config::set('mail.mailers.smtp.password', $smtpSettings['conf_mail_password'] ?? env('MAIL_PASSWORD'));
        Config::set('mail.mailers.smtp.encryption', $smtpSettings['conf_mail_encryption'] ?? env('MAIL_ENCRYPTION'));
        Config::set('mail.from.address', $smtpSettings['conf_mail_from_address'] ?? env('MAIL_FROM_ADDRESS'));
        Config::set('mail.from.name', $smtpSettings['conf_mail_from_name'] ?? env('MAIL_FROM_NAME'));



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
