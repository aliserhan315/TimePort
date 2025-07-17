<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\File;
use App\Models\Capsule;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CapsuleFile>
 */

class FileFactory extends Factory
{
      protected $model = File::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filename = Str::uuid() . '.txt';
        $dir = 'capsule_files';
        return [
            'capsule_id' => Capsule::factory(),
            'file_name' => $this->faker->word() . '.txt',
            'file_type' => 'text/plain',
            'file_path'  => "{$dir}/{$filename}",
          
        ];
    }
}
