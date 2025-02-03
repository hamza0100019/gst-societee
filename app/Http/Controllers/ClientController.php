<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clientDistribution = Client::select('address', DB::raw('count(*) as count'))
            ->groupBy('address')
            ->get();
        return response()->json($clientDistribution);
    }
    public function getSalesByCountry()
    {
        // Récupérer les données essentielles groupées par pays
        $data = DB::table('clients')
            ->join('sales', 'clients.id', '=', 'sales.id') // Association entre clients et ventes
            ->select(
                'clients.country', // Pays du client
                DB::raw('COUNT(sales.id) as sales'), // Nombre total de ventes
                DB::raw('SUM(sales.amount) as total_sales_amount'), // Montant total des ventes
                DB::raw('COUNT(clients.id) as total_clients') // Nombre total de clients
            )
            ->groupBy('clients.country')
            ->get();

        return response()->json($data);
    }
}

