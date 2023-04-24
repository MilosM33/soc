<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
	public function store(Request $request)
	{
		
		$request->validate([
			'rating' => 'required|integer|min:1|max:5',
			'comment' => 'required|string',
			'variantId' => 'required|integer'
		]);

		if ($request->user()->reviews()->where('product_variant_id', $request->variantId)->exists())
			return response()->json([
				'message' => 'You have already reviewed this product'
			], 400);

		$review = $request->user()->reviews()->create([
			'rating' => $request->rating,
			'comment' => $request->comment,
			'product_variant_id' => $request->variantId,
			'user_id' => $request->user()->id,
			"is_anonymous" => $request->input("user")["is_anonymous"] ? 1 : 0

		]);

		return response()->json([
			'message' => 'Review created',
			'review' => new ReviewResource($review)
		]);
	}

	public function update(Request $request)
	{
		$review = Review::find($request->reviewId);

		if ($request->user()->id !== $review->user_id)
			return response()->json([
				'message' => 'You are not allowed to update this review'
			], 403);

		$review->update([
			'rating' => $request->rating,
			'comment' => $request->comment,
			"is_anonymous" => $request->input("user")["is_anonymous"] ? 1 : 0,
			'created_at' => now()
		]);
		$review->load('user');
		return response()->json([
			'message' => 'Review updated',
			'review' => new ReviewResource($review)
		]);
	}
}
