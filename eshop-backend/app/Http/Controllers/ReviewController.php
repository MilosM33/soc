<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        if ($product->count() == 0) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $review = $product->reviews()->join(
            'users',
            'users.id',
            '=',
            'reviews.user_id'
        )->select(
            'reviews.rating',
            'reviews.comment',
            'reviews.created_at',
            'reviews.updated_at',
            'users.id',
            'users.name'
        )->get();

        if ($review->count() == 0) {
            return response()->json(['error' => 'Product has no reviews'], 404);
        }

        if (auth() && auth()->user() !== null) {
            $userId = auth()->user()->id;
            $reviewIndex = $review->search(function ($item) use ($userId) {
                return $item->id == $userId;
            });
            if ($reviewIndex !== false) {
                $review[$reviewIndex]->is_Author = true;
            }
        }
        $review = $review->map(function ($item) {
            unset($item->id);
            return $item;
        });

        return $review;
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
