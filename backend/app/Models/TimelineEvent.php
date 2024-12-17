<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimelineEvent extends Model
{
    use HasFactory;

    protected $fillable = ['page_id', 'timeline_id', 'event_date', 'title', 'description', 'location'];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
