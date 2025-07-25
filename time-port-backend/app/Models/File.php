<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class File extends Model
{
      use HasFactory;
    
     protected $table = 'files_';

    protected $fillable = [
        'capsule_id',
        'file_name',
        'file_type',
        'file_path',
    ];

  
}


