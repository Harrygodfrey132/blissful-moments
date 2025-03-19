@extends('layouts.admin')

@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-4 space-y-8">
            <!-- Form Header -->
            <form action="{{ route('configuration.store') }}" method="POST" id="smtp-settings-form">
                @csrf
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900">SMTP & Email Settings</h1>
                    <div class="flex space-x-4">
                        <a href="{{ route('configuration.index') }}" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </a>
                        <button type="submit" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                            <i class="fas fa-save mr-2"></i> Save Configuration
                        </button>
                    </div>
                </div>

                <!-- Form Body -->
                <div x-data="{ mailDriver: '{{ old('mail_driver', Config::getConfig('conf_mail_driver') ?: 'smtp') }}' }" class="bg-white shadow mt-5 rounded-lg p-6 space-y-6">
                    <!-- Mail Provider Selection -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Mail Provider <span class="text-red-500">*</span></label>
                        <select x-model="mailDriver" name="conf_mail_driver" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black">
                            <option value="smtp" {{ Config::getConfig('conf_mail_driver') == 'smtp' ? 'selected' : '' }}>SMTP</option>
                            <option value="mailgun" {{ Config::getConfig('conf_mail_driver') == 'mailgun' ? 'selected' : '' }}>Mailgun</option>
                            <option value="sendgrid" {{ Config::getConfig('conf_mail_driver') == 'sendgrid' ? 'selected' : '' }}>SendGrid</option>
                        </select>
                    </div>

                    <!-- General Email Settings -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Sender Name <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mail_from_name" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mail_from_name') ?? Config::getConfig('conf_mail_from_name') }}">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Sender Email <span class="text-red-500">*</span></label>
                            <input type="email" name="conf_mail_from_address" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mail_from_address') ?? Config::getConfig('conf_mail_from_address') }}">
                        </div>
                    </div>

                    <!-- SMTP Configuration (Always Visible by Default) -->
                    <div x-show="mailDriver === 'smtp'" x-cloak class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">SMTP Host <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mail_host" placeholder="e.g., smtp.example.com"
                                   class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mail_host') ?? Config::getConfig('conf_mail_host') }}">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">SMTP Port <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mail_port" placeholder="e.g., 587"
                                   class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mail_port') ?? Config::getConfig('conf_mail_port') }}">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">SMTP Username <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mail_username" placeholder="e.g., user@example.com"
                                   class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mail_username') ?? Config::getConfig('conf_mail_username') }}">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">SMTP Password <span class="text-red-500">*</span></label>
                            <input type="password" name="conf_mail_password" placeholder="Enter your password" value="{{ old('conf_mail_password') ?? Config::getConfig('conf_mail_password') }}"
                                   class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Encryption Type <span class="text-red-500">*</span></label>
                            <select name="conf_mail_encryption" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black">
                                <option value="none" {{ Config::getConfig('conf_mail_encryption') == 'none' ? 'selected' : '' }}>None</option>
                                <option value="ssl" {{ Config::getConfig('conf_mail_encryption') == 'ssl' ? 'selected' : '' }}>SSL</option>
                                <option value="tls" {{ Config::getConfig('conf_mail_encryption') == 'tls' ? 'selected' : '' }}>TLS</option>
                            </select>
                        </div>
                    </div>

                    <!-- Mailgun Configuration -->
                    <div x-show="mailDriver === 'mailgun'" x-cloak class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Mailgun Domain <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mailgun_domain" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mailgun_domain') ?? Config::getConfig('conf_mailgun_domain') }}">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Mailgun Secret Key <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_mailgun_secret" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_mailgun_secret') ?? Config::getConfig('conf_mailgun_secret') }}">
                        </div>
                    </div>

                    <!-- SendGrid Configuration -->
                    <div x-show="mailDriver === 'sendgrid'" x-cloak class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">SendGrid API Key <span class="text-red-500">*</span></label>
                            <input type="text" name="conf_sendgrid_api_key" class="w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                   value="{{ old('conf_sendgrid_api_key') ?? Config::getConfig('conf_sendgrid_api_key') }}">
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
