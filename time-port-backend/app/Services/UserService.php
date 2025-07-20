<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Create a new class instance.
     */
      public static function getAllUsers($id = null)
    {
        if (!$id) {
        return User::select('id', 'name', 'profile_photo')->get();
        }
        return User::select('id', 'name', 'profile_photo')->find($id);
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
