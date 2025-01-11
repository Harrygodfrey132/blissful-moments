<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContributionRequest extends Model
{
    public const PENDING = 0;

    protected $fillable = [
        'contribution_id',
        'user_id',
        'full_name',
        'name',
        'description',
        'status',
        'email'
    ];
}
