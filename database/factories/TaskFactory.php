<?php

namespace Database\Factories;

use App\Models\Lists;
use App\Models\User;
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
            'user_id' => function () {
                return User::inRandomOrder()->first()->id;
            },
            'list_id' => function (array $attributes) {
                // Get the user associated with the generated user_id
                $user = User::find($attributes['user_id']);

                if (!$user) {
                    return null; // Return null if user is not found
                }

                // Get the list IDs associated with the user
                $listIds = $user->lists->pluck('id')->toArray();

                if (empty($listIds)) {
                    // Create a new list for the user if they have no lists
                    $list = Lists::factory()->create([
                        'user_id' => $user->id
                    ]);
                    return $list->id;
                }

                // Generate a random list ID from the user's associated list IDs
                return $this->faker->randomElement($listIds);
            },
            'due_date' => $this->faker->date(),
            'priority_id' => $this->faker->numberBetween(1, 3),
            'completed' => $this->faker->boolean(false)
        ];
    }
}
