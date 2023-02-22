<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('variant_name');
            $table->unsignedBigInteger('variant_id');
            $table->integer('quantity');
            $table->float('price');
            $table->unsignedBigInteger('order_id');
            $table->foreign('variant_id')->references('id')->on('product_variant');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders_items');
    }
};
