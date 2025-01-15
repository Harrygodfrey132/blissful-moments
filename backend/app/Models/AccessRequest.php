<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessRequest extends Model
{

    protected $fillable = [
        'page_id',
        'name',
        'email',
        'sections',
        'status',
        'access_link',
        'expires_at',
        'access_token',
    ];
}
