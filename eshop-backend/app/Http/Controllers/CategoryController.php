<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::all();
        return response()->json($categories);
    }

    public function indexCategories()
    {
        $categories = ProductCategory::where('parent_id', null)->get();
        return response()->json($categories);
    }

    public function subCategoryByCategorySlug($slug)
    {
        $categoryId = ProductCategory::where(
            [['slug', $slug]],

        )->first()['id'];

        $subCategories = ProductCategory::where('parent_id', $categoryId)->distinct()->get();
        return response()->json($subCategories);
    }

    public function navbarCategories()
    {
        $results = DB::table('product_categories as a')
            ->select('a.id', 'a.name as category_name', 'a.slug as category_slug', 'b.name as subcategory_name', 'b.slug as subcategory_slug')
            ->leftJoin('product_categories as b', 'a.id', '=', 'b.parent_id')
            ->where('a.parent_id', null)
            ->get();

        $results = $results->groupBy('category_name');
        return response()->json($results);
    }

    public function searchCategories(Request $request)
    {
        $categories = ProductCategory::query();

        if ($request->has('name')) {
            $categories->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->has('slug')) {
            $categories->where('slug', 'like', '%' . $request->slug . '%');
        }

        if ($request->has('description')) {
            $categories->where('description', 'like', '%' . $request->description . '%');
        }
        if ($request->has('parent') && $request->parent != '') {

            $parent_category = ProductCategory::where('name', 'like', '%' . $request->parent . '%')->first();

            $categories->where('parent_id', $parent_category->id);
        }

        $data = $categories->paginate($request->show, ['*'], 'page', $request->page);

        
        return response()->json(CategoryResource::collection($data));
    }

    public function createCategory(Request $request)
    {
        $category = new ProductCategory();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->description = $request->description;
        
        $parentId = ProductCategory::where('name', $request->parent_name)->first();
        $category->parent_id = $parentId->id ?? null;
        $category->save();
        return response()->json($category);
    }

    public function updateCategory(Request $request)
    {
        $category = ProductCategory::find($request->id);
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->description = $request->description;
        
        $parentId = ProductCategory::where('name', $request->parent_name)->first();
        $category->parent_id = $parentId->id ?? null;
        $category->save();
        return response()->json($category);
    }

    public function deleteCategory(Request $request)
    {
        $category = ProductCategory::find($request->id);
        $category->delete();
        return response()->json($category);
    }
}
