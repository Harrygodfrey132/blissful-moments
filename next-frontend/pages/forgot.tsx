import { useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Password reset link sent to your email.');
            } else {
                setError(data.error || 'Something went wrong.');
            }
        } catch (err) {
            setError('Unable to send reset email. Please try again.');
        }
    };

    return (
        <div className="flex bg-white min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className='md:mt-24 mt-10'>
                        <h2 className="md:mt-8 mt-4 text-2xl font-bold tracking-tight text-gray-900">
                            Forgot your password ?
                        </h2>
                        <p className="text-sm text-gray-600 mt-4">
                            No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form action="#" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full p-2.5 py-2 mt-1 text-gray-700 bg-gray-50 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>





                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded bg-blue-light-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Reset Password
                                    </button>
                                </div>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    className="absolute inset-0 size-full object-cover"
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
