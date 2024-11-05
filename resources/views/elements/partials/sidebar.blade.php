<aside class="flex hidden block flex-col w-[300px]" :class="{' sm:flex sm:flex-col': window.outerWidth > 768}">
  <a href="#" class="inline-flex items-center justify-center h-20 w-full bg-gray-950">
    <span class="text-white font-black text-2xl  ml-2" x-show="menu">Logo</span>
  </a>
  <div class="flex-grow flex flex-col justify-between text-gray-500 bg-gray-950">
    <nav class="flex flex-col mx-4 my-6 space-y-4">
      <a href="#" class="inline-flex items-center py-3 text-black bg-white rounded px-2"
        :class="{'justify-start': menu, 'justify-center': menu == false}">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span class="ml-2" x-show="menu">Dashboard</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{'justify-start': menu, 'justify-center': menu == false}">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="ml-2" x-show="menu">Users</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{ 'justify-start': menu, 'justify-center': menu == false}">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="ml-2" x-show="menu">Orders</span>
      </a>
      <a href="#"
        class="inline-flex items-center text-white py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
        :class="{ 'justify-start': menu, 'justify-center': menu == false}">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span class="ml-2" x-show="menu">Settings</span>
      </a>
    </nav>
    <div class="flex justify-end">
      <a
        class="inline-flex py-3 text-white hover:text-gray-400  border-gray-700 h-15 w-full border-t hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 px-2">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="ml-2" x-show="menu">Logout</span>
      </a>
    </div>
  </div>
</aside>