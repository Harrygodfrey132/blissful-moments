@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div>
            <!-- Advance search block components -->
            <x-advance-search :route="route('plans.index')" :createFormRoute="route('plans.create')" :enableCreateButton="true" />

            <div class="relative">
                <!-- Table with Actions -->
                <div class="mt-8 flow-root">
                    <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                                            <input type="checkbox" class="cursor-pointer" id="selectAll">
                                        </th>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Description</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Price</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="listingTable" class="divide-y divide-gray-200 bg-white">
                                    @foreach ($plans as $plan)
                                        <tr>
                                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm cursor-pointer">
                                                <input type="checkbox" class="rowCheckbox cursor-pointer" data-index="0">
                                            </td>
                                            <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                <div class="flex items-center">
                                                    <div>
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
                                            <td
                                                class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                                <div class="flex gap-3">

                                                    <a href="{{ route('code.generate') }}"><x-icon-qrcode /></a>

                                                    <a href="javascript:void(0);"
                                                        @click.prevent="openPanel = true; actionType = 'Edit'; loadEditForm('{{ route('plans.edit', $plan) }}')"
                                                        class="text-black">
                                                        <x-icon-edit />
                                                    </a>
                                                    <!-- Delete Confirmation -->
                                                    <a href="javascript:void(0);" data-userId="{{ encrypt($plan->id) }}"
                                                        onclick="deleteModalHandler(this)"
                                                        data-url="{{ route('plans.destroy', $plan) }}" class="text-red-500">
                                                        <x-icon-delete />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="mt-2">
                                {{ $plans->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
