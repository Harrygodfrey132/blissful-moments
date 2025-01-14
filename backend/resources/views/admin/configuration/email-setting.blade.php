@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <main class="md:p-6 p-4 space-y-8">
        <!-- Form Header -->
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Email Settings</h1>
            <div class="flex space-x-4">
                <a href="{{ route('configuration.index') }}" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                    <i class="fas fa-arrow-left mr-2"></i> Back
                </a>
                <button type="submit" form="email-settings-form" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                    <i class="fas fa-save mr-2"></i> Save Configuration
                </button>
            </div>
        </div>

        <!-- Form Body -->
        <form action="{{ route('configuration.store') }}" method="POST" id="email-settings-form" class="bg-white shadow rounded-lg p-6 space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Email Sender Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_email_sender_name">
                        Email Sender Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="text" name="conf_email_sender_name" id="conf_email_sender_name" 
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('conf_email_sender_name') ?? Config::getConfig('conf_email_sender_name') }}">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">This name will be displayed in the customers' inbox.</p>
                </div>

                <!-- Admin Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_admin_name">
                        Admin Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="text" name="conf_admin_name" id="conf_admin_name" 
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('conf_admin_name') ?? Config::getConfig('conf_admin_name') }}">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">This name will be displayed in all admin emails.</p>
                </div>

                <!-- Admin Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_admin_email">
                        Admin Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="email" name="conf_admin_email" id="conf_admin_email" 
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('conf_admin_email') ?? Config::getConfig('conf_admin_email') }}">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-at"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">The email address of the admin to receive emails.</p>
                </div>

                <!-- Contact Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_contact_name">
                        Contact Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="text" name="conf_contact_name" id="conf_contact_name" 
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('conf_contact_name') ?? Config::getConfig('conf_contact_name') }}">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-id-card"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">This name will be shown at the bottom of your emails.</p>
                </div>

                <!-- Contact Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_contact_email">
                        Contact Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="email" name="conf_contact_email" id="conf_contact_email" 
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('conf_contact_email') ?? Config::getConfig('conf_contact_email') }}">
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-paper-plane"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">The email address will be shown at the bottom of your emails.</p>
                </div>
            </div>
        </form>
    </main>
</div>
@endsection
