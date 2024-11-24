import Link from "next/link";
import { ROUTES } from "../utils/routes";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { validateSignup } from "../utils/validation";
import { API } from "../utils/api";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndCondition: boolean;
};

const SignupForm = () => {
    const router = useRouter();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAndCondition: false,
        },
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        setErrorMessage('');

        fetch(`${process.env.NEXT_PUBLIC_API_URL}${API.Registration}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const result = await response.json();
                    if (result.errors) {
                        Object.entries(result.errors).forEach(([field, messages]) => {
                            // Ensure the field is cast to the appropriate type
                            if (field in data) {
                                setError(field as keyof FormData, {
                                    type: 'manual',
                                    message: (messages as string[]).join(', '),
                                });
                            }
                        });
                    } else {
                        setErrorMessage('Registration failed. Please try again.');
                    }
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                if (responseData) {
                    localStorage.setItem('authToken', responseData.token);
                    router.push(ROUTES.VERIFY_EMAIL);
                }
            })
            .catch(() => {
                setErrorMessage('An error occurred during registration. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                {/* Name Field */}
                <div className='flex gap-4'>
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            {...register('firstName', validateSignup.firstName)}
                            name="firstName"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John"
                        />
                        {/* Display first_name validation error */}
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            {...register('lastName', validateSignup.lastName)}
                            name="lastName"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Smith"
                        />
                        {/* Display email validation error */}
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>
                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        {...register('email', validateSignup.email)}
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                    />
                    {/* Display email validation error */}
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        {...register('password', validateSignup.password)}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* Display password validation error */}
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Confirm password
                    </label>
                    <input
                        type="password"
                        {...register('confirmPassword', validateSignup.confirmPassword)}
                        name="confirmPassword"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* Display confirm password validation error */}
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            {...register('termsAndCondition', validateSignup.terms)}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-30000 dark:ring-offset-gray-800"
                        />
                    </div>
                    <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-500"
                    >
                        I accept the{' '}
                        <Link href="/terms"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Terms and Conditions
                        </Link>
                    </label>
                </div>
                {errors.termsAndCondition && (
                    <p className="text-red-500 text-xs mt-1">{errors.termsAndCondition.message}</p>
                )}
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full text-white bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Create an account'}
                </button>

                {/* Login Link */}
                <p className="text-sm font-light text-gray-500">
                    Already have an account?{' '}
                    <Link href={ROUTES.LOGIN}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;