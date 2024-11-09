<aside class="flex hidden block flex-col w-[300px]" :class="{ ' sm:flex sm:flex-col': window.outerWidth > 768 }">
    <a href="{{ route('dashboard') }}" class="inline-flex items-center justify-center h-20 w-full bg-gray-950">
        <span class="text-white font-black text-xl  ml-2" x-show="menu">Logo</span>
    </a>
    <div class="flex-grow flex flex-col justify-between bg-gray-950">
        <nav class="flex flex-col mx-4 my-6 space-y-4">
            <a href="{{ route('dashboard') }}"
                class="inline-flex items-center py-3 rounded px-2 {{ request()->is('dashboard') ? 'text-black bg-white' : 'text-white hover:bg-gray-700' }}"
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
            <a href="/orders"
                class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-order />
                <span class="ml-2 text-sm" x-show="menu">Orders</span>
            </a>
            <a href="#"
                class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
                :class="{ 'justify-start': menu, 'justify-center': menu == false }">
                <x-icon-setting />
                <span class="ml-2 text-sm" x-show="menu">Settings</span>
            </a>
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
