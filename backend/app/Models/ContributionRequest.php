<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class ContributionRequest extends Model
{
    use Notifiable;
    public const PENDING = 0;

    protected $fillable = [
        'contribution_id',
        'user_id',
        'full_name',
        'name',
        'description',
        'status',
        'email',
        'image'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
