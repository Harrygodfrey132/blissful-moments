<div>
    <form id="userEditForm" action="{{ route('users.update', $user) }}" method="POST" @submit.prevent="submitFormHandler">
        @csrf
        @method('PUT')
        <div class="relative">
            <x-icon-name />
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name') ?? $user->name" required
                autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div class="relative">
            <x-icon-email />
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email') ?? $user->email"
                required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>
    </form>
</div>
