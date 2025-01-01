<?php
// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
        'stripe_payment_intent',
        'stripe_payment_status',
        'plan_type',
        'plan_name',
        'plan_amount',
        'next_renewal_date',
    ];

    // Relationship with the User model (one-to-many)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
