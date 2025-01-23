<x-guest-layout>




    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form class="rounded-lg bg-white !pb-8 p-6 max-w-md mx-auto" method="POST" action="{{ route('password.email') }}">
    <div class="text-center">
      <img class="w-20 transition-opacity m-auto duration-300" src="{{ asset('img/logo-black-transparent.png') }}" alt="Logo">
      </div>
    <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Forgot your password?</h2>
    <p class="text-sm text-gray-600 text-center mt-4">
        {{ __('No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </p>
    
    @csrf

        <!-- Email Address -->
        <div class="relative">
            <x-icon-email />
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-7">
            <x-primary-button class="w-full">
                {{ __('Email Password Reset Link') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>