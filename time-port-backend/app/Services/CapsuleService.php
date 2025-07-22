<?php

namespace App\Services;
use App\Models\Capsule;
use Stevebauman\Location\Facades\Location;
use Carbon\Carbon;

class CapsuleService
{
    
   public static function getAllCapsules($id = null)
{
    if (!$id) {
       return Capsule::where('is_activated', true)->where('is_public', true)->get();
    }
    return Capsule::find($id);
}

    

    public static function getAllUserCapsules($user_id)
{
   return Capsule::where('user_id', $user_id)
    ->where(function ($query) {
        $query->where('is_surprise', false)
              ->orWhere('is_activated', true);
    })
    ->get();
}

    

    public static function createOrUpdateCapsule($data, $capsule)
    {
        $capsule->user_id = $data['user_id'] ?? $capsule->user_id;
        $capsule->name = $data['name'] ?? $capsule->name;
       
     
        $position = Location::get( "91.151.226.72");
        if ($position && $position->countryName) {
            $capsule->country = $position->countryName;
        }
        $capsule->activation_date = $data['release_date'] ?? $capsule->activation_date;
        $capsule->is_activated = Carbon::now()->greaterThanOrEqualTo(Carbon::parse($capsule->activation_date));
        $capsule->is_surprise = $data['is_surprise'] ?? $capsule->is_surprise;
        $capsule->is_public = $data['is_public'] ?? $capsule->is_public;
        $capsule->mood = $data['mood'] ?? $capsule->mood;
        $capsule->message = $data['message'] ?? $capsule->message;
     

        $capsule->save();
        return $capsule;
    }
}
