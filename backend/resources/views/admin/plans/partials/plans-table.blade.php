<tbody class="divide-y divide-gray-200 bg-white">
    @foreach ($plans as $plan)
        <tr>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                <input type="checkbox" class="rowCheckbox" data-index="0">
            </td>
            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                        <img class="h-11 w-11 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="">
                    </div>
                    <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ $plan->name }}</div>
                        <div class="mt-1 text-gray-500">{{ $plan->description }}</div>
                    </div>
                </div>
            </td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                {{ formatDate($plan->created_at) }}</td>
            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div x-data="{ toggle: {{ $plan->status ? 'true' : 'false' }} }" class="flex items-center">
                    <button @click="toggle = !toggle;  updateStatusHandler(toggle)""
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
                {{ formatPrice($plan->price) }}</td>
            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                <div class="flex gap-3">
                    <a href="javascript:void(0);"
                        @click.prevent="actionType = 'Edit'; loadEditForm('{{ route('plans.edit', $plan->slug) }}')"
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
    @endforeach
</tbody>
