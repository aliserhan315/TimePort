<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CapsuleController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;

Route::get('/greeting', function () {
    return 'Hello World';
});


Route::prefix('capsule')->group(function () {
    Route::get('/', [CapsuleController::class, 'getAllCapsules']);
     Route::put('/', [CapsuleController::class, 'updateCapsule']);
    Route::get('{id}', [CapsuleController::class, 'getAllCapsules']);
    Route::put('{id}', [CapsuleController::class, 'updateCapsule']);
    Route::delete('{id}', [CapsuleController::class, 'destroyCapsules']);
});
Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'getAllUsers']);
    Route::put('/', [UserController::class, 'updateUSer']);
    Route::get('{id}', [UserController::class, 'getAllUsers']);
    Route::put('{id}', [UserController::class, 'updateUSer']);
    Route::delete('{id}', [UserController::class, 'destroyUser']);
});
Route::prefix('file')->group(function () {
    Route::get('/', [FileController::class, 'getAllFiless']);
     Route::put('/', [FileController::class, 'updateFile']);
    Route::get('{id}', [FileController::class, 'getAllFiles']);
    Route::put('{id}', [FileController::class, 'updateFile']);
    Route::delete('{id}', [FileController::class, 'destroyFile']);
});