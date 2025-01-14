<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TransactionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('transactions')->insert([
            [
                'product_id' => 1,
                'supplier_id' => 1,
                'client_id' => null,
                'type' => 'in',
                'quantity' => 20,
                'total_price' => 2000.00,
                'date' => now(),
            ],
            [
                'product_id' => 2,
                'supplier_id' => null,
                'client_id' => 1,
                'type' => 'out',
                'quantity' => 5,
                'total_price' => 1000.00,
                'date' => now(),
            ],
        ]);
    }
}
