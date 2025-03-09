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
        Schema::table('plans', function (Blueprint $table) {
            $table->string('stripe_product_id')->nullable()->after('name');
        });

        Schema::table('plan_variations', function (Blueprint $table) {
            $table->string('stripe_price_id')->nullable()->after('plan_id');
            $table->dropColumn('billing_cycle');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn('stripe_product_id');
        });

        Schema::table('plan_variations', function (Blueprint $table) {
            $table->dropColumn('stripe_price_id');
        });
    }
};
