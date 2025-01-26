<?php

namespace App\Mail;

use App\Helper\ConfigHelper;
use App\Models\EmailLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PasswordResetEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $user;
    protected $emailTemplate;
    protected $otp;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $emailTemplate, $otp)
    {
        $this->user = $user;
        $this->emailTemplate = $emailTemplate;
        $this->otp = $otp;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailTemplate->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {

        $body = $this->emailTemplate->body;

        $replacements = [
            '{name}' => $this->user->name,
            '{otp}' => $this->otp,
            '{expiry_time}' => (int)(ConfigHelper::getConfig('conf_otp_expiration_time') ?? 10),
            '{logo_url}' => asset('path/to/logo.png'),
        ];
        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }

        try {
            // Save the email log to the database
            EmailLog::create([
                'subject' => $this->emailTemplate->subject,
                'recipient_name' => $this->user->name,
                'recipient_email' => $this->user->email,
                'email_body' => $body,
                'sent_at' => now(),
            ]);
        } catch (\Throwable $th) {
            Log::error('Error saving email log: ' . $th->getMessage());
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
     */
    public function attachments(): array
    {
        return [];
    }
}
