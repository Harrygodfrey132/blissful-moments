<!-- Multi-Search Block (Contained within the main container) -->
@props([
    'search' => '',
    'route' => '',
    'multiDeleteRoute' => '',
    'createFormRoute' => '',
    'enableCreateButton' => false,
])
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">{{ Breadcrumbs::render() }}</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 flex gap-4">
        <form id="formSearch" method="GET" action="{{ $route }}">
            <div class="relative w-[400px]">
                <!-- Blade Component: Icon Search -->
                <x-icon-search />
                <input type="text" name="search" value="{{ $search }}" data-url="{{ $route }}"
                    role="search" placeholder="Search Here..."
                    class="py-2 text-sm pl-10 pr-4 w-full border border-gray-200 placeholder-gray-400 focus:bg-gray-50 rounded" />
            </div>
        </form>
        <!-- Multisearch Button -->
        <button @click="multiSearchOpen = !multiSearchOpen" class="btn bg-black text-white px-4 py-2 rounded">
            <x-icon-multisearch />
        </button>
        <!-- Delete Button -->
        <button id="deleteButton" data-multi-delete-url="{{ route('users.multiDelete') }}"
            class="block rounded bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm cursor-not-allowed"
            disabled>
            <x-icon-trash />
        </button>
        <!-- Create Button -->
        <a href="javascript:void(0);" id="createNewButton" title="Add New"
            @click.prevent="openPanel = true; actionType = 'Edit'; loadCreateForm('{{ $createFormRoute }}')"
            class="{{ !$enableCreateButton ? 'hidden' : '' }} block rounded bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm cursor-pointer">
            <x-icon-create class="w-5 h-5" />
        </a>

    </div>
</div>
<form id="advanceSearchForm" action="{{ $route }}" method="GET">
    <div x-show="multiSearchOpen" x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform -translate-y-4"
        x-transition:enter-end="opacity-100 transform translate-y-0"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 transform translate-y-0"
        x-transition:leave-end="opacity-0 transform -translate-y-4"
        class="mt-6 px-4 py-6 bg-white border border-gray-200 shadow rounded">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Advanced Multi-Search</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" name="status"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>

            <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" id="startDate" name="start_date" placeholder="Start Date"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer">
            </div>
            <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" id="startDate" name="end_date" placeholder="Start Date"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer">
            </div>
        </div>
        <div class="mt-6 flex justify-end gap-2">
            <button type="button"
                class="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                @click="multiSearchOpen = false">
                Clear
            </button>
            <button type="button" onclick="advanceFormHandler(this)"
                class="py-2 px-4 text-sm font-medium text-white bg-black rounded hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                Search
            </button>
        </div>
    </div>
</form>
