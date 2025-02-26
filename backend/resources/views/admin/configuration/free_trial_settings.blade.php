@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <main class="md:p-6 p-4 space-y-8">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Free Trial Settings</h1>
            <div class="flex space-x-4">
                <a href="{{ route('dashboard') }}" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                    <i class="fas fa-arrow-left mr-2"></i> Back
                </a>
                <button type="submit" form="free-trial-settings-form" class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                    <i class="fas fa-save mr-2"></i> Save Configuration
                </button>
            </div>
        </div>

        <form action="{{ route('configuration.store') }}" method="POST" id="free-trial-settings-form" class="bg-white shadow rounded-lg p-6 space-y-6">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="free_trial_period">
                        Free Trial Period (in months) <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="number" name="conf_free_trial_period" id="free_trial_period"
                            class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                            value="{{ old('free_trial_period') ?? Config::getConfig('conf_free_trial_period') }}" min="1" required>
                        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <i class="fas fa-calendar"></i>
                        </span>
                    </div>
                    <p class="mt-1 text-xs text-gray-500">Set the number of days users can access the free trial.</p>
                </div>
            </div>
        </form>
    </main>
</div>
@endsection
