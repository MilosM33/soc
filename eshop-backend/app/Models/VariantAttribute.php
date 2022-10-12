<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantAttribute extends Model
{
    use HasFactory;
    protected $table = 'product_variant_attributes';
    public $timestamps = false;


    public function attributes()
    {
        return $this->belongsTo(ProductAttribute::class);
    }
}
