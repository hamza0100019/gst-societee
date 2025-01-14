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
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->enum('role', ['admin', 'employee'])->default('employee');
        $table->string('position')->nullable();
        $table->decimal('salary', 10, 2)->nullable();
        $table->date('hire_date')->nullable();
        $table->rememberToken(); // Ajoutez cette ligne
        $table->timestamps();
    });
    
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
