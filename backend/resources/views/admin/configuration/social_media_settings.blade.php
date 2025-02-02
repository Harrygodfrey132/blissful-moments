    @extends('layouts.admin')
    @section('content')
        <div class="flex-grow text-gray-800">
            <main class="md:p-6 p-4 space-y-8">
                <!-- Form Header -->
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold text-gray-900">Social Media Settings</h1>
                    <div class="flex space-x-4">
                        <a href="{{ route('configuration.index') }}"
                            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </a>
                        <button type="submit" form="social-media-settings-form"
                            class="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                            <i class="fas fa-save mr-2"></i> Save Configuration
                        </button>
                    </div>
                </div>

                <!-- Form Body -->
                <form action="{{ route('configuration.store') }}" method="POST" id="social-media-settings-form"
                    class="bg-white shadow rounded-lg p-6 space-y-6">
                    @csrf

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <!-- Facebook Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_facebook_link">
                                Facebook Link
                            </label>
                            <div class="relative">
                                <input type="url" name="conf_facebook_link" id="conf_facebook_link"
                                    class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                    value="{{ old('conf_facebook_link') ?? Config::getConfig('conf_facebook_link') }}">
                                <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <i class="fab fa-facebook"></i>
                                </span>
                            </div>
                        </div>

                        <!-- Twitter Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_twitter_link">
                                Twitter Link
                            </label>
                            <div class="relative">
                                <input type="url" name="conf_twitter_link" id="conf_twitter_link"
                                    class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                    value="{{ old('conf_twitter_link') ?? Config::getConfig('conf_twitter_link') }}">
                                <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <i class="fab fa-twitter"></i>
                                </span>
                            </div>
                        </div>

                        <!-- Instagram Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_instagram_link">
                                Instagram Link
                            </label>
                            <div class="relative">
                                <input type="url" name="conf_instagram_link" id="conf_instagram_link"
                                    class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                    value="{{ old('conf_instagram_link') ?? Config::getConfig('conf_instagram_link') }}">
                                <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <i class="fab fa-instagram"></i>
                                </span>
                            </div>
                        </div>

                        <!-- YouTube Link -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="conf_youtube_link">
                                YouTube Link
                            </label>
                            <div class="relative">
                                <input type="url" name="conf_youtube_link" id="conf_youtube_link"
                                    class="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black"
                                    value="{{ old('conf_youtube_link') ?? Config::getConfig('conf_youtube_link') }}">
                                <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                    <i class="fab fa-youtube"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    @endsection
