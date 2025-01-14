<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            [
                'name' => 'Product 1',
                'description' => 'This is product 1',
                'price' => 100.00,
                'quantity' => 50,
                'expiration_date' => '2025-12-31',
                'category' => 'Category 1',
            ],
            [
                'name' => 'Product 2',
                'description' => 'This is product 2',
                'price' => 200.00,
                'quantity' => 30,
                'expiration_date' => '2025-11-30',
                'category' => 'Category 2',
            ],
        ]);
    }
}
