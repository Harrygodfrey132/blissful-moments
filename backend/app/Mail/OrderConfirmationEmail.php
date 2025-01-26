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
        $body = $this->emailTemplate->body;

        $replacements = [
            '{name}' => $this->user->name,
            '{order_id}' => $this->order->order_id,
            '{order_date}' => $this->order->created_at->format('D M Y'),
            '{order_total}' => $this->order->order_total,
            '{order_tax}' => $this->order->order_tax,
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
