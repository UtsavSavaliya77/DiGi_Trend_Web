"use client";

import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // FULL WIDTH MODE AFTER SCROLL
      setIsScrolled(scrollY > 20);

      // Hide navbar after hero section
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setShow(rect.bottom > 80); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
          show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isScrolled ? "bg-transparent" : "bg-white"}`}
      >
        <div
          className={`flex justify-center transition-all duration-500 ${
            isScrolled ? "bg-white" : "bg-transparent py-2 sm:py-3"
          }`}
        >
          {/* NAV CONTAINER */}
          <div
            className={`flex items-center justify-between w-full transition-all duration-500 bg-white ${
              isScrolled
                ? "max-w-full rounded-none px-8 py-3 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
                : "max-w-[1200px] rounded-full px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-xl shadow-lg border border-gray-100"
            }`}
          >
            {/* ================= LOGO ================= */}
            <div className="flex items-center">
              <Image
                src="/logo/DiGi Logo.png"
                alt="DiGi Trend"
                width={70}
                height={45}
                className="object-contain w-auto h-14 md:h-18"
                priority
              />
            </div>

            {/* ================= DESKTOP MENU ================= */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-800">
              <a href="/" className="hover:text-black transition">Home</a>
              <a href="/services" className="hover:text-black transition">Services</a>
              <a href="/portfolio" className="hover:text-black transition">Work</a>
              <a href="/about" className="hover:text-black transition">About Us</a>
              <a href="/blog" className="hover:text-black transition">Blog</a>
              <a href="/contact" className="hover:text-black transition">Contact Us</a>
            </nav>

            {/* ================= CTA ================= */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <a
                href="/book-demo"
                className="bg-[#061146] px-3 py-1.5 sm:px-4 sm:py-2 border border-[#061146] rounded-full text-white text-sm font-medium hover:bg-white hover:text-[#061146] transition"
              >
                Book Free Consultation
              </a>

              <a
                href="https://wa.me/919558359356"
                target="_blank"
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#EB0A1C] hover:bg-[#EB0A1C] rounded-full text-xs sm:text-sm hover:text-white text-[#EB0A1C] transition"
              >
                WhatsApp
              </a>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-2xl"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {open && show && (
        <div className="fixed top-20 md:top-28 w-[100%] bg-white shadow-xl p-5 z-[9999] lg:hidden">
          <div className="flex flex-col gap-4 text-gray-800">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/portfolio">Work</a>
            <a href="/about">About Us</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact Us</a>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="/book-demo"
                className="text-center bg-[#061146] text-white py-2 rounded-full"
              >
                Book Free Consultation
              </a>

              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                className="text-center border py-2 rounded-full"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}