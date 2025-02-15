<?php

use App\Http\Controllers\CmsController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailLogController;
use App\Http\Controllers\GDPRrequestController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserDetailController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('login');
});

Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::get('/profile/password', [ProfileController::class, 'passwordEdit'])->name('profile.password.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::prefix('users')->name('users.')->group(function () {
            Route::get('/listing', [UserController::class, 'index'])->name('index');
            Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('/{user}/update', [UserController::class, 'update'])->name('update');
            Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('destroy');
            Route::post('/{user}/status', [UserController::class, 'updateStatus'])->name('update.status');
            Route::post('/multi-delete', [UserController::class, 'multiDelete'])->name('multiDelete');
            Route::get('/{user}/page/password/edit', [UserController::class, 'editPagePassword'])->name('page.password.edit');
            Route::post('/{user}/page/password/update', [UserController::class, 'updateUserPagePassword'])->name('page.password.reset');
            Route::get('/{user}/page/view', [UserController::class, 'showUserPage'])->name('page.view');
        });

        Route::prefix('plans')->name('plans.')->group(function () {
            Route::get('/listing', [PlanController::class, 'index'])->name('index');
            Route::get('/create', [PlanController::class, 'create'])->name('create');
            Route::post('/store', [PlanController::class, 'store'])->name('store');
            Route::get('/{plan}/edit', [PlanController::class, 'edit'])->name('edit');
            Route::put('/{plan}/update', [PlanController::class, 'update'])->name('update');
            Route::delete('/{plan}/delete', [PlanController::class, 'delete'])->name('destroy');
            Route::post('/{plan}/status', [PlanController::class, 'updateStatus'])->name('update.status');
            Route::post('/{user}/toggle/suspend/status', [PlanController::class, 'toggleSuspend'])->name('update.toggleSuspend');
        });

        Route::prefix('gdpr')->name('gdpr.')->group(function () {
            Route::get('/requests/listing', [GDPRrequestController::class, 'index'])->name('index');
            Route::get('/requests/{gdpr}/show', [GDPRrequestController::class, 'show'])->name('show');
            Route::get('/requests/{gdpr}/edit', [GDPRrequestController::class, 'edit'])->name('edit');
            Route::post('/requests/{gdpr}/update', [GDPRrequestController::class, 'update'])->name('update');
        });

        Route::prefix('configuration')->name('configuration.')->group(function () {
            Route::get('/system-configuration', [ConfigurationController::class, 'index'])->name('index');
            Route::get('/email-settings', [ConfigurationController::class, 'emailSettings'])->name('email.settings');
            Route::get('/smtp-settings', [ConfigurationController::class, 'smtpSettings'])->name('smtp.settings');
            Route::get('/general-settings', [ConfigurationController::class, 'generalSettings'])->name('general.settings');
            Route::get('/plugin-settings', [ConfigurationController::class, 'thirdPartySettings'])->name('plugins.settings');
            Route::get('/social-media-settings', [ConfigurationController::class, 'socialmediaSettings'])->name('socialmedia.settings');
            Route::post('/store', [ConfigurationController::class, 'store'])->name('store');
        });

        Route::prefix('orders')->name('orders.')->group(function () {
            Route::get('/listing', [OrderController::class, 'adminOrderListing'])->name('index');
        });

        Route::prefix('cms')->name('cms.')->group(function () {
            Route::controller(CmsController::class)->group(function () {
                Route::get('/manage-cms', [CmsController::class, 'index'])->name('index');
            });
            Route::get('/email-templates', [TemplateController::class, 'email_templates'])->name('emails.index');
            Route::get('/email-templates/{template}/edit', [TemplateController::class, 'edit'])->name('emails.edit');
            Route::get('/email-templates/{template}/update', [TemplateController::class, 'update'])->name('emails.update');
        });

        Route::prefix('email-logs')->group(function () {
            Route::get('/listing', [EmailLogController::class, 'index'])->name('email.logs.index');
            Route::get('/view/email/{id}', [EmailLogController::class, 'show'])->name('email.logs.show');
        });
        Route::prefix('QrCode')->name('code.')->group(function () {
            Route::get('/generate', [QRCodeController::class, 'generateQRCode'])->name('generate');
        });

        Route::post('/user/update-details', [UserDetailController::class, 'update']);
    });
});
Route::get('/orderdetails', function () {
    return view('pages/order-details');
});

Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook']);

require __DIR__ . '/auth.php';
