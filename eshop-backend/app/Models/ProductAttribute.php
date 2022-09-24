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

    public function format()
    {
        $data = [
            'id' => $this->id,
            'type' => [
                'id' => $this->attribute_type->id,
                'name' => $this->attribute_type->name,
                'description' => $this->attribute_type->description,
            ],
            'value' => [
                'id' => $this->attribute_value->id,
                'value' => $this->attribute_value->value,
                'description' => $this->attribute_value->description,
            ],
        ];
        return $data;
    }
}
