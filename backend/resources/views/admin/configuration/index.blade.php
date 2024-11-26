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
                    <div
                        class="box-shadow  shadow max-1580:grid-cols-3 mt-2 grid grid-cols-4 flex-wrap justify-between gap-12 rounded bg-white p-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
                        <a class="flex max-w-[360px] items-center gap-2 rounded-lg p-2 transition-all hover:bg-gray-100"
                            href="{{ route('configuration.email.settings') }}">
                            <x-icon-email-icon />
                            <div class="grid">
                                <p class="mb-1.5 text-base font-semibold text-gray-800">Email Settings</p>
                                <p class="text-xs text-gray-600"> Set email sender name, admin name and
                                    admin email address.</p>
                            </div>
                        </a>
                        <a class="flex max-w-[360px] items-center gap-2 rounded-lg p-2 transition-all hover:bg-gray-100"
                            href="{{ route('configuration.smtp.settings') }}">
                            <x-icon-smpt />
                            <div class="grid">
                                <p class="mb-1.5 text-base font-semibold text-gray-800">SMTP Settings</p>
                                <p class="text-xs text-gray-600">
                                    Set SMTP host, SMTP port etc
                                </p>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
