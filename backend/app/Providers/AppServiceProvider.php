<?php

namespace App\Providers;

use App\Events\EmailSent;
use App\Helper\ConfigHelper;
use App\Listeners\LogEmailToDatabase;
use Illuminate\Support\Facades\Auth;
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
