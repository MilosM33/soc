<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeFilter extends Model
{
	use HasFactory;
	protected $table = 'attribute_filters';
	public $timestamps = false;

	public $fillable = [
		"attribute_type_id",
		"filter_type"
	];

	public function attributeType()
	{
		return $this->belongsTo(AttributeType::class);
	}
}
