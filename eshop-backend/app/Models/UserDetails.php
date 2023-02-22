<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    protected $table = 'user_details';
    public $timestamps = false;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
        'city',
        'zip_code',
        'state',
        'appartment',
        'delivery_method',
    ];
}
