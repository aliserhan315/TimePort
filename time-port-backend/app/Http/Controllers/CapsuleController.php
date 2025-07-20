<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capsule;
use App\Services\CapsuleService;
use App\Http\Controllers\Controller;
use Exception;

class CapsuleController extends Controller{
    

    public function getAllCapsules($id = null)
    {
        try {
            $capsules = CapsuleService::getAllCapsules($id);
            if ($id && !$capsules) {
                return $this->fail("Capsule not found", "fail", 404);
            }
            return $this->responseJSON($capsules);
        } catch (Exception $e) {
            return $this->fail($e->getMessage(), "error", 500);
        }
    }

    public function addOrUpdateCapsule(Request $request, $id = null)
    {
        try {
            $capsule = $id ? Capsule::find($id) : new Capsule;

            if ($id && !$capsule) {
                return $this->fail("Capsule not found", "fail", 404);
            }

            $capsule = CapsuleService::createOrUpdateCapsule($request->all(), $capsule);
            return $this->responseJSON($capsule);
        } catch (Exception $e) {
            return $this->fail($e->getMessage(), "error", 500);
        }
    }

  
  
  

    public function destroyCapsules($id)
    {
        try {
            $capsule = Capsule::find($id);

            if (!$capsule) {
                return $this->fail("Capsule not found", "fail", 404);
            }

            $capsule->delete();
            return $this->responseJSON("Capsule deleted successfully");
        } catch (Exception $e) {
            return $this->fail($e->getMessage(), "error", 500);
        }
    }
  
     public function getCapsulesByUserId($user_id)
     {
        try {
            $capsules = CapsuleService::getAllUserCapsules($user_id);
            return $this->responseJSON($capsules);
        } catch (Exception $e) {
            return $this->fail($e->getMessage(), "error", 500);
        }
    }
}
