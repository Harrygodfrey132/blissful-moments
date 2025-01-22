<!-- Password Reset Form -->
<div class="mb-2">
    <h1 class="font-semibold text-lg">Password Reset</h1>
</div>

<div x-data="{ password: '', confirmPassword: '', passwordVisible: false, confirmPasswordVisible: false }" class="space-y-4">
    <form action="{{ route('users.page.password.reset', $user) }}" method="post">
        @csrf
        <!-- Password Field -->
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input x-bind:type="passwordVisible ? 'text' : 'password'" x-model="password"
                placeholder="Enter new password" name="password"
                class="relative w-full px-4 py-2 text-sm border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            <!-- Eye Icon for toggling password visibility -->
            <span @click="passwordVisible = !passwordVisible"
                class="absolute right-11 -mt-4 transform -translate-y-1/2 cursor-pointer text-gray-600">
                <x-icon-eye-close x-show="!passwordVisible" class="h-5 w-5"/>
                <x-icon-eye-open x-show="passwordVisible" class="h-5 w-5"/>
            </span>
        </div>

        <!-- Confirm Password Field -->
        <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2 mt-2">Confirm Password</label>
            <input x-bind:type="confirmPasswordVisible ? 'text' : 'password'" x-model="confirmPassword" name="password_confirmation"
                placeholder="Confirm new password"
                class="relative w-full px-4 py-2 text-sm border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            <!-- Eye Icon for toggling password visibility -->
            <span @click="confirmPasswordVisible = !confirmPasswordVisible"
                class="absolute right-11 -mt-4 transform -translate-y-1/2 cursor-pointer text-gray-600">
                <x-icon-eye-close x-show="!confirmPasswordVisible" class="h-5 w-5"/>
                <x-icon-eye-open x-show="confirmPasswordVisible" class="h-5 w-5"/>
            </span>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-3">
            <button type="submit" class="bg-black text-white px-4 py-2 rounded transition">
                Submit
            </button>
        </div>
    </form>
</div>
