<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUpload extends Controller
{
	public function uploadFile(Request $request)
	{
		if ($request->hasFile('file')) {
			$file = $request->file('file');

			// Generate a unique file name
			$filename = uniqid() . '_' . $file->getClientOriginalName();

			// Save the file to the storage/app/public directory
			$file->move(public_path("images/blog"), $filename);


			return response()->json(['url' => config("app.API_URL") . "/images/blog/" . $filename]);
		}
	}
}
