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
        Schema::table('url_redirects', function (Blueprint $table) {
            $table->renameColumn('original_url' , 'old_page_name');
            $table->renameColumn('custom_url' , 'new_page_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('url_redirects', function (Blueprint $table) {
            //
        });
    }
};
