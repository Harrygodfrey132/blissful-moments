@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div>
            <!-- Header and Search Block -->
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 flex gap-4">
                    <div class="relative w-[400px]">
                        <x-icon-search />
                        <input type="text" role="search" placeholder="Search by Order ID, Buyer Name, or Email ID..."
                            class="py-2 text-sm pl-10 pr-4 w-full border border-gray-200 placeholder-gray-400 focus:bg-gray-50 rounded" />
                    </div>
                    <!-- Multisearch Button -->
                    <button @click="multiSearchOpen = !multiSearchOpen" class="btn bg-black text-white px-4 py-2 rounded">
                        <x-icon-multisearch />
                    </button>
                    <!-- Delete Button -->
                    <button id="deleteButton"
                        class="block rounded bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm cursor-not-allowed"
                        disabled>
                        <x-icon-trash />
                    </button>
                </div>
            </div>

            <!-- Advance search block components -->

            <x-advance-search />
            <div class="relative">
                <!-- Table with Actions -->
                <div class="mt-8 flow-root">
                    <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Created date</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Subscription</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    @foreach ($users as $user)
                                        <tr>
                                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                                <div class="flex items-center">
                                                    <div class="h-11 w-11 flex-shrink-0">
                                                        <img class="h-11 w-11 rounded-full"
                                                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt="">
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="font-medium text-gray-900">{{ $user->name }}</div>
                                                        <div class="mt-1 text-gray-500">{{ $user->email }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {{ formatDate($user->created_at) }}</td>
                                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div x-data="{ toggle: {{ $user->status ? 'true' : 'false' }} }" class="flex items-center">
                                                    <button @click="toggle = !toggle;  updateStatusHandler(toggle)""
                                                        data-url="{{ route('users.update.status', $user->id) }}"
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
                                                {{ formatDate($user->created_at) }}</td>
                                            <td
                                                class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                                <div class="flex gap-3">
                                                    <a href="#"><x-icon-qrcode /></a>

                                                    <a href="javascript:void(0);"
                                                        @click.prevent="openPanel = true; actionType = 'Edit'; loadEditForm('{{ route('users.edit', $user) }}')"
                                                        class="text-black">
                                                        <x-icon-edit />
                                                    </a>
                                                    <!-- Delete Confirmation -->
                                                    <a href="javascript:void(0);" data-userId="{{ encrypt($user->id) }}"
                                                        onclick="deleteModalHandler(this)"
                                                        data-url="{{ route('users.destroy', $user) }}" class="text-red-500">
                                                        <x-icon-delete />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="mt-2">
                                {{ $users->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
