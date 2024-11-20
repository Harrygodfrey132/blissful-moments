<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GDPRRequest extends Model
{
    protected $table = 'gdpr_requests';
    protected $fillable = [
        'user_id',
        'comments',
        'status'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withTrashed();
    }

    public function scopeSearchFilter(Builder $query, $data)
    {
        // Exclude the current logged-in user's GDPR requests
        $query->whereNot('user_id', Auth::id());

        // Join the users table to allow searching user attributes
        $query->join('users', 'gdpr_requests.user_id', '=', 'users.id')
            ->select('gdpr_requests.*');

        // Filter by search term if provided
        if (!empty($data['search'])) {
            $query->where(function ($subQuery) use ($data) {
                $subQuery->where('users.name', 'like', '%' . $data['search'] . '%')
                    ->orWhere('users.email', 'like', '%' . $data['search'] . '%');
            });
        }

        // Filter by status if provided
        if (isset($data['status']) && $data['status'] !== '') {
            $query->where('gdpr_requests.status', $data['status']);
        }

        // Filter by start date if provided
        if (!empty($data['start_date'])) {
            $query->whereDate('gdpr_requests.created_at', '>=', $data['start_date']);
        }

        // Filter by end date if provided
        if (!empty($data['end_date'])) {
            $query->whereDate('gdpr_requests.created_at', '<=', $data['end_date']);
        }

        return $query;
    }
}
