<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Penalties;
use App\Models\Returns;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReturnsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user= Auth::user();
        if ($user->role == 'admin') {
            return response()->json(Returns::with(['tenant', 'car', 'penalties'])->get(), 200);
        } else {
            return response()->json(Returns::with(['tenant', 'car', 'penalties'])->where('id_tenant', Auth::user()->id)->get(), 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
            'id_tenant' => 'required|exists:users,id',
            'id_car' => 'required|exists:table_car,id',
            'id_penalties' => 'nullable|exists:penalties,id',
            'date_borrow' => 'required|date|after_or_equal:today',
            'date_return' => 'required|date|after:date_borrow',
            'penalties_total' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
        ]);

        try {
            $car = Car::findOrFail($validated['id_car']);
            $penalties = Penalties::findOrFail($validated['id_penalties']);
            $dateBorrow = Carbon::parse($validated['date_borrow']);
            $dateReturn = Carbon::parse($validated['date_return']);
            $days = $dateBorrow->diffInDays($dateReturn);
            $totalBeforeDiscount = $car->price * $days;
            $discount = $validated['discount'] ?? 0;
            $discountAmount = ($discount / 100) * $totalBeforeDiscount;
            $totalAfterDiscount = $totalBeforeDiscount - $discountAmount;
            $validate['penalties_total'] = $penalties->penalties_total;
            $finalTotal = $totalAfterDiscount - $validate['penalties_total'];
            //opsional
            $finalTotal = max(0, $finalTotal);

            Returns::create([
                'id_tenant' => $validated['id_tenant'],
                'id_car' => $validated['id_car'],
                'id_penalties' => $validated['id_penalties'] ?? null,
                'date_borrow' => $validated['date_borrow'],
                'date_return' => $validated['date_return'],
                'penalties_total' => $validate['penalties_total'],
                'discount' => $discount,
                'total' => $finalTotal,
            ]);
            return response()->json(['message' => 'success to Return Car'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'failed to Return Car', 'error' => $e->getMessage()], 422);
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
            'id_tenant' => 'required|exists:users,id',
            'id_car' => 'required|exists:table_car,id',
            'id_penalties' => 'nullable|exists:penalties,id',
            'date_borrow' => 'required|date|after_or_equal:today',
            'date_return' => 'required|date|after:date_borrow',
            'penalties_total' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
        ]);

        try {
            $car = Car::findOrFail($validated['id_car']);
            $penalties = Penalties::findOrFail($validated['id_penalties']);
            $dateBorrow = Carbon::parse($validated['date_borrow']);
            $dateReturn = Carbon::parse($validated['date_return']);
            $days = $dateBorrow->diffInDays($dateReturn);
            $totalBeforeDiscount = $car->price * $days;
            $discount = $validated['discount'] ?? 0;
            $discountAmount = ($discount / 100) * $totalBeforeDiscount;
            $totalAfterDiscount = $totalBeforeDiscount - $discountAmount;
            $validate['penalties_total'] = $penalties->penalties_total;
            $finalTotal = $totalAfterDiscount - $validate['penalties_total'];
            //opsional
            $finalTotal = max(0, $finalTotal);

            $return = Returns::findOrFail($id);
            $return->update([
                'id_tenant' => $validated['id_tenant'],
                'id_car' => $validated['id_car'],
                'id_penalties' => $validated['id_penalties'] ?? null,
                'date_borrow' => $validated['date_borrow'],
                'date_return' => $validated['date_return'],
                'penalties_total' => $validate['penalties_total'],
                'discount' => $discount,
                'total' => $finalTotal,
            ]);
            return response()->json(['message' => 'success to Update Return'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'failed to Return Car', 'error' => $e->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request ,string $id)
    {
        if(!$request->bearerToken()){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        try {
            $return = Returns::findOrFail($id);
            $return->delete();
            return response()->json(['message' => 'success to Delete Return'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'failed to Return Car', 'error' => $e->getMessage()], 422);
        }
    }
}
