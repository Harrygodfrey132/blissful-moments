<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryImage extends Model
{
    protected $table = 'gallery_images';

    protected $fillable = [
        'gallery_id',
        'folder_id',
        'image_path',
        'caption'
    ];

    public function gallery(): BelongsTo
    {
        return $this->belongsTo(Gallery::class);
    }

    public function folder()
    {
        return $this->belongsTo(GalleryFolder::class);
    }
}
