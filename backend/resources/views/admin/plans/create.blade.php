<div>
    <h2 class="text-xl font-semibold text-gray-700 mb-5">Setup Plan</h2>

    <form class="space-y-4" id="planCreateForm" action="{{ route('plans.store') }}" method="POST"
        data-url="{{ route('plans.index') }}" @submit.prevent="submitFormHandler('planCreateForm')">
        @csrf
        <div class="relative">
            <x-input-label for="name" :value="__('Name')" required />
            <x-text-input id="name" class="block mt-1 w-full pl-4" type="text" name="name" :value="old('name')" required
                autofocus autocomplete="name" required />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div class="relative mt-2">
            <x-input-label for="name" :value="__('Description')" required />
            <textarea name="description"
                class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-4 focus:ring-indigo-600 sm:text-sm/6 block mt-1 w-full"
                id="" rows="3" required></textarea>
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div x-data="{ features: [''] }" class="relative mt-2">
            <x-input-label for="features" :value="__('Features')" required />

            <template x-for="(feature, index) in features" :key="feature . id">
                <div class="flex gap-2 items-center mt-2 mb-2">
                    <input type="text" x-model="feature.text" name="features[]"
                        class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-4 focus:ring-indigo-600 sm:text-sm/6 block w-full"
                        placeholder="Enter feature" required />

                    <!-- Remove button -->
                    <button type="button" @click="if (features.length > 1) features.splice(index, 1)"
                        class="disabled:opacity-50 disabled:cursor-not-allowed" :disabled="features . length === 1">
                        <x-icon-delete class="text-red-500 w-5 h-5" />
                    </button>

                    <!-- Add button -->
                    <button type="button" @click="features.push({ id: Date.now(), text: '' })" title="Add New"
                        class="p-1 rounded-md px-2 hover:bg-green-100 transition">
                        <x-icon-create class="w-5 h-5 text-green-500" />
                    </button>
                </div>
            </template>

            <x-input-error :messages="$errors->get('features')" class="mt-2" />

        </div>

        {{-- <div>
            <label for="billing_cycle" class="block text-sm font-medium text-gray-700">Billing Cycle (Days)</label>
            <select id="billing_cycle" name="billing_cycle"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="30" selected>30</option>
                <option value="180">180</option>
                <option value="365">365</option>
            </select>
        </div> --}}

        <div class="relative">
            <x-input-label for="price" :value="__('Price')" required />
            <x-text-input id="price" class="block mt-1 pl-4 w-full" type="text" name="price" :value="old('price')"
                required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('price')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4 m-auto bottom-10">
            <x-primary-button>
                {{ __('Save') }}
            </x-primary-button>
        </div>
    </form>
</div>