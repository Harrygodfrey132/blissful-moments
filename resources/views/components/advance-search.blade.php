<!-- Multi-Search Block (Contained within the main container) -->
@props(['search' => '', 'route' => ''])
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 flex gap-4">
        <form id="formSearch" method="GET" action="{{ route('users.index') }}">
            <div class="relative w-[400px]">
                <!-- Blade Component: Icon Search -->
                <x-icon-search />
                <input type="text" name="search" value="{{ $search }}"
                    data-url="{{ $route }}" role="search"
                    placeholder="Search by Order ID, Buyer Name, or Email ID..."
                    class="py-2 text-sm pl-10 pr-4 w-full border border-gray-200 placeholder-gray-400 focus:bg-gray-50 rounded" />
            </div>
        </form>
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
<div x-show="multiSearchOpen" x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform -translate-y-4"
    x-transition:enter-end="opacity-100 transform translate-y-0" x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100 transform translate-y-0"
    x-transition:leave-end="opacity-0 transform -translate-y-4"
    class="mt-6 px-4 py-6 bg-white border border-gray-200 shadow rounded">
    <h2 class="text-lg font-semibold text-gray-700 mb-4">Advanced Multi-Search</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
            <label for="orderId" class="block text-sm font-medium text-gray-700">Order ID</label>
            <input type="text" id="orderId" placeholder="Order ID"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
            <label for="buyerName" class="block text-sm font-medium text-gray-700">Buyer Name</label>
            <input type="text" id="buyerName" placeholder="Buyer Name"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" placeholder="Email ID"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div>
            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" id="amount" placeholder="Amount"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
    </div>
    <div class="mt-6 flex justify-end gap-2">
        <button type="button"
            class="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            @click="multiSearchOpen = false">
            Clear
        </button>
        <button type="button"
            class="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            Search
        </button>
    </div>
</div>
