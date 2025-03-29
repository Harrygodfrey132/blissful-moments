<?php

use App\Models\Order;
use Illuminate\Support\Facades\DB;

function formatDate($date)
{
    // Check if the input is a valid DateTime object
    if ($date instanceof DateTime) {
        return $date->format('M j, Y'); // Format as "Nov 11, 2024"
    }

    // If the input is a string or timestamp, try to create a DateTime object
    $dateObj = new DateTime($date);

    // Return the formatted date
    return $dateObj->format('M j, Y');
}

function formatPrice($price)
{
    // Return the formatted date
    return "£" . $price;
}

function generateUniqueOrderId()
{
    $prefix = 'ORD-';

    do {
        $randomNumber = mt_rand(100000, 999999);
        $orderId = $prefix . $randomNumber;

        $exists = DB::table('orders')->where('order_id', $orderId)->exists();
    } while ($exists); // Repeat if the order ID already exists

    return $orderId;
}
