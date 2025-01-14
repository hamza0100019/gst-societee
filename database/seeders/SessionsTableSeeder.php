<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SessionsTableSeeder extends Seeder
{
    public function run()
    {
        // Nettoie la table pour éviter les conflits
        DB::table('sessions')->truncate();

        // Insère des données avec des IDs uniques
        DB::table('sessions')->insert([
            [
                'id' => uniqid(), // Génère un ID unique
                'user_id' => 1,
                'ip_address' => '192.168.1.1',
                'user_agent' => 'Mozilla/5.0',
                'payload' => 'sample_payload',
                'last_activity' => time(),
            ],
            [
                'id' => uniqid(), // Génère un autre ID unique
                'user_id' => 2,
                'ip_address' => '192.168.1.2',
                'user_agent' => 'Mozilla/5.0',
                'payload' => 'sample_payload2',
                'last_activity' => time(),
            ],
        ]);
    }
}
