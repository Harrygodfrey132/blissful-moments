import React from "react";
import TabComponentView from "./TabComponentView";
import { GoDotFill } from "react-icons/go";


export default function MyPageView() {
    return (
        <div>
            {/* Top Banner */}
            <header
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('img/top-bg.jpg')" }}
            ></header>

            {/* Personal Info */}
            <section className="flex flex-col md:flex-row px-4 md:px-20 personal-info">
                <div className="mt-[-50px] mx-auto md:mx-0 profile-thumb">
                    <div className="relative bg-[#EAEAEA] p-2 w-[330px] h-[300px]">
                        <img
                            src="/img/profile-img.png"
                            alt="Profile"
                            className="w-full h-[285px] object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="space-y-4 md:p-4 p-0">
                        <h1 className="text-xl md:text-3xl font-playfair justify-center md:justify-start flex flex-wrap gap-2 font-medium mb-4 md:mt-0 mt-10">
                            <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                                Monu
                            </div>
                            <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                                Sharma
                            </div>
                            <div className="border bg-[#f8f8f8] text-blue-light-900 p-4 border-gray-300">
                                Agnihotri
                            </div>
                        </h1>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
                            <div className="flex gap-2">
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                                    14
                                </div>
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                                    December
                                </div>
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                                    2025
                                </div>
                            </div>
                            <div className="flex items-center">
                                <GoDotFill className="text-blue-light-900" />
                            </div>
                            <div className="flex gap-2">
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                                    14
                                </div>
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-[121px]">
                                    December
                                </div>
                                <div className="p-2 border bg-[#f8f8f8] text-center md:text-left font-playfair !leading-8 text-lg h-12 border-gray-300 text-blue-light-900 font-medium w-20">
                                    2025
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center relative">
                            <span className="material-icons-outlined absolute left-4 text-blue-light-900">
                                location_on
                            </span>
                            <div className="border p-2.5 text-lg md:w-[77.5%] w-full border-gray-300 bg-[#f8f8f8] text-blue-light-900 pl-12">
                                Royston, Hertfordshire
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Component */}
            <TabComponentView />
        </div>
    );
}
