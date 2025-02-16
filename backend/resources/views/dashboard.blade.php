@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div class="mr-6 mb-5 mt-4">
                <h1 class="text-xl font-semibold mb-2">Dashboard</h1>
            </div>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            @foreach ([['count' => $users, 'label' => 'Users', 'color' => 'blue', 'icon' => 'M17 20h5v-2a3 3 ...'], ['count' => $orders, 'label' => 'Orders', 'color' => 'green', 'icon' => 'M13 7h8m0 0v8m0-8l-8 ...'], ['count' => $last_month_orders, 'label' => 'Last Month Orders', 'color' => 'yellow', 'icon' => 'M13 17h8m0 0V9m0 8l-8 ...'], ['count' => $expired_subscriptions, 'label' => 'Expired Subscription', 'color' => 'red', 'icon' => 'M12 9v4m0 4h.01M12 2a10 ...']] as $card)
                <div class="flex items-center p-8 bg-white shadow rounded-lg transition-transform transform hover:scale-105">
                    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-{{ $card['color'] }}-600 bg-{{ $card['color'] }}-100 rounded-full mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $card['icon'] }}" />
                        </svg>
                    </div>
                    <div>
                        <span class="block text-2xl font-bold">{{ $card['count'] }}</span>
                        <span class="block text-gray-500">{{ $card['label'] }}</span>
                    </div>
                </div>
            @endforeach
        </section>
        <div class="bg-white shadow-md rounded-lg mt-5 p-6 animate-slide-up">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Insights</h3>
                <select id="timeRange" class="text-sm text-black border w-40 border-gray-300 px-3 py-2 rounded-lg transition hover:bg-gray-100">
                    <option value="12"> Last 12 months</option>
                    <option value="6"> Last 6 months</option>
                    <option value="3"> Last 3 months</option>
                    <option value="1"> Last month</option>
                </select>
            </div>
            <canvas id="revenueChart" height="150" class="animate-fade-in"></canvas>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
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
            document.getElementById("timeRange").addEventListener("change", function() {
                fetchChartData(this.value);
            });
            fetchChartData(12);
        });
    </script>
@endsection
