<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactionData = Transaction::select('type', DB::raw('sum(quantity) as total_quantity'))
            ->groupBy('type')
            ->get();
        return response()->json($transactionData);
    }
    
}
