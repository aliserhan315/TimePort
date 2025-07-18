<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;
use App\Services\FileService;
use App\Traits\ResponseTrait;

class FileController extends Controller
{
        use ResponseTrait;
    /**
     * Display a listing of the resource.
     */
 public function getAllFiles()
    {
        $files = FileService::getAllFiles();
        return $this->responseJSON($files);
    }



   

    /**
     * Update the specified resource in storage.
     */
       public function addOrUpdateCapsule(Request $request, $id = null)
    {
        $file = $id ? FileService::getAllFiles($id) : new File;

        if (!$file) return $this->fail("Capsule not found", "fail", 404);

        $file = FileService::createOrUpdateFile($request->all(), $file);
        return $this->responseJSON($file);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         
            $capsule= File::find($id);
            $capsule->delete();
    }
}
