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
        Schema::create('productAttributes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attribute_type_id');
            $table->unsignedBigInteger('attribute_value_id');

            $table->foreign('attribute_type_id')->references('id')->on('attribute_types');
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_attributes');
    }
};
