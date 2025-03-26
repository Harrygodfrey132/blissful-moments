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

class AccountVerificationEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $user;
    protected $template;
    protected $otp;

    /**
     * Create a new Message instance.
     */
    public function __construct($user, $template, $otp)
    {
        $this->user = $user;
        $this->template = $template;
        $this->otp = $otp;
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

        // Replace placeholders with Base64 image data
        $body = $this->template->body;

        $replacements = [
            '{user_name}' => $this->user->name,
            '{otp_code}' => $this->otp,
            '{expiry_time}' => ConfigHelper::getConfig('conf_otp_expiration_time'),
            '{frontend_url}' => env('FRONTEND_URL'),
            '{facebook_link}' => ConfigHelper::getConfig('conf_facebook_link'),
            '{instagram_link}' => ConfigHelper::getConfig('conf_instagram_link'),
            '{twitter_link}' => ConfigHelper::getConfig('conf_twitter_link'),
            '{youtube_link}' => ConfigHelper::getConfig('conf_youtube_link'),
            '{logo_path}' => asset('img/logo-black.png'),
            '{facebook_logo}' => asset('img/facebook.png'),
            '{instagram_logo}' => asset('img/instagram.png'),
            '{twitter_logo}' => asset('img/twitter.png'),
            '{youtube_logo}' => asset('img/youtube.png'),
            '{footer_logo}' => asset('img/black-transparent.png'),
            '{current_year}' => now('Y'),
        ];
        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }

        // Log the email to the database (or perform other database operations)
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
            view: 'emails.render_view',
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
