import axios from 'axios';
import { useEffect, useState } from 'react';
import { API } from '../../utils/api';
import { FavouriteEvent } from '../../utils/types';
import { Router, useRouter } from 'next/router';
import { ROUTES } from '../../utils/routes';
import Image from 'next/image';
import { AiOutlineCaretLeft } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface TimelineEvent {
    id: number;
    event_date: string;
    day: string;
    month: string;
    year: string;
    title: string;
    description: string;
    location: string;
}

const ViewPage = () => {
    const [encryptedData, setEncryptedData] = useState<string | null>(null);
    const [submittedData, setsubmittedData] = useState<any | null>(null);
    const [sectionsToRender, setSectionsToRender] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [galleryData, setGalleryData] = useState<any>(null);
    const router = useRouter();
    const [favouritesData, setFavouritesData] = useState<{
        favourites: FavouriteEvent[];
        tagline: string;
    }>({
        favourites: [],
        tagline: '',
    });
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const { data: session } = useSession();

    const handleSubmit = async (status: number) => {
        try {

            const dataToSend = {
                status: status,
                access_request_id: submittedData?.access_request_id
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.updateUserChanges}`,
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${session?.user?.accessToken}`,
                    },
                }
            );


            if (response.status === 200) {
                toast.success("Changes updated");
                router.push(ROUTES.accessRequests);
            } else {
                setErrorMessage('Failed to submit changes.');
            }
        } catch (error) {
            setErrorMessage('Error submitting changes.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const validationData = urlParams.get('data');

            // Use a fallback value if validationData is null
            setEncryptedData(validationData || '');  // Fallback to an empty string

            if (!validationData) {
                setErrorMessage('Invalid or missing data.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}${API.verifyRequestAccessData}`,
                    { data: validationData }
                );
                setSectionsToRender(response.data.sections);
                setsubmittedData(response.data.submitted_data);
            } catch (error) {
                setErrorMessage('Error fetching data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (submittedData) {
            // Parse favourites data
            const favourites = submittedData.favourites ? JSON.parse(submittedData.favourites) : { favourites: [], tagline: '' };
            setFavouritesData(favourites);

            // Parse timeline data
            if (submittedData?.timeline) {
                try {
                    // Check if the timeline is a string and parse it
                    let parsedTimeline = typeof submittedData.timeline === 'string'
                        ? JSON.parse(submittedData.timeline)
                        : submittedData.timeline;

                    if (typeof parsedTimeline === 'string') {
                        parsedTimeline = JSON.parse(parsedTimeline);
                    }

                    if (Array.isArray(parsedTimeline)) {
                        setTimeline(parsedTimeline);
                    } else {
                        console.error('Parsed timeline is not an array:', parsedTimeline);
                        setTimeline([]);
                    }
                } catch (error) {
                    console.error('Error parsing timeline data:', error);
                    setTimeline([]);
                }
            }
        }
    }, [submittedData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div className='mt-28 md:px-20 px-5'>
            {sectionsToRender.includes('personalQuote') && (
                <>
                    <div className="flex justify-end mb-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                                <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                                    Personal Quote
                                </div>
                                <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 md:py-6 py-0">
                        <div className="flex items-center justify-between relative">
                            <div className="text-center text-blue-900 px-6 py-5 md:text-2xl text-xl font-playfair font-medium">
                                {submittedData?.quote || "No quote provided"}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {sectionsToRender.includes('obituary') && (
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-end">
                        <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                            <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                                Obituary
                            </div>
                            <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
                        </div>
                    </div>
                    <div className="bg-white border-2 border-dashed text-blue-light-900 md:text-xl text-lg md:p-12 p-6 mt-5 md:mt-10">
                        <p className="text-center mb-2 font-playfair">
                            {submittedData.obituary}
                        </p>
                    </div>
                </div>
            )}

            {sectionsToRender.includes('favourites') && (
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center gap-2 w-full justify-end md:w-auto md:order-1">
                            <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                                Favourites
                            </div>
                            <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
                        </div>
                        <div className="text-blue-light-900 font-playfair md:text-2xl text-xl font-400 md:mt-0  md:text-left">
                            {favouritesData.tagline || "No tagline provided"}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {favouritesData.favourites?.map((event, index) => {
                            return (
                                <div key={index} className="relative">
                                    <h3 className="text-blue-light-900 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] font-400  border p-3 mb-2 ">
                                        {event.title}
                                    </h3>
                                    <p className="text-blue-light-900 font-400 font-playfair md:text-lg text-base border-gray-300 bg-[#f8f8f8] border p-3">
                                        {event.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {sectionsToRender.includes('timeline') && (
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center gap-2 mt-5 md:mt-0  w-full justify-end md:order-1">
                            <div className="text-blue-light-900 font-playfair md:text-xl text-lg border-b-4 border-blue-light-800 font-400">
                                Timeline
                            </div>
                            <Image src="/img/dove.svg" alt="Dove" width={50} height={50} />
                        </div>
                    </div>
                    <div className="timeline">
                        {timeline?.map((event, index) => {
                            const { day, month, year, title, description, location } = event;

                            return (
                                <div key={index} className="timeline-event font-playfair flex gap-4 relative mt-4">
                                    <div className="timeline-date flex flex-col md:w-2/12 w-4/12 gap-1 items-start space-y-1">
                                        <div className="text-blue-light-900 font-medium md:text-xl text-base">
                                            {title}
                                        </div>
                                        <div>
                                            <div className="p-2 text-center w-16 bg-[#F0F0F0] md:text-lg text-base h-10 text-blue-light-900 rounded-lg font-medium">
                                                {day}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="p-2 w-16 md:text-lg text-base rounded-lg text-center bg-[#F0F0F0] h-10 text-blue-light-900 font-medium">
                                                {month}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="p-2 w-16 bg-[#F0F0F0] md:text-lg text-base text-center h-10 border-gray-300 text-blue-light-900 rounded-lg font-medium">
                                                {year}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-10/12 w-8/12">
                                        <div className="border-4 relative bg-[#fafafa] rounded text-blue-light-900 font-medium text-base md:text-xl border-gray-200 w-full p-4">
                                            <AiOutlineCaretLeft className="text-gray-200 text-2xl left-[-36px] top-0 h-12 w-12 absolute" />
                                            <p>{description}</p>
                                        </div>
                                        <div className="text-blue-light-900 font-medium md:text-lg text-base flex items-center mt-2 md:mt-4 gap-2">
                                            <span className="material-icons-outlined text-blue-light-900">
                                                location_on
                                            </span>
                                            {location}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="mt-8 flex justify-center mb-10 gap-5">
                <button
                    onClick={() => handleSubmit(1)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Approve
                </button>
                <button
                    onClick={() => handleSubmit(2)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Decline
                </button>
            </div>

        </div>
    );
};

export default ViewPage;
