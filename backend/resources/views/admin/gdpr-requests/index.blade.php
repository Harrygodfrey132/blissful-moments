@extends('layouts.admin')
@section('content')
    <div class="flex-grow text-gray-800">
        <div>
            <!-- Advance search block components -->
            <x-advance-search :route="route('plans.index')" :createFormRoute="route('plans.create')" :enableCreateButton="false" />

            <div class="relative">
                <!-- Table with Actions -->
                <div class="mt-8 flow-root">
                    <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                        @if ($requests && $requests->count() > 0)
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-[#E5E7EB]">
                                        <tr>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer">
                                                <input type="checkbox" class="cursor-pointer" id="selectAll">
                                            </th>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Name</th>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Email</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Requested Date</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="listingTable" class="divide-y divide-gray-200 bg-white">
                                        @foreach ($requests as $request)
                                            <tr>
                                                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm cursor-pointer">
                                                    <input type="checkbox" class="rowCheckbox cursor-pointer"
                                                        data-index="0">
                                                </td>
                                                <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                    <div class="flex items-center">
                                                        <div>
                                                            <div class="font-medium text-gray-900">
                                                                {{ $request->user->name }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                    <div class="flex items-center">
                                                        <div>
                                                            <div class="font-medium text-gray-900">
                                                                {{ $request->user->email }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                                    <div class="flex items-center pl-4">
                                                        <div>
                                                            <div class="font-medium text-gray-900">{{ $request->created_at->format(' d M Y') }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div class="flex items-center">
                                                        <span
                                                            class="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset 
                                                    {{ $request->status ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' }}
                                                    ">{{ $request->status ? 'Accepted' : 'Pending' }}</span>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td
                                                    class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                                                    @if (!$request->status)
                                                        <div class="flex gap-3">
                                                            <a href="javascript:void(0);"
                                                                data-url="{{ route('gdpr.edit', $request) }}"
                                                                data-update-url="{{ route('gdpr.update', $request) }}"
                                                                onclick="gdprHandler(this)" class="text-black">
                                                                <x-icon-edit />
                                                            </a>
                                                        </div>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                <div class="mt-2">
                                    {{ $requests->links() }}
                                </div>
                            </div>
                        @else
                            <x-no-record-found />
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal structure -->
    <div id="gdprModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 hidden">
        <!-- Modal Content -->
        <div class="flex items-center justify-center min-h-screen z-50">
            <di class="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <!-- Modal header -->
                <div class="relative">
                    <a class="absolute right-0 top-1" href="javascript:void(0)" onclick="toggleGdprModal()">
                        <span class="cursor-pointer text-gray-500 hover:text-black" id="closeModal">✕</span>
                    </a>
                </div>

                <!-- Modal body -->
                <div class="my-2 mb-5">
                    <div class="space-y-2">
                        <div>
                            <p>
                                <span class="font-semibold px-3">Name:</span>
                                <span id="data-name"></span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="font-semibold px-3">Email:</span>
                                <span id="data-email"></span>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span class="font-semibold px-3">Comments:</span>
                                <span id="data-comments"></span>

                            </p>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
               
                    <form action="" method="POST" id="gdprModalForm">
                        @csrf
                        <!-- <div class="w-full px-4">
                        <label class="font-semibold">Comment</label>
                        <input type="hidden" name="status" value="">
                        <textarea class="border-gray-300 w-full rounded-md" name="reason" id="rejectReason" disabled></textarea>
                        </div> -->
                      
                        <div class="flex gap-4 mt-4 justify-end">
                        <a href="javascript:void(0)" onclick="acceptHandler()"
                            class="py-2 px-3 text-sm font-medium text-green-500 bg-green-100 rounded border border-green-200 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-primary-300 "
                            id="cancelDelete">Accept</a>
                        <a href="javascript:void(0)" onclick="rejectHandler()"
                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                            id="confirmDelete">Reject</a>
                            </div>
                    </form>
                
            </div>
        </div>
    </div>
    <script>
        // Function to toggle modal visibility
        function toggleGdprModal() {
            const modal = document.getElementById('gdprModal');
            modal.classList.toggle('hidden');
        }

        // Function to handle modal actions
        function gdprHandler(element) {
            const url = element.getAttribute('data-url');
            const updateUrl = element.getAttribute('data-update-url');
            const form = document.getElementById('gdprModalForm');
            form.action = updateUrl;
            toggleGdprModal();
            // Fetch data from the server
            fetch(url, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Populate the modal with data from the server
                    const nameField = document.getElementById('data-name');
                    const emailField = document.getElementById('data-email');
                    const commentsField = document.getElementById('data-comments');
                    nameField.innerText = data.user_name;
                    emailField.innerText = data.user_email;
                    commentsField.innerText = data.comments;

                })
                .catch(error => {
                    flasher.error('Error fetching GDPR data:', error);
                });
        }

        function acceptHandler() {
            const form = document.getElementById('gdprModalForm');
            form.querySelector('input[name="status"]').value = true;
            form.submit();
        }

        function rejectHandler() {
            const form = document.getElementById('gdprModalForm');
            form.querySelector('input[name="status"]').value = 2;
            const reason = document.getElementById('rejectReason');
            reason.classList.remove('hidden');
            reason.removeAttribute('disabled');
            // form.submit();
        }
    </script>
@endsection
