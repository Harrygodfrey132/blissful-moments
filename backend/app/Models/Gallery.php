<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'page_id',
        'gallery_name',
        'status'
    ];

    protected $with = [
        'images',
        'folders'
    ];

    protected function casts(): array
    {
        return [
            'status' => 'boolean',
        ];
    }

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
