<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;


class Template extends Model
{
    use Sluggable;

    const EMAIL_TEMPLATES = 1;
    const SMS_TEMPLATES = 2;

    const WELCOME_EMAIL = "welcome_email";
    const ACCOUNT_VERIFICATION_EMAIL = "account_verification_email";
    const ORDER_CONFIRMATION_EMAIL = "order_confirmation";

    protected $fillable = [
        'name',
        'subject',
        'body',
        'slug',
        'type',
        'replacements'
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }

    public function scopeEmailTemplates($query)
    {
        return $query->where('type', self::EMAIL_TEMPLATES);
    }

    public function scopeSmsTemplates($query)
    {
        return $query->where('type', self::SMS_TEMPLATES);
    }
}
