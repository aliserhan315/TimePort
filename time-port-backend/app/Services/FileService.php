<?php

namespace App\Services;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


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
  
     if (isset($data['file']) && preg_match('/^data:(.+);base64,(.+)$/', $data['file'], $matches)) {
        $mimeType = $matches[1]; 
        $base64Data = $matches[2];
        $extension = explode('/', $mimeType)[1];

        $decodedData = base64_decode($base64Data);
        $fileName = Str::random(10) . '.' . $extension;
        $filePath = "files/{$fileName}";

        Storage::disk('public')->put($filePath, $decodedData);

        if (!$file) {
            $file = new \App\Models\File(); 
        }

        $file->capsule_id = $data['capsule_id'] ?? null;
        $file->file_name = $fileName;
        $file->file_type = $mimeType;
        $file->file_path = $filePath;

        $file->save();
        return $file;
 }
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
