<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Traits\ResponseTrait;
use App\Services\UserService;
use Exception;

class UserController extends Controller
{
    use ResponseTrait;
  
     public function getAllUsers($id=null)
    {
        
        try{
            $users=UserService::getAllUsers($id);
            if ($id && !$users) {
                return $this->fail("Capsule not found", "fail", 404);
            }
             return $this->responseJSON($users);
            

        }catch(Exception $e){
            return $this->fail($e->getMessage(), "error", 500);
        }
    }

  public function addOrUpdateUser(Request $request, $id = null)
{
    try {
        if (!$id) {
            return $this->fail("User ID is required for update operation.", "fail", 400);
        }

        $user = UserService::getAllUsers($id);

        if (!$user) {
            return $this->fail("User not found", "fail", 404);
        }

        $updatedUser = UserService::createOrUpdateUser($request, $user);

        return $this->responseJSON($updatedUser);

    } catch (Exception $e) {
        return $this->fail($e->getMessage(), "error", 500);
    }
}

    public function destroy(string $id)
    {
         try{
            $user = User::find($id);
             if (!$user) {
                return $this->fail("user not found", "fail", 404);
            }
             $user->delete();
            return $this->responseJSON("user deleted successfully");
         }catch(Exception $e){
              return $this->fail($e->getMessage(), "error", 500);
         }
    }
}
