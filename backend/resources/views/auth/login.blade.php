<x-guest-layout>
  <!-- Session Status -->
  <x-auth-session-status class="mb-4" :status="session('status')" />

  <form class="bg-gradient-to-r from-gray-100 rounded-lg p-8 max-w-md mx-auto" method="POST" action="{{ route('login') }}">
    <div class="space-y-4">
      @csrf
      <!-- Logo -->
      <div class="text-center">
        <img class="w-20 m-auto opacity-90 hover:opacity-100 transition-opacity duration-300" src="{{ asset('img/logo-black-transparent.png') }}" alt="Logo">
      </div>

      <!-- Welcome Message -->
      <h2 class="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
      <p class="text-center text-gray-600">Login to continue to your account</p>
      <!-- Email Address -->
      <div class="relative">
       <x-icon-email />
        <x-input-label for="email" :value="__('Email')" />
        <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
          autofocus autocomplete="username" />
        <x-input-error :messages="$errors->get('email')" class="mt-2" />
      </div>
      <!-- Password -->
      <div class="mt-4 relative">
       <x-icon-password />
        <x-input-label for="password" :value="__('Password')" />
        <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
          autocomplete="current-password" />
        <x-input-error :messages="$errors->get('password')" class="mt-2" />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          <label for="remember-me" class="ml-3 block text-sm/6 text-gray-900">{{ __('Remember me') }}</label>
        </div>
        <div class="text-sm/6">
          @if (Route::has('password.request'))
        <a href="{{ route('password.request') }}"
        class="font-semibold text-indigo-600 hover:text-indigo-500">{{ __('Forgot your password?') }}</a>
      @endif
        </div>
      </div>
    </div>



    <div class="mt-7 mb-5 w-full">
      <x-primary-button class="w-full">
        {{ __('Log in') }}
      </x-primary-button>

    </div>
    {{-- <div class="font-body text-center text-primary mt-5">Don’t have an account?
      <a class="font-medium text-sm  " href="/register">Sign Up</a>
    </div> --}}

  </form>
</x-guest-layout>