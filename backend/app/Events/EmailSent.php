<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmailSent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $subject;
    public $recipient_name;
    public $recipient_email;
    public $email_body;

    /**
     * Create a new event instance.
     */
    public function __construct($subject, $recipient_name, $recipient_email, $email_body)
    {
        $this->subject = $subject;
        $this->recipient_name = $recipient_name;
        $this->recipient_email = $recipient_email;
        $this->email_body = $email_body;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
