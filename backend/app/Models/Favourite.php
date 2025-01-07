<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favourite extends Model
{
    protected $fillable = [
        'page_id',
        'tagline',
        'status'
    ];

    protected $with = [
        'favouriteEvents'
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'page_id');
    }

    public function favouriteEvents()
    {
        return $this->hasMany(FavouriteEvent::class);
    }
}
