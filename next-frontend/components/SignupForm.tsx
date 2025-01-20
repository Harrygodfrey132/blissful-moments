import Link from "next/link";
import { ROUTES } from "../utils/routes";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { validateSignup } from "../utils/validation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify"; // Import Toastify
import { registerUser } from "../utils/registrationApiService";
import { useIsVerified } from "../context/IsUserVerifiedContext";
import { useUserContext } from "../context/UserContext";

type SignupFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndCondition: boolean;
};

const SignupForm = () => {
    const router = useRouter();
    const { setIsVerified } = useIsVerified();
    const { setUserData } = useUserContext();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignupFormData>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAndCondition: false,
        },
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

    const onSubmit = async (data: SignupFormData) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
            return;
        }

        setLoading(true);

        try {
            const response = await registerUser(data);

            if (!response || !response.token) {
                if (response.errors) {
                    Object.entries(response.errors).forEach(([field, messages]) => {
                        setError(field as keyof SignupFormData, {
                            type: "manual",
                            message: (messages as string[]).join(", "),
                        });
                    });
                } else {
                    toast.error("Registration failed. Please try again.");
                }
                return;
            }

            toast.success(response.message || "Registration successful!");

            const loginResult = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (!loginResult || loginResult.error) {
                throw new Error(loginResult?.error || "Login failed");
            }
            setIsVerified(false);
            setUserData(response.user);
            localStorage.setItem('userData', JSON.stringify(data));
            router.push(ROUTES.Verify_Email);
        } catch (error: any) {
            toast.error(error.message || "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Loader Overlay */}
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-4'>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input
                            type="text"
                            {...register('firstName', validateSignup.firstName)}
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input
                            type="text"
                            {...register('lastName', validateSignup.lastName)}
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Smith"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input
                        type="email"
                        {...register('email', validateSignup.email)}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="name@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            {...register('password', validateSignup.password)}
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute right-2 top-2 text-sm text-gray-600"
                        >
                            <span className="material-icons-outlined">
                                {showPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                            {...register('confirmPassword', validateSignup.confirmPassword)}
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                            className="absolute right-2 top-2 text-sm text-gray-600"
                        >
                            <span className="material-icons-outlined">
                                {showConfirmPassword ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            type="checkbox"
                            {...register('termsAndCondition', validateSignup.terms)}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-30000"
                        />
                    </div>
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-500">
                        I accept the{' '}
                        <Link href="/terms" className="font-medium text-blue-light-900 hover:underline">Terms and Conditions</Link>
                    </label>
                </div>
                {errors.termsAndCondition && <p className="text-red-500 text-xs mt-1">{errors.termsAndCondition.message}</p>}

                <button
                    type="submit"
                    className="w-full text-white bg-blue-light-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Create an account'}
                </button>

                <p className="text-sm font-light text-gray-500 text-center">
                    Already have an account?{' '}
                    <Link href={ROUTES.Login} className="font-medium hover:underline text-blue-light-900">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;
