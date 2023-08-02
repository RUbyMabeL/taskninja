<?php

namespace Database\Seeders;

use App\Models\Lists;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ListsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lists::factory()->count(10)->create();
    }
}
