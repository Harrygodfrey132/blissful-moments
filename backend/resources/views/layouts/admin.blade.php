<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <!-- Optional PNG Icons -->
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">

    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">

    <!-- Manifest File (For Progressive Web Apps) -->
    <link rel="manifest" href="{{ asset('manifest.json') }}">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="flex bg-[#F9F9F9] min-h-screen" style="overflow-x:hidden" x-data="commonData()" x-cloak>
    <!-- Custom Notification -->
    <x-success-notification />
    <!-- End Custom Notification -->
    @include('elements.partials.sidebar')
    <div class="min-h-screen w-full">
        @include('elements.partials.header')
        <!-- Page Content -->
        <main class="p-4 sm:px-8 ml-[250px] space-y-6">
            @yield('content')
        </main>
    </div>

    <!-- Modals -->
    <x-delete-confirmation />
    <x-dynamic-panel />
    <!-- End Modals -->

    @stack('modals')
    <script>
        const setup = () => {
            function getSidebarStateFromLocalStorage() {
                if (window.localStorage.getItem('isSidebarOpen')) {
                    return JSON.parse(window.localStorage.getItem('isSidebarOpen'))
                }
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
    <script src="{{ asset('js/commonFunctions.js') }}"></script>
</body>

</html>