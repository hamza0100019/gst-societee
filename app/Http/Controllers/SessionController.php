<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        $sessionData = Session::select('user_id', 'ip_address', 'last_activity')
            ->get();
        return response()->json($sessionData);
    }
}
