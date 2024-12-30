<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obituary extends Model
{
    protected $fillable = [
        'page_id',
        'content',
        'tagline',
        'status'
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
