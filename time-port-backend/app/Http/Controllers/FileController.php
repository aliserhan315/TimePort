<?php

namespace App\Http\Controllers;

use App\Models\Capsule;
use Illuminate\Http\Request;
use App\Models\File;
use App\Services\FileService;
use App\Traits\ResponseTrait;
use Exception;
use Illuminate\Support\Facades\Storage;
use \Symfony\Component\HttpFoundation\StreamedResponse;


class FileController extends Controller
{
    

 public function getAllFiles($id = null)
    {
        try{
              $files = FileService::getAllFiles($id);
                if ($id && !$files) {
                return $this->fail("file not found", "fail", 404);
            }
                return $this->responseJSON($files);
    }catch(Exception $e){ 
        
             return $this->fail($e->getMessage(), "error", 500);
        }
    }
        public function  getCapsuleFile($capsule_id){
            try{
                $file = FileService::getAllCapsuleFiles($capsule_id);
                if (!$file) return $this->fail("file not found", "fail", 404);
                return $this->responseJSON($file);

            }catch(Exception $e){
                return $this->fail($e->getMessage(), "error", 500);
            }
  }



       public function addOrUpdateFile(Request $request, $id = null)
    {
        try{
        $file = $id ? FileService::getAllFiles($id) : new File;

        if ($id && !$file)
            return $this->fail("file not found", "fail", 404);

        $file = FileService::createOrUpdateFile($request->all(), $file);
        return $this->responseJSON($file);
    }catch(Exception $e){
          return $this->fail($e->getMessage(), "error", 500);
        }
    }

    public function destroy(string $id)
    {
         try{
            $file= File::find($id);
                if (!$file) {
                return $this->fail("file not found", "fail", 404);
            }
            $file->delete();
        }catch(Exception $e){
            return $this->fail($e->getMessage(), "error", 500);
        }
    }
    // public function downloadFile(string $id)
    //     {
    //         try {
    //             $fileData = FileService::getDownloadableFile($id);

    //             if (!$fileData) {
    //                 return $this->fail("File not found", "fail", 404);
    //             }
    //             return Storage::download($fileData['path'], $fileData['name']);

    //         } catch (Exception $e) {
    //             return $this->fail($e->getMessage(), "error", 500);
    //         }
    // }
}
