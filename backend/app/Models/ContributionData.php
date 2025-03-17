<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContributionData extends Model
{
    protected $fillable = [
        'contribution_id',
        'name',
        'description',
        'image'
    ];

    public function favourites()
    {
        return $this->belongsTo(Contribution::class, 'contribution_id');
    }
}
