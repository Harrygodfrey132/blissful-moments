@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div class="mr-6 mb-5 mt-4">
            <h1 class="text-xl font-semibold mb-2">Dashboard</h1>
        </div>
    </div>
    <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <div>
                <span class="block text-2xl font-bold">{{ $users }}</span>
                <span class="block text-gray-500">Users</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            </div>
            <div>
                <span class="block text-2xl font-bold">{{ $orders }}</span>
                <span class="block text-gray-500">Orders</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
            </div>
            <div>
                <span class="inline-block text-2xl font-bold">{{ $last_month_orders }}</span>
                <span class="block text-gray-500">Last Month Orders</span>
            </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
            <div
                class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <div>
                <span class="block text-2xl font-bold">5</span>
                <span class="block text-gray-500">Expiring Soon Subscription</span>
            </div>
        </div>
    </section>

    <!-- Insights Chart Section -->
    <div class="flex-grow bg-white shadow-md rounded-lg mt-5 p-6">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Insights</h3>
            <select class="text-sm text-black border w-40 border-gray-300 px-3 py-2 rounded-lg">
                <option> Last 12 months</option>
            </select>


        </div>

        <div class="flex items-end justify-end mb-4" id="customLegendContainer">

        </div>

        <!-- Chart -->
        <canvas id="revenueChart" height="150"></canvas>
    </div>

</div>
@endsection
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