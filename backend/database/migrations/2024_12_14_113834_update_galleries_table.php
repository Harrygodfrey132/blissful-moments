<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn('image_path');
            $table->dropColumn('caption')->nullable();
        });

        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->onDelete('cascade');
            $table->string('image_path')->nullable();
            $table->text('caption')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down()
    {
        Schema::dropIfExists('gallery_images');
    }
};
