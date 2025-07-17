<?php

namespace App\Services;
use APp\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Create a new class instance.
     */
      public static function getAllUsers($id = null)
    {
        if (!$id) {
            return User::all();
        }
        return User::find($id);
    }

    public static function createOrUpdateUser($data, $user)
    {
        $user->name = $data['name'] ?? $user->name;
        $user->email = $data['email'] ?? $user->email;


        if (isset($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();
        return $user;
    }
}
