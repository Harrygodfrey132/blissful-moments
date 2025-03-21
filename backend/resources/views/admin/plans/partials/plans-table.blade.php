<tbody id="listingTable" class="divide-y divide-gray-200 bg-white">
    @forelse ($plans as $plan)
        <tr>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm cursor-pointer">
                <input type="checkbox" class="rowCheckbox cursor-pointer" data-index="0">
            </td>
            <td class="whitespace-nowrap py-5 pr-3 text-sm">
                <div class="flex items-center">
                    <div>
                        <div class="font-medium text-gray-900">{{ $plan->name }}</div>
                    </div>
                </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                {{ $plan->description }}
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                @php
                    $features = is_array($plan->features) ? $plan->features : json_decode($plan->features, true);
                @endphp

                @foreach ($features as $feature)
                    <div>• {{ $feature }}</div>
                @endforeach
            </td>

            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div x-data="{ toggle: {{ $plan->status ? 'true' : 'false' }} }" class="flex items-center">
                    <button @click="toggle = !toggle;  updateStatusHandler(toggle)"
                        data-url="{{ route('plans.update.status', $plan->id) }}"
                        :class="toggle ? 'bg-green-500' : 'bg-red-500'"
                        class="relative w-12 h-6 rounded-full z-10 transition-colors duration-300">
                        <!-- Toggle knob -->
                        <span
                            :class="toggle ? 'translate-x-6 bg-white' :
                                'translate-x-1 bg-gray-200'"
                            class="absolute left-0 top-0 mt-1 ml-1 w-4 h-4 rounded-full transition-transform duration-300">
                        </span>
                    </button>
                    <p class="ml-4 text-gray-700">
                        <span x-text="toggle ? 'Active' : 'Disabled'"></span>
                    </p>
                </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                @foreach ($plan->planVariations as $variation)
                    <div>
                        <span class="font-medium">{{ $variation->duration }} Months:</span>
                        {{ formatPrice($variation->price) }}
                    </div>
                @endforeach
            </td>

            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                <div class="flex gap-3">
                    <a href="javascript:void(0);"
                        @click.prevent="actionType = 'Edit'; loadEditForm('{{ route('plans.edit', $plan) }}')"
                        class="text-black">
                        <x-icon-edit />
                    </a>
                    <!-- Delete Confirmation -->
                    <a href="javascript:void(0);" data-userId="{{ encrypt($plan->id) }}"
                        onclick="deleteModalHandler(this)" data-url="{{ route('plans.destroy', $plan) }}"
                        class="text-red-500">
                        <x-icon-delete />
                    </a>
                </div>
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="6" class="text-center py-4 text-gray-500">
                No records found
            </td>
        </tr>
    @endforelse
</tbody>
