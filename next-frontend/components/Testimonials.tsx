"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Testimonials data - you can replace these with your own testimonials
const testimonials = [
    {
        name: "Max Angel",
        role: "- Son of Tim Angel",
        image: "/testimonials/avatar-1.png", // Update with your image path
        quote: "I  think the website idea is great, and I think it's a great way to keep the memory of a loved one alive. We are overjoyed but the finished product."
    },
    {
        name: "Tim Foot",
        role: "Grandson of John Foot",
        image: "/testimonials/avatar-2.png", // Update with your image path
        quote: "It is great that people can add their own memeories to their page. I got to see my Grandad at all different stages of his life and that was special."
    },
    {
        name: "Philip Haywood",
        role: "Cousin of Barbara Haywood",
        image: "/testimonials/avatar-3.png", // Update with your image path
        quote: " I have loved building the page, building it has brought me immense joy as I could reflect on the life of Babra. I recommend it as a way to freflect but also to celebrate the life of a loved one."
    },
    {
        name: "Samantha Clark",
        role: "Grand daughter of Jill Clark",
        image: "/testimonials/avatar-4.png", // Update with your image path
        quote: "The contribution section is a great way to build up memeories and add to the page. I have loved adding my own memories and seeing the page grow."
    }
];

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
};

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-end justify-between mb-12">
                    <div className="w-full lg:w-5/12">
                        <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                            Testimonials
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 font-playfair">
                            Loved by <span className="text-blue-600">our customers</span>
                        </h2>
                    </div>
                    <div className="w-full lg:w-2/12 mt-8 lg:mt-0">
                        <div className="relative mx-auto">
                            <div className="inline-flex items-center gap-2 p-2 bg-white rounded-full border">
                                <button className="swiper-button-prev p-2 text-navy-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="swiper-pagination" />
                                <button className="swiper-button-next p-2 text-navy-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Swiper {...swiperOptions} className="testimonials-slider">
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-6 bg-white rounded-lg shadow-lg h-full">
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <div>
                                        <h4 className="font-medium text-gray-900 font-playfair">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600">{testimonial.quote}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="text-center mt-12">
                    <p className="text-blue-900 font-medium font-playfair">
                        Hundreds of happy customers <span className="text-gray-900">have trusted us.</span>
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center px-6 py-3 mt-6 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-playfair"
                    >
                       Start now!
                    </Link> 
                </div>
            </div>
        </section>
    );
}
