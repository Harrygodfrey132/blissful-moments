<?php

namespace App\Notifications;

use App\Helper\ConfigHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountVerificationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $template;
    protected $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct($user, $template, $otp)
    {
        $this->user = $user;
        $this->template = $template;
        $this->otp = $otp;
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
            '{user_name}' => $this->user->name,
            '{logo_url}' => asset('path/to/logo.png'),
            '{dashboard_url}' => route('dashboard'),
            '{otp_code}' => $this->otp->otp,
            '{expiry_time}' => ConfigHelper::getConfig('conf_otp_expiration_time')
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
