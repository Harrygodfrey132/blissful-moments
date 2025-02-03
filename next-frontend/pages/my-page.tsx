import { useEffect, useState, useRef } from "react";
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
import { useRouter } from "next/router";  // Import useRouter

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Configuration modal state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Register page modal state
  const [loading, setLoading] = useState(true);
  const [hasPage, setHasPage] = useState(false);
  const { pageData, setPageId, setPageData } = usePageContext();
  const { data: session, status } = useSession();
  const fetchCalledRef = useRef(false);

  const router = useRouter();

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
      if (fetchCalledRef.current || status === "loading" || !session?.user?.accessToken) {
        setLoading(true);
        return;
      }
      fetchCalledRef.current = true; // Ensure the function only runs once

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

  // Show loader during route transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    const handleRouteChangeError = () => {
      setLoading(false); // Ensure loader stops if there's an error
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.createOrder}`,
        {
          user_id: session?.user?.id
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
          }
        }
      );

      if (response.status === 200) {
        const orderId = response.data.order_id;
        router.push(`${ROUTES.checkout}?order_id=${orderId}`);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };


  return (
    <Layout noLayout={true}>
      <div
        className={`relative min-h-screen ${isModalOpen || isRegisterModalOpen ? "overflow-hidden" : ""}`}
      >
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="spinner"></div> {/* Add your spinner styling here */}
          </div>
        )}

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
          className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl py-3 px-5 flex items-center z-50 ${isModalOpen || isRegisterModalOpen ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Left-aligned Back to Home button */}
          <div className="flex justify-start flex-shrink-0">
            <Link href={ROUTES.Dashboard} className="bg-gray-200 hover:bg-gray-300 text-blue-light-900 border-gray-300 border font-semibold flex gap-2 items-center text-sm px-2.5 group py-1.5 rounded" >
              <IoMdArrowBack className="tracking-normal text-light-blue-900 font-medium group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" /> Back to home
            </Link>
          </div>

          {!pageData?.is_registered && (
            // Center-aligned Register page button
            <div className="flex-grow flex bg-white justify-center">
              <button
                onClick={handleCheckout}
                className="bg-blue-light  text-white border-gray-300 border font-semibold flex gap-2 items-center text-sm px-2.5 group py-2 rounded-lg"
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
