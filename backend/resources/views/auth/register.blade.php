<x-guest-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf
        <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create Account</h2>
        <!-- Name -->
        <div class="relative">
            <x-icon-name />
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required
                autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <!-- Email Address -->
        <div class="mt-4 relative">
            <x-icon-email />
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>
        <!-- Password -->
        <div class="mt-4 relative">
            <x-icon-password />
            <x-input-label for="password" :value="__('Password')" />
            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>
        <!-- Confirm Password -->
        <div class="mt-4 relative">
            <x-icon-password />
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />
            <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password"
                name="password_confirmation" required autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>
        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Register') }}
            </x-primary-button>
        </div>
        <div class="flex text-dark-charcoal text-sm text-center justify-center gap-1 mt-5">
            {{ _('Already have an account?') }}
            <a class="text-sm text-black font-medium rounded-md" href="/login">
                Log In
            </a>
        </div>
    </form>
</x-guest-layout>