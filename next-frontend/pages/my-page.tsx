import { useEffect, useState } from "react";
import MyPage from "../components/MyPage";
import Modal from "../components/modal";
import Layout from "../components/Layout";
import RegisterPageModal from "../components/RegisterPageModal";
import { usePageContext } from "../context/PageContext";
import axios from "axios";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // For the configuration modal
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // For the register page modal
  const [loading, setLoading] = useState(true);
  const [hasPage, setHasPage] = useState<boolean>(false);
  const { setPageId } = usePageContext();
  const { data: session, status } = useSession();

  const openConfigModal = () => setIsModalOpen(true);
  const closeConfigModal = () => setIsModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  useEffect(() => {
    if (status === "loading" || !session?.user?.accessToken) {
      setLoading(true);
      return;
    }

    const checkUserPage = async () => {
      const token = session?.user?.accessToken;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${API.checkExistingPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          if (response.data.page) {
            setPageId(response.data.page.id);
            setHasPage(true);
            setIsModalOpen(true); // Open configuration modal if page exists
          } else {
            toast.info("Welcome! Configure Your Page Settings");
            setHasPage(false);
            setIsModalOpen(true); // Open configuration modal if no page exists
          }
        }
      } catch (error) {
        setHasPage(false);
        setIsModalOpen(true); // Open configuration modal if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkUserPage();
  }, [session?.user?.accessToken, setPageId, status]);

  return (
    <Layout noLayout={true}>
      <div className={`relative min-h-screen ${isModalOpen || isRegisterModalOpen ? "overflow-hidden" : ""}`}>
        <MyPage />

        {/* Configuration Modal */}
        <Modal isOpen={isModalOpen} onClose={closeConfigModal} />

        {/* Register Page Modal */}
        <RegisterPageModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />

        {/* Overlay for the Bottom Strip */}
        {isModalOpen || isRegisterModalOpen ? (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
        ) : null}

        {/* Bottom Strip */}
        <div
          className={`fixed bottom-0 left-0 w-full bg-stone-100 border-t border-gray-200 shadow-2xl py-3 px-2 flex justify-center items-center z-50 ${
            isModalOpen || isRegisterModalOpen ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <button
            onClick={openRegisterModal}
            className="bg-gray-200 hover:bg-gray-300 text-blue-light-900 border-gray-300 border font-semibold flex gap-2 items-center text-sm px-2.5 group py-1.5 rounded"
          >
            Register page{" "}
            <IoIosArrowRoundForward className="group-hover:translate-x-0.5 text-lg transition-transform duration-150 ease-in-out" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

// Static property to hide Header and Footer
Home.noLayout = true;
