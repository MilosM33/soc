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
        DB::table('product_categories')->insert([[
            'name' => 'Clothing',
            'slug' => 'clothing',
            'description' => 'Clothing',
        ], [
            'name' => 'Shoes',
            'slug' => 'shoes',
            'description' => 'Shoes',
        ], [
            'name' => 'Accessories',
            'slug' => 'accessories',
            'description' => 'Accessories',
        ], [
            'name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'Electronics',
        ], [
            'name' => 'Home',
            'slug' => 'home',
            'description' => 'Home',
        ], [
            'name' => 'Beauty',
            'slug' => 'beauty',
            'description' => 'Beauty',
        ], [
            'name' => 'Toys',
            'slug' => 'toys',
            'description' => 'Toys',
        ], [
            'name' => 'Books',
            'slug' => 'books',
            'description' => 'Books',
        ], [
            'name' => 'Sports',
            'slug' => 'sports',
            'description' => 'Sports',
        ], [
            'name' => 'Outdoors',
            'slug' => 'outdoors',
            'description' => 'Outdoors',
        ], [
            'name' => 'Automotive',
            'slug' => 'automotive',
            'description' => 'Automotive',
        ], [
            'name' => 'Tools',
            'slug' => 'tools',
            'description' => 'Tools',
        ], [
            'name' => 'Grocery',
            'slug' => 'grocery',
            'description' => 'Grocery',
        ], [
            'name' => 'Health',
            'slug' => 'health',
            'description' => 'Health',
        ], [
            'name' => 'Baby',
            'slug' => 'baby',
            'description' => 'Baby',
        ], [
            'name' => 'Pet',
            'slug' => 'pet',
            'description' => 'Pet',
        ], [
            'name' => 'Luggage',
            'slug' => 'luggage',
            'description' => 'Luggage',
        ], [
            'name' => 'Jewelry',
            'slug' => 'jewelry',
            'description' => 'Jewelry',
        ], [
            'name' => 'Video Games',
            'slug' => 'video-games',
            'description' => 'Video Games',
        ], [
            'name' => 'Music',
            'slug' => 'music',
            'description' => 'Music',
        ], [
            'name' => 'Movies',
            'slug' => 'movies',
            'description' => 'Movies',
        ]]);
        #endregion

        // Add sub categories
        #region
        DB::table("product_sub_categories")->insert([[
            'name' => 'Tops',
            'slug' => 'tops',
            'description' => 'Tops',
        ], [
            'name' => 'Bottoms',
            'slug' => 'bottoms',
            'description' => 'Bottoms',
        ], [
            'name' => 'Dresses',
            'slug' => 'dresses',
            'description' => 'Dresses',
        ], [
            'name' => 'Shoes',
            'slug' => 'shoes',
            'description' => 'Shoes',
        ], [
            'name' => 'Accessories',
            'slug' => 'accessories',
            'description' => 'Accessories',
        ], [
            'name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'Electronics',
        ], [
            'name' => 'Home',
            'slug' => 'home',
            'description' => 'Home',
        ], [
            'name' => 'Beauty',
            'slug' => 'beauty',
            'description' => 'Beauty',
        ], [
            'name' => 'Toys',
            'slug' => 'toys',
            'description' => 'Toys',
        ], [
            'name' => 'Books',
            'slug' => 'books',
            'description' => 'Books',
        ], [
            'name' => 'Sports',
            'slug' => 'sports',
            'description' => 'Sports',
        ], [
            'name' => 'Outdoors',
            'slug' => 'outdoors',
            'description' => 'Outdoors',
        ], [
            'name' => 'Automotive',
            'slug' => 'automotive',
            'description' => 'Automotive',
        ], [
            'name' => 'Tools',
            'slug' => 'tools',
            'description' => 'Tools',
        ], [
            'name' => 'Grocery',
            'slug' => 'grocery',
            'description' => 'Grocery',
        ], [
            'name' => 'Health',
            'slug' => 'health',
            'description' => 'Health',
        ], [
            'name' => 'Baby',
            'slug' => 'baby',
            'description' => 'Baby',
        ]]);
        #endregion

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

        // Add products - sub categories

        DB::table("products_sub_categories")->insert([
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

        // Categories - sub categories
        DB::table("categories_sub_categories")->insert(
            [
                'category_id' => 1,
                'sub_category_id' => 1,
            ],
        );
    }
}
