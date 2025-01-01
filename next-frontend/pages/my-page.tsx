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
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { ROUTES } from "../utils/routes";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Configuration modal state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Register page modal state
  const [loading, setLoading] = useState(true);
  const [hasPage, setHasPage] = useState(false); // Track if user already has a page
  const { pageData, setPageId, setPageData } = usePageContext();
  const { data: session, status } = useSession();

  const openModal = (modalType: "config" | "register") => {
    if (modalType === "config") setIsModalOpen(true);
    else setIsRegisterModalOpen(true);
  };

  const closeModal = (modalType: "config" | "register") => {
    if (modalType === "config") setIsModalOpen(false);
    else setIsRegisterModalOpen(false);
  };

  useEffect(() => {
    const fetchUserPage = async () => {
      if (status === "loading" || !session?.user?.accessToken) {
        setLoading(true);
        return;
      }

      try {
        const token = session.user.accessToken;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${API.checkExistingPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200 && response.data.page) {
          const { id, ...pageData } = response.data.page;
          setPageId(id);
          setPageData(pageData);
          setHasPage(true);
          setIsModalOpen(false); // Ensure the modal is closed if the page exists
        } else {
          toast.info("Welcome! Configure Your Page Settings");
          setHasPage(false);
          openModal("config"); // Open configuration modal for new users
        }
      } catch (error) {
        console.error("Error fetching user page:", error);
        setHasPage(false);
        openModal("config"); // Open configuration modal if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchUserPage();
  }, [session?.user?.accessToken, setPageId, setPageData, status]);

  return (
    <Layout noLayout={true}>
      <div
        className={`relative min-h-screen ${isModalOpen || isRegisterModalOpen ? "overflow-hidden" : ""
          }`}
      >
        {/* Page Content */}
        <MyPage />

        {/* Configuration Modal */}
        <Modal isOpen={isModalOpen} onClose={() => closeModal("config")} />

        {/* Register Page Modal */}
          <RegisterPageModal isOpen={isRegisterModalOpen} onClose={() => closeModal("register")} />
        {/* Overlay for Modal Active State */}
        {(isModalOpen || isRegisterModalOpen) && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
        )}

        <div
          className={`fixed bottom-0 left-0 w-full bg-stone-100 border-t border-gray-200 shadow-2xl py-3 px-2 flex items-center z-50 ${isModalOpen || isRegisterModalOpen ? "pointer-events-none opacity-50" : ""
            }`}
        >
          {/* Left-aligned Back to Home button */}
          <div className="flex justify-start flex-shrink-0">
            <Link href={ROUTES.Dashboard} className="bg-gray-200 hover:bg-gray-300 text-blue-light-900 border-gray-300 border font-semibold flex gap-2 items-center text-sm px-2.5 group py-1.5 rounded" >
              <IoMdArrowBack className="tracking-normal text-light-blue-900 font-medium group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" /> Back to home
            </Link>
          </div>

          {!pageData?.is_registered && (
            // Center-aligned Register page button
            <div className="flex-grow flex justify-center">
              <button
                onClick={() => openModal("register")}
                className="bg-gray-200 hover:bg-gray-300 text-blue-light-900 border-gray-300 border font-semibold flex gap-2 items-center text-sm px-2.5 group py-1.5 rounded"
              >
                Register page{" "}
                <IoIosArrowRoundForward className="group-hover:translate-x-0.5 text-lg transition-transform duration-150 ease-in-out" />
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}

// Static property to hide Header and Footer
Home.noLayout = true;
