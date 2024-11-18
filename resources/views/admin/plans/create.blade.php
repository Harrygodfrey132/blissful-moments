<div>
    <h2 class="text-xl font-semibold text-gray-700 mb-5">Setup Plan</h2>

    <form action="{{ route('plans.store') }}" method="POST">
        @csrf
        <div class="relative">
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required
                autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div class="relative mt-2">
            <x-input-label for="name" :value="__('Description')" />
            <textarea name="description" class="w-full" id="" rows="3"></textarea>
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div>
            <label for="billing_cycle" class="block text-sm font-medium text-gray-700">Billing Cycle (Days)</label>
            <select id="billing_cycle" name="billing_cycle"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="30" selected>30</option>
                <option value="180">180</option>
                <option value="365">365</option>
            </select>
        </div>

        <div class="relative">
            <x-icon-name />
            <x-input-label for="price" :value="__('Price')" />
            <x-text-input id="price" class="block mt-1 w-full" type="text" name="price" :value="old('price')"
                required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('price')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4 absolute right-0 left-0 m-auto bottom-10 w-[400px]">
            <x-primary-button>
                {{ __('Save') }}
            </x-primary-button>
        </div>
    </form>
</div>
