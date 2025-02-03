<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $userRoles = User::select('role', DB::raw('count(*) as count'))
            ->groupBy('role')
            ->get();
        return response()->json($userRoles);
    }
}
