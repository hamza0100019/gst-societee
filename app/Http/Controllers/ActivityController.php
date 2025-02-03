<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    public function activitySection()
    {
        // Obtenir la date d'aujourd'hui et d'hier
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();

        // Récupérer les données nécessaires depuis la base de données
        $todaysMoney = DB::table('sales')->whereDate('created_at', $today)->sum('amount');
        $yesterdaysMoney = DB::table('sales')->whereDate('created_at', $yesterday)->sum('amount');

        $todaysUsers = DB::table('users')->whereDate('created_at', $today)->count();
        $yesterdaysUsers = DB::table('users')->whereDate('created_at', $yesterday)->count();

        $newClients = DB::table('clients')->whereDate('created_at', $today)->count();
        $yesterdaysClients = DB::table('clients')->whereDate('created_at', $yesterday)->count();

        $totalSales = DB::table('sales')->sum('amount');

        // Calculer les pourcentages
        $todaysMoneyPercentage = $yesterdaysMoney > 0 ? (($todaysMoney - $yesterdaysMoney) / $yesterdaysMoney) * 100 : 0;
        $todaysUsersPercentage = $yesterdaysUsers > 0 ? (($todaysUsers - $yesterdaysUsers) / $yesterdaysUsers) * 100 : 0;
        $newClientsPercentage = $yesterdaysClients > 0 ? (($newClients - $yesterdaysClients) / $yesterdaysClients) * 100 : 0;

        // Retourner les données en format JSON
        return response()->json([
            'todaysMoney' => [
                'value' => number_format($todaysMoney, 2),
                'percentage' => round($todaysMoneyPercentage, 2),
            ],
            'todaysUsers' => [
                'value' => $todaysUsers,
                'percentage' => round($todaysUsersPercentage, 2),
            ],
            'newClients' => [
                'value' => $newClients,
                'percentage' => round($newClientsPercentage, 2),
            ],
            'totalSales' => [
                'value' => number_format($totalSales, 2),
                'percentage' => 0, // Pas de pourcentage pour les ventes totales
            ],
        ]);
    }
}


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

