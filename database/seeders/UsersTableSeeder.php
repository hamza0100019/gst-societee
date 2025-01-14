<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Mise à jour ou insertion des données pour l'Admin User
        DB::table('users')->updateOrInsert(
            ['email' => 'admin@example.com'], // Critère pour vérifier l'existence
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'position' => 'Manager',
                'salary' => 8000.00,
                'hire_date' => '2023-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Mise à jour ou insertion des données pour l'Employee User
        DB::table('users')->updateOrInsert(
            ['email' => 'employee@example.com'], // Critère pour vérifier l'existence
            [
                'name' => 'Employee User',
                'password' => Hash::make('password'),
                'role' => 'employee',
                'position' => 'Developer',
                'salary' => 5000.00,
                'hire_date' => '2023-02-01',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        // Ajout d'utilisateurs supplémentaires si nécessaire
        for ($i = 1; $i <= 5; $i++) {
            DB::table('users')->updateOrInsert(
                ['email' => "user{$i}@example.com"], // Critère d'unicité
                [
                    'name' => "User {$i}",
                    'password' => Hash::make('password'),
                    'role' => 'employee',
                    'position' => 'Staff',
                    'salary' => rand(3000, 6000),
                    'hire_date' => now()->subDays($i),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
