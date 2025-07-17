<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CapsuleController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;

Route::get('/greeting', function () {
    return 'Hello World';
});
Route::get("/capsule", [CapsuleController::class, "getAllCapsules"]);
Route::get("/user", [UserController::class, "getAllUsers"]);  
Route::get("/file", [FileController::class, "getAllFiles"]);

