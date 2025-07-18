<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\ResponseTrait;
use App\Services\UserService;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }
  use ResponseTrait;

    public function getAllUsers()
    {
        $users = UserService::getAllUsers();
        return $this->responseJSON($users);
    }

    public function addOrUpdateUser(Request $request, $id = null)
    {
        $user = $id ? UserService::getAllUsers($id) : new User;

        if (!$user) return $this->fail("User not found", "fail", 404);

        $user = UserService::createOrUpdateUser($request->all(), $user);
        return $this->responseJSON($user);
    }
}
