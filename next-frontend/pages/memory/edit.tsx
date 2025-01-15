import axios from 'axios';
import { useEffect, useState } from 'react';
import PersonalQuoteEdit from '../access-request-pages/PersonalQuoteEdit';
import ObituaryEdit from '../access-request-pages/ObituaryEdit';
import TimelineEdit from '../access-request-pages/TimelineEdit';
import { API } from '../../utils/api';
import GalleryEdit from '../access-request-pages/GalleryEdit';
import FavouritesEdit from '../access-request-pages/FavouritesEdit';
import { FavouriteEvent } from '../../utils/types';
import { Router, useRouter } from 'next/router';
import { ROUTES } from '../../utils/routes';

type TimelineEvent = {
    id: number;
    event_date: string;
    day: string;
    month: string;
    year: string;
    title: string;
    description: string;
    location: string;
};

const EditPage = () => {
    const [encryptedData, setEncryptedData] = useState<string | null>(null);
    const [sectionsToRender, setSectionsToRender] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [quote, setQuote] = useState<string>('');
    const [obituary, setObituary] = useState<string>('');
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [galleryData, setGalleryData] = useState<any>(null);
    const router = useRouter();
    const [favouritesData, setFavouritesData] = useState<{
        favourites: FavouriteEvent[];
        tagline: string;
    }>({
        favourites: [],
        tagline: '',
    });

    const handleSubmit = async () => {
        try {
            const dataToSend = {
                quote,
                obituary,
                timeline: JSON.stringify(timeline),
                gallery: galleryData,
                favourites: favouritesData,
                encryptedData: encryptedData,
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.submitUserChanges}`,
                dataToSend
            );

            if (response.status === 200) {
                router.push(ROUTES.submissionSuccessful);
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
            } catch (error) {
                setErrorMessage('Error fetching data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    return (
        <div className='mt-28 md:px-20 px-5'>
            {sectionsToRender.includes('personalQuote') && <PersonalQuoteEdit setQuote={setQuote} />}
            {sectionsToRender.includes('gallery') && <GalleryEdit setGalleryData={setGalleryData} />}
            {sectionsToRender.includes('obituary') && <ObituaryEdit setObituary={setObituary} />}
            {sectionsToRender.includes('timeline') && <TimelineEdit setTimeline={setTimeline} />}
            {sectionsToRender.includes('favourites') && (
                <FavouritesEdit
                    initialFavourites={favouritesData.favourites}
                    initialTagline={favouritesData.tagline}
                    setFavouritesData={setFavouritesData}
                />
            )}

            <div className="mt-4 flex justify-center mb-10">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-light-900 text-white px-4 py-2 rounded"
                >
                    Submit Changes
                </button>
            </div>
        </div>
    );
};

export default EditPage;
