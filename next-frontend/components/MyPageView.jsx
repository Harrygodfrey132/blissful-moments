import React, { useEffect, useRef, useState } from "react";
import TabComponentView from "./TabComponentView";
import { GoDotFill } from "react-icons/go";
import { MdSettings, MdClose } from "react-icons/md";
import { API } from "../utils/api";
import { toast } from "react-toastify";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [weekday, day, month, year] = formattedDate.split(" ");
  return { weekday, day, month, year };
};

const MyPageView = ({ pageData }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isModalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isVerified = localStorage.getItem("isPasswordVerified") === "true";
      setIsPasswordVerified(isVerified);
      setModalPasswordOpen(!isVerified && pageData?.is_private);
      setIsLoaded(true); // Set isLoaded to true after checking
    }
  }, [pageData]);

  useEffect(() => {
    // Prevent flickering by waiting until isLoaded is true
    if (isLoaded && !isPasswordVerified && pageData?.is_private) {
      setModalPasswordOpen(true);
    }
  }, [isLoaded, isPasswordVerified, pageData]);

  // Function to close the modal
  const closeModal = () => {
    setModalPasswordOpen(false);
  };

  // Toggle Sliding Panel
  const togglePanel = () => setPanelOpen(!isPanelOpen);

  // Toggle Modal
  const toggleModal = () => {
    setPanelOpen(false);
    setModalOpen(!isModalOpen);
  };

  const verifyPasswordHandler = async (event) => {
    event.preventDefault(); // Prevent form submission reload

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${API.verifyPassword}`,
        { password, page_id: pageData?.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setIsPasswordVerified(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("isPasswordVerified", "true");
        }
        toast.success("Password verified successfully!");
        closeModal();
      } else {
        throw new Error(
          response.data.message || "Password verification failed."
        );
      }
    } catch (error) {
      // Handle 401 or other status codes gracefully
      if (error.response && error.response.status === 401) {
        toast.error("Invalid password. Please try again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const audioSrc = pageData?.background_music || "";
  const isMusicAvailable = audioSrc !== "";

  const backgroundMusicHandler = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };


  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <header
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: pageData.background_image
            ? `url(${pageData.background_image})`
            : "url('/img/top-bg.jpg')",
        }}
      ></header>
      {/* Personal Info Section */}
      <section className="flex flex-col md:flex-row px-4 md:px-20 personal-info">
        <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
          <div className="relative bg-[#EAEAEA] p-2 w-[330px] h-[300px]">
            <img
              src={pageData.profile_picture || "/img/dummy.png"}
              alt="Profile"
              className="w-full h-[285px] object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-4 md:p-4 p-0">
            <h1 className="text-xl md:text-3xl font-playfair justify-center md:justify-start flex flex-wrap gap-2 font-medium mb-4 md:mt-0 mt-5">
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.first_name}
              </div>
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.middle_name}
              </div>
              <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                {pageData.last_name}
              </div>
            </h1>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
              {/* Date of Birth */}
              <div className="flex gap-2">
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {formatDate(pageData.date_of_birth).month}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                  {formatDate(pageData.date_of_birth).day}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {formatDate(pageData.date_of_birth).year}
                </div>
              </div>
              <div className="flex items-center">
                <GoDotFill className="text-blue-light-900" />
              </div>
              {/* Death Date */}
              <div className="flex gap-2">
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {formatDate(pageData.death_date).month}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                  {formatDate(pageData.death_date).day}
                </div>
                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                  {formatDate(pageData.death_date).year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tab Component */}
      <TabComponentView pageData={pageData} />
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          className="bg-[#7497ac] text-white p-2.5 rounded-full shadow flex items-center gap-2 transition"
          onClick={togglePanel}
        >
          <MdSettings size={24} />
          Page Settings
        </button>
      </div>
      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex relative justify-between items-center p-6 border-b">
          <h2 className="text-lg text-blue-light-900 font-semibold">
            Page Configrations
          </h2>
          <button className="absolute top-2 right-1" onClick={togglePanel}>
            <MdClose size={24} />
          </button>
        </div>
        <ul className="p-6 space-y-4">
          <li>
            <button
              className="text-blue-light-900 hover:underline"
              onClick={toggleModal}
            >
              Request Access
            </button>
          </li>
          {isMusicAvailable && (
            <li>
              <button
                onClick={backgroundMusicHandler}
                className="text-blue-light-900 hover:underline"
              >
                {isMusicPlaying
                  ? "Pause Background Music"
                  : "Play Background Music"}
              </button>
            </li>
          )}
        </ul>
      </div>
      {/* Request access Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white px-12 m-4 py-6 rounded shadow-md relative w-[90%] max-w-xl">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-xl  font-semibold">Request Access</h2>
            <p className="mb-4  text-sm">
              Please check the sections below that you want to contribute.
            </p>
            <fieldset>
              <div className="space-y-5 grid grid-cols-2 bg-gray-100 rounded p-4  items-center">
                <div className="flex gap-3 mt-4">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="personal-quote"
                        aria-describedby="personal-quote-description"
                        name="personal-quote"
                        type="checkbox"
                        checked
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="personal-quote"
                      className="font-medium text-gray-900"
                    >
                      Personal Quote
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="gallery"
                        aria-describedby="gallery-description"
                        name="gallery"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="gallery"
                      className="font-medium text-gray-900"
                    >
                      Gallery
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="obituary"
                        aria-describedby="obituary-description"
                        name="obituary"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="obituary"
                      className="font-medium text-gray-900"
                    >
                      Obituary
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="timeline"
                        aria-describedby="timeline-description"
                        name="timeline"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="timeline"
                      className="font-medium text-gray-900"
                    >
                      Timeline
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="favourites"
                        aria-describedby="favourites-description"
                        name="favourites"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="favourites"
                      className="font-medium text-gray-900"
                    >
                      Favourites
                    </label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="contributions"
                        aria-describedby="contributions-description"
                        name="contributions"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="contributions"
                      className="font-medium text-gray-900"
                    >
                      Contributions
                    </label>
                  </div>
                </div>
              </div>
              <div className="font-semibold mt-6 mb-1"> Personal Details</div>
              <div className="bg-gray-100 rounded p-4">
                <div>
                  <label
                    for="current-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Enter Name
                  </label>
                  <div class="mt-2">
                    <input
                      id="current-password"
                      name="currentPassword"
                      type="password"
                      class="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm font-playfair"
                      value=""
                    ></input>
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    for="current-password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Enter Email
                  </label>
                  <div class="mt-2">
                    <input
                      id="current-password"
                      name="currentPassword"
                      type="password"
                      class="block w-full rounded bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm font-playfair"
                      value=""
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5 gap-4">
                <button className="bg-blue-light-900 text-white px-4 py-2 rounded  transition">
                  Request Access
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      )}
      {/* Password Modal */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-white/30">
          <div className="bg-white m-4 rounded-lg shadow-lg p-8 max-w-md w-full relative">
            {/* Close Button */}
            {/* <button
         onClick={closeModal}
         className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
         aria-label="Close"
         >
      ✖
      </button> */}
            {/* Modal Content */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Enter password to access the page
            </h2>
            <form className="space-y-4" onSubmit={verifyPasswordHandler}>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-sm border !rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={verifyPasswordHandler}
                  className="bg-blue-light-900 text-white px-4 py-2 rounded  transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Play the background music if available */}
      {isMusicAvailable && (
        <audio ref={audioRef} className="hidden" controls autoPlay loop>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
export default MyPageView;
