<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Helper\ConfigHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Subscription as StripeSubscription;

class SubscriptionController extends Controller
{
    public function cancel(Request $request)
    {
        try {
            $user = User::where('id' , Auth::id())->whereOr('id' , $request->userId)->first();
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
            }

            // Set Stripe API Key
            Stripe::setApiKey(ConfigHelper::getConfig('conf_stripe_secret_key'));

            // Cancel the subscription on Stripe
            $stripeSubscription = StripeSubscription::retrieve($user->stripe_subscription_id);
            $stripeSubscription->cancel();

            // Cancel the subscription (adjust based on your subscription logic)
            $user->update([
                'subscription_status' => AppConstant::IN_ACTIVE,
            ]);
            $user->page->is_suspended = AppConstant::IN_ACTIVE;
            $user->page->save();
            return response()->json(['success' => true, 'message' => 'Subscription canceled successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error canceling subscription', 'error' => $e->getMessage()], 500);
        }
    }
}
