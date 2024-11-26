@extends('layouts.admin')
@section('content')
<div class="flex-grow text-gray-800">
    <main class="md:p-6 p-2 sm:p-6 space-y-6">
        <form>
            <div class="mt-3.5 mb-10 md:flex items-center justify-between gap-4 max-sm:flex-wrap">
                <p class="text-xl font-bold text-gray-800 dark:text-white"> Smpt Settings </p>
                <div class="flex items-center gap-4"><a href="h#" class="text-black font-medium"> Back
                    </a><button type="submit"
                        class="flex px-6 justify-center rounded-md bg-black px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save Configuration </button>
                </div>
            </div>
            <div class="mt-6 md:grid grid-cols-2 gap-10 max-xl:flex-wrap">
                <div class=" content-start gap-2.5">
                    <p class="text-base font-semibold text-gray-600 dark:text-gray-300"> Smpt Settings </p>
                    <p class="text-gray-600 dark:text-gray-300"> Set email sender name, admin name and admin email
                        address. 
                    </p>
                </div>
                <div class="box-shadow rounded bg-white p-4 dark:bg-gray-900">
                    <div class="grid gap-6">
                        <!-- SMTP Host -->
                        <div class="flex flex-col">
                            <label for="smtp-host" class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            SMTP Host
                            </label>
                            <input 
                                type="text" 
                                id="smtp-host" 
                                name="smtp_host" 
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="e.g., smtp.example.com"
                                required
                                />
                        </div>
                        <!-- SMTP Port -->
                        <div class="flex flex-col">
                            <label for="smtp-port" class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            SMTP Port
                            </label>
                            <input 
                                type="number" 
                                id="smtp-port" 
                                name="smtp_port" 
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="e.g., 587"
                                required
                                />
                        </div>
                        <!-- SMTP Username -->
                        <div class="flex flex-col">
                            <label for="smtp-username" class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            SMTP Username
                            </label>
                            <input 
                                type="text" 
                                id="smtp-username" 
                                name="smtp_username" 
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="e.g., user@example.com"
                                required
                                />
                        </div>
                        <!-- SMTP Password -->
                        <div class="flex flex-col">
                            <label for="smtp-password" class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            SMTP Password
                            </label>
                            <input 
                                type="password" 
                                id="smtp-password" 
                                name="smtp_password" 
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Enter your SMTP password"
                                required
                                />
                        </div>
                        <!-- Encryption -->
                        <div class="flex flex-col">
                            <label for="smtp-encryption" class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Encryption Type
                            </label>
                            <select 
                                id="smtp-encryption" 
                                name="smtp_encryption" 
                                class="rounded border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                required
                                >
                                <option value="" disabled selected>Select Encryption</option>
                                <option value="none">None</option>
                                <option value="ssl">SSL</option>
                                <option value="tls">TLS</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
</div>
@endsection