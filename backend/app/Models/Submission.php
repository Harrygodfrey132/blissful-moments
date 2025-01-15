<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'access_request_id',
        'quote',
        'obituary',
        'timeline',
        'gallery',
        'favourites',
        'tagline',
        'status',
    ];

    protected $casts = [
        'timeline' => 'array',
        'gallery' => 'array',
        'favourites' => 'array',
    ];
}
