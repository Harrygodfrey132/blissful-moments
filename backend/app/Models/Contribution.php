<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contribution extends Model
{
    protected $fillable = [
        'page_id',
        'tagline',
        'status'
    ];


    protected $with = [
        'contributionData'
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class, 'page_id');
    }

    public function contributionData()
    {
        return $this->hasMany(ContributionData::class);
    }
}
