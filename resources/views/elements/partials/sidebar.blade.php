<aside class="flex hidden block flex-col w-[300px]" :class="{' sm:flex sm:flex-col': window.outerWidth > 768}">
  <a href="#" class="inline-flex items-center justify-center h-20 w-full bg-gray-950">
    <span class="text-white font-black text-xl  ml-2" x-show="menu">Logo</span>
  </a>
  <div class="flex-grow flex flex-col justify-between text-gray-500 bg-gray-950">
    <nav class="flex flex-col mx-4 my-6 space-y-4">
      <a href="#" class="inline-flex items-center py-3 text-black bg-white rounded px-2"
        :class="{'justify-start': menu, 'justify-center': menu == false}">
      <x-icon-dashboard />
        <span class="ml-2 text-sm" x-show="menu">Dashboard</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{'justify-start': menu, 'justify-center': menu == false}">
       <x-icon-user />
        <span class="ml-2 text-sm" x-show="menu">Users</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{ 'justify-start': menu, 'justify-center': menu == false}">
        <x-icon-order />
        <span class="ml-2 text-sm" x-show="menu">Orders</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{ 'justify-start': menu, 'justify-center': menu == false}">
       <x-icon-setting />
        <span class="ml-2 text-sm" x-show="menu">Settings</span>
      </a>
    </nav>
    <div class="flex justify-end">
      <a
        class="inline-flex py-3 text-white hover:text-gray-400  border-gray-700 h-15 w-full border-t hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 px-2">
       <x-icon-logout />
        <span class="ml-2 text-sm" x-show="menu">Logout</span>
      </a>
    </div>
  </div>
</aside>