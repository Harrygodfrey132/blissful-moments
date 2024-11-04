<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  <!-- Scripts -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="flex bg-gray-100 min-h-screen" x-data="{panel:false, menu:true}">
  @include('elements.partials.sidebar')
  <div class="min-h-screen bg-gray-100 w-full">
    @include('elements.partials.header')
    <!-- Page Content -->
    <main class="p-6 sm:p-10 space-y-6">
      @yield('content')
    </main>
  </div>
  <script>
    const setup = () => {
      function getSidebarStateFromLocalStorage() {
        // if it already there, use it
        if (window.localStorage.getItem('isSidebarOpen')) {
          return JSON.parse(window.localStorage.getItem('isSidebarOpen'))
        }

        // else return the initial state you want
        return (
          false
        )
      }

      function setSidebarStateToLocalStorage(value) {
        window.localStorage.setItem('isSidebarOpen', value)
      }

      return {
        loading: true,
        isSidebarOpen: getSidebarStateFromLocalStorage(),
        toggleSidbarMenu() {
          this.isSidebarOpen = !this.isSidebarOpen
          setSidebarStateToLocalStorage(this.isSidebarOpen)
        },
        isSettingsPanelOpen: false,
        isSearchBoxOpen: false,
      }
    }
  </script>
  @stack('scripts')
</body>

</html>