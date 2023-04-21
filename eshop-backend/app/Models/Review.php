<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
	use HasFactory;
	protected $table = 'reviews';
	protected $fillable = ['rating', 'comment', 'product_variant_id', 'user_id'];


	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function productVariant()
	{
		return $this->belongsTo(ProductVariant::class);
	}
}
