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

class OrderConfirmationEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $user;
    protected $order;
    protected $emailTemplate;

    /**
     * Create a new message instance.
     */
    public function __construct($user, $order, $emailTemplate)
    {
        $this->user = $user;
        $this->order = $order;
        $this->emailTemplate = $emailTemplate;
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
        // Path to the logo and social media images
        $logoPath = public_path('img/logo-black.png');
        $facebookLogoPath = public_path('img/facebook.png');
        $instagramLogoPath = public_path('img/instagram.png');
        $twitterLogoPath = public_path('img/twitter.png');
        $youtubeLogoPath = public_path('img/youtube.png');
        $footerLogoPath = public_path('img/black-transparent.png');

        // Convert images to Base64
        $logoData = base64_encode(file_get_contents($logoPath));
        $facebookLogoData = base64_encode(file_get_contents($facebookLogoPath));
        $instagramLogoData = base64_encode(file_get_contents($instagramLogoPath));
        $twitterLogoData = base64_encode(file_get_contents($twitterLogoPath));
        $youtubeLogoData = base64_encode(file_get_contents($youtubeLogoPath));
        $footerLogoData = base64_encode(file_get_contents($footerLogoPath));

        // Prepare the Base64 data with appropriate MIME types
        $logoBase64 = 'data:image/png;base64,' . $logoData;
        $facebookLogoBase64 = 'data:image/png;base64,' . $facebookLogoData;
        $instagramLogoBase64 = 'data:image/png;base64,' . $instagramLogoData;
        $twitterLogoBase64 = 'data:image/png;base64,' . $twitterLogoData;
        $youtubeLogoBase64 = 'data:image/png;base64,' . $youtubeLogoData;
        $footerLogoBase64 = 'data:image/png;base64,' . $footerLogoData;

        // Replace placeholders with Base64 image data
        $body = $this->emailTemplate->body;

        $replacements = [
            '{name}' => $this->user->name,
            '{order_id}' => $this->order->order_id,
            '{order_date}' => $this->order->created_at->format('D M Y'),
            '{order_total}' => $this->order->order_total,
            '{order_tax}' => $this->order->order_tax,
            '{frontend_url}' => env('FRONTEND_URL'),
            '{facebook_link}' => ConfigHelper::getConfig('conf_facebook_link'),
            '{instagram_link}' => ConfigHelper::getConfig('conf_instagram_link'),
            '{twitter_link}' => ConfigHelper::getConfig('conf_twitter_link'),
            '{youtube_link}' => ConfigHelper::getConfig('conf_youtube_link'),
            '{logo_path}' => $logoBase64,
            '{facebook_logo}' => $facebookLogoBase64,
            '{instagram_logo}' => $instagramLogoBase64,
            '{twitter_logo}' => $twitterLogoBase64,
            '{youtube_logo}' => $youtubeLogoBase64,
            '{footer_logo}' => $footerLogoBase64,
            '{current_year}' => now('Y'),
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
            // Log any error while saving the data to the database
            Log::error('Error sending order email: ' . $th->getMessage());
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
