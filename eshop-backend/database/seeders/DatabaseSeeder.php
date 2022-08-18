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


        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 1, 1);");
        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 1, 2);");
        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 1, 3);");
        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 2, 4);");
        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 2, 5);");
        DB::insert("INSERT INTO `product_attribute` (`id`, `attribute_type_id`, `attribute_value_id`) VALUES (null, 2, 6);");


        DB::insert("INSERT INTO `product_variants` (`id`,`name`,`product_id`,`price`) VALUES (null,'Red Variant',1,10.00),(2,'Blue',1,10.00),(3,'Green',1,10.00),(4,'Small',2,10.00),(5,'Medium',2,10.00),(6,'Large',2,10.00)");


        DB::insert("INSERT INTO `variant_attributes` (`id`,`variant_id`,`attribute_id`) VALUES (null,1,1),(null,2,1),(null,3,1),(null,4,2),(null,5,2),(null,6,2)");
    }
}
