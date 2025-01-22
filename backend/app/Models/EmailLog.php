<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
        'recipient_name',
        'recipient_email',
        'email_body',
        'sent_at',
    ];
}
