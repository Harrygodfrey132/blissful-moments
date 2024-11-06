<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('pages/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/listing', [UserController::class, 'index'])->name('listing');
        Route::delete('/{user}/delete', [UserController::class, 'delete'])->name('destroy');
        Route::post('/{user}/status', [UserController::class, 'updateStatus'])->name('update.status');
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

require __DIR__ . '/auth.php';
