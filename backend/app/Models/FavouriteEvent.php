<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavouriteEvent extends Model
{
    protected $table = 'favourites_event';

    protected $fillable = [
        'favourite_id',
        'title',
        'description'
    ];

    public function favourites()
    {
        return $this->belongsTo(Favourite::class, 'favourite_id');
    }
}
