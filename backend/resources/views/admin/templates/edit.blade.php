@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <form id="userEditForm" action="{{ route('cms.emails.update', $template) }}" method="POST"
            @submit.prevent="submitFormHandler('userEditForm')">
            @csrf
            @method('PUT')
            <div class="relative">
                <x-input-label for="subject" :value="__('Subject')" />
                <x-text-input id="subject" class="block mt-1 w-full" type="text" name="subject" :value="old('subject') ?? $template->subject" required
                    autofocus autocomplete="subject" />
                <x-input-error :messages="$errors->get('subject')" class="mt-2" />
            </div>
            <div class="mt-2 w-full">
                <x-input-label for="subject" :value="__('Email Body')" />
                <textarea class="mt-2" name="body" id="body" rows="5">{{ $template->body }}</textarea>
            </div>
            <div class="mt-2 w-full">
                <x-input-label for="subject" :value="__('Email Replacements')" />
                <p class="border border-gray-300 p-2 bg-gray-50 text-gray-800 whitespace-pre-line">
                    {{ $template->replacements }}
                </p>
            </div>

            <div class="flex justify-end mt-3 items-center gap-3">
                <a href="{{ route('cms.emails.index') }}" class="border rounded-md bg-gray-300 p-2 font-medium">Cancel</a>
                <button type="submit" class="bg-black text-white font-medium p-2 px-5 rounded-md">Save</button>
            </div>
            {{-- <div class="flex items-center justify-end mt-4 absolute right-0 left-0 m-auto bottom-10 w-[400px]">
            <x-primary-button @click.prevent="submitFormHandler('userEditForm')">
                {{ __('Save') }}
            </x-primary-button>
        </div> --}}
        </form>
    </div>

    <!-- Include TinyMCE -->
    <script src="https://cdn.tiny.cloud/1/rafk2qf4xae4547sztpei8geik63epn18ydksc3sotpiy6sp/tinymce/7/tinymce.min.js"
        referrerpolicy="origin"></script>

    <script>
        // Wait for DOM content to load
        document.addEventListener('DOMContentLoaded', () => {
            // Check if the element exists before initializing
            const bodyTextarea = document.querySelector('#body');
            if (bodyTextarea) {
                tinymce.init({
                    selector: '#body',
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                });
            } else {
                console.error('Textarea with ID "body" not found.');
            }
        });
    </script>
@endsection
