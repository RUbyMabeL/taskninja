<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lists>
 */
class ListsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Retrieve existing user IDs
        $existingUserIds = User::pluck('id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($existingUserIds),
            'name' => $this->faker->unique()->word,
            'color' => '#808080',
        ];
    }
}
