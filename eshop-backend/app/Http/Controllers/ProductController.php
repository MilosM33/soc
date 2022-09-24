<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::with('categories', 'images')->paginate(10);
    }

    public function info($slug)
    {
        return response("Hello World");
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {

        $products = Product::with('categories', 'variants', 'reviews', 'attributes', 'images')->where('slug', $slug);
        if ($products->count() > 0) {

            // join attributes
            $product = $products->first();
            $attributes = $product->attributes->map(function ($attribute) {
                $data = [
                    'id' => $attribute->id,
                    'type' => [
                        'id' => $attribute->attribute_type->id,
                        'name' => $attribute->attribute_type->name,
                        'description' => $attribute->attribute_type->description,
                    ],
                    'value' => [
                        'id' => $attribute->attribute_value->id,
                        'value' => $attribute->attribute_value->value,
                        'description' => $attribute->attribute_value->description,
                    ],
                ];
                return $data;
            });
            unset($product->attributes);
            $product->attributes = $attributes;
            return $product;
        }
        return response()->json(['error' => 'Product not found'], 404);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
