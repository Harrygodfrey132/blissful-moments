<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImageRequest extends Model
{
    protected $fillable = [
        'page_id',
        'user_id',
        'name',
        'email',
        'folder',
        'images',
        'status'
    ];

    protected $casts = [
        'images' => 'array', // Automatically convert JSON to array
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
