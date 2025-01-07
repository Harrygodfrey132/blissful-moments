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

        Schema::create('contribution_data', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contribution_id');
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->foreign('contribution_id')->references('id')->on('contributions')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contribution_data');
    }
};
