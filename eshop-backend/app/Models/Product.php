<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log;

class Product extends Model
{
	use HasFactory;
	public $timestamps = false;
	protected $table = 'products';

	public $fillable = [
		'title',
		'slug',
		'description',
		'is_active',
	];


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
			$productAttributes = 0;
			foreach ($params as $key => $value) {


				$property = substr($value, 0, 7);
				if ($property != "variant") {
					$productAttributes += 1;
				}
			}


			if ($productAttributes > 0) {
				$temp = $temp->whereHas('attributes', function ($query) use ($ignoreParams) {

					$ids = [];
					foreach (request()->input() as $key => $value) {

						if (substr($key, 0, 7) == "variant") {
							continue;
						}


						if (!in_array($key, $ignoreParams) && $key != $value) {

							$attributeType = AttributeType::where("name", str_replace("_", " ", $key))->first();
							$attributeValue = AttributeValue::where("value", $value)->first();

							$attribute = Attribute::where("attribute_type_id", $attributeType["id"])->where("attribute_value_id", $attributeValue["id"])->first();



							$ids[] = $attribute["id"];
						}
					}


					if (array_count_values($ids) > 0) {
						$query->whereIn('attribute_id', $ids);
					}
				});
			}
			$variantAtrributes = 0;
			foreach (request()->input() as $key => $value) {

				if (substr($key, 0, 7) == "variant") {
					$variantAtrributes += 1;
				}
			}

			if ($variantAtrributes > 0) {
				$temp = $temp->whereHas('variants.attributes', function ($query) use ($ignoreParams) {

					$ids = [];
					foreach (request()->input() as $key => $value) {

						if (substr($key, 0, 7) != "variant") {
							continue;
						}

						if (!in_array($key, $ignoreParams) && $key != $value) {
							$formatedKey = str_replace("_", " ", $key);

							$formatedKey = substr($formatedKey, 7);
							$attributeType = AttributeType::where("name", $formatedKey)->first();
							$attributeValue = AttributeValue::where("value", $value)->first();

							$attribute = Attribute::where("attribute_type_id", $attributeType["id"])->where("attribute_value_id", $attributeValue["id"])->first();


							$ids[] = $attribute["id"];
						}
					}

					if (array_count_values($ids) > 0) {
						$query->whereIn('attribute_id', $ids);
					}
				});
			}
		}




		return $temp;
	}
}
