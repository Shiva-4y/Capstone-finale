<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WardrobeController;

Route::get('/', function () {
    return view('welcome');
});

// Auth routes
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/logout', [AuthController::class, 'logout']);
Route::get('/api/user', [AuthController::class, 'user']);

// Wardrobe Routes
Route::middleware('auth')->group(function () {
    Route::get('/api/wardrobe', [WardrobeController::class, 'index']);
    Route::post('/api/wardrobe', [WardrobeController::class, 'store']);
    Route::get('/api/wardrobe/{id}', [WardrobeController::class, 'show']);
    Route::put('/api/wardrobe/{id}', [WardrobeController::class, 'update']);
    Route::delete('/api/wardrobe/{id}', [WardrobeController::class, 'destroy']);
});
