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
        Schema::create('products_variants_attributes', function (Blueprint $table) {
            $table->id();
            $table->integer("attribute_id")->references("id")->on("attributes");
            $table->integer("products_variants_id")->references("id")->on("products_variants");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products_variants_attributes');
    }
};
