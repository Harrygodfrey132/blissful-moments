@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-2 sm:p-6 space-y-6">
            <form action="{{ route('configuration.store') }}" method="POST" class="w-full">
                @csrf
                <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                    <div>
                        <p class="text-xl font-bold text-gray-800"> General Configuration </p>
                        <div class="content-start gap-2.5">
                            <p class="text-gray-600"> Configure the expiration time for OTPs (One-Time Passwords) in minutes.
                            </p>
                        </div>
                    </div>
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
                <div class="box-shadow rounded bg-white p-6 w-full">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- OTP Expiration Time -->
                        <div class="flex flex-col">
                            <label for="otp-expiration-time" class="mb-2 text-sm font-medium text-gray-700">
                                OTP Expiration Time (Minutes)
                            </label>
                            <input type="number" id="otp-expiration-time" name="conf_otp_expiration_time"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_otp_expiration_time') }}" placeholder="e.g., 10"
                                required min="1" max="1440" />
                            <small class="text-gray-500">Set the time in minutes before an OTP expires. Default Time is
                                10 minutes</small>
                        </div>
                        <!-- Edit Link Expiration Time -->
                        <div class="flex flex-col">
                            <label for="otp-expiration-time" class="mb-2 text-sm font-medium text-gray-700">
                                Page Edit Link Expiration Time (Hours)
                            </label>
                            <input type="number" id="otp-expiration-time" name="conf_edit_page_expiration_time"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_edit_page_expiration_time') }}" placeholder="e.g., 10"
                                required min="1" max="1440" />
                            <small class="text-gray-500">Set the time in hours before link expires. Default Time is
                                24 hours</small>
                        </div>
                        <!-- Data Retention Time After Suspension -->
                        <div class="flex flex-col">
                            <label for="plan-expire-reminder-3" class="mb-2 text-sm font-medium text-gray-700">
                                Data Retention Time After Suspension (in Days)
                            </label>
                            <input type="number" id="plan-expire-reminder-3" name="conf_data_removal_days"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_data_removal_days') }}" placeholder="e.g., 30"
                                required min="1" max="30" />
                            <small class="text-gray-500">Set the time in days before after then plan expires for content removal.</small>
                        </div>
                        <!-- Plan Expire Reminder 1 (30 days) -->
                        <div class="flex flex-col">
                            <label for="plan-expire-reminder-1" class="mb-2 text-sm font-medium text-gray-700">
                                Plan Expire Reminder 1 (30 days)
                            </label>
                            <input type="number" id="plan-expire-reminder-1" name="conf_plan_expire_reminder_1"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_plan_expire_reminder_1') }}" placeholder="e.g., 30"
                                required min="1" max="30" />
                            <small class="text-gray-500">Set the time in days before the plan expires for the first
                                reminder. Default Time is 30 days.</small>
                        </div>
                        <!-- Plan Expire Reminder 2 (15 days) -->
                        <div class="flex flex-col">
                            <label for="plan-expire-reminder-2" class="mb-2 text-sm font-medium text-gray-700">
                                Plan Expire Reminder 2 (15 days)
                            </label>
                            <input type="number" id="plan-expire-reminder-2" name="conf_plan_expire_reminder_2"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_plan_expire_reminder_2') }}" placeholder="e.g., 15"
                                required min="1" max="30" />
                            <small class="text-gray-500">Set the time in days before the plan expires for the second
                                reminder. Default Time is 15 days.</small>
                        </div>
                        <!-- Plan Expire Reminder 3 (2 days) -->
                        <div class="flex flex-col">
                            <label for="plan-expire-reminder-3" class="mb-2 text-sm font-medium text-gray-700">
                                Plan Expire Reminder 3 (2 days)
                            </label>
                            <input type="number" id="plan-expire-reminder-3" name="conf_plan_expire_reminder_3"
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value="{{ Config::getConfig('conf_plan_expire_reminder_3') }}" placeholder="e.g., 2"
                                required min="1" max="30" />
                            <small class="text-gray-500">Set the time in days before the plan expires for the third
                                reminder. Default Time is 2 days.</small>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
