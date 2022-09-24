<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    public $timestamps = false;
    protected $hidden = ['id'];

    public function categories()
    {
        return $this->belongsToMany((Category::class));
    }
    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id', 'id');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function attributes()
    {
        return $this->belongsToMany(ProductAttribute::class, 'product_product_attribute', 'product_id', 'attribute_id');
    }

    public function images()
    {
        return $this->morphMany(ProductImage::class, 'imageable');
    }
}
