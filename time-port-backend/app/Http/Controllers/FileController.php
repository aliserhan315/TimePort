<?php

namespace App\Http\Controllers;

use App\Models\Capsule;
use Illuminate\Http\Request;
use App\Models\File;
use App\Services\FileService;
use App\Traits\ResponseTrait;
use Exception;

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
}
