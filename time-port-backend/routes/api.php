<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CapsuleController;
use App\Http\Controllers\FileController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('capsules', CapsuleController::class);
    Route::apiResource('files', FileController::class)->except(['update', 'destroy']);
});