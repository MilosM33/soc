<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    use HasFactory;
    protected $table = 'productAttributes';
    public $timestamps = false;

    public function attribute_type()
    {
        return $this->belongsTo(AttributeType::class);
    }
    public function attribute_value()
    {
        return $this->belongsTo(AttributeValue::class);
    }
}
