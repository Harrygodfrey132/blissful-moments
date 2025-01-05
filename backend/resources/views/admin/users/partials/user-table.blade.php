<tbody class="divide-y divide-gray-200">
    @foreach ($users as $user)
        <tr class="hover:bg-gray-50">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm cursor-pointer">
                <input type="checkbox" class="rowCheckbox cursor-pointer"
                    data-id="{{ encrypt($user->id) }}" data-index="0">
            </td>
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                        <img class="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="">
                    </div>
                    <div class="ml-4">
                        <div class="font-medium text-gray-800">{{ $user->name }}</div>
                        <div class="mt-1 text-sm text-gray-500">{{ $user->email }}
                        </div>
                    </div>
                </div>
            </td>
            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                {{ formatDate($user->created_at) }}
            </td>
            <td class="whitespace-nowrap px-4 py-4 text-sm">
                <div x-data="{ toggle: {{ $user->status ? 'true' : 'false' }} }" class="flex items-center">
                    <button @click="toggle = !toggle; updateStatusHandler(toggle)"
                        data-url="{{ route('users.update.status', $user->id) }}"
                        :class="toggle ? 'bg-green-500' : 'bg-red-500'"
                        class="relative w-12 h-6 rounded-full z-10 transition-colors duration-300">
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
                <div class="flex items-center">
                    <span
                        class="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset 
                {{ $user->is_verified ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' }}
                ">{{ $user->is_verified ? 'Verified' : 'Pending' }}</span>
                    </p>
                </div>
            </td>
            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                <div class="flex items-center">
                    <span
                        class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset 
                        {{ $user->page && $user->page->is_registered ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' }}">
                        {{ $user->page && $user->page->is_registered ? 'Registered' : 'Pending' }}
                    </span>
                </div>
            </td>
            <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                <div class="flex gap-3">

                    <a href="javascript:void(0);"
                        @click.prevent="actionType = 'Edit'; loadEditForm('{{ route('users.edit', $user) }}')"
                        class="text-gray-600 hover:text-black">
                        <x-icon-edit />
                    </a>
                    <a href="javascript:void(0);"
                        data-userId="{{ encrypt($user->id) }}"
                        onclick="deleteModalHandler(this)"
                        data-url="{{ route('users.destroy', $user) }}"
                        class="text-red-500 hover:text-red-700">
                        <x-icon-delete />
                    </a>
                </div>
            </td>
        </tr>
    @endforeach
</tbody>