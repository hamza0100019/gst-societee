<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('product_id')->constrained('products');
        $table->foreignId('supplier_id')->nullable()->constrained('suppliers');
        $table->foreignId('client_id')->nullable()->constrained('clients');
        $table->enum('type', ['in', 'out']);
        $table->integer('quantity');
        $table->decimal('total_price', 10, 2);
        $table->timestamp('date')->useCurrent();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
