<aside id="sidebar" x-data="{ menu: false }" class="fixed shadow-lg scrollbar overflow-y-auto left-0 top-0 z-10 flex flex-col w-20 h-screen bg-white overflow-hidden hidden lg:flex"
:class="menu ? 'w-64' : 'w-20'">
    <!-- Hamburger Menu -->
    <div class="flex items-center justify-between h-16 px-4 pl-[26px] bg-white">
    <button id="toggleSidebar"  @click="menu = !menu" class="text-black focus:outline-none">
            <svg style="width:25px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <img x-show="menu" class="w-12 transition-opacity duration-300" src="{{ asset('img/logo.png') }}"
        alt="Logo">
    </div>

    <!-- Sidebar Content -->
    <nav class="flex-grow flex flex-col px-4 justify-between bg-white overflow-y-auto">
        <div class="flex flex-col mt-8 space-y-4">
            <!-- Dashboard -->
            <a href="{{ route('dashboard') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('dashboard') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-dashboard />
                <span class="ml-2 text-sm" x-show="menu">Dashboard</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Dashboard
                </span>
            </a>

            <!-- Users -->
            <a href="{{ route('users.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('users.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-users />
                <span class="ml-2 text-sm" x-show="menu">Users</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Users
                </span>
            </a>

            <!-- Plans -->
            <a href="{{ route('plans.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('plans.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-plan />
                <span class="ml-2 text-sm" x-show="menu">Plans</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Plans
                </span>
            </a>

            <!-- Orders -->
            <a href="{{ route('orders.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('orders.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-order />
                <span class="ml-2 text-sm" x-show="menu">Orders</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Orders
                </span>
            </a>

            <!-- Manage CMS -->
            <a href="{{ route('cms.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('cms.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-cms />
                <span class="ml-2 text-sm" x-show="menu">Manage CMS</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Manage CMS
                </span>
            </a>

            <!-- GDPR -->
            <a href="{{ route('gdpr.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('gdpr.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-user />
                <span class="ml-2 text-sm" x-show="menu">GDPR Requests</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    GDPR Requests
                </span>
            </a>

            <!-- Configurations -->
            <a href="{{ route('configuration.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('configuration.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <svg style="width:25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.5 2h-1v5h1V2zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1l-.4.5zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1l-.4.5zm3.9-8h-1v2h1V2zm-1 6h1v6h-1V8zm-4 3h-1v3h1v-3zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95l.4.5zm2.1-9h-1v6h1V2zm-1 10h1v2h-1v-2z">
                    </path>
                </svg>
                <span class="ml-2 text-sm" x-show="menu">Configurations</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Configurations
                </span>
            </a>

            <!-- Email Logs -->
            <a href="{{ route('email.logs.index') }}"
                class="relative flex items-center py-2 px-2 {{ request()->routeIs('email.*') ? 'text-white bg-[#144d3e] rounded' : 'text-black hover:bg-gray-100' }}"
                :class="menu ? 'justify-start' : 'justify-center'" x-data="{ tooltip: false }"
                @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-sent-emails />
                <span class="ml-2 text-sm" x-show="menu">Email Logs</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Email Logs
                </span>
            </a>
        </div>

        <!-- Logout -->
        <form action="{{ route('logout') }}" method="POST" class="mt-auto">
            @csrf
            <button type="submit"
                class="relative flex items-center px-2 py-3 text-black w-full border-t border-gray-300 hover:bg-gray-100"
                x-data="{ tooltip: false }" @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                <x-icon-logout />
                <span class="ml-2 text-sm" x-show="menu">Logout</span>
                <span x-show="!menu && tooltip"
                    class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded shadow-lg">
                    Logout
                </span>
            </button>
        </form>
    </nav>
</aside>
