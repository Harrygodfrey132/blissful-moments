<?php

namespace App\Mail;

use App\Helper\ConfigHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubscriptionReminderSecond extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $subscription;
    protected $template;

    /**
     * Create a new message instance.
     */
    public function __construct($subscription, $template)
    {
        $this->subscription = $subscription;
        $this->template = $template;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->template->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $body = $this->template->body;

        $replacements = [
            '{name}' => $this->subscription->user->name,
            '{renewal_url}' => env('FRONTEND_URL'),
            '{second_reminder_email}' => ConfigHelper::getConfig('conf_plan_expire_reminder_2')
        ];

        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }

        return new Content(
            view: 'emails.custom',
            with: [
                'body' => $body,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
