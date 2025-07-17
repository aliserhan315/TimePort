<?php

namespace App\Services;
use App\Models\Capsule;

class CapsuleService
{
    
    public static function getAllCapsules($id = null)
    {
        if (!$id) {
            return Capsule::all();
        }
        return Capsule::find($id);
    }

    public static function createOrUpdateCapsule($data, $capsule)
    {
        $capsule->user_id = $data['user_id'] ?? $capsule->user_id;
        $capsule->name = $data['name'] ?? $capsule->name;
        $capsule->country = $data['country'] ?? $capsule->country;
        $capsule->is_activated = $data['is_activated'] ?? $capsule->is_activated;
        $capsule->is_surprise = $data['is_surprise'] ?? $capsule->is_surprise;
        $capsule->is_public = $data['is_public'] ?? $capsule->is_public;
        $capsule->mood = $data['mood'] ?? $capsule->mood;
        $capsule->message = $data['message'] ?? $capsule->message;
        $capsule->activation_date = $data['activation_date'] ?? $capsule->activation_date;

        $capsule->save();
        return $capsule;
    }
}
