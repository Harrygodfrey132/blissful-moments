@extends('layouts.admin')
@section('content')


<div class="w-full max-w-7xl  lg-6 mx-auto">
    <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">

            <li>
                <div class="flex items-center">

                    <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Orders</a>
                </div>
            </li>
            <li>
                <div class="flex items-center">
                    <svg class="h-5 w-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                        aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                    </svg>
                    <a href="#" class="ml-4 text-sm font-semibold text-black" aria-current="page">O2904823577</a>
                </div>
            </li>
        </ol>
    </nav>


    <div class="flex items-start flex-col gap-6 xl:flex-row ">
        <div class="w-full max-w-sm md:max-w-3xl max-xl:mx-auto shadow rounded bg-white p-4">
            <h3 class="card-head-title items-center flex gap-2 font-medium">
                <a class="btn-back text-base font-semibold" href="/admin/orders">
                    <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>
                Order #O2904823577
            </h3>
            <div class="mt-4 flow-root">
                <div class="-mx-2 -my-2 overflow-x-auto lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                        Plan Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount</th>

                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr>
                                    <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                        <div class="flex items-center">

                                            <div class="ml-4">
                                                <div class="font-medium text-gray-500">Plan title</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <span
                                            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Cancelled</span>

                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        $23
                                    </td>

                                </tr>
                                <tr>
                                    <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                        <div class="flex items-center">

                                            <div class="ml-4">
                                                <div class="font-medium text-gray-500">Plan title</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <span
                                            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">In
                                            Process</span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        $23
                                    </td>

                                </tr>
                                <tr>
                                    <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                        <div class="flex items-center">

                                            <div class="ml-4">
                                                <div class="font-medium text-gray-500">Plan title</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <span
                                            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">In
                                            Process</span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        $23
                                    </td>

                                </tr>

                                <tr>
                                    <td class="whitespace-nowrap py-5 pr-3 text-sm">
                                        <div class="flex items-center">

                                            <div class="ml-4">
                                                <div class="font-medium text-gray-500">Plan title</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <span
                                            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">In
                                            Process</span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        $23
                                    </td>

                                </tr>



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full p-2 pt-0  max-w-sm md:max-w-3xl xl:max-w-xs  flex items-start flex-col gap-4 max-xl:mx-auto">
            <div class="p-4 w-full group bg-white shadow transition-all duration-500 hover:border-gray-400 ">
                <h2 class="font-manrope font-bold text-base leading-10 text-black pb-2 border-b border-gray-200 ">
                    Order Summary
                </h2>
                <div class="data py-4 border-b border-gray-200">
                    <div class="flex items-center justify-between gap-4 mb-4">
                        <p
                            class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                            Added On</p>
                        <p class="font-medium text-sm leading-6 text-gray-900">7th Nov 2024</p>
                    </div>
                    <div class="flex items-center justify-between gap-4 mb-4">
                        <p
                            class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                            Cart Total</p>
                        <p class="font-medium text-sm leading-6 text-gray-900">$7,540.00</p>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <p
                            class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                            Shipping Charges</p>
                        <p class="font-medium text-sm leading-6 text-gray-900">$40.00</p>
                    </div>

                </div>
                <div class="total flex items-center justify-between pt-6">
                    <p class="font-normal text-sm text-black leading-6">Net Amount</p>
                    <h5 class="font-manrope font-bold text-sm leading-6">$400.00</h5>
                </div>
                <div class="total flex items-center justify-between pt-4">
                    <p class="font-normal text-sm text-gray-500 leading-6 text-black ">Site commission</p>
                    <h5 class="font-manrope font-bold text-sm leading-6">$100.00</h5>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="p-4 w-full group bg-white shadow transition-all duration-500 hover:border-gray-400 ">
                <h2
                    class="font-manrope toggle-header flex justify-between items-center font-bold text-base leading-10 text-black">
                    Contact Information
                    <x-icon-down-arrow class="icon-down cursor-pointer w-5 h-5" />
                    <x-icon-up-arrow class="icon-up cursor-pointer hidden w-5 h-5" />
                </h2>
                <div class="delivery-address overflow-hidden max-h-0 transition-[max-height] duration-500 ease-in-out">
                    <div class="mt-4 border-t pt-4 border-gray-200">
                        <div class=" items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Customer Name:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">Tom Hanks</p>
                        </div>
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Email:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">hanks@gmail.com</p>
                        </div>
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Phone:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">5644978125</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Delivery address -->

            <div class="p-4 w-full group bg-white shadow transition-all duration-500 hover:border-gray-400">
                <h2
                    class="font-manrope  flex justify-between items-center font-bold text-base leading-10 text-black cursor-pointer toggle-header">
                    Delivery Address
                    <x-icon-down-arrow class="icon-down cursor-pointer w-5 h-5" />
                    <x-icon-up-arrow class="icon-up cursor-pointer hidden w-5 h-5" />
                </h2>
                <div class="delivery-address overflow-hidden max-h-0 transition-[max-height] duration-500 ease-in-out">
                    <div class="mt-4 border-t pt-4 border-gray-200">
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Customer Name:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">Tom Hanks</p>
                        </div>
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Email:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">hanks@gmail.com</p>
                        </div>
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Phone:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">5644978125</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Billing Address -->
            <div class="p-4 w-full group bg-white shadow transition-all duration-500 hover:border-gray-400">
                <h2
                    class="font-manrope flex justify-between items-center font-bold text-base leading-10 text-black cursor-pointer toggle-header">
                    Billing Address
                    <x-icon-down-arrow class="icon-down cursor-pointer w-5 h-5" />
                    <x-icon-up-arrow class="icon-up cursor-pointer hidden w-5 h-5" />
                </h2>
                <div class="billing-address overflow-hidden max-h-0 transition-[max-height] duration-500 ease-in-out">
                    <div class="mt-4 border-t pt-4 border-gray-200">
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Customer Name:</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">Tom Hanks</p>
                        </div>
                        <div class="items-center justify-between gap-4 mb-4">
                            <p
                                class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                Address Line 1</p>
                            <p class="font-medium text-sm leading-6 text-gray-900">Address line 1</p>
                        </div>
                        <div class="items-center gap-8 flex justify-between gap-4 mb-4">
                            <div>
                                <p
                                    class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                    City</p>
                                <p class="font-medium text-sm leading-6 text-gray-900">Hollywood</p>
                            </div>
                            <div>
                                <p
                                    class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                    State</p>
                                <p class="font-medium text-sm leading-6 text-gray-900">Central Luzon</p>
                            </div>

                        </div>
                        <div class="items-center flex justify-between gap-8 gap-4 mb-4">
                            <div>
                                <p
                                    class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                    Zip</p>
                                <p class="font-medium text-sm leading-6 text-gray-900">90210</p>
                            </div>
                            <div>
                                <p
                                    class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                    Country</p>
                                <p class="font-medium text-sm leading-6 text-gray-900">United States</p>
                            </div>

                        </div>
                        <div class="items-center flex gap-8 gap-4 mb-4">
                            <div>
                                <p
                                    class="font-normal text-sm leading-6 text-gray-500 transition-all duration-500 group-hover:text-gray-700">
                                    Phone</p>
                                <p class="font-medium text-sm leading-6 text-gray-900">353453445</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

@endsection