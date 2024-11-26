@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <main class="md:p-6 p-2 sm:p-6 space-y-6">
        <form>
            <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                <p class="text-xl font-bold text-gray-800 dark:text-white"> Email Settings </p>
                <div class="flex items-center gap-4"><a href="h#" class="text-black font-medium"> Back
                    </a><button type="submit"
                        class="flex px-6 justify-center rounded-md bg-black px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save Configuration </button>
                </div>
            </div>
            <div class="mt-6 md:grid grid-cols-2 gap-10 max-xl:flex-wrap">
                <div class=" content-start gap-2.5">
                    <p class="text-base font-semibold text-gray-600 dark:text-gray-300"> Email Settings </p>
                    <p class="text-gray-600 dark:text-gray-300"> Set email sender name, admin name and admin email
                        address. 
                    </p>
                </div>
                <div class="box-shadow rounded bg-white p-4 dark:bg-gray-900">
                    <div class="mb-4 last:!mb-0">
                        <div class="mb-4 last:!mb-0">
                            <div class="flex justify-between">
                                <label
                                    class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white"
                                    for="emails">
                                Email Sender Name <span class="required"></span><span
                                    class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span>
                                </label>
                            </div>
                            <input type="text" name="emails"
                                class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400">
                            <p class="mt-1 block text-xs italic leading-5 text-gray-600 dark:text-gray-300">This name
                                will be displayed in the customers inbox
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 last:!mb-0">
                        <div class="mb-4 last:!mb-0">
                            <div class="flex justify-between">
                                <label
                                    class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white"
                                    for="emails">
                                    Admin Name <span class="required"></span><span
                                        class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span><!---->
                                </label>
                            </div>
                            <input type="text" name="emails"
                                class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"
                                id="emails">
                            <p class="mt-1 block text-xs italic leading-5 text-gray-600 dark:text-gray-300">This name
                                will be displayed in all admin emails
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 last:!mb-0">
                        <div class="mb-4 last:!mb-0">
                            <div class="flex justify-between">
                                <label
                                    class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white"
                                    for="emails">
                                    Admin Email <span class="required"></span><span
                                        class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span><!---->
                                </label>
                            </div>
                            <input type="text" name="emails"
                                class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"
                                id="emails">
                            <p class="mt-1 block text-xs italic leading-5 text-gray-600 dark:text-gray-300">The email
                                address of the admin for this channel to receive emails
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 last:!mb-0">
                        <div class="mb-4 last:!mb-0">
                            <div class="flex justify-between">
                                <label
                                    class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white"
                                    for="emails">
                                    Contact Name <span class="required"></span><span
                                        class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span><!---->
                                </label>
                            </div>
                            <input type="text" name="emails"
                                class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"
                                id="emails">
                            <p class="mt-1 block text-xs italic leading-5 text-gray-600 dark:text-gray-300">This name
                                will be shown at the bottom of your emails
                            </p>
                        </div>
                    </div>
                    <div class="mb-4 last:!mb-0">
                        <div class="mb-4 last:!mb-0">
                            <div class="flex justify-between">
                                <label
                                    class="mb-1.5 flex items-center gap-1 text-xs font-medium text-gray-800 dark:text-white"
                                    for="emails">
                                    Contact Email <span class="required"></span><span
                                        class="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-[10px] font-semibold leading-normal text-gray-600">Default</span><!---->
                                </label>
                            </div>
                            <input type="text" name="emails"
                                class="w-full rounded-md border px-3 py-2.5 text-sm text-gray-600 transition-all hover:border-gray-400 focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-400 dark:focus:border-gray-400"
                                id="emails">
                            <p class="mt-1 block text-xs italic leading-5 text-gray-600 dark:text-gray-300">The email
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