import Sidebar from '../components/Sidebar';
import { signIn, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import ImageCropperModal from "../components/ImageCropperModal";
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { ROUTES } from '../utils/routes';
import { useUserContext } from '../context/UserContext';
import Image from 'next/image';

interface Country {
    name: string;
    code: string;
}

const ProfilePage = () => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const { userData, setUserData } = useUserContext();
    const [countries, setCountries] = useState<Country[]>([]);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "US",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
    });

    const [localUserData, setLocalUserData] = useState<{ email?: string; password?: string }>({});

    // Fetch countries with retry mechanism
    const fetchCountries = useCallback(async () => {
        const MAX_RETRIES = 3;
        let attempt = 0;
        let success = false;

        while (attempt < MAX_RETRIES && !success) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${API.fetchCountries}`);
                if (response.status === 200) {
                    setCountries(response.data.countries);
                    success = true;
                } else {
                    throw new Error(`Error fetching countries: ${response.statusText}`);
                }
            } catch (error) {
                attempt++;
                console.error(`Attempt ${attempt} failed:`, error);
                if (attempt === MAX_RETRIES) {
                    setCountries([]);
                    console.error("Failed to fetch countries after 3 attempts.");
                }
            }
        }
    }, []);

    // Set initial form data based on session
    useEffect(() => {
        if (session?.user) {
            setFormData({
                firstName: session.user.userDetails?.first_name || "",
                lastName: session.user.userDetails?.last_name || "",
                email: session.user.email || "",
                country: session.user.userDetails?.country || "US",
                streetAddress: session.user.userDetails?.street_address || "",
                city: session.user.userDetails?.city || "",
                region: session.user.userDetails?.region || "",
                postalCode: session.user.userDetails?.postal_code || "",
            });
            // Set the initial profile picture based on the session
            if (session?.user?.userDetails?.profile_picture) {
                setPreviewImage(session?.user?.userDetails?.profile_picture);
            }
        }
    }, [session]);

    // Fetch countries on mount
    useEffect(() => {
        fetchCountries();
    }, [fetchCountries, userData]);

    // Retrieve from localStorage on mount
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setLocalUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!token) {
            toast.error("You are not authenticated.");
            return;
        }

        try {
            const formDataToSubmit = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSubmit.append(key, value);
            });

            if (profilePicture) {
                formDataToSubmit.append("profile_picture", profilePicture);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.updateProfile}`,
                formDataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const updatedUserData = response.data.updatedUserDetails;

                if (updatedUserData) {
                    setUserData(updatedUserData);

                    await signIn('credentials', {
                        email: localUserData.email,
                        password: localUserData.password,
                        redirect: false,
                    });
                }
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (error) {
            toast.error("Error updating profile.");
            console.error(error);
        }
    };
    return (
        <div>
            <div className='md:flex gap-10 md:px-16 px-5 w-full mt-32  mb-10'>
                <Sidebar />
                <main className='w-full'>
                    <div>
                        <h1 className='font-semibold md:text-xl text-lg mb-5 mt-5 md:mb-0'>Edit Profile</h1>
                        <section className='bg-white p-6 w-full shadow rounded'>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                                        <div>
                                            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                                            <p className="mt-1 text-sm/6 text-gray-600">
                                                This information will be displayed publicly so be careful what you share.
                                            </p>
                                        </div>
                                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                            <div className="col-span-full md:w-[350px] relative">
                                                <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                                    Photo
                                                </label>
                                                <div className="mt-2 relative  items-center gap-x-3 edit-profile">
                                                    <div className='shadow bg-gray-50 p-2 md:w-[350px]'>
                                                        <Image
                                                            src={previewImage || '/img/profile-img.png'}
                                                            alt="Profile Picture"
                                                            width={350}
                                                            height={350}
                                                            className="transition-opacity duration-500"
                                                        />
                                                    </div>

                                                    <ImageCropperModal
                                                        onSave={(file) => {
                                                            setProfilePicture(file);
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setPreviewImage(reader.result as string); // Set preview image
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />

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
                                                        name="firstName"
                                                        type="text"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
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
                                                        name="lastName"
                                                        type="text"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
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
                                                        value={formData.email}
                                                        onChange={handleChange}
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
                                                        autoComplete="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    >
                                                        {countries.map((country) => (
                                                            <option key={country.code} value={country.code}>
                                                                {country.name}
                                                            </option>
                                                        ))}
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
                                                        name="streetAddress"
                                                        type="text"
                                                        value={formData.streetAddress}
                                                        onChange={handleChange}
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
                                                        value={formData.city}
                                                        onChange={handleChange}
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
                                                        value={formData.region}
                                                        onChange={handleChange}
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
                                                        name="postalCode"
                                                        type="text"
                                                        value={formData.postalCode}
                                                        onChange={handleChange}
                                                        autoComplete="postal-code"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Link href={ROUTES.Dashboard}
                                        className="text-sm/6 font-semibold text-gray-900">
                                        Cancel
                                    </Link>
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