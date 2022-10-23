<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'product_variant';
    protected $hidden = ['product_id', 'sku'];

    public function product()
    {
        $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->morphToMany(Image::class, 'imageable');
    }
}
