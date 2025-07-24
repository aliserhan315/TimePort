<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Capsule extends Model
{
      use HasFactory;

   protected $fillable = [
        'user_id',
        'name',
        'country',
        'is_activated',
        'is_surprise',
        'is_public',
        'mood',
        'message',
        'activation_date',
    ];


 
}

