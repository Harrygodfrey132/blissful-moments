'use client'

import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon },
    { name: 'Orders', href: '#', icon: UsersIcon },
    { name: 'My Page', href: '#', icon: FolderIcon },
    { name: 'User Access', href: '#', icon: CalendarIcon },
    { name: 'Payments', href: '#', icon: DocumentDuplicateIcon },
];

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const [activeItem, setActiveItem] = useState<string>('Dashboard'); // State to track active menu item

    // Handle menu item click
    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName); // Set the clicked item as active
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 flex w-52 flex-col bg-gray-50 border-r border-gray-200 p-4 lg:flex ${sidebarOpen ? '' : 'hidden'}`}>
                <div className="flex h-16 items-center p-4">
                    <div className='text-black font-bold text-xl'>Logo</div>
                </div>
                <nav className="mt-8 flex-1 space-y-4">
                    <ul role="list">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={() => handleItemClick(item.name)} // Set active item on click
                                    className={`group flex items-center gap-x-3 rounded-md p-2 py-2.5 mb-2 text-sm font-semibold ${
                                        activeItem === item.name
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-black hover:bg-gray-200 hover:text-indigo-600'
                                    }`}
                                >
                                    <item.icon
                                        className={`h-6 w-6 ${
                                            activeItem === item.name
                                                ? 'text-white'
                                                : 'text-black group-hover:text-indigo-600'
                                        }`}
                                    />
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 bg-gray-900/50 transition-opacity lg:hidden ${sidebarOpen ? '' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 max-w-xs bg-white p-6 lg:hidden transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-0 left-0 m-4 p-2"
                >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-gray-800" />
                </button>

                {/* Sidebar content */}
                <div className="flex flex-col gap-y-5">
                    <nav className="flex flex-1 flex-col">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => handleItemClick(item.name)} // Set active item on click
                                className={`px-4 py-2 ${
                                    activeItem === item.name
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-black hover:bg-gray-50 hover:text-indigo-600'
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
