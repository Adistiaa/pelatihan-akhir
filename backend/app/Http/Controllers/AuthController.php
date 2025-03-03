<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Login gagal, periksa kembali nama dan password'], 401);
        }
    
        // Ambil user berdasarkan name
        $user = User::where('name', $request->name)->firstOrFail();
    
        // Buat token baru untuk user
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'role' => $user->role // Pastikan role dikirimkan
            ]
        ], 200);
    }
    
    public function logout(Request $request)
    {
        if(!Auth::check()){
            return response()->json(['message' => 'LogOutFailed'], 401);
        }

        $request->user()->currentToken()->delete();
        return response()->json(['message' => 'LogOut Succes'], 200);
    }
}