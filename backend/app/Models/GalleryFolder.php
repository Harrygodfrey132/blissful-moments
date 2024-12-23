<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryFolder extends Model
{
    protected $fillable = ['name', 'gallery_id'];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }

    public function images()
    {
        return $this->hasMany(GalleryImage::class);
    }
}
