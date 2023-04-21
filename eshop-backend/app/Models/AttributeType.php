<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeType extends Model
{
    use HasFactory;

    protected $table = 'attribute_type';
    public $timestamps = false;

    public $fillable = [
        'name',
        'description',

    ];
}
