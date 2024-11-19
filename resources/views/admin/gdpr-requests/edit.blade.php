<div>
    <form id="userEditForm" action="{{ route('users.update', $gdpr) }}" method="POST"
        @submit.prevent="submitFormHandler('userEditForm')">
        @csrf
        @method('PUT')
        <div>
            <div>
                <p>
                    <span class="font-semibold px-3">Name:</span> <span>
                        {{ $gdpr->user->name }}</span>
                </p>
            </div>
            <div>
                <p>
                    <span class="font-semibold px-3">Email:</span> <span>
                        {{ $gdpr->user->email }}</span>
                </p>
            </div>
            <div>
                <p>
                    <span class="font-semibold px-3">Comments:</span> <span>
                        {{ $gdpr->comments }}</span>
                </p>
            </div>
        </div>
        <div class="flex items-center justify-end mt-4 absolute right-0 left-0 m-auto bottom-10 w-[400px]">
            <x-primary-button @click.prevent="submitFormHandler('userEditForm')">
                {{ __('Save') }}
            </x-primary-button>
        </div>
    </form>
</div>
