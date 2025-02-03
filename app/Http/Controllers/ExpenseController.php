<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Récupérer toutes les dépenses.
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

    /**
     * Ajouter une nouvelle dépense.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department' => 'required|string|max:255',
            'salaries' => 'required|numeric|min:0',
            'marketing' => 'required|numeric|min:0',
            'logistics' => 'required|numeric|min:0',
        ]);

        $expense = Expense::create($validated);

        return response()->json([
            'message' => 'Expense added successfully!',
            'data' => $expense,
        ], 201);
    }

    /**
     * Afficher une dépense spécifique.
     */
    public function show($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found!'], 404);
        }

        return response()->json($expense);
    }

    /**
     * Mettre à jour une dépense existante.
     */
    public function update(Request $request, $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found!'], 404);
        }

        $validated = $request->validate([
            'department' => 'sometimes|string|max:255',
            'salaries' => 'sometimes|numeric|min:0',
            'marketing' => 'sometimes|numeric|min:0',
            'logistics' => 'sometimes|numeric|min:0',
        ]);

        $expense->update($validated);

        return response()->json([
            'message' => 'Expense updated successfully!',
            'data' => $expense,
        ]);
    }

    /**
     * Supprimer une dépense.
     */
    public function destroy($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found!'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully!']);
    }
}
