<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;use App\Models\Expense;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('department'); // Nom du département (RH, IT, etc.)
            $table->decimal('salaries', 10, 2)->default(0); // Dépenses pour les salaires
            $table->decimal('marketing', 10, 2)->default(0); // Dépenses pour le marketing
            $table->decimal('logistics', 10, 2)->default(0); // Dépenses pour la logistique
            $table->timestamps(); // Colonnes created_at et updated_at
        });
    }

    public function getExpenses()
    {
        // Récupérer toutes les dépenses
        $expenses = Expense::all();

        return response()->json($expenses);
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses');
    }
}

