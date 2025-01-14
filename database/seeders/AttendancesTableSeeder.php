<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class AttendancesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('attendances')->insert([
            [
                'user_id' => 1,
                'date' => '2025-01-10',
                'status' => 'present',
            ],
            [
                'user_id' => 2,
                'date' => '2025-01-10',
                'status' => 'late',
            ],
        ]);
    }
}
