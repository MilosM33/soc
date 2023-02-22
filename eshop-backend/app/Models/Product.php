<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'products';
    protected $hidden = ['is_active'];


    public function variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id', 'id');
    }
    public function categories()
    {
        return $this->belongsToMany(ProductCategory::class, 'products_categories', 'product_id', 'category_id');
    }
    public function similar_products()
    {
        return $this->belongsToMany(Product::class, 'product_similar_product', 'product_id', 'similar_product_id');
    }

    public function is_active()
    {
        return $this->is_active;
    }
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'products_attributes', 'products_id', 'attribute_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    function getCategoryIds($slug)
    {
        $category = ProductCategory::where('slug', $slug)->first();
        $categories = array($category->id);
        $subcategories = ProductCategory::where('parent_id', $category->id)->get();
        foreach ($subcategories as $subcategory) {
            $subcategoryIds = $this->getCategoryIds($subcategory->slug);
            $categories = array_merge($categories, $subcategoryIds);
        }
        return $categories;
    }

    public function scopeFilter($query)
    {
        $ignoreParams = ['priceFrom', 'priceTo', 'page', 'category', 'subcategory'];


        $temp = $query->whereHas('variants', function ($query) {
            if (request()->has('priceFrom') && request()->input('priceFrom') != null) {
                $query->where('price', '>=', request()->priceFrom);
            }
            if (request()->has('priceTo') && request()->input('priceTo') != null) {
                $query->where('price', '<=', request()->priceTo);
            }
        })->whereHas('categories', function ($query) {
            if (request()->has('category')) {
                $category = null;


                if (request()->has('subcategory')) {
                    $category = ProductCategory::where('slug', request()->subcategory)->first();
                    $query->where('category_id', $category->id);
                } else {
                    $categoryIds = $this->getCategoryIds(request()->category);
                    $query->whereIn('category_id', $categoryIds);
                }
            }
        });
        $params = array_diff(array_keys(request()->input()), $ignoreParams);
        if (count($params) > 0) {
            $temp = $temp->whereHas('attributes.type', function ($query) use ($ignoreParams) {

                foreach (request()->input() as $key => $value) {


                    if (!in_array($key, $ignoreParams) && $key != $value) {

                        $query->where('name', $key);
                    }
                }
            })->whereHas('attributes.value', function ($query) use ($ignoreParams) {

                foreach (request()->input() as $key => $value) {
                    if (!in_array($key, $ignoreParams) && $key != $value) {
                        $query->where('value', $value);
                    }
                }
            });
        }

        return $temp;
    }
}
