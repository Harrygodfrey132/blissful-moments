<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use Sluggable;

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
        'is_registered'
    ];

    protected $with = [
        'personalQuote',
        'gallery',
        'obituaries',
        'timeline',
        'socialMediaData'
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function personalQuote()
    {
        return $this->hasOne(PersonalQuote::class);
    }

    public function gallery()
    {
        return $this->hasOne(Gallery::class);
    }

    public function obituaries()
    {
        return $this->hasOne(Obituary::class);
    }

    public function timeline()
    {
        return $this->hasOne(Timeline::class);
    }

    public function socialMediaData()
    {
        return $this->hasOne(SocialMedia::class);
    }
}
