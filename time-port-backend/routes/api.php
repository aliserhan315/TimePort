<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CapsuleController;
use App\Http\Controllers\AuthController;



Route::get('/greeting', function () {
    return 'Hello World';
});
//Route::get("/capsule", [CapsuleController::class, "getAllCapsules"]);
// Public routes
Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);
Route::get('/capsule', [CapsuleController::class, 'getAllCapsules']);
Route::get('/user', [UserController::class, 'getAllUsers']);
Route::get('/file/capsule/{capsule_id}', [FileController::class, 'getCapsuleFile']);


Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('user')->group(function () {
        Route::put('/', [UserController::class, 'addOrUpdateUser']); 
        Route::get('{id}', [UserController::class, 'getAllUsers']);
        Route::put('{id}', [UserController::class, 'addOrUpdateUser']); 
        Route::delete('{id}', [UserController::class, 'destroy']);
    });

    Route::prefix('capsule')->group(function () {
        Route::put('/', [CapsuleController::class, 'addOrUpdateCapsule']);
        Route::get('user/{user_id}', [CapsuleController::class, 'getCapsulesByUserId']);
        Route::get('{id}', [CapsuleController::class, 'getAllCapsules']);
        Route::put('{id}', [CapsuleController::class, 'addOrUpdateCapsule']);
        Route::delete('{id}', [CapsuleController::class, 'destroyCapsules']);
    });

    Route::prefix('file')->group(function () {
        Route::put('/', [FileController::class, 'addOrUpdateFile']);
        Route::get('{id}', [FileController::class, 'getAllFiles']);
        Route::put('{id}', [FileController::class, 'addOrUpdateFile']);
        Route::delete('{id}', [FileController::class, 'destroy']);
    });
});
