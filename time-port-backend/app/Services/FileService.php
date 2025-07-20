<?php

namespace App\Services;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

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
        if (isset($data['file'])) {
        $path = $data['file']->store('capsule_files', 'public');
        $file->file_path = $path;
        }

        $file->save();
        $file->url = asset('storage/' . $file->file_path);
        return $file;
    }
    public static function getAllCapsuleFiles($capsule_id)
{
   return File::where('capsule_id', $capsule_id)->get();
}
   public static function getDownloadableFile(string $id)
    {
        $file = File::find($id);

        if (!$file) {
            return null;
        }

        if ($file->file_path && Storage::disk('private')->exists($file->file_path)) {
            return [
                'path' => $file->file_path,
                'name' => $file->file_name ?? basename($file->file_path)
            ];
        }

        return null; 
    }

}
