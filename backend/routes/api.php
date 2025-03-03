<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\PenaltiesController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RentsController;
use App\Http\Controllers\ReturnsController;
use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('a24')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('cars', CarController::class);
    Route::apiResource('penalties', PenaltiesController::class);
    Route::apiResource('regis', RegisterController::class);
    Route::apiResource('rent', RentsController::class);
    Route::apiResource('returns', ReturnsController::class);
    });

            Route::post('auth/login', [AuthController::class, 'login']);
            Route::get('auth/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);

});

// Route::get('/a24/login', [CarController::class, 'details']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
