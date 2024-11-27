@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <div>
        <!-- Advance search block components -->
        <x-advance-search :route="route('users.index')" :multiDeleteRoute="route('users.multiDelete')" />
        <div class="relative">
            <!-- Table with Actions -->
            <div class="mt-8 flow-root">
                <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
                            <thead class="bg-[#E5E7EB]">
                                <tr>
                                    <th scope="col"
                                        class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-[#374151] cursor-pointer">
                                        <input type="checkbox" id="selectAll" class="cursor-pointer">
                                    </th>
                                    <th scope="col"
                                        class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-[#374151] sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                        Created Date
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                        Status
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                        Subscription
                                    </th>
                                    <th scope="col"
                                        class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="listingTable" class="divide-y divide-gray-200">
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
                                                <div class="mt-1 text-sm text-gray-500">{{ $user->email }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                        {{ formatDate($user->created_at) }}
                                    </td>
                                    <td class="whitespace-nowrap px-4 py-4 text-sm">
                                        <div x-data="{ toggle: {{ $user->status ? 'true' : 'false' }} }"
                                            class="flex items-center">
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
                                    <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                        {{ formatDate($user->created_at) }}
                                    </td>
                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                        <div class="flex gap-3">
                                            <a href="#">
                                                <x-icon-qrcode />
                                            </a>
                                            <a href="javascript:void(0);"
                                                @click.prevent="openPanel = true; actionType = 'Edit'; loadEditForm('{{ route('users.edit', $user) }}')"
                                                class="text-gray-600 hover:text-black">
                                                <x-icon-edit />
                                            </a>
                                            <a href="javascript:void(0);" data-userId="{{ encrypt($user->id) }}"
                                                onclick="deleteModalHandler(this)"
                                                data-url="{{ route('users.destroy', $user) }}" class="text-red-500 hover:text-red-700">
                                                <x-icon-delete />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <div class="mt-4 mb-5">
                            {{ $users->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection