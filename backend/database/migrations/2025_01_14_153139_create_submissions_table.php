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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('access_request_id');
            $table->string('quote')->nullable();
            $table->text('obituary')->nullable();
            $table->json('timeline')->nullable();
            $table->json('gallery')->nullable();
            $table->json('favourites')->nullable();
            $table->string('tagline')->nullable();
            $table->integer('status')->nullable();
            $table->timestamps();

            $table->foreign('access_request_id')->references('id')->on('access_requests')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
