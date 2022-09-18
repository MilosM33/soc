<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttribute extends Model
{
    use HasFactory;
    protected $table = 'product_attribute';
    public $timestamps = false;
    protected $hidden = ['attribute_type_id', 'attribute_value_id', 'product_id', 'pivot'];

    public function attribute_type()
    {
        return $this->belongsTo(AttributeType::class);
    }
    public function attribute_value()
    {
        return $this->belongsTo(AttributeValue::class);
    }
}
