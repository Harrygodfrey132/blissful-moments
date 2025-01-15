<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccessRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $name;
    protected $uniqueLink;
    protected $expiry_time;
    protected $template;
    /**
     * Create a new notification instance.
     */
    public function __construct($name, $uniqueLink, $expiry_time, $template)
    {
        $this->name = $name;
        $this->uniqueLink = $uniqueLink;
        $this->expiry_time = $expiry_time;
        $this->template = $template;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        $body = $this->template->body;
        $replacements = [
            '{name}' => $this->name,
            '{unique_link}' => $this->uniqueLink,
            '{expiry_time}' => $this->expiry_time,
        ];
        foreach ($replacements as $placeholder => $value) {
            $body = str_replace($placeholder, $value, $body);
        }
        return (new MailMessage)
            ->subject($this->template->subject)
            ->view('emails.custom', ['body' => $body])
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
