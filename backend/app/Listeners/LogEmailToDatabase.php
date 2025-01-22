<?php

namespace App\Listeners;

use App\Events\EmailSent;
use App\Models\EmailLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class LogEmailToDatabase
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(EmailSent $event): void
    {
        try {
            // Check if the same email was logged recently (e.g., within the last 10 minutes)
            $existingLog = EmailLog::where('recipient_email', $event->recipient_email)
                ->where('subject', $event->subject)
                ->where('sent_at', '>=', now()->subMinutes(10)) // Prevent logging the same email twice within 10 minutes
                ->first();

            // If the email has not been logged recently, log it
            if (!$existingLog) {
                EmailLog::create([
                    'subject' => $event->subject,
                    'recipient_name' => $event->recipient_name,
                    'recipient_email' => $event->recipient_email,
                    'email_body' => $event->email_body,
                    'sent_at' => now(),
                ]);
            }
        } catch (\Throwable $th) {
            Log::error('Error logging email to database: ' . $th->getMessage());
        }
    }
}
