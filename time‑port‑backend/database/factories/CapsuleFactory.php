<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Capsule;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Capsule>
 */
class CapsuleFactory extends Factory
{
    protected $model = Capsule::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->word(),
            'country' => $this->faker->country(),
            'is_activated' => $this->faker->boolean(),
            'is_surprise' => $this->faker->boolean(),
            'is_public' => $this->faker->boolean(),
            'mood' => $this->faker->randomElement(['happy','sad','excited','nostalgic']),
            'message' => $this->faker->paragraph(),
            'activation_date' => $this->faker->optional()->dateTimeBetween('now'),
            

        ];
    }
}
