import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { API } from '../utils/api';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

const OrderPage = () => {
    const { data: session } = useSession(); // To get the user session
    const [orders, setOrders] = useState<any[]>([]); // Store orders data
    const [loading, setLoading] = useState(false); // Loader state

    useEffect(() => {
        // Fetch orders data on page load
        const fetchOrders = async () => {
            if (session?.user?.accessToken) {
                setLoading(true); // Start loading
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.getOrders}`, {
                        headers: {
                            Authorization: `Bearer ${session.user.accessToken}`,
                        },
                    });

                    // Assuming response contains orders field
                    setOrders(response.data.order_data.data || []);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchOrders();
    }, [session?.user?.accessToken]);

    return (
        <div>
            <div className='md:flex gap-5 md:px-10 px-4 w-full mb-10 md:mt-32 mt-24'>
                <Sidebar />
                <main className='flex-1'>
                    <header className='mb-6 md:mt-0 mt-4'>
                        <h1 className="text-xl font-bold text-gray-800">Orders</h1>
                        <p className="text-sm text-gray-800">
                            A list of all the orders in your account.
                        </p>
                    </header>
                    <div>
                        <section className='w-full'>
                            <div className="px-4 sm:px-2 lg:px-2">

                                {/* Loader */}
                                {loading ? (
                                    <div className="flex justify-center items-center my-10">
                                        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
                                    </div>
                                ) : (
                                    <div className="mt-5 flow-root">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-6">
                                                <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-300">
                                                        <thead className='bg-gray-50'>
                                                            <tr>
                                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                                    Order ID
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Plan Name
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Amount
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Order Placed
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Renewal Date
                                                                </th>
                                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {orders.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan={6} className="text-center py-4 text-sm text-gray-500">No orders found</td>
                                                                </tr>
                                                            ) : (
                                                                orders.map((order) => (
                                                                    <tr key={order.id}>
                                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-4">{order.order_id}</td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.planName}</td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${order.amount}</td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.orderPlaced}</td>
                                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.nextRenewalDate}</td>
                                                                    </tr>
                                                                ))
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default OrderPage;
