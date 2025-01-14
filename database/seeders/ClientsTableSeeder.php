<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ClientsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('clients')->insert([
            [
                'name' => 'Client 1',
                'email' => 'client1@example.com',
                'phone' => '0612345678',
                'address' => 'Address 1',
                'notes' => 'Important client',
            ],
            [
                'name' => 'Client 2',
                'email' => 'client2@example.com',
                'phone' => '0678901234',
                'address' => 'Address 2',
                'notes' => 'Loyal client',
            ],
        ]);
    }
}
