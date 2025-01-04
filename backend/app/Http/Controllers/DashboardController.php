<?php

namespace App\Http\Controllers;

use App\Models\Order;
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
            'last_month_orders' => Order::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count(), // Count with conditions
        ];
        return view('dashboard', $data);
    }
}
