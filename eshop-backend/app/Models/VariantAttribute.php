<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantAttribute extends Model
{
    use HasFactory;
    protected $table = 'attributes';
    protected $hidden = [
        "pivot",
        "attribute_type_id",
        "attribute_value_id",

    ];

    public $timestamps = false;

    public function type()
    {
        return $this->belongsTo(AttributeType::class, 'attribute_type_id');
    }

    public function value()
    {
        return $this->belongsTo(AttributeValue::class, 'attribute_value_id');
    }

}
