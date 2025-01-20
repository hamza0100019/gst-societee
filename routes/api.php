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


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

Route::get('/activities', [ActivityController::class, 'index']);
// Route::get('/clients', [ApiController::class, 'getClients']);
// Route::get('/employees', [ApiController::class, 'getEmployees']);
// Route::get('/products', [ApiController::class, 'getProducts']);
// Route::get('/suppliers', [ApiController::class, 'getSuppliers']);
// Route::get('/users', [ApiController::class, 'getUsers']);


Route::apiResource('clients', ClientController::class);
Route::apiResource('products', ProductController::class);
Route::post('/products/update/{id}', [ProductController::class, 'update']);

// Route::apiResource('salaries', SalarieController::class);
// Route::apiResource('suppliers', SupplierController::class);
