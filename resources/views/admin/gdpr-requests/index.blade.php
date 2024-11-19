@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div>
            <!-- Advance search block components -->
            <x-advance-search :route="route('plans.index')" :createFormRoute="route('plans.create')" :enableCreateButton="false" />

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
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Email</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Description</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="listingTable" class="divide-y divide-gray-200 bg-white">
                                    @foreach ($requests as $request)
                                        <tr>
                                            <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm cursor-pointer">
                                                <input type="checkbox" class="rowCheckbox cursor-pointer" data-index="0">
                                            </td>
                                            <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                <div class="flex items-center">
                                                    <div>
                                                        <div class="font-medium text-gray-900">{{ $request->user->name }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                <div class="flex items-center">
                                                    <div>
                                                        <div class="font-medium text-gray-900">{{ $request->user->email }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                <div class="flex items-center">
                                                    <div>
                                                        <div class="font-medium text-gray-900">{{ $request->comments }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                {{ formatDate($request->created_at) }}</td>
                                            <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div class="flex items-center">
                                                    <span class="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset 
                                                    {{$request->status ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'}}
                                                    ">{{$request->status ? 'Accepted' : 'Pending'}}</span>
                                                    </p>
                                                </div>
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                                <div class="flex gap-3">
                                                    <a href="javascript:void(0);"
                                                        @click.prevent="openPanel = true; actionType = 'Edit'; loadEditForm('{{ route('gdpr.edit', $request) }}')"
                                                        class="text-black">
                                                        <x-icon-edit />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="mt-2">
                                {{ $requests->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
