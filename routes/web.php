<?php

use App\Http\Controllers\GDPRrequestController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return to_route('login');
});

Route::get('/dashboard', function () {
    return view('pages/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/listing', [UserController::class, 'index'])->name('index');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('/{user}/update', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('destroy');
        Route::post('/{user}/status', [UserController::class, 'updateStatus'])->name('update.status');
        Route::post('/multi-delete', [UserController::class, 'multiDelete'])->name('multiDelete');
    });

    Route::prefix('plans')->name('plans.')->group(function () {
        Route::get('/listing', [PlanController::class, 'index'])->name('index');
        Route::get('/create', [PlanController::class, 'create'])->name('create');
        Route::post('/store', [PlanController::class, 'store'])->name('store');
        Route::get('/{plan}/edit', [PlanController::class, 'edit'])->name('edit');
        Route::put('/{plan}/update', [PlanController::class, 'update'])->name('update');
        Route::delete('/{plan}/delete', [PlanController::class, 'delete'])->name('destroy');
        Route::post('/{plan}/status', [PlanController::class, 'updateStatus'])->name('update.status');
    });

    Route::prefix('gdpr')->name('gdpr.')->group(function () {
        Route::get('/requests/listing', [GDPRrequestController::class, 'index'])->name('index');
        Route::get('/requests/{gdpr}/show', [GDPRrequestController::class, 'show'])->name('show');
        Route::get('/requests/{gdpr}/edit', [GDPRrequestController::class, 'edit'])->name('edit');
    });
});

// Route::get('/dashboard', function () {
//     return view('pages/dashboard');
// });

Route::get('/users', function () {
    return view('pages/users');
});

Route::get('/orders', function () {
    return view('pages/orders');
});

Route::get('/orderdetails', function () {
    return view('pages/order-details');
});

require __DIR__ . '/auth.php';
