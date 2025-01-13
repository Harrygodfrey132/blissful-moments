@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <main class="md:p-6 p-2 sm:p-6 space-y-6">
            <form action="{{ route('configuration.store') }}" method="POST">
                @csrf
                <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                    <p class="text-xl font-bold text-gray-800"> Email Settings </p>
                    <div class="flex items-center gap-4">
                        <a href="{{ route('configuration.index') }}"
                            class="text-black font-medium bg-gray-200 p-2 px-4 hover:bg-black hover:text-white rounded-md">
                            Back
                        </a>
                        <button type="submit"
                            class="flex px-6 justify-center rounded-md bg-black py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-800">
                            Save Configuration
                        </button>
                    </div>
                </div>
                <div class="mt-6 md:grid grid-cols-2 gap-10 max-xl:flex-wrap">
                    <div class=" content-start gap-2.5">
                        <p class="text-base font-semibold text-gray-600"> Email Settings </p>
                        <p class="text-gray-600"> Set email sender name, admin name and admin email
                            address.
                        </p>
                    </div>
                    <div class="box-shadow rounded bg-white p-4">
                        <div class="mb-4 last:!mb-0">
                            <div class="mb-4 last:!mb-0">
                                <div class="flex justify-between">
                                    <label class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800"
                                        for="emails">
                                        Email Sender Name <span class="required"></span><span
                                            class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span>
                                    </label>
                                </div>
                                <input type="text" name="conf_email_sender_name"
                                    class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400"
                                    value="{{ old('conf_email_sender_name') ?? Config::getConfig('conf_email_sender_name') }}">
                                <p class="mt-1 block text-xs italic leading-5 text-gray-600">This name
                                    will be displayed in the customers inbox
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 last:!mb-0">
                            <div class="mb-4 last:!mb-0">
                                <div class="flex justify-between">
                                    <label class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800"
                                        for="emails">
                                        Admin Name <span class="required"></span><span
                                            class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span>
                                    </label>
                                </div>
                                <input type="text" name="conf_admin_name"
                                    class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400"
                                    value="{{ old('conf_admin_name') ?? Config::getConfig('conf_admin_name') }}"
                                    id="emails">
                                <p class="mt-1 block text-xs italic leading-5 text-gray-600">This name
                                    will be displayed in all admin emails
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 last:!mb-0">
                            <div class="mb-4 last:!mb-0">
                                <div class="flex justify-between">
                                    <label class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800"
                                        for="emails">
                                        Admin Email <span class="required"></span><span
                                            class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span>
                                    </label>
                                </div>
                                <input type="text" name="conf_admin_email"
                                    class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400"
                                    value="{{ old('conf_admin_email') ?? Config::getConfig('conf_admin_email') }}"
                                    id="emails">
                                <p class="mt-1 block text-xs italic leading-5 text-gray-600">The email
                                    address of the admin for this channel to receive emails
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 last:!mb-0">
                            <div class="mb-4 last:!mb-0">
                                <div class="flex justify-between">
                                    <label class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800"
                                        for="emails">
                                        Contact Name <span class="required"></span><span
                                            class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span><!---->
                                    </label>
                                </div>
                                <input type="text" name="conf_contact_name"
                                    class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400"
                                    value="{{ old('conf_contact_name') ?? Config::getConfig('conf_contact_name') }}"
                                    id="emails">
                                <p class="mt-1 block text-xs italic leading-5 text-gray-600">This name
                                    will be shown at the bottom of your emails
                                </p>
                            </div>
                        </div>
                        <div class="mb-4 last:!mb-0">
                            <div class="mb-4 last:!mb-0">
                                <div class="flex justify-between">
                                    <label class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800"
                                        for="emails">
                                        Contact Email <span class="required"></span><span
                                            class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span>
                                    </label>
                                </div>
                                <input type="text" name="conf_contact_email"
                                    class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400"
                                    value="{{ old('conf_contact_email') ?? Config::getConfig('conf_contact_email') }}"
                                    id="emails">
                                <p class="mt-1 block text-xs italic leading-5 text-gray-600">The email
                                    address will be shown at the bottom of your emails
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
@endsection
