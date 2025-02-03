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


    // Fetch all clients
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    // Fetch a single client by ID
    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        return response()->json($client);
    }

    // Create a new client
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:clients',
            // Add other validation rules here
        ]);

        $client = Client::create($request->all());

        return response()->json(['message' => 'Client created successfully', 'client' => $client]);
    }

    // Update an existing client
    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:clients,email,' . $id,
            // Add other validation rules here
        ]);

        $client->update($request->all());

        return response()->json(['message' => 'Client updated successfully', 'client' => $client]);
    }

    // Delete a client
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }
}

