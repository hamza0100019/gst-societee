<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::select('month', 'revenue', 'profit')->get();
        return response()->json($sales);
    }
    public function getRevenueTrend()
{
    $revenueData = Sale::select('month', 'revenue', 'profit')->orderBy('month')->get();
    return response()->json($revenueData);
}

}
