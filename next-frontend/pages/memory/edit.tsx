import axios from 'axios';
import { useEffect, useState } from 'react';
import PersonalQuoteEdit from '../access-request-pages/PersonalQuoteEdit';
import ObituaryEdit from '../access-request-pages/ObituaryEdit';
import TimelineEdit from '../access-request-pages/TimelineEdit';
import { API } from '../../utils/api';
import GalleryEdit from '../access-request-pages/GalleryEdit';
import FavouritesEdit from '../access-request-pages/FavouritesEdit';
import { FavouriteEvent } from '../../utils/types';

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
    const [sectionsToRender, setSectionsToRender] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [quote, setQuote] = useState<string>('');
    const [obituary, setObituary] = useState<string>('');
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [galleryData, setGalleryData] = useState<any>(null); // Add gallery state
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
                gallery: galleryData, // Include gallery data
                favourites: favouritesData, // Include favourites data
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}${API.submitUserChanges}`,
                dataToSend
            );

            if (response.status === 200) {
                setErrorMessage('Changes submitted successfully!');
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
            const encryptedData = urlParams.get('data');

            if (!encryptedData) {
                setErrorMessage('Invalid or missing data.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}${API.verifyRequestAccessData}`,
                    { data: encryptedData }
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
        <div>
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

            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit Changes
                </button>
            </div>
        </div>
    );
};

export default EditPage;
EditPage.noLayout = true;
