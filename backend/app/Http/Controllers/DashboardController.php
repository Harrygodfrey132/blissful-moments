<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Page;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();
        $data = [
            'users' => User::count(),
            'orders' => Order::count(),
            'last_month_orders' => Order::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count(),
            'expired_subscriptions' => Page::where('is_registered', true)->where('is_suspended', true)->count()
        ];
        return view('dashboard', $data);
    }

    public function dashboardData(Request $request)
    {
        $months = $request->query('months', 12);

        $labels = collect(range($months - 1, 0))->map(function ($i) {
            return now()->subMonths($i)->format('M');
        });

        $totalOrders = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths($months))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $newUsers = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths($months))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $expiredPages = Page::selectRaw('MONTH(expired_at) as month, COUNT(*) as count')
            ->where('is_suspended' , true)
            ->where('expired_at', '>=', now()->subMonths($months))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $datasets = [
            [
                'label' => 'New Orders',
                'data' => $labels->map(fn($month) => $totalOrders[$month] ?? 0)->toArray(),
                'borderColor' => '#3b82f6',
                'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                'fill' => true,
                'borderWidth' => 2,
                'tension' => 0.4,
                'pointRadius' => 3
            ],
            [
                'label' => 'New Users',
                'data' => $labels->map(fn($month) => $newUsers[$month] ?? 0)->toArray(),
                'borderColor' => '#10b981',
                'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                'fill' => true,
                'borderWidth' => 2,
                'tension' => 0.4,
                'pointRadius' => 3
            ],
            [
                'label' => 'Expired Pages',
                'data' => $labels->map(fn($month) => $expiredPages[$month] ?? 0)->toArray(),
                'borderColor' => '#ef4444',
                'backgroundColor' => 'rgba(239, 68, 68, 0.2)',
                'fill' => true,
                'borderWidth' => 2,
                'tension' => 0.4,
                'pointRadius' => 3
            ]
        ];

        return response()->json([
            'labels' => $labels,
            'datasets' => $datasets
        ]);
    }
}
