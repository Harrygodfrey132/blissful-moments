<?php
// app/Models/Order.php
namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'amount',
        'stripe_payment_intent',
        'stripe_payment_status',
        'plan_type',
        'plan_name',
        'plan_amount',
        'order_total',
        'order_tax',
        'next_renewal_date',
    ];

    protected $with = [
        'user'
    ];
    // Relationship with the User model (one-to-many)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function renewalStatus(): Attribute
    {
        return Attribute::make(
            get: function () {
                $createdAt = Carbon::parse($this->created_at);
                $nextRenewalDate = $this->next_renewal_date ? Carbon::parse($this->next_renewal_date) : null;
                $today = Carbon::now();

                if ($nextRenewalDate) {
                    $daysUntilRenewal = $today->diffInDays($nextRenewalDate, false); // Negative if in the past

                    if ($daysUntilRenewal < 0) {
                        return 'Expired';
                    } elseif ($daysUntilRenewal <= 30) {
                        return 'Renewal Due';
                    } elseif ($daysUntilRenewal <= 60) {
                        return 'Expiring Soon';
                    } else {
                        return 'Active';
                    }
                }

                // If `next_renewal_date` is null, fallback to the created_at date
                $monthsSinceCreation = $createdAt->diffInMonths($today);

                if ($monthsSinceCreation >= 1 && $monthsSinceCreation < 2) {
                    return 'Expiring Soon';
                } elseif ($monthsSinceCreation >= 2) {
                    return 'Expired';
                }

                return 'Active';
            }
        );
    }


    public function scopeOrderSearchFilter(Builder $query, $data)
    {
        // Exclude the current logged-in user
        $query->whereNot('user_id', Auth::id());
        // Filter by search term if provided
        if (!empty($data['search'])) {
            $query->where(function ($subQuery) use ($data) {
                $subQuery->where('order_id', 'like', '%' . $data['search'] . '%')
                    ->orWhere('plan_type', 'like', '%' . $data['search'] . '%')
                    ->orWhere('plan_name', 'like', '%' . $data['search'] . '%')
                    ->orWhere('stripe_payment_intent', 'like', '%' . $data['search'] . '%')
                    ->orWhere('stripe_payment_status', 'like', '%' . $data['search'] . '%')
                    ->orWhere('amount', 'like', '%' . $data['search'] . '%')
                    ->orWhereHas('user', function ($userQuery) use ($data) {
                        $userQuery->where('name', 'like', '%' . $data['search'] . '%')
                            ->orWhere('email', 'like', '%' . $data['search'] . '%');
                    });
            });
        }

        // Filter by renewal status if provided
        if (!empty($data['renewal_status'])) {
            $renewalStatus = $data['renewal_status'];

            $query->whereHas('user', function ($subQuery) use ($renewalStatus) {
                $subQuery->whereHas('orders', function ($orderQuery) use ($renewalStatus) {
                    // Apply logic for filtering by renewalStatus
                    $orderQuery->whereRaw(
                        "
                        CASE
                            WHEN DATEDIFF(next_renewal_date, NOW()) < 0 THEN 'Expired'
                            WHEN DATEDIFF(next_renewal_date, NOW()) <= 30 THEN 'Renewal Due'
                            WHEN DATEDIFF(next_renewal_date, NOW()) <= 60 THEN 'Expiring Soon'
                            ELSE 'Active'
                        END = ?",
                        [$renewalStatus]
                    );
                });
            });
        }

        return $query;
    }
}
