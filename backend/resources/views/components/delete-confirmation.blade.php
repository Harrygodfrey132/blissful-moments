<!-- Modal structure -->
<div id="deleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 transition-opacity hidden">
    <!-- Modal Content -->
    <div class="flex items-center justify-center min-h-screen z-50">
        <div class="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <!-- Modal header -->
            <div class="flex justify-between items-center">
                <h2 class="text-xl"></h2>
                <a href="javascript:void(0)" onclick="toggleModal()">
                    <span class="cursor-pointer" id="closeModal">✕</span>
                </a>
            </div>

            <!-- Modal body -->
            <div class="text-center my-2 mb-5">
                <x-icon-delete-icon />
                <p class="mb-4 text-lg text-black">Are you sure you want to delete this item?</p>
            </div>

            <!-- Modal footer -->
            <div class="flex items-center justify-end gap-2 mt-4">
                <button type="button" onclick="toggleModal()"
                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900"
                    id="cancelDelete">Cancel</button>
                <form action="" method="POST" id="deleteModalForm">
                    @method('DELETE')
                    @csrf
                    <button type="submit"
                        class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                        id="confirmDelete">Delete</button>
                </form>
            </div>
        </div>
    </div>
</div>
