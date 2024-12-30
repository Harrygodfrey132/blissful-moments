<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    protected $fillable = ['page_id', 'tagline' , 'status'];

    protected $with = [
        'events'
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function events()
    {
        return $this->hasMany(TimelineEvent::class);
    }
}
