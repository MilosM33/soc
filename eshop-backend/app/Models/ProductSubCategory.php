<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSubCategory extends Model
{
    use HasFactory;
    protected $table = 'product_sub_categories';
    public $timestamps = false;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_sub_categories', 'category_id', 'product_id');
    }

    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'categories_sub_categories', 'sub_category_id', 'category_id');
    }
}
