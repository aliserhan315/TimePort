<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   function getAllFiles($id=null){
    if($id){
        $file= File::find($id);
        $response = [];
        $response["status"] = "success";
        $response["payload"] = $file;

        }
        
        $files = File::all();
        $response = [];
        $response["status"] = "success";
        $response["payload"] = $files;

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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
