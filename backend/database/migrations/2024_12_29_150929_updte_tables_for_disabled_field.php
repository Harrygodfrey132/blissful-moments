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
        Schema::table('personal_quotes', function (Blueprint $table) {
            $table->boolean('status')->default(true)->after('quote');
        });

        Schema::table('galleries', function (Blueprint $table) {
            $table->boolean('status')->default(true)->after('gallery_name');
        });

        Schema::table('obituaries', function (Blueprint $table) {
            $table->boolean('status')->default(true)->after('content');
        });

        Schema::table('timelines', function (Blueprint $table) {
            $table->boolean('status')->default(true)->after('tagline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
