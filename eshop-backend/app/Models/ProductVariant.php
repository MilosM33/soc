<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;
    protected $table = 'product_variants';
    public $timestamps = false;


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function attributes()
    {
        return $this->belongsToMany(ProductAttribute::class, 'variant_attributes', 'variant_id', 'attribute_id');
    }
    public function images()
    {
        return $this->morphMany(ProductImage::class, 'imageable');
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
