<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'img_path' => $this->faker->imageUrl(word: "product"),
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 0, 100),
        ];
    }
}
