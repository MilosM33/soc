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
}
