<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@yopmail.com',
            'password' => Hash::make('password'),
            'role_id' => User::ADMIN
        ]);

        UserDetail::create([
            'user_id' => $user->id,
            'first_name' => 'Admin',
            'last_name' => 'Admin',
        ]);
    }
}
