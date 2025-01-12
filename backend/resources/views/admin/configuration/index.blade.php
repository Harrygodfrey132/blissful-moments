@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="p-6 sm:p-6 space-y-6">
            <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div class="mr-6">
                    <h1 class="text-2xl font-semibold mb-2">Configurations</h1>
                </div>
            </div>
            <div class="grid gap-y-8">
                <div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Email Settings Tile -->
                        <a class="flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                            href="{{ route('configuration.email.settings') }}">
                            <x-icon-email-icon class="w-10 h-10 text-blue-500" />
                            <div>
                                <p class="text-lg font-semibold text-gray-800">Email Settings</p>
                                <p class="text-sm text-gray-600">
                                    Set email sender name, admin name, and admin email address.
                                </p>
                            </div>
                        </a>
                        <!-- SMTP Settings Tile -->
                        <a class="flex flex-col items-start gap-4 p-6 bg-white rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                            href="{{ route('configuration.smtp.settings') }}">
                            <x-icon-smpt class="w-10 h-10 text-gray-700" />
                            <div>
                                <p class="text-lg font-semibold text-gray-800">SMTP Settings</p>
                                <p class="text-sm text-gray-600">
                                    Set SMTP host, SMTP port, etc.
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
