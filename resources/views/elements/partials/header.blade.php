<header class="flex items-center h-20 px-6 sm:px-10 bg-white">
    <div x-data="{ open: false }">
        <div class="mr-8 cursor-pointer md:hidden" @click="open = ! open">
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </div>
        <!--Mobile Menu-->
        <div class="bg-white shadow sm:hidden  w-full" x-show="open" @click.away="open = false">
            <ul id="cd-primary-nav" class="cd-primary-nav mb-0 align-self-center nav-is-visible shadow-lg">
                <ul
                    class="cd-secondary-nav container-fluid pr-0 d-block d-md-block d-lg-block d-xl-none border-bottom is-hidden">
                    <li class="p-0 p-md-0 p-lg-0 p-xl-4">
                        <div class="d-flex flex-column">
                            <a href="#">
                                Dashboard
                            </a>
                        </div>
                    </li>
                    <li class="p-0 p-md-0 p-lg-0 p-xl-4">
                        <div class="d-flex flex-column">
                            <a href="#">
                                Users
                            </a>
                        </div>
                    </li>
                    <li class="p-0 p-md-0 p-lg-0 p-xl-4">
                        <div class="d-flex flex-column">
                            <a href="#">
                                Orders
                            </a>
                        </div>
                    </li>
                    <li class="p-0 p-md-0 p-lg-0 p-xl-4">
                        <div class="d-flex flex-column">
                            <a href="#">
                                Settings
                            </a>
                        </div>
                    </li>
                </ul>
            </ul>
        </div>
    </div>
    <div class="flex flex-shrink-0 items-center ml-auto">
        <button class="p-2  mr-4 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring">
            <x-icon-store />
        </button>
        <div class="items-center hidden space-x-3 md:flex">
            <!-- Notification Button -->
            <div class="relative" x-data="{ isOpen: false }" x-cloak>
                <!-- red dot -->
                <div class="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
                <div class="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
                <button @click="isOpen = !isOpen"
                    class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring">
                    <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                <!-- Dropdown card -->
                <div @click.away="isOpen = false" x-show.transition.opacity="isOpen"
                    class="absolute w-48 max-w-md mt-3 z-50 transform bg-white rounded-md shadow-lg -translate-x-3/4 min-w-max">
                    <div class="p-4 font-medium border-b">
                        <span class="text-gray-800">Notification</span>
                    </div>
                    <ul class="flex flex-col p-2 my-2 space-y-1">
                        <li>
                            <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Link</a>
                        </li>
                        <li>
                            <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100">Another
                                Link</a>
                        </li>
                    </ul>
                    <div class="flex items-center justify-center p-4 text-blue-700 underline border-t">
                        <a href="#">See All</a>
                    </div>
                </div>
            </div>
        </div>
        <button class="relative inline-flex items-center p-2  rounded" @click="panel = !panel"
            @click.away="panel = false">
            <span class="sr-only">User Menu</span>
            <span class="h-8 w-8 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="user profile photo"
                    class="h-full w-full object-cover">
            </span>

        </button>
        <div class="absolute right-0 z-50 top-20 bg-white border rounded-md p-2 md:w-56" x-show="panel"
            style="display:none">
            <div class="px-4 py-4 flex gap-4 mb-2 border-b">
                <span class="h-10 w-10 bg-gray-100 rounded overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="user profile photo"
                        class="h-full w-full object-cover">
                </span>
                <div>
                    <p class="text-sm">Alex</p>
                    <p class="truncate text-sm font-medium text-gray-900">tom@example.com</p>
                </div>

            </div>
            <div class="p-2 py-2 hover:bg-blue-100 cursor-pointer text-sm flex gap-2 items-center">Profile</div>
            <div class="p-2 py-2 hover:bg-blue-100 cursor-pointer text-sm flex gap-2 items-center border-b"> Change
                Password</div>
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit"
                    class="p-2 py-4 hover:bg-blue-100 text flex gap-2 text-sm cursor-pointer items-center w-full">
                    Logout
                </button>
            </form>
        </div>

</header>