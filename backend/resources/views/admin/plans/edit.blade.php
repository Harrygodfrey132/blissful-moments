<div>
    <h2 class="text-xl font-semibold text-gray-700 mb-5">Edit Plan</h2>

    <form class="space-y-4" action="{{ route('plans.update', $plan) }}" method="POST">
        @method('PUT')
        @csrf
        <div class="relative">
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 pl-4 w-full" type="text" name="name" :value="old('name') ?? $plan->name"
                required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>
        <div class="relative mt-2">
            <x-input-label for="description" :value="__('Description')" />
            <textarea name="description" class="w-full" id="" rows="3">{{ old('description') ?? $plan->description }}</textarea>
            <x-input-error :messages="$errors->get('description')" class="mt-2" />
        </div>

        <div x-data='{ features: @json(old('features', is_array($plan->features) ? $plan->features : json_decode($plan->features, true) ?? [''])) }' class="relative mt-2">
            <x-input-label for="features" :value="__('Features')" required />

            <template x-for="(feature, index) in features" :key="index">
                <div class="flex items-center mt-2 space-x-2">
                    <input type="text" x-model="features[index]" name="features[]"
                        class="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-4 focus:ring-indigo-600 sm:text-sm/6 block w-full"
                        placeholder="Enter feature" required />

                    <!-- Remove button (disabled if only 1 feature exists) -->
                    <button type="button" @click="if (features.length > 1) features.splice(index, 1)"
                        class="disabled:opacity-50" :disabled="features.length === 1">
                        <x-icon-delete class="text-red-500 w-5 h-5" />
                    </button>
                    <!-- Add button -->
                    <button type="button" @click="features.push('')" title="Add New"
                        class="p-1 rounded-md px-2 hover:bg-green-100 transition">
                        <x-icon-create class="w-5 h-5 text-green-500" />
                    </button>
                </div>
            </template>
            <x-input-error :messages="$errors->get('features')" class="mt-2" />
        </div>


        <h3 class="text-lg font-semibold text-gray-700">Pricing Variations</h3>
        @foreach ($plan->planVariations as $variation)
            <div class="relative">
                <x-input-label for="price_{{ $variation->duration }}_month" :value="$variation->duration . ' Month'" required />
                <div class="flex items-center border border-gray-300 rounded-md shadow-sm overflow-hidden">
                    <span class="px-3 bg-gray-100 text-gray-700 text-sm font-medium">£</span>
                    <x-text-input id="price_{{ $variation->duration }}_month" class="block flex-1 w-full border-0 pl-2"
                        type="number" name="variations[{{ $variation->duration }}][price]"
                        value="{{ $variation->price }}" required step="0.01"
                        min="1" />
                </div>
            </div>
        @endforeach
        <div class="flex items-center justify-end mt-4 m-auto bottom-10">
            <x-primary-button>
                {{ __('Save') }}
            </x-primary-button>
        </div>
    </form>
</div>
