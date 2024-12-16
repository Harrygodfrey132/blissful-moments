// pages/dashboard.tsx
import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react';
import { LinkIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'; // Importing Heroicons
import { MdOutlineQrCodeScanner } from "react-icons/md";


const OrderPage = () => {
    const people = [
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Member',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More people...
    ]

    return (
        <div>
            <nav className="flex mt-28 px-16 mb-5" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                    <li>
                        <div>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Home</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="size-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="size-5 shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Project Nero</a>
                        </div>
                    </li>
                </ol>
            </nav>


            <div className='md:flex gap-10 px-16 w-full  mb-10'>
                <Sidebar />
                <main className='w-full'>
                    <div>

                        <section className='bg-white p-4 w-full shadow rounded'>
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-lg font-semibold text-blue-light-900 mb-2 border-b-2 border-blue-600 inline-block">Users</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the orders in your account.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Title
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {people.map((person) => (
                                                        <tr key={person.email}>
                                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="size-11 shrink-0">
                                                                        <img alt="" src={person.image} className="size-11 rounded-full" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="font-medium text-gray-900">{person.name}</div>
                                                                        <div className="mt-1 text-gray-500">{person.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                <div className="text-gray-900">{person.title}</div>
                                                                <div className="mt-1 text-gray-500">{person.department}</div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    Active
                                                                </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit<span className="sr-only">, {person.name}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderPage;
