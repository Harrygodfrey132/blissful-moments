<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/verify-email', [AuthController::class, 'validateOTP']);
    Route::get('/check-validation/{userId}', [UserController::class, 'checkValidation']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/getUser', [AuthController::class, 'getUser']);
});
Route::get('/user', [AuthController::class, 'getUser'])->middleware('auth:sanctum');
