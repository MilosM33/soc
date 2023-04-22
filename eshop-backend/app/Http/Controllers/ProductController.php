<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttributeFilterResource;
use App\Http\Resources\FilterResource;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ListingResource;
use App\Http\Resources\ProductResource;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use App\Models\Image;
use App\Models\VariantAttribute;
use App\Models\ProductReview;
use App\Models\SimilarProduct;
use Illuminate\Support\Str;

use App\Models\Attribute;
use App\Models\AttributeType;
use App\Models\AttributeValue;

use App\Models\ProductCategory;


use Illuminate\Support\Facades\File;

use function Ramsey\Uuid\v1;

class ProductController extends Controller
{

	const PRODUCT_PAGINATE = 10;




	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($slug)
	{

		$product = Product::with(
			'variants',
			'variants.images',
			'variants.reviews',
			'variants.reviews.user',
			'attributes',
			'variants.attributes',
			'attributes.type',
			'attributes.value',
			'variants.attributes.type',
			'variants.attributes.value'

		)->where('slug', $slug)->first();


		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}

		return new ProductResource($product);
	}
	public function search($term)
	{
		$products = Product::whereHas('variants', function ($query) use ($term) {
			$query->where('title', 'like', "$term%");
		})->get();
		return response()->json($products);
	}
	public function get_related_products($slug)
	{
		$product = Product::where('slug', $slug)->first();
		if (!$product) {
			return response()->json([
				'message' => 'Product not found' . $slug
			], 404);
		}
		$products = $product->similar_products()->with(
			'variants',
			'variants.images',
			'attributes.type',
			'attributes.value',
		)->get();
		return response()->json(ListingResource::collection($products));
	}

	public function searchVariant($product, $query = "")
	{
		$product = Product::where('title', $product)->first();

		if (!$product) {
			return response()->json([], 404);
		}

		if ($query == "") {
			return response()->json($product->variants);
		}

		$variants = ProductVariant::where('product_id', '=', $product->id)
			->where('name', 'like', "$query%")
			->get();
		return response()->json($variants);
	}
	public function index()
	{
		// Log db
		DB::enableQueryLog();
		$products = Product::filter()->with(
			'variants',
			'variants.images',
			'attributes.type',
			'attributes.value',
		);



		if ($products->count() == 0) {
			return response()->json([
				'filters' => [],
				'products' => [],
				'status' => 'No products found'
			], 200);
		}


		// filters
		$productIds = clone $products->get()->pluck('id');

		$products = $products->paginate(self::PRODUCT_PAGINATE);

		$filters = DB::select("SELECT DISTINCT attribute_type.*,
        attribute_value.*,
        attribute_filters.filter_type
        
        FROM products
            INNER JOIN products_attributes ON products_attributes.products_id = products.id
            INNER JOIN attributes ON products_attributes.attribute_id = attributes.id
            INNER JOIN attribute_type on attribute_type.id = attributes.attribute_type_id
            INNER JOIN attribute_value on attribute_value.id = attributes.attribute_value_id
            INNER JOIN attribute_filters on attribute_filters.attribute_type_id = attributes.attribute_type_id
        WHERE products.id IN ('" . implode("','", $productIds->toArray()) . "')");


		/* $variantFilters = DB::select("SELECT DISTINCT attribute_type.*,
        attribute_value.*,
        attribute_filters.filter_type
        
        FROM product_variant
            INNER JOIN products ON products.id = product_variant.product_id
            INNER JOIN products_variants_attributes ON products_variants_attributes.products_variants_id = product_variant.id
            INNER JOIN attributes ON products_variants_attributes.attribute_id = attributes.id
            INNER JOIN attribute_type on attribute_type.id = attributes.attribute_type_id
            INNER JOIN attribute_value on attribute_value.id = attributes.attribute_value_id
            INNER JOIN attribute_filters on attribute_filters.attribute_type_id = attributes.attribute_type_id
        WHERE products.id IN ('" . implode("','", $productIds->toArray()) . "')");


		$filters = array_merge($filters, $variantFilters); */


		$filters = collect($filters)->groupBy('name');
		$filters = FilterResource::collection($filters)->toArray($filters);
		$formatedProducts = ListingResource::collection($products);
		return response()->json(
			[
				'filters' => array_values($filters),
				'products' => array(
					'data' => ListingResource::collection($formatedProducts),
					'meta' => [
						'current_page' => $products->currentPage(),
						'last_page' => $products->lastPage(),
						'per_page' => $products->perPage(),
						'total' => $products->total(),
					]
				)

			]
		);
	}

	public function filter(Request $request)
	{
		$filters = $request->filters;
		$products = Product::with('variants', 'variants.images')->active()->whereHas('variants', function ($query) {
			$query->where('is_active', true);
		})->whereHas('variants.attributes', function ($query) use ($filters) {
			$query->whereIn('attribute_value_id', $filters);
		})->paginate(10);



		return ListingResource::collection($products);
	}

	public function filterProducts(Request $request)
	{
		$products = Product::query();

		if ($request->has('title')) {
			$products->where('title', 'like', '%' . $request->title . '%');
		} else if ($request->has('slug')) {
			$products->where('slug', 'like', '%' . $request->slug . '%');
		} else if ($request->has('description')) {
			$products->where('description', 'like', '%' . $request->description . '%');
		} else if ($request->has('isactive')) {
			$products->where('is_active', 'like', '%' . $request->isactive . '%');
		}
		$products->with('variants', 'variants.images', 'variants.attributes', 'variants.attributes.type', 'variants.attributes.value', 'attributes', 'attributes.type', 'attributes.value', 'similar_products', 'categories');
		return response()->json($products->paginate($request->show, ['*'], 'page', $request->page));
	}

	public function getVariants($slug)
	{
		$product = Product::where('slug', $slug)->first();
		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}
		return response()->json($product->variants);
	}

	public function deleteProduct($slug)
	{
		$product = Product::where('slug', $slug)->first();
		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}
		$product->delete();
		return response()->json([
			'message' => 'Product deleted'
		], 200);
	}

	public function uploadImages(Request $request)
	{

		$images = $request->file('files');

		$response = [];

		foreach ($images as $image) {
			$uniqueName = uniqid() . $image->getClientOriginalName();
			$path = $image->move(public_path("images"), $uniqueName);
			$path = config("app.API_URL") . "/images/" . $uniqueName;
			$image = new Image();
			$image->path = $path;
			$image->save();

			$response[] = $image;
		}

		return response()->json([
			'message' => 'Images uploaded',
			'images' => $response
		], 200);
	}

	public function deleteImage(Request $request)
	{
		$id = $request->id;
		$image = Image::where('id', $id)->first();
		if (!$image) {
			return response()->json([
				'message' => 'Image not found'
			], 404);
		}
		$path = str_replace(config("app.API_URL"), "", $image->path);
		$path = public_path($path);
		File::delete($path);

		$image->delete();
		return response()->json([
			'message' => 'Image deleted'
		], 200);
	}

	public function deleteVariant(Request $request)
	{
		$id = $request->id;
		$variant = ProductVariant::where('id', $id)->first();
		if (!$variant) {
			return response()->json([
				'message' => 'Variant not found'
			], 404);
		}
		$variant->delete();
		return response()->json([
			'message' => 'Variant deleted'
		], 200);
	}

	public function updateProduct(Request $request)
	{

		$id = $request->id;
		$product = Product::where('id', $id)->first();
		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}
		$product->update(array(
			"title" => $request->title,
			"description" => $request->description,
			"slug" => $request->slug,
			"is_active" => $request->is_active ?? 1,
		));

		// Categories
		if ($request->input("categories")) {
			foreach ($request->input("categories") as $category) {
				$categoryModel = ProductCategory::where('name', $category["name"])->first();

				$product->categories()->syncWithoutDetaching($categoryModel->id);
			}
		}
		// attributes

		foreach ($request->input("attributes") as $attribute) {

			$type = $attribute['type']['name'];
			$value = $attribute['value']['value'];

			$typeModel = AttributeType::where('name', $type)->first();
			$valueModel = AttributeValue::where('value', $value)->first();

			if (!$typeModel) {
				$typeModel = AttributeType::create(array(
					"name" => $type,
				));
			}

			if (!$valueModel) {
				$valueModel = AttributeValue::create(array(
					"value" => $value,
				));
			}

			$attribute = Attribute::where("attribute_type_id", $typeModel->id)->where("attribute_value_id", $valueModel->id)->first();

			if (!$attribute) {
				$attribute = Attribute::create(array(
					"attribute_type_id" => $typeModel->id,
					"attribute_value_id" => $valueModel->id,
				));
			}

			if ($product->attributes()->where("attribute_id", $attribute->id)->count() == 0) {
				$product->attributes()->attach($attribute->id);
			}
		}

		// variants
		foreach ($request->variants as $variant) {

			if (!isset($variant['id'])) {
				$variantModel = ProductVariant::create(array(
					"name" => $variant['name'],
					"price" => $variant['price'],
					"product_id" => $product->id,
				));
			} else {
				$variantModel = ProductVariant::where('id', $variant['id'])->first();
				$variantModel->update(array(
					"name" => $variant['name'],
					"price" => $variant['price'],
					"product_id" => $product->id,
				));
			}

			foreach ($variant['images'] as $image) {

				if (DB::table('imageables')->where('image_id', $image['id'])->count() > 0) {
					continue;
				}


				DB::table('imageables')->insert([
					'image_id' => $image['id'],
					'imageable_id' => $variantModel->id,
					'imageable_type' => 'App\Models\ProductVariant'
				]);
			}


			foreach ($request->similar_products as $similar_product) {

				$title = $similar_product['title'];

				$similarProduct = Product::where('title', $title)->first();

				if ($product->similar_products()->where('similar_product_id', $similarProduct->id)->count() > 0) {
					continue;
				}

				$product->similar_products()->attach($similarProduct->id);
			}

			foreach ($variant["attributes"] as $attribute) {

				$type = $attribute['type']['name'];
				$value = $attribute['value']['value'];

				$typeModel = AttributeType::where('name', $type)->first();
				$valueModel = AttributeValue::where('value', $value)->first();

				$attribute = Attribute::where("attribute_type_id", $typeModel->id)->where("attribute_value_id", $valueModel->id)->first();

				if ($attribute && $variantModel->attributes()->where('attribute_id', $attribute->id)->count() > 0) {
					continue;
				}

				$variantModel->attributes()->attach($attribute->id);
			}
		}

		return response()->json([
			'message' => 'Product updated'
		], 200);
	}

	public function createVariant(Request $request)
	{

		$productId = $request->input("productId");
		$productVariant = ProductVariant::create([
			"name" => "New Variant",
			"price" => 0,
			"product_id" => $productId,

		]);

		return response()->json($productVariant);
	}

	public function deleteSimilar(Request $request)
	{
		$slug = $request->slug;
		$similar_product_slug = $request->similar_product;
		$product = Product::where('slug', $slug)->first();

		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}

		$similar_product = Product::where('slug', $similar_product_slug)->first();

		if ($product->similar_products()->where('similar_product_id', $similar_product->id)->count() != 0) {
			$product->similar_products()->detach($similar_product->id);
		}

		return response()->json([
			'message' => 'Similar product deleted'
		], 200);
	}

	public function generateSlug(Request $request)
	{
		$faker = \Faker\Factory::create();
		$slug = $faker->slug;
		return response()->json([
			'slug' => $slug
		], 200);
	}

	public function createProduct(Request $request)
	{

		$product = Product::create(array(
			"title" => $request->title,
			"description" => $request->description,
			"slug" => $request->slug,
			"is_active" => $request->is_active ?? 0,
		));

		// attributes
		if ($request->input("attributes")) {
			foreach ($request->input("attributes") as $attribute) {

				$type = $attribute['type']['name'];
				$value = $attribute['value']['value'];

				$typeModel = AttributeType::where('name', $type)->first();
				$valueModel = AttributeValue::where('value', $value)->first();

				if (!$typeModel) {
					$typeModel = AttributeType::create(array(
						"name" => $type,
					));
				}

				if (!$valueModel) {
					$valueModel = AttributeValue::create(array(
						"value" => $value,
					));
				}

				$attribute = Attribute::where("attribute_type_id", $typeModel->id)->where("attribute_value_id", $valueModel->id)->first();

				if (!$attribute) {
					$attribute = Attribute::create(array(
						"attribute_type_id" => $typeModel->id,
						"attribute_value_id" => $valueModel->id,
					));
				}

				if ($product->attributes()->where("attribute_id", $attribute->id)->count() == 0) {
					$product->attributes()->attach($attribute->id);
				}
			}
		}

		if ($request->input("categories")) {
			foreach ($request->input("categories") as $category) {
				$categoryModel = ProductCategory::where('name', $category["name"])->first();

				$product->categories()->syncWithoutDetaching($categoryModel->id);
			}
		}

		// variants
		if ($request->input("variants")) {
			foreach ($request->variants as $variant) {

				if (!isset($variant['id'])) {
					$variantModel = ProductVariant::create(array(
						"name" => $variant['name'],
						"price" => $variant['price'],
						"product_id" => $product->id,
					));
				} else {
					$variantModel = ProductVariant::where('id', $variant['id'])->first();
					$variantModel->update(array(
						"name" => $variant['name'],
						"price" => $variant['price'],
						"product_id" => $product->id,
					));
				}

				foreach ($variant['images'] as $image) {

					if (DB::table('imageables')->where('image_id', $image['id'])->count() > 0) {
						continue;
					}


					DB::table('imageables')->insert([
						'image_id' => $image['id'],
						'imageable_id' => $variantModel->id,
						'imageable_type' => 'App\Models\ProductVariant'
					]);
				}


				if ($request->similar_products) {
					foreach ($request->similar_products as $similar_product) {

						$title = $similar_product['title'];

						$similarProduct = Product::where('title', $title)->first();

						if ($product->similar_products()->where('similar_product_id', $similarProduct->id)->count() > 0) {
							continue;
						}

						$product->similar_products()->attach($similarProduct->id);
					}
				}

				if ($variant["attributes"]) {
					foreach ($variant["attributes"] as $attribute) {

						$type = $attribute['type']['name'];
						$value = $attribute['value']['value'];

						$typeModel = AttributeType::where('name', $type)->first();
						$valueModel = AttributeValue::where('value', $value)->first();

						$attribute = Attribute::where("attribute_type_id", $typeModel->id)->where("attribute_value_id", $valueModel->id)->first();

						if ($attribute && $variantModel->attributes()->where('attribute_id', $attribute->id)->count() > 0) {
							continue;
						}

						$variantModel->attributes()->attach($attribute->id);
					}
				}
			}
		}

		return response()->json([
			'message' => 'Product created'
		], 200);
	}

	public function deleteCategory(Request $request)
	{
		$slug = $request->slug;
		$categoryId = $request->categoryId;

		$product = Product::where('slug', $slug)->first();

		if (!$product) {
			return response()->json([
				'message' => 'Product not found'
			], 404);
		}

		$product->categories()->detach($categoryId);

		return response()->json([
			'message' => 'Category deleted'
		], 200);
	}
}
