@extends('layouts.admin')
@section('content')

<div x-data="{ multiSearchOpen: false }" class="relative max-w-7xl mx-auto">

    <!-- Header and Search Block -->
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Orders</h1>
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

    <!-- Table and Other Content Below -->
    <div class="mt-8 flow-root">
        <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                <input type="checkbox" id="selectAll">
                            </th>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                Order ID</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Buyer</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date & Time</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Amount</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Payment Status</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                <input type="checkbox" class="rowCheckbox" data-index="0">
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">O4046841053</td>
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

                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                06/11/2024
                                11:21
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                $11,788.00
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <span class="text-lime-600">Paid</span>
                            </td>
                            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                <div class="flex gap-3">
                                    <a href="#" @click.prevent="openPanel = true; actionType = 'Edit'"
                                        class="text-black"> <x-icon-view /></a>
                                    <div x-data="{ open: false }">
                                        <a href="#" @click="open = true" class="text-red-500">
                                            <x-icon-delete />
                                        </a>
                                        <div @keydown.escape.window="open = false"
                                            class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity"
                                            x-show="open" x-cloak style="display: none">
                                            <!-- Modal -->
                                            <div class="flex items-center justify-center min-h-screen z-50">
                                                <div class="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                                                    @click.away="open = false"
                                                    x-transition:enter="ease-out duration-100"
                                                    x-transition:enter-start="opacity-0"
                                                    x-transition:enter-end="opacity-100 scale-100"
                                                    x-transition:leave="ease-in duration-200"
                                                    x-transition:leave-start="opacity-100 scale-100"
                                                    x-transition:leave-end="opacity-0">
                                                    <!-- Modal header -->
                                                    <div>
                                                        <div class="text-center">
                                                            <div class="mt-1 text-center">

                                                            </div>
                                                        </div>
                                                        <span class="cursor-pointer" @click="open = false">✕</span>
                                                    </div>

                                                    <!-- Modal body -->
                                                    <div class="text-center my-2 mb-5">
                                                        <x-icon-delete-icon />
                                                        <p class="mb-4 text-lg text-black">Are you sure you want
                                                            to delete this item?</p>
                                                    </div>

                                                    <!-- Modal footer -->
                                                    <div class="flex items-center justify-end gap-2 mt-4">
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                            @click="open = false">
                                                            Cancel
                                                        </button>
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                            @click="open = false">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                <input type="checkbox" class="rowCheckbox" data-index="1">
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">O4046841053</td>
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

                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                06/11/2024
                                11:21
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                $11,788.00
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <span class="text-red-500">Pending</span>
                            </td>
                            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                <div class="flex gap-3">
                                    <a href="#" @click.prevent="openPanel = true; actionType = 'Edit'"
                                        class="text-black"> <x-icon-view /></a>
                                    <div x-data="{ open: false }">
                                        <a href="#" @click="open = true" class="text-red-500">
                                            <x-icon-delete />
                                        </a>
                                        <div @keydown.escape.window="open = false"
                                            class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity"
                                            x-show="open" x-cloak style="display: none">
                                            <!-- Modal -->
                                            <div class="flex items-center justify-center min-h-screen z-50">
                                                <div class="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                                                    @click.away="open = false"
                                                    x-transition:enter="ease-out duration-100"
                                                    x-transition:enter-start="opacity-0"
                                                    x-transition:enter-end="opacity-100 scale-100"
                                                    x-transition:leave="ease-in duration-200"
                                                    x-transition:leave-start="opacity-100 scale-100"
                                                    x-transition:leave-end="opacity-0">
                                                    <!-- Modal header -->
                                                    <div>
                                                        <div class="text-center">
                                                            <div class="mt-1 text-center">

                                                            </div>
                                                        </div>
                                                        <span class="cursor-pointer" @click="open = false">✕</span>
                                                    </div>

                                                    <!-- Modal body -->
                                                    <div class="text-center my-2 mb-5">
                                                        <x-icon-delete-icon />
                                                        <p class="mb-4 text-lg text-black">Are you sure you want
                                                            to delete this item?</p>
                                                    </div>

                                                    <!-- Modal footer -->
                                                    <div class="flex items-center justify-end gap-2 mt-4">
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                            @click="open = false">
                                                            Cancel
                                                        </button>
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                            @click="open = false">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                <input type="checkbox" class="rowCheckbox" data-index="0">
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">O4046841053</td>
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

                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                06/11/2024
                                11:21
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                $11,788.00
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <span class="text-lime-600">Paid</span>
                            </td>
                            <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                <div class="flex gap-3">
                                    <a href="#" @click.prevent="openPanel = true; actionType = 'Edit'"
                                        class="text-black"> <x-icon-view /></a>
                                    <div x-data="{ open: false }">
                                        <a href="#" @click="open = true" class="text-red-500">
                                            <x-icon-delete />
                                        </a>
                                        <div @keydown.escape.window="open = false"
                                            class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity"
                                            x-show="open" x-cloak style="display: none">
                                            <!-- Modal -->
                                            <div class="flex items-center justify-center min-h-screen z-50">
                                                <div class="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                                                    @click.away="open = false"
                                                    x-transition:enter="ease-out duration-100"
                                                    x-transition:enter-start="opacity-0"
                                                    x-transition:enter-end="opacity-100 scale-100"
                                                    x-transition:leave="ease-in duration-200"
                                                    x-transition:leave-start="opacity-100 scale-100"
                                                    x-transition:leave-end="opacity-0">
                                                    <!-- Modal header -->
                                                    <div>
                                                        <div class="text-center">
                                                            <div class="mt-1 text-center">

                                                            </div>
                                                        </div>
                                                        <span class="cursor-pointer" @click="open = false">✕</span>
                                                    </div>

                                                    <!-- Modal body -->
                                                    <div class="text-center my-2 mb-5">
                                                        <x-icon-delete-icon />
                                                        <p class="mb-4 text-lg text-black">Are you sure you want
                                                            to delete this item?</p>
                                                    </div>

                                                    <!-- Modal footer -->
                                                    <div class="flex items-center justify-end gap-2 mt-4">
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                            @click="open = false">
                                                            Cancel
                                                        </button>
                                                        <button type="button"
                                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                            @click="open = false">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const deleteButton = document.querySelector('#deleteButton');
        const selectAllCheckbox = document.querySelector('#selectAll');
        const rowCheckboxes = document.querySelectorAll('.rowCheckbox');

        // Select all checkboxes
        selectAllCheckbox.addEventListener('change', function () {
            rowCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            toggleDeleteButton();
        });

        // Toggle individual checkbox and update Delete button state
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const allChecked = [...rowCheckboxes].every(cb => cb.checked);
                selectAllCheckbox.checked = allChecked;
                toggleDeleteButton();
            });
        });

        // Enable or disable the Delete button based on selected checkboxes
        function toggleDeleteButton() {
            const anyChecked = [...rowCheckboxes].some(cb => cb.checked);
            if (anyChecked) {
                deleteButton.classList.remove('bg-gray-300', 'cursor-not-allowed');
                deleteButton.classList.add('bg-indigo-500');
                deleteButton.disabled = false;
            } else {
                deleteButton.classList.add('bg-gray-300', 'cursor-not-allowed');
                deleteButton.classList.remove('bg-indigo-500');
                deleteButton.disabled = true;
            }
        }
    });
</script>

@endsection