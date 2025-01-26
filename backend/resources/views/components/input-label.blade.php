@props(['for', 'value', 'required' => false])

<label for="{{ $for }}" class="text-sm font-medium text-gray-700">
    {{ $value ?? $slot }}
    @if ($required)
        <span class="text-red-500 font-semibold text-lg">*</span>
    @endif
</label>
