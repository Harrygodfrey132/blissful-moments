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

        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name')->unique();
            $table->boolean('is_private')->default(false);
            $table->string('password')->nullable();
            $table->string('background_image')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('first_name')->nullable();
            $table->string('middle_name')->nullable();
            $table->string('last_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->date('death_date')->nullable();
            $table->string('address')->nullable();
            $table->string('background_music')->nullable();
            $table->timestamps();
        });

        Schema::create('personal_quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->text('quote');
            $table->timestamps();
        });

        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->string('gallery_name');
            $table->string('image_path');
            $table->text('caption')->nullable();
            $table->timestamps();
        });

        Schema::create('obituaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->onDelete('cascade');
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obituaries');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('personal_quotes');
        Schema::dropIfExists('pages');
    }
};
