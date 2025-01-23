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
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

    <!-- Scripts -->
    <!-- Place the first <script> tag in your HTML's <head> -->
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
        <main class="p-4 sm:px-8 ml-[86px] space-y-6">
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const ctx = document.getElementById('revenueChart').getContext('2d');

            // Create the chart
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: [3200, 3400, 3700, 4200, 4591, 4800, 11100, 5500, 5900, 6300, 6700, 7200],
                            borderColor: '#815E5C',
                            backgroundColor: 'rgba(230, 193, 187, 0.1)',
                            fill: true,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            pointBackgroundColor: '#ef4444',
                        },
                        {
                            label: 'Tax',
                            data: [500, 550, 600, 650, 1100, 1350, 1500, 850, 11000, 950, 1000, 8050],
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            fill: true,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            pointBackgroundColor: '#f59e0b',
                        },
                        {
                            label: 'Tips',
                            data: [200, 250, 300, 5550, 400, 450, 500, 1150, 600, 650, 700, 750],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            pointBackgroundColor: '#10b981',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false, // Disable the default legend
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `$${context.raw}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                drawOnChartArea: false,
                            },
                            ticks: {
                                color: '#6b7280',
                            },
                        },
                        y: {
                            grid: {
                                color: '#e5e7eb',
                            },
                            ticks: {
                                color: '#6b7280',
                            },
                        },
                    },
                },
            });

            // Custom Legend Creation
            const legendContainer = document.getElementById('customLegendContainer');
            chart.data.datasets.forEach((dataset, index) => {
                const legendItem = document.createElement('div');
                legendItem.classList.add('flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'text-sm');
                legendItem.innerHTML = `
                <span class="w-4 h-4 rounded-full" style="background-color: ${dataset.borderColor};"></span>
                ${dataset.label}
                <span class="text-lg font-bold ml-2" style="display:none;"></span> <!-- Cross icon, hidden by default -->
            `;

                const crossIcon = legendItem.querySelector('span.text-lg');

                // Toggle visibility of dataset when clicked on legend
                legendItem.addEventListener('click', function () {
                    const meta = chart.getDatasetMeta(index);

                    // Toggle visibility of the dataset
                    meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
                    chart.update();

                    // Toggle the visibility of legend item styling
                    if (meta.hidden) {
                        crossIcon.style.display = 'inline';
                        legendItem.style.opacity = 0.5;
                    } else {
                        crossIcon.style.display = 'none';
                        legendItem.style.opacity = 1;
                    }
                });

                legendContainer.appendChild(legendItem);
            });
        });
    </script>
</body>

</html>