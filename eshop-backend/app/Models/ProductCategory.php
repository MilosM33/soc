<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;
    protected $table = 'product_categories';
    public $timestamps = false;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_categories', 'category_id', 'product_id');
    }

    public function subcategories()
    {
        return $this->belongsToMany(ProductSubCategory::class, 'categories_sub_categories', 'category_id', 'sub_category_id');
    }
}
