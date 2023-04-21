<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{

	public function index(Request $request)
	{
		$news = News::where("title", $request->input("title"))->first();

		return response()->json($news);
	}



	public function show(Request $request)
	{
		$news = News::orderBy('created_at', 'desc')->paginate(10, ['*'], 'page', $request->page);
		return response()->json($news);
	}
	public function store(Request $request)
	{
		News::create([
			"author" =>  Auth::user()->name,
			"image" => $request->input("thumbnailUrl"),
			"title" => $request->input("title"),
			"short_text" => $request->input("short_text"),
			"content" => "test"


		]);

		return response()->json(
			[
				"status" => "Success"
			]
		);
	}
	public function update(Request $request)
	{
	}

	public function remove(Request $request)
	{

		$id = $request->input("id");

		News::where("id", $id)->delete();

		return response()->json([
			"status" => "Blog removed"
		]);
	}


	public function filter(Request $request)
	{
		$news = News::query();

		if ($request->has('title')) {
			$news->where('title', 'like', '%' . $request->title . '%');
		}

		if ($request->has('modified')) {
			$news->where('updated_at', 'like', '%' . $request->modified . '%');
		}

		return response()->json($news->paginate($request->show, ['*'], 'page', $request->page));
	}
}
