<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProfileController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth-related endpoints
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/user', [AuthController::class, 'getUser']);
    Route::post('/verify-email', [AuthController::class, 'validateOTP']);
    Route::post('/user/validation-status', [UserController::class, 'checkValidation']);
    Route::post('/update-profile', [UserProfileController::class, 'updateProfile']);


    // Page settings and management
    Route::prefix('page')->group(function () {
        Route::post('/settings', [PageController::class, 'storePageSettings']);
        Route::post('/personal-info', [PageController::class, 'updatePersonalInformation']);
        Route::get('/exists', [PageController::class, 'checkPage']);
        Route::get('/name-availability', [PageController::class, 'checkPageNameAvailability']);
        Route::post('/background-image', [PageController::class, 'uploadBackgroundImage']);
        Route::post('/quote', [PageController::class, 'saveQuote']);
        Route::post('/uploadBackgroundMusic', [PageController::class, 'uploadBackgroundMusic']);
    });

    // Gallery endpoints
    Route::prefix('gallery')->group(function () {
        Route::post('/name', [GalleryController::class, 'saveGalleryName']);
        Route::post('/images', [GalleryController::class, 'uploadGalleryImages']);
        Route::post('/folders/save', [GalleryController::class, 'updateCreateFolderName']);
        Route::delete('/folder/delete/{id}', [GalleryController::class, 'destroyFolder']);
        Route::patch('/images/{id}/assign-folder', [GalleryController::class, 'assignFolder']);
        Route::patch('/images/{id}/unassign-folder', [GalleryController::class, 'unassignFolder']);
        Route::get('/galleries/{id}/unassigned-images', [GalleryController::class, 'unassignedImages']);
        Route::delete('/delete/image', [GalleryController::class, 'destroyImage']);
    });

    // Obituary management
    Route::post('/obituary', [PageController::class, 'saveObituary']);

    // Timeline Event Management
    Route::post('/timeline', [TimelineController::class, 'saveTimeline']);
    Route::delete('/delete/timeline/event', [TimelineController::class, 'deleteTimeline']);

    // Gallery Management

    //Payment Management

});
Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
Route::get('/folders', [GalleryController::class, 'folders']);
Route::get('/countries', [CountryController::class, 'fetchCountries']);
