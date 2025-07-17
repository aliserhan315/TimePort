<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  */
    // public function store(Request $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }
    function getAllUsers($id=null){
        $users = User::all();
          if($id){
        $user= User::find($id);
        $response = [];
        $response["status"] = "success";
        $response["payload"] = $user;

        }

        $response = [];
        $response["status"] = "success";
        $response["payload"] = $users;

        return json_encode($response, 200);
    }

    


    function addOrUpdateUser(Request $request, $id = null){
        if($id){
            $User = User::find($id);
        }else{
            $User = new User;
        }
        
        $User->category_id = 0;
        $User->title = $request["title"] || $User->title; 
        $User->description =  $id && !isset($request["description"]) ?  $User->title : $request["description"];
        $User->status = 0;
        $User->color =  $id && !isset($request["color"]) ? $User->title : $request["color"];
        $User->save();

        $response = [];
        $response["status"] = "success";
        $response["payload"] = $User;

        return json_encode($response, 200);
    }
}
