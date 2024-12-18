<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth-related endpoints
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/verify-email', [AuthController::class, 'validateOTP']);
    Route::post('/user/validation-status', [UserController::class, 'checkValidation']);
    // Page settings and management
    Route::prefix('page')->group(function () {
        Route::post('/settings', [PageController::class, 'storePageSettings']);
        Route::post('/personal-info', [PageController::class, 'updatePersonalInformation']);
        Route::get('/exists', [PageController::class, 'checkPage']);
        Route::get('/name-availability', [PageController::class, 'checkPageNameAvailability']);
        Route::post('/background-image', [PageController::class, 'uploadBackgroundImage']);
        Route::post('/quote', [PageController::class, 'saveQuote']);
    });

    // Gallery endpoints
    Route::prefix('gallery')->group(function () {
        Route::post('/name', [PageController::class, 'saveGalleryName']);
        Route::post('/images', [PageController::class, 'uploadGalleryImages']);
    });

    // Obituary management
    Route::post('/obituary', [PageController::class, 'saveObituary']);

    //Timeline Event Management
    Route::post('/timeline', [PageController::class, 'saveTimeline']);
});
