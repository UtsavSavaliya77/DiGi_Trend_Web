"use client";
import { Syne, Inter } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import {
    FaGlobe,
    FaBullhorn,
    FaPalette,
    FaVideo,
    FaRobot,
} from "react-icons/fa";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 overflow-hidden px-8 sm:px-8 lg:px-0 pt-0">

            {/* MAIN TEXT */}
            <div className="relative z-10 text-center max-w-lg lg:max-w-2xl">

                <p className="text-[10px] sm:text-xs md:text-sm tracking-widest text-[#EB0A1C] uppercase">
                    Digital Growth Partner
                </p>

                <h1 className={`${syne.className} text-3xl md:text-4xl lg:text-6xl font-bold text-[#061146] mt-4 tracking-[-0.03em] leading-[1.05]`}>
                    We create <span className="text-[#EB0A1C]">brands</span> designed for lasting growth.
                </h1>

                <p className={`${inter.className} mt-5 text-gray-600 text-xs md:text-lg px-2 sm:px-0`}>
                    From websites to marketing and automation, we help businesses attract,
                    engage and convert customers consistently.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7 px-2 mt-18 md:mt-10 ">
                    <a
                        href="/services"
                        className="bg-red-500 text-white px-5 py-3 rounded-full text-sm sm:text-base"
                    >
                        Explore Our Services
                    </a>

                    <a
                        href="/book-demo"
                        className="border border-gray-300 px-5 py-3 text-white bg-[#061146] rounded-full text-sm sm:text-base"
                    >
                        Book Free Consultation
                    </a>
                </div>
            </div>

            {/* ORBIT - HIDDEN ON SMALL SCREENS */}
            <div className=" absolute w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[1100px] lg:h-[1100px] rounded-full border border-black/10 animate-spin-slow -mt-120 md:-mt-20 lg:-mt-130">
                {/* 0° */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaGlobe size={20} className="text-[#EB0A1C]" />
                </div>

                {/* 45° */}
                <div className="absolute top-[13%] md:top-[15%] right-[10%] bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaBullhorn size={20} className="text-[#061146]" />
                </div>

                {/* 90° */}
                <div className="absolute top-1/2 -right-5 -translate-y-1/2 bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaPalette size={20} className="text-[#EB0A1C]" />
                </div>

                {/* 135° */}
                <div className="absolute bottom-[13%] md:bottom-[15%] right-[10%] bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaVideo size={20} className="text-[#061146]" />
                </div>

                {/* 180° */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaRobot size={20} className="text-[#EB0A1C]" />
                </div>

                {/* 225° */}
                <div className="absolute bottom-[13%] md:bottom-[15%] left-[10%] bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaGlobe size={20} className="text-[#061146]" />
                </div>

                {/* 270° */}
                <div className="absolute top-1/2 -left-5 -translate-y-1/2 bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaBullhorn size={20} className="text-[#EB0A1C]" />
                </div>

                {/* 315° */}
                <div className="absolute top-[13%] md:top-[15%] left-[10%] bg-white shadow-lg p-3 rounded-[20%] animate-spin-slow-reverse">
                    <FaPalette size={20} className="text-[#061146]" />
                </div>
            </div>
        </section>
    );
}