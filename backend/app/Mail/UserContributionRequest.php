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

class UserContributionRequest extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $contributionRequest;
    protected $template;

    /**
     * Create a new message instance.
     */
    public function __construct($contributionRequest, $template)
    {
        $this->contributionRequest = $contributionRequest->load('user');
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

        // Safe fallback values to avoid null errors
        $userName = optional($this->contributionRequest->user)->name ?? 'User';
        $userEmail = optional($this->contributionRequest->user)->email ?? 'unknown@example.com';
        $pageName = optional($this->contributionRequest->page)->name ?? 'N/A';

        $replacements = [
            '{name}' => $userName,
            '{contributor_name}' => $this->contributionRequest->full_name,
            '{contributor_message}' => $this->contributionRequest->description,
            '{page_name}' => $pageName,
            '{manage_request_url}' => env('FRONTEND_URL'),
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
            '{current_year}' => now()->year,
        ];

        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }

        try {
            EmailLog::create([
                'subject' => $this->template->subject,
                'recipient_name' => $userName,
                'recipient_email' => $userEmail,
                'email_body' => $body,
                'sent_at' => now(),
            ]);
        } catch (\Throwable $th) {
            Log::error('Error saving email log: ' . $th->getMessage());
        }

        return new Content(
            view: 'emails.render_view',
            with: ['body' => $body]
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
