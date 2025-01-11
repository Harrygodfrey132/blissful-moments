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
        Schema::create('contribution_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contribution_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('full_name')->nullable();
            $table->string('email')->nullable();
            $table->integer('status')->default(0);
            $table->timestamps();

            $table->foreign('contribution_id')->references('id')->on('contributions')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contribution_requests');
    }
};
