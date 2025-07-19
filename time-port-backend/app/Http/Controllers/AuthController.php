<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
   public function login(Request $request)
{
    try {
        $user = AuthService::login($request);
        if ($user) {
            return $this->responseJSON($user);
        }
        return $this->responseJSON(null, "Unauthorized", 401);
    } catch (\Exception $e) {
        return $this->responseJSON(null, $e->getMessage(), 500);
    }
}

public function register(Request $request)
{
    try {
        $user = AuthService::register($request);
        return $this->responseJSON($user);
    } catch (\Exception $e) {
        return $this->responseJSON(null, $e->getMessage(), 500);
    }
}

}
