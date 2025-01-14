<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            SessionsTableSeeder::class,
            UsersTableSeeder::class,
            ProductsTableSeeder::class,
            ClientsTableSeeder::class,
            SuppliersTableSeeder::class,
            TransactionsTableSeeder::class,
            AttendancesTableSeeder::class,
            SalariesTableSeeder::class,
        ]);
    }
}
