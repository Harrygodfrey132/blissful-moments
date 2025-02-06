<?php

namespace App\Models;

use App\Helper\AppConstant;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use Sluggable;

    protected $fillable = [
        'user_id',
        'name',
        'qr_code',
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
        'is_registered',
        'is_suspended',
        'next_renewal_date'
    ];

    protected $with = [
        'personalQuote',
        'gallery',
        'obituaries',
        'timeline',
        'socialMediaData',
        'favourites',
        'contributions'
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
                'source' => 'name',
                'onUpdate' => true
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

    public function favourites()
    {
        return $this->hasOne(Favourite::class);
    }

    public function contributions()
    {
        return $this->hasOne(Contribution::class);
    }

    public function scopeActiveNotSuspended($query)
    {
        return $query->where('is_registered', AppConstant::ACTIVE)
            ->where('is_suspended', AppConstant::IN_ACTIVE);
    }
}
