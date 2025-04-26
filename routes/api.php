<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
// use App\Http\Controllers\SalarieController;
// use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\ExpensesTable;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard', function () {
        return response()->json(['message' => 'Welcome to the dashboard']);
    });
   

});

Route::middleware(['auth:sanctum'])->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Logged out successfully']);
});


// Route::get('/sanctum/csrf-cookie', function () {
//     return response()->json(['message' => 'CSRF cookie set']);
// });

Route::get('/activities', [ActivityController::class, 'index']);
// Route::get('/clients', [ApiController::class, 'getClients']);
// Route::get('/employees', [ApiController::class, 'getEmployees']);
// Route::get('/products', [ApiController::class, 'getProducts']);
// Route::get('/suppliers', [ApiController::class, 'getSuppliers']);
// Route::get('/users', [ApiController::class, 'getUsers']);


Route::apiResource('clients', ClientController::class);
Route::apiResource('products', ProductController::class);
Route::post('/products/update/{id}', [ProductController::class, 'update']);

Route::get('/clients', [ApiController::class, 'getClients']);
Route::get('/employees', [ApiController::class, 'getEmployees']);
Route::get('/products', [ApiController::class, 'getProducts']);
Route::get('/stocks', [ApiController::class, 'getStocks']);
Route::get('/suppliers', [ApiController::class, 'getSuppliers']);
Route::get('/users', [ApiController::class, 'getUsers']);
 






Route::get('sales', [SaleController::class, 'index']);
Route::get('clients', [ClientController::class, 'index']);
Route::get('products', [ProductController::class, 'index']);
Route::get('salaries', [SalaryController::class, 'index']);
Route::get('transactions', [TransactionController::class, 'index']);
Route::get('users', [UserController::class, 'index']);
Route::get('suppliers', [SupplierController::class, 'index']);
Route::get('sessions', [SessionController::class, 'index']);
Route::get('revenue-trend', [SaleController::class, 'getRevenueTrend']);
Route::get('suppliers-data', [SupplierController::class, 'getSupplierData']);







Route::get('expenses', [ExpenseController::class, 'index']); // Récupérer toutes les dépenses
Route::post('expenses', [ExpenseController::class, 'store']); // Ajouter une nouvelle dépense
Route::get('expenses/{id}', [ExpenseController::class, 'show']); // Afficher une dépense spécifique
Route::put('expenses/{id}', [ExpenseController::class, 'update']); // Mettre à jour une dépense
Route::delete('expenses/{id}', [ExpenseController::class, 'destroy']); // Supprimer une dépense

Route::get('sales-by-country', [ClientController::class, 'getSalesByCountry']); // Récupérer les ventes par pays



Route::get('/activity-section', [ActivityController::class, 'activitySection']);



// Route::apiResource('salaries', SalarieController::class);
// Route::apiResource('suppliers', SupplierController::class);

