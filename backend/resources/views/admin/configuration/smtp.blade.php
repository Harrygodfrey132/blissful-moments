@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-4 space-y-8">
            <!-- Form Header -->
            <form action="{{ route('configuration.store') }}" method="POST" id="smtp-settings-form">
                @csrf
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900">SMTP Settings</h1>
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
                <div class="bg-white shadow mt-5 rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <!-- SMTP Host -->
                    <div>
                        <label for="smtp-host" class="block text-sm font-medium text-gray-700">SMTP Host <span class="text-red-500">*</span></label>
                        <div class="relative mt-1">
                            <input type="text" id="smtp-host" name="conf_smtp_host" placeholder="e.g., smtp.example.com" class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black" value="{{ old('conf_smtp_host') ?? Config::getConfig('conf_smtp_host') }}">
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-server"></i>
                            </span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Enter your SMTP server's hostname (e.g., smtp.gmail.com).</p>
                    </div>

                    <!-- SMTP Port -->
                    <div>
                        <label for="smtp-port" class="block text-sm font-medium text-gray-700">SMTP Port <span class="text-red-500">*</span></label>
                        <div class="relative mt-1">
                            <input type="text" id="smtp-port" name="conf_smtp_port" placeholder="e.g., 587" class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black" value="{{ old('conf_smtp_port') ?? Config::getConfig('conf_smtp_port') }}">
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-network-wired"></i>
                            </span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Enter the port number for your SMTP server.</p>
                    </div>

                    <!-- SMTP Username -->
                    <div>
                        <label for="smtp-username" class="block text-sm font-medium text-gray-700">SMTP Username <span class="text-red-500">*</span></label>
                        <div class="relative mt-1">
                            <input type="text" id="smtp-username" name="conf_smtp_username" placeholder="e.g., user@example.com" class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black" value="{{ old('conf_smtp_username') ?? Config::getConfig('conf_smtp_username') }}">
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-user"></i>
                            </span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Enter your SMTP account's username.</p>
                    </div>

                    <!-- SMTP Password -->
                    <div>
                        <label for="smtp-password" class="block text-sm font-medium text-gray-700">SMTP Password <span class="text-red-500">*</span></label>
                        <div class="relative mt-1">
                            <input type="password" id="smtp-password" name="conf_smtp_password" placeholder="Enter your password" class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black" value="{{ old('conf_smtp_password') ?? Config::getConfig('conf_smtp_password') }}">
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Enter your SMTP account's password securely.</p>
                    </div>

                    <!-- Encryption Type -->
                    <div>
                        <label for="smtp-encryption" class="block text-sm font-medium text-gray-700">Encryption Type <span class="text-red-500">*</span></label>
                        <div class="relative mt-1">
                            <select id="smtp-encryption" name="conf_smtp_encryption" class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black" required>
                                <option value="" disabled selected>Select Encryption</option>
                                <option value="none" {{ Config::getConfig('conf_smtp_encryption') == 'none' ? 'selected' : '' }}>None</option>
                                <option value="ssl" {{ Config::getConfig('conf_smtp_encryption') == 'ssl' ? 'selected' : '' }}>SSL</option>
                                <option value="tls" {{ Config::getConfig('conf_smtp_encryption') == 'tls' ? 'selected' : '' }}>TLS</option>
                            </select>
                            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <i class="fas fa-shield-alt"></i>
                            </span>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Select the encryption type for your SMTP connection.</p>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
