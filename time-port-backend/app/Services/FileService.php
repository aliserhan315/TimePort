<?php

namespace App\Services;
use App\Models\File;

class FileService
{
    /**
     * Create a new class instance.
     */
   public static function getAllFiles($id = null)
    {
        if (!$id) {
            return File::all();
        }
        return File::find($id);
    }

    public static function createOrUpdateFile($data, $file)
    {
        $file->capsule_id = $data['capsule_id'] ?? $file->capsule_id;
        $file->file_name = $data['file_name'] ?? $file->file_name;
        $file->file_type = $data['file_type'] ?? $file->file_type;
        $file->file_data = $data['file_data'] ?? $file->file_data;

        $file->save();
        return $file;
    }

}
