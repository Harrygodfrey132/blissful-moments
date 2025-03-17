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


        if (!Schema::hasTable('plan_variations')) {
            Schema::create('plan_variations', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('plan_id');
                $table->integer('duration');
                $table->decimal('price', 10, 2);
                $table->string('stripe_price_id')->nullable();
                $table->timestamps();
            });
        }
        Schema::table('plan_variations', function (Blueprint $table) {
            if (!Schema::hasColumn('plan_variations', 'plan_id')) {
                $table->unsignedBigInteger('plan_id')->after('id');
            }

            if (!Schema::hasColumn('plan_variations', 'duration')) {
                $table->integer('duration')->after('plan_id');
            }

            if (!Schema::hasColumn('plan_variations', 'price')) {
                $table->decimal('price', 10, 2)->after('duration');
            }

            if (!Schema::hasColumn('plan_variations', 'stripe_price_id')) {
                $table->string('stripe_price_id')->nullable()->after('price');
            }
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
            if (Schema::hasColumn('plan_variations', 'stripe_price_id')) {
                $table->dropColumn('stripe_price_id');
            }

            if (Schema::hasColumn('plan_variations', 'price')) {
                $table->dropColumn('price');
            }

            if (Schema::hasColumn('plan_variations', 'duration')) {
                $table->dropColumn('duration');
            }

            if (Schema::hasColumn('plan_variations', 'plan_id')) {
                $table->dropColumn('plan_id');
            }
        });
    }
};
