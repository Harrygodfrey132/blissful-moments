<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    protected $fillable = [
        'conf_key',
        'conf_value',
    ];
}
