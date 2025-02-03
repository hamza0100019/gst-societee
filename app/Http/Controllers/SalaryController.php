<?php

namespace App\Http\Controllers;

use App\Models\Salarie;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function index()
    {
        $salaryData = Salarie::select(DB::raw('DATE(payment_date) as payment_date'), DB::raw('sum(amount) as total_amount'))
            ->groupBy('payment_date')
            ->get();
        return response()->json($salaryData);
    }
    
}
