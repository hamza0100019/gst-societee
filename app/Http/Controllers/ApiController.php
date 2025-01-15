<?php
namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Salarie;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getClients()
    {
        return response()->json(Client::all());
    }

    public function getEmployees()
    {
        return response()->json(Salarie::all());
    }

    public function getProducts()
    {
        return response()->json(Product::all());
    }

    public function getStocks()
    {
        return response()->json(Stock::all());
    }

    public function getSuppliers()
    {
        return response()->json(Supplier::all());
    }

    public function getUsers()
    {
        return response()->json(User::all());
    }
}
