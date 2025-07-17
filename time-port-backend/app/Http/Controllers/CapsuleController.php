<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capsule;

class CapsuleController extends Controller
{
    function getAllCapsules($id = null){
        if($id){
        $capsule= Capsule::find($id);
        $response = [];
        $response["status"] = "success";
        $response["payload"] = $capsule;

        }
        $capsules= Capsule::all();
        $response = [];
        $response["status"] = "success";
        $response["payload"] = $capsules;

        return json_encode($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
     function addOrUpdateCapsule(Request $request, $id = null){
        if($id){
            $capsule= Capsule::find($id);
        }else{
            $capsule = new Capsule;
        }
        
      
        $capsule->save();

        $response = [];
        $response["status"] = "success";
        $response["payload"] = $capsule;

        return json_encode($response, 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         
            $capsule= Capsule::find($id);
            $capsule->delete();
    }
}
