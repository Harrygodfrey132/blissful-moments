<?php

namespace App\Mail;

use App\Models\EmailLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class WelcomeEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    protected $user;
    protected $template;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $template)
    {
        $this->user = $user;
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
            '{user_name}' => $this->user->name,
            '{logo_url}' => asset('path/to/logo.png'),
            '{dashboard_url}' => env('FRONTEND_URL'),
        ];
        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }

        try {
            // Save the email log to the database
            EmailLog::create([
                'subject' => $this->template->subject,
                'recipient_name' => $this->user->name,
                'recipient_email' => $this->user->email,
                'email_body' => $body,
                'sent_at' => now(),
            ]);
        } catch (\Throwable $th) {
            // Log any error while saving the data to the database
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
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
