<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $register = User::all();
        if($register) 
        {
            return response()->json($register, 200);
        }
        else{
            return response()->json(['message' => 'No Account found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_ktp' => 'required|string',
            'name' => 'required|string',
            'date_of_birth' => 'required|date',
            'email' => 'required|string',
            'password' => 'required|string',
            'phone' => 'required|numeric',
            'description' => 'required|string',
            'role' => 'required|in:user,admin',
        ]);

        try {
            $register = User::create($validated);
            return response()->json(['message' => 'Account created successfully'],  200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
            }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'no_ktp' => 'required|string',
            'name' => 'required|string',
            'date_of_birth' => 'required|date',
            'email' => 'required|string',
            'password' => 'required|string',
            'phone' => 'required|numeric',
            'description' => 'required|string',
            'role' => 'required|in:user,admin',
        ]);

        $register = User::findOrFail($id);
        try {
            $register->update($validated);
            return response()->json(['message' => 'Account Updated successfully'],  200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to Updated Account: '], 422);
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $register = User::findOrFail($id);
            $register->delete();
            return response()->json(['message' => 'Account deleted successfully'], 200);
        }catch(Exception $e){
            return response()->json(['message' => 'Failed to delete Account'], 422);
        }
    }
}
