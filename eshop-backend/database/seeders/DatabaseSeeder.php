<?php

namespace Database\Seeders;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Product::factory(10)->create();
        \App\Models\ProductVariant::factory(10)->create();


        // Add categories
        #region 
        DB::table('product_categories')->insert([
            [
                'name' => "Woman's Clothing",
                'slug' => "woman-s-clothing",
                'description' => "A category for women's clothing.",
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/womanClothing.jpg"
            ],
            [
                'name' => "Man's Clothing",
                'slug' => "man-s-clothing",
                'description' => "A category for men's clothing.",
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/manClothing.jpg"
            ],
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'description' => 'A category for electronic products.',
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/electronics.jpg"
            ],
            [
                'name' => 'Home Decor',
                'slug' => 'home-decor',
                'description' => 'A category for home decor products.',
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/homeDecor.jpg"
            ],
            [
                'name' => 'Furniture',
                'slug' => 'furniture',
                'description' => 'A category for furniture products.',
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/furniture.jpg"
            ],
            [
                'name' => 'Beauty',
                'slug' => 'beauty',
                'description' => 'A category for beauty products.',
                'parent_id' => null,
                'image' => env("API_URL") . "/images/categories/beauty.jpg"
            ]
        ]);

        // Add subcategories
        DB::table('product_categories')->insert([
            [
                'name' => "Dresses",
                'slug' => "dresses",
                'description' => "A subcategory for dresses.",
                'parent_id' => 1
            ],
            [
                'name' => "Skirts",
                'slug' => "skirts",
                'description' => "A subcategory for skirts.",
                'parent_id' => 1
            ],
            [
                'name' => "Tops",
                'slug' => "tops",
                'description' => "A subcategory for tops.",
                'parent_id' => 1
            ],
            [
                'name' => "Jeans",
                'slug' => "jeans",
                'description' => "A subcategory for jeans.",
                'parent_id' => 2
            ],
            [
                'name' => "Suits",
                'slug' => "suits",
                'description' => "A subcategory for suits.",
                'parent_id' => 2
            ]
        ]);


        // Add products - categories
        DB::table("products_categories")->insert([
            [
                'product_id' => 1,
                'category_id' => 1,
            ],
            [
                'product_id' => 2,
                'category_id' => 1,
            ],
            [
                'product_id' => 3,
                'category_id' => 1,
            ],
            [
                'product_id' => 4,
                'category_id' => 1,
            ],
            [
                'product_id' => 5,
                'category_id' => 1,
            ],
            [
                'product_id' => 6,
                'category_id' => 1,
            ],
            [
                'product_id' => 7,
                'category_id' => 1,
            ],
            [
                'product_id' => 8,
                'category_id' => 1,
            ],
            [
                'product_id' => 9,
                'category_id' => 1,
            ],
            [
                'product_id' => 10,
                'category_id' => 1,
            ],
        ]);



        // Add images
        DB::table("images")->insert([
            [
                'path' => 'http://localhost:8000/images/green.jpg',
            ],
            [
                'path' => 'http://localhost:8000/images/red.jpg',
            ],

        ]);

        // Add imagable
        DB::table("imageables")->insert([
            [
                'image_id' => 1,
                'imageable_id' => 1,
                'imageable_type' => 'App\Models\ProductVariant',
            ],
            [
                'image_id' => 1,
                'imageable_id' => 1,
                'imageable_type' => 'App\Models\ProductVariant',
            ],
            [
                'image_id' => 1,
                'imageable_id' => 1,
                'imageable_type' => 'App\Models\ProductVariant',
            ],
            [
                'image_id' => 2,
                'imageable_id' => 2,
                'imageable_type' => 'App\Models\ProductVariant',
            ],
        ]);

        // add user
        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password'),
            ]
        ]);
    }
}
