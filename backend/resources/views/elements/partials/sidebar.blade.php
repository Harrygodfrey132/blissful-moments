<aside class="flex hidden block flex-col w-[300px]" :class="{ ' sm:flex sm:flex-col': window.outerWidth > 768 }">
    <a href="{{ route('dashboard') }}" class="inline-flex items-center justify-center h-20 w-full bg-gray-950">
        <span class="text-white font-black text-xl  ml-2" x-show="menu">Logo</span>
    </a>
    <div class="flex-grow flex flex-col justify-between bg-gray-950">
        <nav class="flex flex-col mx-4 my-6 space-y-4">
            <a href="{{ route('dashboard') }}"
                class="inline-flex items-center py-3 rounded px-2 {{ request()->is('*dashboard*') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-dashboard />
                <span class="ml-2 text-sm" x-show="menu">Dashboard</span>
            </a>
            <a href="{{ route('users.index') }}"
                class="inline-flex items-center py-3 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 {{ request()->is('users*') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">Users</span>
            </a>
            <a href="{{ route('plans.index') }}"
                class="inline-flex items-center py-3 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 {{ request()->is('plans*') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">Plans</span>
            </a>
            <a href="/orders"
                class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-order />
                <span class="ml-2 text-sm" x-show="menu">Orders</span>
            </a>
            <a href="{{ route('gdpr.index') }}"
                class="inline-flex items-center py-3 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 {{ request()->is('gdpr*') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">GDPR Requests</span>
            </a>

            <div class="relative">
                <!-- Trigger Button -->
                <a href="{{route('configuration.index')}}"
                    class="inline-flex items-center w-full py-3 focus:text-black focus:bg-white rounded-lg px-2 justify-start {{ request()->is('*configuration*') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z">
                        </path>
                    </svg>
                    <span class="ml-2 text-sm">Configurations</span>
                </a>
            </div>


        </nav>
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <div class="flex justify-end">
                <button type="submit"
                    class="inline-flex py-3 text-white border-gray-700 h-15 w-full border-t hover:bg-red-700 focus:text-gray-400 focus:bg-gray-700 px-2">
                    <x-icon-logout />
                    <span class="ml-2 text-sm" x-show="menu">Logout</span>
                </button>
            </div>
        </form>
    </div>
</aside>
