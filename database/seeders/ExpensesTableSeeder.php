<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expense;

class ExpensesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Expense::create([
            'department' => 'HR',
            'salaries' => 5000.00,
            'marketing' => 2000.00,
            'logistics' => 1000.00,
        ]);

        Expense::create([
            'department' => 'IT',
            'salaries' => 7000.00,
            'marketing' => 3000.00,
            'logistics' => 1500.00,
        ]);

        Expense::create([
            'department' => 'Sales',
            'salaries' => 6000.00,
            'marketing' => 4000.00,
            'logistics' => 2000.00,
        ]);
    }
}
