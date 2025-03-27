@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-2 sm:p-6 space-y-6">
            <form action="{{ route('configuration.store') }}" method="POST">
                @csrf
                <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                    <p class="text-xl font-bold text-gray-800"> Third-Party Plugin Configuration </p>
                    <div class="flex space-x-4">
                        <a href="{{ route('configuration.index') }}"
                            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </a>
                        <button type="submit" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                            <i class="fas fa-save mr-2"></i> Save Configuration
                        </button>
                    </div>
                </div>
                <div class="mt-6 md:grid grid-cols-2 gap-10 max-xl:flex-wrap">
                    <div class="content-start gap-2.5">
                        <p class="text-base font-semibold text-gray-600"> Plugin Settings </p>
                        <p class="text-gray-600"> Configure the keys for third-party plugins such as Stripe, Google Captcha,
                            etc.
                        </p>
                    </div>
                    <div class="box-shadow rounded bg-white p-4">
                        <div class="grid gap-6">
                            <!-- Stripe Secret Key -->
                            <div class="flex flex-col">
                                <label for="stripe-secret-key" class="mb-2 text-sm font-medium text-gray-700">
                                    Stripe Secret Key
                                </label>
                                <input type="text" id="stripe-secret-key" name="conf_stripe_secret_key"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_stripe_secret_key') }}"
                                    placeholder="Enter Stripe Secret Key" />
                                <small class="text-gray-500">Enter your Stripe secret key here.</small>
                            </div>
                            <!-- Stripe Public Key -->
                            <div class="flex flex-col">
                                <label for="stripe-secret-key" class="mb-2 text-sm font-medium text-gray-700">
                                    Stripe Public Key
                                </label>
                                <input type="text" id="stripe_public_key" name="conf_stripe_public_key"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_stripe_public_key') }}"
                                    placeholder="Enter Stripe Public/Publishable Key" />
                                <small class="text-gray-500">Enter your Stripe public/publishable key here.</small>
                            </div>
                            <!-- Stripe Webhook Secret -->
                            <div class="flex flex-col">
                                <label for="stripe-webhook-secret" class="mb-2 text-sm font-medium text-gray-700">
                                    Stripe Webhook Secret
                                </label>
                                <input type="text" id="stripe-webhook-secret" name="conf_stripe_webhook_secret"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_stripe_webhook_secret') }}"
                                    placeholder="Enter Stripe Webhook Secret" />
                                <small class="text-gray-500">Enter your Stripe webhook secret here.</small>
                            </div>
                            <!-- Google Captcha Site Key -->
                            <div class="flex flex-col">
                                <label for="google-captcha-site-key" class="mb-2 text-sm font-medium text-gray-700">
                                    Google Captcha Site Key
                                </label>
                                <input type="text" id="google-captcha-site-key" name="conf_google_captcha_site_key"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_google_captcha_site_key') }}"
                                    placeholder="Enter Google Captcha Site Key" />
                                <small class="text-gray-500">Enter your Google Captcha site key here.</small>
                            </div>
                            <!-- Google Captcha Secret Key -->
                            <div class="flex flex-col">
                                <label for="google-captcha-secret-key" class="mb-2 text-sm font-medium text-gray-700">
                                    Google Captcha Secret Key
                                </label>
                                <input type="text" id="google-captcha-secret-key" name="conf_google_captcha_secret_key"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_google_captcha_secret_key') }}"
                                    placeholder="Enter Google Captcha Secret Key" />
                                <small class="text-gray-500">Enter your Google Captcha secret key here.</small>
                            </div>
                            <!-- Google Captcha Secret Key -->
                            <div class="flex flex-col">
                                <label for="tinymce-key" class="mb-2 text-sm font-medium text-gray-700">
                                    Tinymce Editor Key
                                </label>
                                <input type="text" id="tinymce-key" name="conf_tinymce_key"
                                    class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value="{{ Config::getConfig('conf_tinymce_key') }}" placeholder="Enter Tinymce Key" />
                                <small class="text-gray-500">Enter your Tinymce Editor key here.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
