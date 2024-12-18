<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    const ADMIN = 1;
    const USER = 2;
    const GUEST = 3;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'role_id',
        'email',
        'status',
        'subscription_status',
        'password',
    ];

    protected $with = [
        'userDetails',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->role_id === static::ADMIN,
        );
    }

    public function isUser(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->role_id === static::USER
        );
    }

    public function subscriptionStatus(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->attributes['subscription_status'] ?? 0
        );
    }

    public function isVerified(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->email_verified_at !== null
        );
    }

    public function scopeUserSearchFilter(Builder $query, $data)
    {
        // Exclude the current logged-in user
        $query->whereNot('id', Auth::id());

        // Filter by search term if provided
        if (!empty($data['search'])) {
            $query->where(function ($subQuery) use ($data) {
                $subQuery->where('name', 'like', '%' . $data['search'] . '%')
                    ->orWhere('email', 'like', '%' . $data['search'] . '%');
            });
        }

        // Filter by status if provided
        if (isset($data['status']) && $data['status'] !== '') {
            $query->where('status', $data['status']);
        }

        // Filter by start date if provided
        if (!empty($data['start_date'])) {
            $query->whereDate('created_at', '>=', $data['start_date']);
        }

        // Filter by end date if provided
        if (!empty($data['end_date'])) {
            $query->whereDate('created_at', '<=', $data['end_date']);
        }

        return $query;
    }

    public function GDPRrequest(): HasOne
    {
        return $this->hasOne(GDPRRequest::class, 'user_id');
    }

    public function page(): HasOne
    {
        return $this->hasOne(Page::class, 'user_id');
    }

    public function userDetails(): HasOne
    {
        return $this->hasOne(UserDetail::class, 'user_id');
    }
}
