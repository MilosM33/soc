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
        Schema::create('attribute_filters', function (Blueprint $table) {
            $table->id();
            $table->integer("attribute_type_id")->foreign("attribute_type_id")->references("id")->on("attribute_type");
            $table->string("filter_type");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attribute_filters');
    }
};

