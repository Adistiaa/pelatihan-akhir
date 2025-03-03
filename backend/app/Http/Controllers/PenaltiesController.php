<?php

namespace App\Http\Controllers;

use App\Models\Penalties;
use Exception;
use Illuminate\Http\Request;

class PenaltiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return response()->json(penalties::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'name_penalties' => 'required|string',
            'description' => 'required|string',
            'id_car' => 'required|exists:table_car,id',
            'penalties_total' => 'required|numeric|min:0'
        ]);

        try {
            Penalties::create($validated);
            return response()->json(['message' => 'create Penalties successfully'], 200);
        } catch(Exception $e) {
            return response()->json(['message' => 'Failed to create Penalties'], 422);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $penalties = penalties::findOrFails($id);
        $validated = $request->validate([
            'name_penalties' =>'required|string',
            'description' =>'required|string',
            'id_car' =>'required|exists:table_car,id',
            'penalties_total' =>'required|numeric|min:0'
        ]);

        try {
            $penalties->update($validated);
            return response()->json(['message' => 'update Penalties successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'update Penalties failed'], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $penalties = penalties::findOrFails($id);
        try {
            $penalties->delete();
            return response()->json(['message' => 'delete Penalties successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'delete Penalties failed'], 422);
        }
    }
}
