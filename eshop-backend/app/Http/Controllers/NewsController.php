<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function show()
    {
        $news = News::orderBy('created_at', 'desc')->paginate(1);
        return response()->json($news);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'short_text' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        News::create([
            'author' => $validated['author'],
            'image' => $imageName,
            'short_text' => $validated['short_text'],
            'content' => $validated['content']
        ]);

        return redirect()->route('news.index')->with('success', 'News article created successfully.');
    }
}
