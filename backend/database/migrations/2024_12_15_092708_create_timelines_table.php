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
        Schema::create('timelines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('page_id');
            $table->string('tagline')->nullable();
            $table->timestamps();

            $table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');
        });

        // If the foreign key exists in 'timeline_events', we can proceed
        Schema::table('timeline_events', function (Blueprint $table) {
            // Only drop 'page_id' foreign key and column if it exists
            if (Schema::hasColumn('timeline_events', 'page_id')) {
                $table->dropForeign(['page_id']);
                $table->dropColumn('page_id');
            }

            $table->unsignedBigInteger('timeline_id')->after('id');
            $table->dropColumn('tagline'); // Remove tagline column from timeline_events

            $table->foreign('timeline_id')->references('id')->on('timelines')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timelines');
    }
};
