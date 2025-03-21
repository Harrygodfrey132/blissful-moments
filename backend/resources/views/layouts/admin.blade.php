<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ str_replace('_', ' ', config('app.name', 'Laravel')) }}</title>

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('manifest.json') }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="flex min-h-screen bg-[#f6f8fb] overflow-x-hidden" style="overflow-x: hidden" x-data="setup()" x-cloak>
    <!-- Custom Notification -->
    <x-success-notification />
    <!-- Sidebar + Content Wrapper -->
    @include('elements.partials.sidebar')
    <div class="min-h-screen w-full">
    @include('elements.partials.header')
        <!-- Sidebar Include -->
       

        <main id="content" class="p-4 ml-20">
            @yield('content')
            @if (request()->is('chats*'))
                <div class="h-[calc(100vh_-_0.0rem)]">
                    {{ $slot }}
                </div>
            @endif
            </main>
    </div>

    <!-- Modals -->
    <x-delete-confirmation />
    <x-dynamic-panel />
    @stack('modals')

    <script>
        function setup() {
            return {
                isSidebarOpen: JSON.parse(localStorage.getItem('isSidebarOpen') || 'false'),
                toggleSidebar() {
                    this.isSidebarOpen = !this.isSidebarOpen;
                    localStorage.setItem('isSidebarOpen', this.isSidebarOpen);
                }
            };
        }
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const sidebar = document.getElementById("sidebar");
            const content = document.getElementById("content");
            const menuTextDashboard = document.getElementById("menuTextDashboard");
            const menuTextLogout = document.getElementById("menuTextLogout");
            const toggleSidebarButton = document.getElementById("toggleSidebar");

            let menuOpen = false;
            // sidebar.classList.add("w-64");
            // content.classList.add("ml-64");

            toggleSidebarButton.addEventListener("click", function() {
                menuOpen = !menuOpen;
                sidebar.classList.toggle("w-20", !menuOpen);
                sidebar.classList.toggle("w-64", menuOpen);
                content.classList.toggle("ml-20", !menuOpen);
                content.classList.toggle("ml-64", menuOpen);
                menuTextDashboard.style.display = menuOpen ? "inline" : "none";
                menuTextLogout.style.display = menuOpen ? "inline" : "none";
            });
        });
    </script>

    @stack('scripts')

    <script src="{{ asset('js/commonFunctions.js') }}"></script>
    @if(session('redirect_url'))
    <script>
        window.open("{{ session('redirect_url') }}", "_blank");
    </script>
    @endif
</body>

</html>
