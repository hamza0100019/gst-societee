<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SalesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sales')->insert([
            [
                'month' => 'January',
                'revenue' => 5000.00,
                'profit' => 3000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'month' => 'February',
                'revenue' => 7000.00,
                'profit' => 4000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'month' => 'March',
                'revenue' => 8000.00,
                'profit' => 5000.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
