<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Str;

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
    if (isset($data['username'])) {
        $user->name = $data['username'];
    }

    if (!empty($data['profile_photo'])) {
        $imageData = $data['profile_photo'];


        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $matches)) {
            $imageType = $matches[1];
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $imageData = base64_decode($imageData);

            $fileName = Str::random(10) . '.' . $imageType;
            $filePath = "profile_photos/{$fileName}";
            Storage::disk('public')->put($filePath, $imageData);

            $user->profile_photo = Storage::url($filePath);
        }
    }

    $user->save();
    return $user;
}

}

