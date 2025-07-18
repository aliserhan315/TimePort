<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Capsule;
use App\Services\CapsuleService;
use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;

class CapsuleController extends Controller
{
      use ResponseTrait;

    public function getAllCapsules()
    {
        $capsules = CapsuleService::getAllCapsules();
        return $this->responseJSON($capsules);
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
  

    public function addOrUpdateCapsule(Request $request, $id = null)
    {
        $capsule = $id ? CapsuleService::getAllCapsules($id) : new Capsule;

        if (!$capsule) return $this->fail("Capsule not found", "fail", 404);

        $capsule = CapsuleService::createOrUpdateCapsule($request->all(), $capsule);
        return $this->responseJSON($capsule);
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
