<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'page_id',
        'gallery_name',
    ];

    protected $with = [
        'images',
        'folders'
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function images()
    {
        return $this->hasMany(GalleryImage::class, 'gallery_id');
    }

    public function folders()
    {
        return $this->hasMany(GalleryFolder::class);
    }
}
