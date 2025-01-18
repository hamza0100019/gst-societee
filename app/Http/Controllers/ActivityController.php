<?php
namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        // Fetch the latest 10 activities
        $activities = Activity::orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json($activities);
    }
}
