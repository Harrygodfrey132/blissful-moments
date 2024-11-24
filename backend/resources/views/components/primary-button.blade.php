<button {{ $attributes->merge(['type' => 'submit', 'class' => 'flex px-6 justify-center rounded-md bg-black px-3 py-2 text-sm/6 font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']) }}>
    {{ $slot }}
</button>
