@extends('layouts.admin')
@section('content')
    <div class="relative max-w-7xl mx-auto">

        <!-- Header and Search Block -->
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Orders</h1>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 flex gap-4">
                <form id="formSearch" method="GET" action="{{ route('orders.index') }}">
                    <div class="relative md:w-[400px]">
                        <!-- Blade Component: Icon Search -->
                        <x-icon-search />
                        <input type="text" name="search" value="" data-url="{{route('orders.index') }}"
                            role="search" placeholder="Search Here..."
                            class="py-2 text-sm pl-10 pr-4 w-full border border-gray-200 placeholder-gray-400 focus:bg-gray-50 rounded" />
                    </div>
                </form>
                <!-- Delete Button -->
                {{-- <button id="deleteButton"
                    class="block rounded bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm cursor-not-allowed"
                    disabled>
                    <x-icon-trash />
                </button> --}}
            </div>
        </div>

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
                                    New Renewal Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status</th>
                                {{-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Actions</th> --}}
                            </tr>
                        </thead>
                        <tbody id="listingTable" class="divide-y divide-gray-200 bg-white">
                            @foreach ($orders as $order)
                                <tr>
                                    <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <input type="checkbox" class="rowCheckbox" data-index="0">
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ $order->order_id }}
                                    </td>
                                    <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                                        <div class="flex items-center">
                                            <div class="h-11 w-11 flex-shrink-0">
                                                <img class="h-11 w-11 rounded-full"
                                                    src="{{ $order->userDetails->profile_image ?? asset('img/dummy.png') }}"
                                                    alt="">
                                            </div>
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-900">{{ $order->user->name }}</div>
                                                <div class="mt-1 text-gray-500">{{ $order->user->email }}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        {{ $order->created_at->format('m/d/Y H:i:s') }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        ${{ $order->amount }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        {{ $order->next_renewal_date }}
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm">
                                        @php
                                            $badgeStyles = [
                                                'Expired' => ['bg-red-100', 'text-red-800', 'ring-red-200'],
                                                'Renewal Due' => [
                                                    'bg-yellow-100',
                                                    'text-yellow-800',
                                                    'ring-yellow-200',
                                                ],
                                                'Expiring Soon' => [
                                                    'bg-orange-100',
                                                    'text-orange-800',
                                                    'ring-orange-200',
                                                ],
                                                'Active' => ['bg-green-100', 'text-green-800', 'ring-green-200'],
                                            ];

                                            $badgeClass = $badgeStyles[$order->renewal_status] ?? [
                                                'bg-gray-100',
                                                'text-gray-800',
                                                'ring-gray-200',
                                            ];
                                        @endphp

                                        <span
                                            class="inline-flex items-center px-3 py-1 ring-1 {{ $badgeClass[2] }} rounded-md text-xs font-medium {{ $badgeClass[0] }} {{ $badgeClass[1] }}">
                                            {{ $order->renewal_status }}
                                        </span>

                                    </td>
                                    {{-- <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
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
                                    </td> --}}
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <div class="mt-4">
                        {{ $orders->links() }}
                    </div>
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
            selectAllCheckbox.addEventListener('change', function() {
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                });
                toggleDeleteButton();
            });

            // Toggle individual checkbox and update Delete button state
            rowCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
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
