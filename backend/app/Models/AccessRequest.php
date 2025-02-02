<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class AccessRequest extends Model
{
    use Notifiable;
    protected $fillable = [
        'page_id',
        'name',
        'email',
        'sections',
        'status',
        'access_link',
        'expires_at',
        'access_token',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'page_id');
    }
}
