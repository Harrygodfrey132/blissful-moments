<tbody class="divide-y divide-gray-200 bg-white">
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
                            src="{{ $order->userDetails->profile_image ?? asset('img/dummy.png') }}" alt="">
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
                        'Renewal Due' => ['bg-yellow-100', 'text-yellow-800', 'ring-yellow-200'],
                        'Expiring Soon' => ['bg-orange-100', 'text-orange-800', 'ring-orange-200'],
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
