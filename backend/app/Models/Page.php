<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'is_private',
        'password',
        'background_image',
        'profile_picture',
        'first_name',
        'middle_name',
        'last_name',
        'date_of_birth',
        'death_date',
        'address',
        'background_music',
    ];

    protected $with = [
        'personalQuote',
        'galleries',
        'obituaries',
        'timeline'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function personalQuote()
    {
        return $this->hasOne(PersonalQuote::class);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }

    public function obituaries()
    {
        return $this->hasOne(Obituary::class);
    }

    public function timeline()
    {
        return $this->hasOne(Timeline::class);
    }
}
