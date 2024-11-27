<aside class="fixed left-0 top-0 z-50 flex flex-col w-[250px] h-screen bg-[#575757] overflow-y-auto">
    <a href="{{ route('dashboard') }}" class="inline-flex items-center justify-center h-20 w-full bg-[#575757]">
        <img class="w-20" src="{{ asset('img/logo.png') }}" alt="Logo">
    </a>

    <div class="flex-grow flex flex-col justify-between bg-[#575757]">
        <nav class="flex flex-col mx-4 my-6 space-y-4">
            <!-- Dashboard -->
            <a href="{{ route('dashboard') }}"
                class="inline-flex items-center py-3 rounded px-2 {{ request()->routeIs('dashboard') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                :class="{ 'justify-start': menu, 'justify-center': !menu }">
                <x-icon-dashboard />
                <span class="ml-2 text-sm" x-show="menu">Dashboard</span>
            </a>

            <!-- Users -->
            <a href="{{ route('users.index') }}"
                class="inline-flex items-center py-3 rounded-lg px-2 {{ request()->routeIs('users.*') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                :class="{ 'justify-start': menu, 'justify-center': !menu }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">Users</span>
            </a>

            <!-- Plans -->
            <a href="{{ route('plans.index') }}"
                class="inline-flex items-center py-3 rounded-lg px-2 {{ request()->routeIs('plans.*') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                :class="{ 'justify-start': menu, 'justify-center': !menu }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">Plans</span>
            </a>

            <!-- Orders -->
            <a href="#"
                class="inline-flex items-center py-3 rounded-lg px-2 {{ request()->is('orders') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                :class="{ 'justify-start': menu, 'justify-center': !menu }">
                <x-icon-order />
                <span class="ml-2 text-sm" x-show="menu">Orders</span>
            </a>

            <!-- GDPR -->
            <a href="{{ route('gdpr.index') }}"
                class="inline-flex items-center py-3 rounded-lg px-2 {{ request()->routeIs('gdpr.*') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                :class="{ 'justify-start': menu, 'justify-center': !menu }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">GDPR Requests</span>
            </a>

            <!-- Configurations (Dropdown Example) -->
            <div class="relative">
                <a href="{{ route('configuration.index') }}"
                    class="inline-flex w-full items-center py-3 rounded-lg px-2 {{ request()->routeIs('configuration.*') ? 'text-black bg-white' : 'text-white hover:bg-gray-600' }}"
                   >
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z">
                        </path>
                    </svg>
                    <span class="ml-2 text-sm">Configurations</span>
                </a>
            </div>
        </nav>
    </div>

    <!-- Logout button always at the bottom -->
    <form action="{{ route('logout') }}" method="POST" class="mt-auto">
        @csrf
        <div class="flex justify-end">
            <button type="submit"
                class="inline-flex py-3 text-white border-gray-700 h-15 w-full border-t hover:bg-gray-600 px-2">
                <x-icon-logout />
                <span class="ml-2 text-sm" x-show="menu">Logout</span>
            </button>
        </div>
    </form>
</aside>
