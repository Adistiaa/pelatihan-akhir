<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'table_car';
    protected $fillable = [
        'image',
        'no_car',
        'name_car',
        'type_car',
        'year',
        'seat',
        'total',
        'status',
        'price',
    ];

    public function rent()
    {
        return $this->hasMany(rent::class);
    }
}


