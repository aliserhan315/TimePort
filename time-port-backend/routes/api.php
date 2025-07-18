<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CapsuleController;



Route::get('/greeting', function () {
    return 'Hello World';
});
//Route::get("/capsule", [CapsuleController::class, "getAllCapsules"]);

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'getAllUsers']);
    Route::put('/', [UserController::class, 'addOrUpdateUser']); 
    Route::get('{id}', [UserController::class, 'getAllUsers']);
    Route::put('{id}', [UserController::class, 'addOrUpdateUser']); 
    Route::delete('{id}', [UserController::class, 'destroy']);
});
Route::prefix('capsule')->group(function () {
    Route::get('/', [CapsuleController::class, 'getAllCapsules']);
    Route::put('/', [CapsuleController::class, 'addOrUpdateCapsule']);
    Route::get('user/{user_id}', [CapsuleController::class, 'getCapsulesByUserId']);
    Route::get('{id}', [CapsuleController::class, 'getAllCapsules']);
    Route::put('{id}', [CapsuleController::class, 'addOrUpdateCapsule']);
    Route::delete('{id}', [CapsuleController::class, 'destroyCapsules']);
});
Route::prefix('file')->group(function () {
    Route::get('/', [FileController::class, 'getAllFiless']);
     Route::put('/', [FileController::class, 'addOrUpdateUser']);
    Route::get('{id}', [FileController::class, 'getAllFiles']);
    Route::put('{id}', [FileController::class, 'addOrUpdateUser']);
    Route::delete('{id}', [FileController::class, 'destroyFile']);
});