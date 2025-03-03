<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    protected $table ='rent';
    protected $fillable = [
        'id_car',
        'id_tenant',
        'date_borrow',
        'date_return',
        'down_payment',
        'discount',
        'total',
    ];

    public function tenant()
    {
        return $this->belongsTo(User::class, 'id_tenant');
    }

    public function Car()
    {
        return $this->belongsTo(Car::class);
    }
}
