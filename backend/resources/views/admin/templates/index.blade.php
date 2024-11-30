@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div>
            <!-- Advance search block components -->
            {{-- <x-advance-search :route="route('users.index')" :multiDeleteRoute="route('users.multiDelete')" /> --}}
            <div class="relative">
                <!-- Table with Actions -->
                <div class="mt-8 flow-root">
                    <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
                                <thead class="bg-[#E5E7EB]">
                                    <tr>
                                        <th scope="col" class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                            Template Name
                                        </th>
                                        <th scope="col"
                                            class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-[#374151] sm:pl-0">
                                            Subject
                                        </th>
                                        <th scope="col" class="px-4 py-4 text-left text-sm font-semibold text-[#374151]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="listingTable" class="divide-y divide-gray-200">
                                    @foreach ($templates as $user)
                                        <tr class="hover:bg-gray-50">
                                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {{ $user->name }}
                                            </td>
                                            <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                                {{ $user->subject }}
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                                <div class="flex gap-3">

                                                    <a href="javascript:void(0);"
                                                        @click.prevent="actionType = 'Edit'; loadEditForm('{{ route('cms.edit', $user) }}')"
                                                        class="text-gray-600 hover:text-black">
                                                        <x-icon-edit />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="mt-4 mb-5">
                                {{ $templates->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
