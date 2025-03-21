@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6 mb-5 mt-4">
                <h1 class="text-xl font-semibold mb-2">Dashboard</h1>
            </div>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            @foreach ([['count' => $users, 'label' => 'Users', 'color' => 'blue', 'icon' => 'users'], ['count' => $orders, 'label' => 'Orders', 'color' => 'green', 'icon' => 'orders'], ['count' => $last_month_orders, 'label' => 'Last Month Orders', 'color' => 'yellow', 'icon' => 'last_month_orders'], ['count' => $expired_subscriptions, 'label' => 'Expired Subscription', 'color' => 'red', 'icon' => 'expired_subscriptions']] as $card)
                <div
                    class="flex items-center p-8 bg-white shadow-sm border rounded-lg transition-transform transform hover:scale-105">
                    <div
                        class="inline-flex flex-shrink-0 items-center justify-center border h-16 rounded shadow-sm w-16 text-{{ $card['color'] }}-600 p-2.5  mr-6">
                        @if($card['icon'] === 'users')
                            <svg style="width:34px" class="w-64 h-64" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        @elseif($card['icon'] === 'orders')
                            <svg class="w-64 h-64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        @elseif($card['icon'] === 'last_month_orders')
                            <svg class="w-64 h-64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414C6.172 21 7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586C19 19.828 19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414C17.828 4 16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        @elseif($card['icon'] === 'expired_subscriptions')
                            <svg class="w-64 h-64" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <g data-name="info">
                                    <path
                                        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14a1 1 0 0 1-2 0v-5a1 1 0 0 1 2 0zm-1-7a1 1 0 1 1 1-1 1 1 0 0 1-1 1z">
                                    </path>
                                </g>
                            </svg>
                        @endif
                    </div>
                    <div>
                        <span class="block text-2xl font-bold">{{ $card['count'] }}</span>
                        <span class="block font-medium text-gray-500">{{ $card['label'] }}</span>
                    </div>
                </div>
            @endforeach

        </section>
        <div class="mt-7 animate-slide-up">
            <div class="flex gap-5">
                <div class="px-2 w-full sm:px-2 lg:px-2">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-xl font-semibold text-gray-900">Recent Orders</h1>

                        </div>

                    </div>
                    <div class="mt-4 flow-root">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Name</th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role
                                                </th>
                                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr>
                                                <td
                                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    Lindsay Walton</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Front-end
                                                    Developer</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    lindsay.walton@example.com</td>
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td>
                                                <td
                                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span
                                                            class="sr-only">, Lindsay Walton</span></a>
                                                </td>
                                            </tr>

                                            <!-- More people... -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            let chart;
            function fetchChartData(months) {
                fetch(`/admin/dashboard/data?months=${months}`)
                    .then(response => response.json())
                    .then(data => {
                        updateChart(data);
                    });
            }
            function updateChart(data) {
                if (chart) chart.destroy();
                const ctx = document.getElementById('revenueChart').getContext('2d');
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.labels,
                        datasets: data.datasets
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { display: true } },
                        scales: { x: { grid: { drawOnChartArea: false } }, y: { grid: { color: '#e5e7eb' } } }
                    }
                });
            }
            document.getElementById("timeRange").addEventListener("change", function () {
                fetchChartData(this.value);
            });
            fetchChartData(12);
        });
    </script>
@endsection