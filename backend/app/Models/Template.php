<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;


class Template extends Model
{
    use Sluggable;

    const EMAIL_TEMPLATES = 1;
    const SMS_TEMPLATES = 2;

    public const WELCOME_EMAIL = "welcome_email";
    public const ACCOUNT_VERIFICATION_EMAIL = "account_verification_email";
    public const PASSWORD_RESET_EMAIL = "password_reset_email";
    public const ORDER_CONFIRMATION_EMAIL = "order_confirmation";
    public const EDIT_PAGE_ACCCESS_EMAIL = 'request_accepted_with_link_email';
    public const PLAN_EXPIRY_EMAIL = "plan_expiry_email";
    public const CONTRIBUTION_REQUEST_EMAIL = "contribution_request_email";
    public const PAGE_EDIT_REQUEST_EMAIL = "page_edit_request_email";
    public const PAGE_REGISTRATION_CONGRATULATIONS_EMAIL = "page_registration_congratulations_email";
    public const NEW_CONTRIBUTION_REQUEST_EMAIL = "new_contribution_request_email";
    public const REQUEST_SUBMISSION_CONFIRMATION_EMAIL = "request_submission_confirmation_email";
    public const NEW_SUBMITTED_DATA_REQUEST_EMAIL = "new_submitted_data_request_email";
    public const REQUEST_ACCEPTED_WITH_LINK_EMAIL = "request_accepted_with_link_email";
    public const REQUEST_STATUS_UPDATE_EMAIL = "request_status_update_email";
    public const SUBSCIPTION_FIRST_REMINDER = "subscription_first_reminder";
    public const SUBSCIPTION_SECOND_REMINDER = "subscription_second_reminder";
    public const SUBSCIPTION_FINAL_REMINDER = "subscription_final_reminder";

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
