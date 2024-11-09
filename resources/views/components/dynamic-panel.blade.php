<div>
    <!-- Slide-In Panel -->
    <div x-show="openPanel" x-cloak x-transition:enter="transform transition ease-in-out duration-300"
        x-transition:enter-start="translate-x-full" x-transition:enter-end="translate-x-0"
        x-transition:leave="transform transition ease-in-out duration-300" x-transition:leave-start="translate-x-0"
        x-transition:leave-end="translate-x-full"
        class="fixed inset-y-0 right-0 w-[500px] bg-white shadow-xl z-50 overflow-y-auto">
        <div class="p-9 space-y-6">
            <button @click="openPanel = false" class="text-gray-800 hover:text-gray-500 text-3xl absolute top-4 right-4">
                &times;
            </button>

            <h2 class="text-lg font-semibold text-gray-700" x-text="actionType + ' User'"></h2>

            <!-- Panel Content Based on Action -->
            <div x-show="actionType === 'Edit'" class="text-gray-600  space-y-6">
                <div id="editForm">
                    <!-- Your Edit Form -->
                </div>
                <div class="flex items-center justify-end mt-4 absolute right-0 left-0 m-auto bottom-10 w-[400px]">
                    <x-primary-button @click.prevent="submitFormHandler">
                        {{ __('Save') }}
                    </x-primary-button>
                </div>
            </div>
        </div>
    </div>
</div>
