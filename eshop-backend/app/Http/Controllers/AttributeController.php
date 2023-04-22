<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attribute;
use App\Models\AttributeFilter;
use App\Models\AttributeType;
use App\Models\AttributeValue;
use App\Models\ProductVariant;
use App\Models\VariantAttribute;
use Illuminate\Support\Facades\DB;

class AttributeController extends Controller
{
	public function searchAttributes(Request $request)
	{
		$query = $request->query('query');

		$type = '';
		$value = '';

		if (strpos($query, ':') !== false) {
			$type = explode(':', $query)[0];
			$value = explode(':', $query)[1];
		} else {
			$type = $query;
			$value = false;
		}

		$attributes = Attribute::whereHas('type', function ($query) use ($type) {
			$query->where('name', 'like', '%' . $type . '%');
		})->whereHas('value', function ($query) use ($value) {
			if ($value != false)
				$query->where(
					'value',
					'like',
					'%' . $value . '%'
				);
		})->get();

		$attributes->load('type', 'value');

		$attributes = $attributes->map(function ($attribute) {
			return [
				'id' => $attribute->id,
				'type' => $attribute->type,
				'value' => $attribute->value,
				"option" => $attribute->type->name . ": " . $attribute->value->value
			];
		});

		return response()->json($attributes);
	}

	public function removeAttribute(Request $request)
	{
		$attribute = Attribute::find($request->id);

		$variant = ProductVariant::where('id', $request->variantId)->first();

		$variant->attributes()->detach($attribute->id);

		return response()->json($attribute);
	}


	public function filterAttributes(Request $request)
	{

		$attribute = Attribute::query();

		if ($request->attribute_name) {
			$attribute->whereHas('type', function ($query) use ($request) {
				$query->where('name', 'like', '%' . $request->attribute_name . '%');
			});
		}

		if ($request->attribute_value) {
			$attribute->whereHas('value', function ($query) use ($request) {
				$query->where('value', 'like', '%' . $request->attribute_value . '%');
			});
		}

		$attribute->with('type', 'value');

		$attribute = $attribute->get();

		$attributes = $attribute->map(function ($attribute) {
			return [
				'id' => $attribute->id,
				'type' => $attribute->type,
				'value' => $attribute->value,
				"option" => $attribute->type->name . ": " . $attribute->value->value
			];
		});
		return response()->json($attributes);
	}

	public function deleteAttribute(Request $request)
	{
		$attribute = Attribute::find($request->id);

		$attribute->delete();

		return response()->json($attribute);
	}

	public function createAttributeType(Request $request)
	{
		$attribute = AttributeType::create([
			'name' => $request->name,
			'description' => $request->description,
		]);

		return response()->json($attribute);
	}

	public function createAttributeValue(Request $request)
	{
		$attribute = AttributeValue::create([
			'value' => $request->value,
			'description' => $request->description,
		]);

		return response()->json($attribute);
	}

	public function filterAttributeTypes(Request $request)
	{
		$attribute = AttributeType::query();

		if ($request->name) {
			$attribute->where('name', 'like', '%' . $request->name . '%');
		}


		$attribute = $attribute->get();

		return response()->json($attribute);
	}

	public function filterAttributeValues(Request $request)
	{
		$attribute = AttributeValue::query();

		if ($request->value) {
			$attribute->where('value', 'like', '%' . $request->value . '%');
		}


		$attribute = $attribute->get();

		return response()->json($attribute);
	}

	public function createAttributes(Request $request)
	{

		$attribute_type_id = AttributeType::where('name', $request->attribute_name)->first()->id;
		$attribute_value_id = AttributeValue::where('value', $request->attribute_value)->first()->id;


		$attribute = Attribute::create([
			'attribute_type_id' => $attribute_type_id,
			'attribute_value_id' => $attribute_value_id,
		]);

		return response()->json($attribute);
	}

	public function searchFilters(Request $request)
	{
		$attributes = AttributeFilter::whereHas('attributeType', function ($query) use ($request) {
			$query->where('name', 'like', '%' . $request->input('attribute_type') . '%')->where("filter_type", "like", "%" . $request->input("filter_type") . "%");
		})->with('attributeType')->paginate($request->show, ['*'], 'page', $request->page);

		return response()->json($attributes);
	}


	public function searchFilterType(Request $request)
	{
		$filterType = $request->input("filterType");
		$attributes = AttributeFilter::select("filter_type")->distinct()->where("filter_type", "like", "%" . $filterType . "%")->get();

		return response()->json($attributes);
	}


	public function createAttributeFilter(Request $request)
	{
		AttributeFilter::create([
			"attribute_type_id" => $request->input("attribute_type_id"),
			"filter_type" => $request->input("filter_type")
		]);

		return response()->json([
			"status" => "Successfull"
		]);
	}
	public function updateAttributeFilter(Request $request)
	{
		AttributeFilter::where("id", $request->input("id"))->update([
			"attribute_type_id" => $request->input("attribute_type_id"),
			"filter_type" => $request->input("filter_type"),
		]);

		return response()->json([
			"status" => "Successfull"
		]);
	}
	public function removeAttributeFilter(Request $request)
	{
		AttributeFilter::where("id", $request->input("id"))->delete();

		return response()->json([
			"status" => "Successfull"
		]);
	}
}
