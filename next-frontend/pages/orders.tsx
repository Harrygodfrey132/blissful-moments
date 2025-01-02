import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { API } from '../utils/api';

const OrderPage = () => {
    const { data: session } = useSession(); // To get the user session
    const [orders, setOrders] = useState<any[]>([]); // Store orders data

    useEffect(() => {
        // Fetch orders data on page load
        const fetchOrders = async () => {
            if (session?.user?.accessToken) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.getOrders}`, {
                        headers: {
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    });

                    // Assuming response contains orders field
                    setOrders(response.data.order_data.data || []); // Ensure the data is set
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchOrders();
    }, [session?.user?.accessToken]);

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

            <div className='md:flex gap-10 px-16 w-full mb-10'>
                <Sidebar />
                <main className='w-full'>
                    <div>
                        <section className='bg-white p-4 w-full shadow rounded'>
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-lg font-semibold text-blue-light-900 mb-2 border-b-2 border-blue-600 inline-block">Orders</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the orders in your account.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                                Order ID
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Plan Name
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Transaction ID
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Order Placed
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Next Renewal Date
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {orders.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={7} className="text-center py-4 text-sm text-gray-500">No orders found</td>
                                                            </tr>
                                                        ) : (
                                                            orders.map((order) => (
                                                                <tr key={order.id}>
                                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{order.order_id}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.planName}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.amount}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.transactionId}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.orderPlaced}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.nextRenewalDate}</td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
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
