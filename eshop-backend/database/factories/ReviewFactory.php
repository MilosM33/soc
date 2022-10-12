<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'reviewable_id' => $this->faker->numberBetween(1, 10),
            'reviewable_type' => $this->faker->randomElement(['App\Models\Product', 'App\Models\ProductVariant']),
            'user_id' => $this->faker->numberBetween(1, 2),
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->text,
        ];
    }
}
