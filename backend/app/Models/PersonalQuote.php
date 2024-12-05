<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalQuote extends Model
{
    protected $fillable = [
        'page_id',
        'quote',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
