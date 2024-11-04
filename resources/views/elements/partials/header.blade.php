<header class="flex items-center h-20 px-6 sm:px-10 bg-white">
  <!-- <div class="mr-8 cursor-pointer" @click="menu = !menu" >
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
</svg>
      </div> -->
  <div class="relative w-full max-w-md sm:-ml-2">
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
      <path fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd" />
    </svg>
    <input type="text" role="search" placeholder="Search..."
      class="py-2 pl-10 pr-4 w-full border-1 border-gray-100 placeholder-gray-400 focus:bg-gray-50 rounded" />
  </div>
  <div class="flex flex-shrink-0 items-center ml-auto">
    <button class="relative inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg"
      @click="panel = !panel" @click.away="panel = false">
      <span class="sr-only">User Menu</span>
      <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
        <span class="font-semibold">Rajinder Agnihotri</span>
        <!-- <span class="text-sm text-gray-600">Quality Engineer</span> -->
      </div>
      <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
        <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="user profile photo"
          class="h-full w-full object-cover">
      </span>
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" class="hidden sm:block h-6 w-6 text-gray-300">
        <path fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <div class="absolute top-20 bg-white border rounded-md p-2 w-56" x-show="panel" style="display:none">
      <div class="p-2 hover:bg-blue-100 cursor-pointer">Profile</div>
      <div class="p-2 hover:bg-blue-100 cursor-pointer">Logout</div>
    </div>
  </div>
</header>