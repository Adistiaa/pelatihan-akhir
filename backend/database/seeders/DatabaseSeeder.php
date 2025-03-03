<?php

namespace Database\Seeders;

use App\Models\User;
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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'user_24',
            'email' => 'user@user.com',
            'password' => Hash::make('user_24'),
            'role' => 'user',
        ]);

        User::factory()->create([
            'name' => 'admin_24',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin_24'),
            'role' => 'admin',
        ]);
    }
}
