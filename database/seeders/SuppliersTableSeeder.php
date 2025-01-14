<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SuppliersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('suppliers')->insert([
            [
                'name' => 'Supplier 1',
                'email' => 'supplier1@example.com',
                'phone' => '0609876543',
                'address' => 'Supplier Address 1',
            ],
            [
                'name' => 'Supplier 2',
                'email' => 'supplier2@example.com',
                'phone' => '0654321098',
                'address' => 'Supplier Address 2',
            ],
        ]);
    }
}
