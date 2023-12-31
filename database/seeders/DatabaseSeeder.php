<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password')
        ]);

        \App\Models\User::factory(3)->create();

        $this->call([
            PrioritySeeder::class
        ]);
      
        $this->call([
            ListsSeeder::class
        ]);
        
        $this->call([
            TaskSeeder::class
        ]);

       

    }
}
