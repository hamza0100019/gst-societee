<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SalariesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('salaries')->insert([
            [
                'user_id' => 1,
                'amount' => 5000.00,
                'bonus' => 500.00,
                'deductions' => 200.00,
                'payment_date' => now(),
            ],
            [
                'user_id' => 2,
                'amount' => 3000.00,
                'bonus' => 300.00,
                'deductions' => 100.00,
                'payment_date' => now(),
            ],
        ]);
    }
}
