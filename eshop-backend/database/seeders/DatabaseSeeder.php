<?php

namespace Database\Seeders;

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

        \App\Models\Order::factory(10)->create();

        \App\Models\Review::factory(10)->create();

        DB::insert('INSERT INTO `attribute_types` (`id`, `name`, `description`) VALUES (1, "Color", "Color of the product");');
        DB::insert('INSERT INTO `attribute_types` (`id`, `name`, `description`) VALUES (2, "Size", "Size of the product");');
        DB::insert('INSERT INTO `attribute_types` (`id`, `name`, `description`) VALUES (3, "Weight", "Weight of the product");');

        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (1, "Red", "Red color");');
        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (2, "Blue", "Blue color");');
        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (3, "Green", "Green color");');

        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (4, "Small", "Small size");');
        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (5, "Medium", "Medium size");');
        DB::insert('INSERT INTO `attribute_values` (`id`, `value`, `description`) VALUES (6, "Large", "Large size");');

        DB::insert('INSERT INTO `products_attributes` (`product_id`, `attribute_id`) VALUES (1, 1);');
        DB::insert('INSERT INTO `products_attributes` (`product_id`, `attribute_id`) VALUES (1, 2);');
        DB::insert('INSERT INTO `products_attributes` (`product_id`, `attribute_id`) VALUES (1, 3);');

        DB::insert('INSERT INTO `productAttributes` (`attribute_type_id`, `attribute_value_id`) VALUES (1, 1);');
        DB::insert('INSERT INTO `productAttributes` (`attribute_type_id`, `attribute_value_id`) VALUES (1, 2);');
        DB::insert('INSERT INTO `productAttributes` (`attribute_type_id`, `attribute_value_id`) VALUES (1, 3);');
        
        DB::insert('INSERT INTO `products_attributes` (`id`,`product_id`, `attribute_id`) VALUES (null,2, 1);');
        DB::insert('INSERT INTO `products_attributes` (`id`,`product_id`, `attribute_id`) VALUES (null,2, 2);');
        DB::insert('INSERT INTO `products_attributes` (`id`,`product_id`, `attribute_id`) VALUES (null, 2, 3);');
    }
}
