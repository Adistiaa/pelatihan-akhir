<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $carproduct = Car::all();
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }
        if($carproduct) 
        {
            return response()->json($carproduct, 200);
        }
        else{
            return response()->json(['message' => 'No car product found'], 404);
        }

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
            'image' => 'nullable|string',
            'no_car' => 'required|integer',
            'name_car' => 'required|string',
            'type_car' => 'required|string',
            'year' => 'required|integer',
            'seat' => 'required|integer',
            'total' => 'required|integer',
            'status' => 'required|in:Available,Rented',
            'price' => 'required|string',
        ]);

        try {
            $carproduct = Car::create($validated);
            return response()->json(['message' => 'Car product created successfully'],  200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create car product: '], 422);
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
        $validated = $request->validate([
            'image' => 'nullable|string',
            'no_car' => 'required|integer',
            'name_car' => 'required|string',
            'type_car' => 'required|string',
            'year' => 'required|integer',
           'seat' => 'required|integer',
            'total' => 'required|integer',
           'status' => 'required|in:Available,Rented',
            'price' => 'required|string',
        ]);

        $carproduct = Car::findOrFail($id);
        try {
            $carproduct->update($validated);
            return response()->json(['message' => 'Car product Updated successfully'],  200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to Updated car product: '], 422);
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
        try{
            $carproduct = Car::findOrFail($id);
            $carproduct->delete();
            return response()->json(['message' => 'Car product deleted successfully'], 200);
        }catch(Exception $e){
            return response()->json(['message' => 'Failed to delete car product'], 422);
        }
    }
}
