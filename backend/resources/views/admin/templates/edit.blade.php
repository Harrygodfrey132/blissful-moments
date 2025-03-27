@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div class="flex items-center mb-4">
            <a href="{{ route('cms.emails.index') }}"
                class="flex items-center bg-black text-white p-2 rounded-md px-3 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
            </a>
        </div>

        <form id="userEditForm" action="{{ route('cms.emails.update', $template) }}" method="POST"
            @submit.prevent="submitFormHandler('userEditForm')">
            @csrf
            @method('PUT')

            <div class="relative">
                <x-input-label for="subject" :value="__('Subject')" />
                <x-text-input id="subject" class="block mt-1 w-full" type="text" name="subject" :value="old('subject') ?? $template->subject"
                    required autofocus autocomplete="subject" />
                <x-input-error :messages="$errors->get('subject')" class="mt-2" />
            </div>

            <div class="mt-2 w-full">
                <x-input-label for="body" :value="__('Email Body')" />
                <textarea class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    name="body" id="body" rows="5">{{ $template->body }}</textarea>
            </div>

            <div class="mt-2 w-full">
                <x-input-label for="replacements" :value="__('Email Replacements')" />
                <p class="border border-gray-300 p-2 bg-gray-50 text-gray-800 whitespace-pre-line rounded-md">
                    {{ $template->replacements }}</p>
            </div>

            <div class="flex justify-end mt-3 items-center gap-3">
                <a href="{{ route('cms.emails.index') }}"
                    class="text-gray-600 bg-gray-200 hover:bg-gray-300 p-2 font-medium rounded-md transition duration-200">Cancel</a>
                <button type="submit"
                    class="bg-black text-white font-medium p-2 px-5 rounded-md hover:bg-gray-900 transition duration-200">Save</button>
            </div>
        </form>
    </div>
    <!-- Include TinyMCE -->
    <script src="https://cdn.tiny.cloud/1/{{ Config::get('conf_tinymce_key') }}/tinymce/7/tinymce.min.js"
        referrerpolicy="origin">
    </script>
    <script>
        // Wait for DOM content to load
        document.addEventListener('DOMContentLoaded', () => {
            // Check if the element exists before initializing
            const bodyTextarea = document.querySelector('#body');
            if (bodyTextarea) {
                tinymce.init({
                    selector: '#body',
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                });
            } else {
                console.error('Textarea with ID "body" not found.');
            }
        });
    </script>
@endsection
