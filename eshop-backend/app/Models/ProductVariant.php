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

    public $fillable = [
        'name',
        'price',
        'product_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->morphToMany(Image::class, 'imageable');
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }
    public function attributes()
    {
        return $this->belongsToMany(VariantAttribute::class, "products_variants_attributes", "products_variants_id", "attribute_id");
    }
}
