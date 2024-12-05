import { useEffect, useState } from "react";
import MyPage from "../components/MyPage";
import Modal from "../components/modal";
import Layout from "../components/Layout";
import { usePageContext } from "../context/PageContext";
import axios from "axios";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal is closed by default
  const [loading, setLoading] = useState(true);
  const [hasPage, setHasPage] = useState<boolean>(false);
  const { setPageId } = usePageContext();
  const { data: session, status } = useSession();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Ensure the session is available before making the API call
    if (status === "loading" || !session?.user?.accessToken) {
      setLoading(true);
      return;
    }

    const checkUserPage = async () => {
      const token = session?.user?.accessToken; // Get token from session

      try {
        // Ensure token is included in headers for authentication
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${API.checkExistingPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );

        if (response.status === 200) {
          if (response.data.page) {
            // If page exists, set the page ID in context and close the modal
            setPageId(response.data.page.id);
            setHasPage(true);
            setIsModalOpen(false);  // Close modal if page exists
          } else {
            setHasPage(false);
            setIsModalOpen(true);  // Open modal if no page exists
          }
        }
      } catch (error) {
        toast.error("Error checking user page");
        setHasPage(false);
        setIsModalOpen(true);  // Open modal if there's an error
      } finally {
        setLoading(false);
      }
    };

    // Call the API to check the user's page only when session is available
    checkUserPage();
  }, [session?.user?.accessToken, setPageId, status]);

  return (
    <Layout noLayout={true}>
      <div>
        <MyPage />
        {/* Modal component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Layout>
  );
}

// Static property to hide Header and Footer
Home.noLayout = true;
