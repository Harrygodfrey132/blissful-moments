<div aria-live="assertive" class="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">

        <!-- Success Notification (Green) -->
        <div id="successNotification"
            class="hidden transition ease-in-out duration-300 transform opacity-0 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-green-700">Success!</p>
                        <p class="mt-1 text-sm text-gray-500" id="textMessage"></p>
                    </div>
                    <div class="ml-4 flex shrink-0">
                        <button type="button" onclick="hideNotification('successNotification')"
                            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Progress bar -->
            <div class="mt-2 w-full h-1 bg-green-200 rounded-full">
                <div class="h-full bg-green-400 rounded-full progress-bar"></div>
            </div>
        </div>


        <!-- Error Notification (Red) -->
        <div id="errorNotification"
            class="hidden transition ease-in-out duration-300 transform opacity-0 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v2m0 4h.01m-.01 4a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-red-600">Error Occurred!</p>
                        <p class="mt-1 text-sm text-gray-500">There was an error processing your request.</p>
                    </div>
                    <div class="ml-4 flex shrink-0">
                        <button type="button" onclick="hideNotification('errorNotification')"
                            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Progress bar -->
            <div class="mt-2 w-full h-1 bg-red-200 rounded-full">
                <div class="h-full bg-red-400 rounded-full progress-bar"></div>
            </div>
        </div>

        <!-- Warning Notification (Yellow) -->
        <div id="warningNotification"
            class="hidden transition ease-in-out duration-300 transform opacity-0 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 8v4m0 4h.01m-.01 4a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-900">Warning!</p>
                        <p class="mt-1 text-sm text-gray-500">Please check the form for warnings.</p>
                    </div>
                    <div class="ml-4 flex shrink-0">
                        <button type="button" onclick="hideNotification('warningNotification')"
                            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Progress bar -->
            <div class="mt-2 w-full h-1 bg-yellow-200 rounded-full">
                <div class="h-full bg-yellow-400 rounded-full progress-bar"></div>
            </div>
        </div>

        <!-- Info Notification (Blue) -->
        <div id="infoNotification"
            class="hidden transition ease-in-out duration-300 transform opacity-0 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="shrink-0">
                        <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v2m0 4h.01m-.01 4a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-900">Information!</p>
                        <p class="mt-1 text-sm text-gray-500">This is an informational message.</p>
                    </div>
                    <div class="ml-4 flex shrink-0">
                        <button type="button" onclick="hideNotification('infoNotification')"
                            class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Progress bar -->
            <div class="mt-2 w-full h-1 bg-blue-200 rounded-full">
                <div class="h-full bg-blue-400 rounded-full progress-bar"></div>
            </div>
        </div>

    </div>
</div>
<style>
    /* Progress bar animation */
    @keyframes progressDecrease {
        from {
            width: 100%;
        }

        to {
            width: 0%;
        }
    }

    .progress-bar {
        animation: progressDecrease 5s linear forwards;
    }
</style>
<script>
    function showNotification(notificationId, message = 'Record has been updated successfully!') {
        const notification = document.getElementById(notificationId);
        const textMessage = document.getElementById('textMessage');
        if (notification) {
            notification.classList.remove('hidden');
            notification.classList.add('opacity-100');
            textMessage.innerHTML = message;
            // Automatically hide after 5 seconds
            setTimeout(() => {
                hideNotification(notificationId);
            }, 5000);
        }
    }

    function hideNotification(notificationId) {
        const notification = document.getElementById(notificationId);
        if (notification) {
            notification.classList.remove('opacity-100');
            notification.classList.add('opacity-0');

            // Hide completely after transition duration
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 300);
        }
    }
</script>
