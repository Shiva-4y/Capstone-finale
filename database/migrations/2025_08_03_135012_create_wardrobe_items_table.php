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
        Schema::create('wardrobe_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category'); // e.g., 'shirts', 'pants', 'dresses', 'shoes', etc.
            $table->string('subcategory')->nullable(); // e.g., 'casual', 'formal', 'sportswear'
            $table->string('color');
            $table->string('size');
            $table->string('brand')->nullable();
            $table->string('condition'); // 'new', 'like_new', 'good', 'fair', 'poor'
            $table->decimal('price', 10, 2)->nullable(); // null if not for sale
            $table->boolean('is_for_sale')->default(false);
            $table->string('image_path');
            $table->json('tags')->nullable(); // for AI recommendations later
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wardrobe_items');
    }
};
