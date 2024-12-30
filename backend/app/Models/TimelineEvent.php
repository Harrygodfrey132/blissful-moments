<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimelineEvent extends Model
{
    use HasFactory;

    protected $fillable = ['timeline_id', 'event_date', 'title', 'description', 'location'];

    public function timeline()
    {
        return $this->belongsTo(Timeline::class);
    }
}
