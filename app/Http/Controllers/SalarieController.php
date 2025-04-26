<?php

namespace App\Http\Controllers;

use App\Models\Salarie;
use Illuminate\Http\Request;

class SalarieController extends Controller
{
    public function index()
    {
        $Salarie = Salarie::all();
        return response()->json($Salarie);
    }
}