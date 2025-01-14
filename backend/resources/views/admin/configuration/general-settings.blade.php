@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-2 sm:p-6 space-y-6">
            <form action="{{ route('configuration.store') }}" method="POST">
                @csrf
                <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                    <p class="text-xl font-bold text-gray-800"> OTP Configuration </p>
                    <div class="flex items-center gap-4">
                        <a href="{{ route('configuration.index') }}" class="text-black font-medium"> Back
                        </a>
                        <button type="submit"
                            class="flex px-6 justify-center rounded-md bg-black py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save Configuration
                        </button>
                    </div>
                </div>
                <div class="mt-6 md:grid grid-cols-2 gap-10 max-xl:flex-wrap">
                    <div class="content-start gap-2.5">
                        <p class="text-base font-semibold text-gray-600"> OTP Settings </p>
                        <p class="text-gray-600"> Configure the expiration time for OTPs (One-Time Passwords) in minutes.
                        </p>
                    </div>
                    <div class="box-shadow rounded bg-white p-4">
                        <div class="grid gap-6">
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
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
