<?php

namespace Database\Factories;

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
        return [
            'content' => $this->faker->sentence(5),
            'user_id' => $this->faker->numberBetween(1, 10),
            'list_id' => $this->faker->numberBetween(1, 5),
            'due_date' => $this->faker->date(),
            'priority_id' => $this->faker->numberBetween(1, 3),
            'completed' => $this->faker->boolean(false)
        ];
    }
}
