<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'page_id',
        'gallery_name',
        'image_path',
        'caption',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
