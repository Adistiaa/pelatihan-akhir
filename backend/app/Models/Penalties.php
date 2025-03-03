<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penalties extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_penalties',
        'description',
        'id_car',
        'penalties_total',
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
    public function returns()
    {
        return $this->hasMany(Returns::class, 'id_penalties');
    }
}
