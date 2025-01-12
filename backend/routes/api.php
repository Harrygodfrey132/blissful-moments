<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\ContributionRequestController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ObituaryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PersonalQuoteController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProfileController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/create-checkout-session', [PaymentController::class, 'createCheckoutSession']);
Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
Route::get('/countries', [CountryController::class, 'fetchCountries']);
Route::get('/memory/{pageName}', [PageController::class, 'show']);
Route::post('/storeUserContributionData', [ContributionRequestController::class, 'store']);
Route::post('/verify-password', [PageController::class, 'verifyPassword']);

// Authenticated Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth-related endpoints
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/user', [AuthController::class, 'getUser']);
    Route::post('/verify-email', [AuthController::class, 'validateOTP']);
    Route::post('/user/validation-status', [UserController::class, 'checkValidation']);
    Route::post('/update-profile', [UserProfileController::class, 'updateProfile']);
    Route::post('/update-password', [UserController::class, 'updatePassword'])->middleware('auth');


    // Page settings and management
    Route::prefix('page')->group(function () {
        Route::post('/settings', [PageController::class, 'storePageSettings']);
        Route::post('/personal-info', [PageController::class, 'updatePersonalInformation']);
        Route::get('/exists', [PageController::class, 'checkPage']);
        Route::get('/name-availability', [PageController::class, 'checkPageNameAvailability']);
        Route::post('/background-image', [PageController::class, 'uploadBackgroundImage']);
        Route::post('/uploadBackgroundMusic', [PageController::class, 'uploadBackgroundMusic']);
        Route::delete('/deleteBackgroundMusic', [PageController::class, 'deleteBackgroundMusic']);
    });

    // Gallery endpoints
    Route::prefix('gallery')->group(function () {
        Route::post('/name', [GalleryController::class, 'saveGalleryName']);
        Route::post('/images', [GalleryController::class, 'uploadGalleryImages']);
        Route::post('/folders/save', [GalleryController::class, 'updateCreateFolderName']);
        Route::put('/folders/rename/{id}', [GalleryController::class, 'renameFolder']);
        Route::delete('/folder/delete/{id}', [GalleryController::class, 'destroyFolder']);
        Route::patch('/images/{id}/assign-folder', [GalleryController::class, 'assignFolder']);
        Route::patch('/images/{id}/unassign-folder', [GalleryController::class, 'unassignFolder']);
        Route::get('/galleries/{id}/unassigned-images', [GalleryController::class, 'unassignedImages']);
        Route::delete('/delete/image', [GalleryController::class, 'destroyImage']);
        Route::put('/update-status', [GalleryController::class, 'updateStatus']);
    });

    // Obituary management
    Route::post('/obituary', [ObituaryController::class, 'saveObituary']);
    Route::put('/obituary/update-status', [ObituaryController::class, 'updateStatus']);

    // Timeline Event Management
    Route::post('/timeline', [TimelineController::class, 'saveTimeline']);
    Route::delete('/delete/timeline/event', [TimelineController::class, 'deleteTimeline']);

    // Personal Quote Managment
    Route::post('/quote', [PersonalQuoteController::class, 'saveQuote']);
    Route::put('/quote/update-status', [PersonalQuoteController::class, 'saveQuote']);

    // Social Media Data Management
    Route::post('/save-social-media-data', [SocialMediaController::class, 'saveSocialMediaData']);

    // Order Management
    Route::get('/orders', [OrderController::class, 'getUserOrders']);

    // Favourite Management
    Route::prefix('favourite')->group(function () {
        Route::post('/update-tagline', [FavouriteController::class, 'updateTagline']);
        Route::post('/update-events', [FavouriteController::class, 'updateFavouriteEvents']);
        Route::delete('/delete-event/{id}', [FavouriteController::class, 'deleteFavouriteEvent']);
    });

    // Contribution Controller
    Route::prefix('contribution')->group(function () {
        Route::post('/update-tagline', [ContributionController::class, 'updateTagline']);
        Route::post('/store-data', [ContributionController::class, 'storeContributionData']);
        Route::post('/update-data', [ContributionController::class, 'updateContributionData']);
        Route::delete('/delete/{id}', [ContributionController::class, 'destroy']);
    });

    // Contribution Request Controller
    Route::prefix('contribution')->group(function () {
        Route::get('/contribution-requests', [ContributionRequestController::class, 'index']);
        Route::post('/update/requests', [ContributionRequestController::class, 'updateStatus']);
        Route::post('/update-data', [ContributionController::class, 'updateContributionData']);
        Route::delete('/delete/{id}', [ContributionController::class, 'destroy']);
    });
});
