// pages/profile.tsx
import Sidebar from '../components/Sidebar'
import useAuthRedirect from '../hooks/useAuthRedirect';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
const ProfilePage = () => {
// useAuthRedirect(true, true);
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
    <div className='md:flex gap-10 md:px-16 px-5 w-full  mb-10'>
        <Sidebar />
        <main className='w-full'>
            <div>
                <h1 className='font-semibold text-xl mb-5'>Edit Profile</h1>
                <section className='bg-white p-4 w-full shadow rounded'>
                    <form>
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                <div>
                                    <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                                    <p className="mt-1 text-sm/6 text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                    <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                        Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <UserCircleIcon aria-hidden="true" className="size-24 text-gray-300" />
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                            <span>Change</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                <div>
                                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                                </div>
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                        First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                        Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="last-name"
                                                name="last-name"
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                        Country
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                        Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="street-address"
                                                name="street-address"
                                                type="text"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                        City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                        State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="region"
                                                name="region"
                                                type="text"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                        ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postal-code"
                                                name="postal-code"
                                                type="text"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm/6 font-semibold text-gray-900">
                            Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                            Save
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    </div>
</div>
);
};
export default ProfilePage;