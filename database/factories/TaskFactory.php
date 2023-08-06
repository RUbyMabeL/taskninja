<?php

namespace Database\Factories;

use App\Models\Lists;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Retrieve existing user IDs
        $existingListIds = Lists::pluck('id')->toArray();

        return [
            'content' => $this->faker->sentence(5),
            'user_id' => $this->faker->numberBetween(1, 10),
            'list_id' => $this->faker->randomElement($existingListIds),
            'due_date' => $this->faker->date(),
            'priority' => $this->faker->word(),
            'completed' => $this->faker->boolean(false)
        ];
    }
}
