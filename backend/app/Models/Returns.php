<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Returns extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_tenant',
        'id_car',
        'id_penalties',
        'date_borrow',
        'date_return',
        'penalties_total',
        'discount',
        'total'      
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'id_tenant');
    }
    
    public function Car()
    {
        return $this->belongsTo(Car::class);
    }

    public function penalties()
    {
        return $this->belongsTo(Penalties::class, 'id_penalties');
    }

}
