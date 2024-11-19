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
            <div x-data="{ menu: false, dropdown: false }" class="relative">
                <!-- Trigger Button -->
                <a href="#" 
                   class="inline-flex items-center w-full text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2 justify-start" 
                   :class="{ 'justify-start': menu, 'justify-center': menu == false }" 
                   @click.prevent="dropdown = !dropdown">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z"></path>
                    </svg>
                    <span class="ml-2 text-sm">Settings</span>
            
                    <!-- Dynamic Arrow -->
                    <svg x-show="!dropdown" xmlns="http://www.w3.org/2000/svg" class="ml-auto w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414L10 3.586l4.707 4.707a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    <svg x-show="dropdown" xmlns="http://www.w3.org/2000/svg" class="ml-auto w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414L10 16.414l-4.707-4.707a1 1 0 011.414-1.414L10 14.586l3.293-3.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
            
                <!-- Dropdown Menu -->
                <div 
                    x-show="dropdown" 
                    @click.away="dropdown = false"
                    x-transition:enter="transition ease-out duration-200 transform"
                    x-transition:enter-start="opacity-0 -translate-y-2"
                    x-transition:enter-end="opacity-100 translate-y-0"
                    x-transition:leave="transition ease-in duration-150 transform"
                    x-transition:leave-start="opacity-100 translate-y-0"
                    x-transition:leave-end="opacity-0 -translate-y-2"
                    class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10"
                    x-cloak>
                    <ul class="py-2">
                        <li>
                            <a href="#profile" 
                               class="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                               System Configuration
                            </a>
                        </li>
                        <li>
                            <a href="#profile" 
                               class="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                               System
                            </a>
                        </li>
                        
                    </ul>
                </div>
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
