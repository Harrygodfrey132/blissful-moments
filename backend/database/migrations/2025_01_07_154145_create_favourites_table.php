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
        Schema::create('favourites', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('page_id');
            $table->string('tagline')->nullable();
            $table->boolean('status')->default(true);
            $table->foreign('page_id')->references('id')->on('pages')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('favourites_event', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('favourite_id');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->foreign('favourite_id')->references('id')->on('favourites')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favourites');
        Schema::dropIfExists('favourites_event');
    }
};
