<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
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

 public static function createOrUpdateUser($request, $user)
    {
        if ($request->has('username')) {
            $user->name = $request->input('username');
        }

        if ($request->hasFile('profile_photo')) {
            $file = $request->file('profile_photo');
            $path = $file->store('profile_photos', 'public');
            $user->profile_photo = Storage::url($path);
        }

        $user->save();

        return $user;
    }
}

