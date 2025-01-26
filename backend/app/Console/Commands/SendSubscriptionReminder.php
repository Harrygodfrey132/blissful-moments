<?php

namespace App\Console\Commands;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Mail\FinalSubscriptionReminder;
use App\Mail\SubscriptionReminder;
use App\Mail\SubscriptionReminderSecond;
use App\Mail\SubscriptionReminderTwo;
use App\Models\Page;
use App\Models\Subscription;
use App\Models\Template;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendSubscriptionReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-subscription-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminders for subscription renewal.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = now();

        // Reminder for 30 days before expiration
        $subscriptions = Page::whereDate('next_renewal_date', '=', $today->addDays(ConfigHelper::getConfig('conf_plan_expire_reminder_1') ?? 30))->get();
        $emailTemplate = Template::where('code' , Template::SUBSCIPTION_FIRST_REMINDER)->first();
        foreach ($subscriptions as $subscription) {
            Mail::to($subscription->user->email)->send(new SubscriptionReminder($subscription, $emailTemplate));
            $subscription->user->update(['subscription_status' => AppConstant::EXPIRING_SOON]);
        }

        // Reminder for 15 days before expiration
        $emailTemplate = Template::where('code' , Template::SUBSCIPTION_SECOND_REMINDER)->first();
        $subscriptions = Page::whereDate('next_renewal_date', '=', $today->addDays(ConfigHelper::getConfig('conf_plan_expire_reminder_2') ?? 15))->get();
        foreach ($subscriptions as $subscription) {
            Mail::to($subscription->user->email)->send(new SubscriptionReminderSecond($subscription, $emailTemplate));
        }

        // Final reminder for 1 day before expiration
        $emailTemplate = Template::where('code' , Template::SUBSCIPTION_FINAL_REMINDER)->first();
        $subscriptions = Page::whereDate('next_renewal_date', '=', $today->addDays(ConfigHelper::getConfig('conf_plan_expire_reminder_3') ?? 1))->get();
        foreach ($subscriptions as $subscription) {
            Mail::to($subscription->user->email)->send(new FinalSubscriptionReminder($subscription, $emailTemplate));
        }

        // Suspend expired subscriptions
        $expiredSubscriptions = Page::where('next_renewal_date', '<', $today)->get();
        foreach ($expiredSubscriptions as $subscription) {
            $subscription->update(['is_suspended' => true]);
            $subscription->user->update(['subscription_status' => AppConstant::EXPIRED]);
        }

        // Delete data for suspended users after 30 days
        $suspendedSubscriptions = Page::where('is_suspended', true)->where('updated_at', '<', $today->subDays(ConfigHelper::getConfig('conf_data_removal_days') ?? 30))->get();
        foreach ($suspendedSubscriptions as $subscription) {
            $subscription->user->delete();
            $subscription->delete();
        }

        $this->info('Subscription reminders sent and expired subscriptions handled!');
    }
}
