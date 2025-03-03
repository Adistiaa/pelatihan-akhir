<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rent;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user = Auth::user();
        if($user->role ==='admin'){
            return response()->json(Rent::all(), 200);
        }else{
            return response()->json(Rent::where('id_tenant', Auth::user()->id)->get(), 200);
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
        $validate = $request->validate([
            'id_tenant' => 'required|string|exists:users,id',
            'id_car' => 'required|numeric|exists:table_car,id',
            'date_borrow' => 'required|date',
            'date_return' => 'required|date',
            'down_payment' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
        ]);

        try {
            //peghitungan harga mobil perhari
            $table_car = Car::findOrFail($validate['id_car']);
            $days = Carbon::parse($validate['date_borrow'])->diffInDays(carbon::parse($validate['date_return']));
            $totalBefore = $table_car->price * $days;
            //penghitungan diskon
            $discountAmount = ($validate['discount'] / 100) * $totalBefore;
            $totalDiscount = $totalBefore - $discountAmount;
            //penghitungan total yang harus dibayarkan beserta dpnya
            $finalTotal = $totalDiscount - $validate['down_payment'];
            //opsional
            $finalTotal = max(0, $finalTotal);

            Rent::create([
                'id_car' => $validate['id_car'],
                'id_tenant' => $validate['id_tenant'],
                'date_borrow' => $validate['date_borrow'],
                'date_return'=>$validate['date_return'],
                'down_payment' => $validate['down_payment'],
                'discount' => $validate['discount'],
                'total' => $finalTotal
            ]);

            $increment = $table_car->total - 1;
            $table_car->update([
                'total' => $increment
            ]);
            if($table_car->total == 0) {
                $table_car->update([
                    'status' => 'Rented',
                ]);
            }
            return response()->json(['message' => 'create Rent Car Succes'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
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
        $validate = $request->validate([
            'id_tenant' => 'required|string|exists:users,id',
            'id_car' => 'required|numeric|exists:table_car,id',
            'date_borrow' => 'required|date',
            'date_return' => 'required|date',
            'down_payment' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
        ]);
        try {
            //peghitungan harga mobil perhari
            $table_car = Car::findOrFail($validate['id_car']);
            $days = Carbon::parse($validate['date_borrow'])->diffInDays(carbon::parse($validate['date_borrow']));
            $totalBefore = $table_car->price * $days;
            //penghitungan diskon
            $discountAmount = ($validate['discount'] / 100) * $totalBefore;
            $totalDiscount = $totalBefore - $discountAmount;
            //penghitungan total yang harus dibayarkan beserta dpnya
            $finalTotal = $totalDiscount - $validate['down_payment'];
            $finalTotal = max(0, $finalTotal);

            $rent = rent::findOrFail($id);
            $rent->update([
                'id_car' => $validate['id_car'],
                'id_tenant' => $validate['id_tenant'],
                'date_borrow' => $validate['date_borrow'],
                'date_return'=>$validate['date_return'],
                'down_payment' => $validate['down_payment'],
                'discount' => $validate['discount'],
                'total' => $finalTotal
            ]);
            return response()->json(['message' => 'update Rent Car Succes'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'failed to update Rent Car'], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        if(!$request->bearerToken()) {
            return response()->json(['message' => 'forbbiden'], 403); 
        }
        $rent = rent::findOrFail($id);
        $rent->delete();
        return response()->json(['message' => 'delete Rent succes']);
    }
}
