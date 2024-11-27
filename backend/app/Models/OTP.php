<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class OTP extends Model
{
    protected $table = 'otps';
    protected $fillable = [
        'user_id',
        'email',
        'otp',
        'expires_at',
        'is_used',
    ];

    public function isValid()
    {
        return !$this->is_used && Carbon::now()->lessThanOrEqualTo($this->expires_at);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
