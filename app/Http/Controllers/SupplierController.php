<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        $supplierData = Supplier::select('address', DB::raw('count(*) as count'))
            ->groupBy('address')
            ->get();
        return response()->json($supplierData);
    }
    public function getSupplierData()
{
    $suppliers = Supplier::select('address', DB::raw('count(*) as count'))
        ->groupBy('address')
        ->get();
    return response()->json($suppliers);
}

}
