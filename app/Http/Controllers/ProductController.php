<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $productData = Product::select('category', DB::raw('sum(quantity) as quantity'))
            ->groupBy('category')
            ->get();
        return response()->json($productData);
    }
}
