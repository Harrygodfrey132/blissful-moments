@extends('layouts.admin')
@section('content')

<div class="flex-grow text-gray-800">
    <div>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name,
                    , email and status etc.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <div class="relative w-full max-w-md sm:-ml-2">
                    <x-icon-search />
                    <input type="text" role="search" placeholder="Search..."
                        class="py-2 pl-10 pr-4 w-full border border-gray-200 placeholder-gray-400 focus:bg-gray-50 rounded" />
                </div>
            </div>
        </div>
        <div x-data="{ openPanel: false, actionType: '' }" class="relative">

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
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Created date</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr>
                                    <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <div class="flex items-center">
                                            <div class="h-11 w-11 flex-shrink-0">
                                                <img class="h-11 w-11 rounded-full"
                                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900">Lindsay Walton</div>
                                                <div class="mt-1 text-gray-500">lindsay.walton@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">11th Nov 2024</td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div x-data="{ toggle: false }" class="flex items-center">
                                            <button @click="toggle = !toggle" :class="toggle ? 'bg-green-500' : 'bg-red-500'"
                                                class="relative w-12 h-6 rounded-full transition-colors duration-300">
                                                <!-- Toggle knob -->
                                                <span :class="toggle ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-200'"
                                                    class="absolute left-0 top-0 mt-1 ml-1 w-4 h-4 rounded-full transition-transform duration-300"></span>
                                            </button>
                                            <p class="ml-4 text-gray-700">
                                                <span x-text="toggle ? 'Active' : 'Disabled'"></span>
                                            </p>
                                        </div>
                                    </td>
                                    <td
                                        class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                        <div class="flex gap-3">
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'Edit'"
                                                class="text-black">Edit</a>
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'View'"
                                                class="text-black">View</a>
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'Delete'"
                                                class="text-red-500">Delete</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <div class="flex items-center">
                                            <div class="h-11 w-11 flex-shrink-0">
                                                <img class="h-11 w-11 rounded-full"
                                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900">Lindsay Walton</div>
                                                <div class="mt-1 text-gray-500">lindsay.walton@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">11th Nov 2024</td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div x-data="{ toggle: true }" class="flex items-center">
                                            <button @click="toggle = !toggle" :class="toggle ? 'bg-green-500' : 'bg-red-500'"
                                                class="relative w-12 h-6 rounded-full transition-colors duration-300">
                                                <!-- Toggle knob -->
                                                <span :class="toggle ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-200'"
                                                    class="absolute left-0 top-0 mt-1 ml-1 w-4 h-4 rounded-full transition-transform duration-300"></span>
                                            </button>
                                            <p class="ml-4 text-gray-700">
                                                <span x-text="toggle ? 'Active' : 'Disabled'"></span>
                                            </p>
                                        </div>

                                    </td>
                                    <td
                                        class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                        <div class="flex gap-3">
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'Edit'"
                                                class="text-black">Edit</a>
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'View'"
                                                class="text-black">View</a>
                                            <a href="#" @click.prevent="openPanel = true; actionType = 'Delete'"
                                                class="text-red-500">Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Slide-In Panel -->
            <div x-show="openPanel" x-transition:enter="transform transition ease-in-out duration-300"
                x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0"
                x-transition:leave="transform transition ease-in-out duration-300"
                x-transition:leave-start="translate-x-0" x-transition:leave-end="translate-x-full"
                class="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 overflow-y-auto">
                <div class="p-6 space-y-4">
                    <button @click="openPanel = false" class="text-gray-400 hover:text-gray-500 absolute top-4 right-4">
                        &times; Close
                    </button>

                    <h2 class="text-lg font-semibold text-gray-700" x-text="actionType + ' Panel'"></h2>

                    <!-- Panel Content Based on Action -->
                    <div x-show="actionType === 'Edit'" class="text-gray-600">
                        <!-- Your Edit Form -->
                        <p>Edit form content goes here...</p>
                    </div>

                    <div x-show="actionType === 'View'" class="text-gray-600">
                        <!-- Your View Content -->
                        <p>Viewing details content goes here...</p>
                    </div>

                    <div x-show="actionType === 'Delete'" class="text-gray-600">
                        <!-- Your Delete Confirmation -->
                        <p>Are you sure you want to delete this item?</p>
                        <button class="mt-4 px-4 py-2 bg-red-600 text-white rounded">Confirm Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>


</div>

@endsection