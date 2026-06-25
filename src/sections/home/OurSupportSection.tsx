"use client";

import { useState } from "react";
import { Syne, Inter } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function OurSupport() {
  const [active, setActive] = useState<boolean>(false);

  const handleToggle = (): void => {
    setActive((previousState) => !previousState);
  };

  return (
    <section className="relative isolate flex w-full items-center justify-center overflow-hidden bg-white px-4 py-[80px] font-sans text-[#171923] sm:px-6 lg:px-8">
      {/* Background vertical lines */}
      <div
        className="pointer-events-none absolute inset-0 grid grid-cols-6"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="border-l border-[#171923]/[0.07]"
          />
        ))}
      </div>

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-[120px] sm:h-[560px] sm:w-[560px]"
      />

      {/* Floating decorative bars */}
      <span
        aria-hidden="true"
        className="support-float absolute left-[8%] top-[42%] hidden h-8 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 sm:block lg:left-[14%]"
      />

      <span
        aria-hidden="true"
        className="support-float support-delay-one absolute right-[8%] top-[30%] hidden h-6 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 sm:block lg:right-[16%]"
      />

      <span
        aria-hidden="true"
        className="support-float support-delay-two absolute bottom-[28%] left-[15%] hidden h-10 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 md:block lg:left-[24%]"
      />
       <span
        aria-hidden="true"
        className="support-float support-delay-two absolute bottom-[18%] left-[5%] hidden h-10 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 md:block lg:left-[4%]"
      /> 
      <span
        aria-hidden="true"
        className="support-float support-delay-two absolute bottom-[8%] left-[25%] hidden h-10 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 md:block lg:left-[44%]"
      />
       <span
        aria-hidden="true"
        className="support-float support-delay-two absolute right-[28%] bottom-[15%] hidden h-10 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 md:block lg:right-[24%]"
      />

      <span
        aria-hidden="true"
        className="support-float support-delay-two absolute right-[18%] bottom-[45%] hidden h-10 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 to-orange-400/20 md:block lg:right-[14%]"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-[1000px] text-center">
        {/* Small heading */}
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-[#EB0A1C] sm:mb-5 sm:text-xs sm:tracking-[0.14em]">
          Consulting, Programming &amp; Design
        </p>

        {/* Main heading */}
        <div className="flex justify-center">
          <h1 className="m-0 font-extrabold leading-[0.92] tracking-[-0.045em]">
            {/* Top heading */}
            <span className={`${syne.className} mb-2 flex items-center justify-center gap-2 text-[clamp(2.1rem,7vw,4.15rem)] leading-none sm:gap-3 md:gap-4`}>
              <span>We support</span>

              <span
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-medium text-white shadow-[0_12px_30px_rgba(100,104,255,0.24)] sm:h-11 sm:w-11 sm:text-xl md:h-12 md:w-12 md:text-2xl ${
                active ? "bg-[#EB0A1C]" : "bg-[#061146]"
              }`}
              >
                ↗
              </span>
            </span>

            {/* Growth heading */}
            <span
              className={`${syne.className} block whitespace-nowrap text-[clamp(4rem,15vw,9.25rem)] transition-colors duration-500 ${
                active ? "text-[#EB0A1C]" : "text-[#061146]"
              }`}
            >
              gr
              <button
                type="button"
                onClick={handleToggle}
                aria-pressed={active}
                aria-label={
                  active
                    ? "Disable growth mode"
                    : "Enable growth mode"
                }
                className="group relative mx-[0.03em] inline-flex cursor-pointer items-center border-0 bg-transparent p-0 align-middle outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                <span
                  className={`relative inline-block h-[0.4em] w-[1em] overflow-hidden rounded-full p-[0.03em] shadow-[inset_0_0_0_3px_rgba(255,255,255,0.5),0_6px_16px_rgba(106,99,255,0.2)] transition-all duration-300 ${
                    active
                      ? "bg-[#EB0A1C]"
                      : "bg-[#061146]"
                  }`}
                >
                  {/* Toggle inner light */}
                  <span className="pointer-events-none absolute inset-[10%] rounded-full bg-white/50" />

                  {/* Toggle knob */}
                  <span
                    className={`absolute top-1/2 h-[calc(0.4em-0.04em)] w-[calc(0.4em-0.04em)] -translate-y-1/2 rounded-full bg-[#e5e5e5] shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300 ${
                      active
                        ? "left-[calc(100%-(0.4em-0.04em)-4px)]"
                        : "left-1"
                    }`}
                  />
                </span>
              </button>
              wth
            </span>

            {/* Bottom heading */}
            <span className={` ${syne.className} mt-4 flex items-center justify-center gap-1 text-[clamp(1.73rem,6vw,4.5rem)] leading-none sm:mt-5 sm:gap-2 md:mt-6`}>
              <svg
                className="h-[42px] w-[46px] shrink-0 sm:h-[50px] sm:w-[55px] md:h-[60px] md:w-[65px]"
                viewBox="0 0 80 70"
                role="img"
                aria-label="Cursor illustration"
              >
                <path
                  d="M35 5 A28 28 0 1 0 35 61 A28 28 0 1 0 35 5"
                  fill="black"
                />

                <path
                  d="M42 38 L70 48 L60 52 L64 63 L57 66 L53 55 L45 63 Z"
                  fill="#111"
                  stroke="#fff"
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
              </svg>

              <span>of your business</span>
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className={` ${inter.className} mx-auto mt-7 max-w-[560px] px-2 text-sm leading-6 text-[#6a6d76] sm:mt-8 sm:text-[15px] sm:leading-7`}>
          We turn great ideas into working products.
          <br className="hidden sm:block" />
          <span className="sm:ml-1">
            We focus on good communication and understanding your
            business.
          </span>
        </p>

        {/* Actions */}
        <div className={`mt-7 flex flex-col items-center justify-center gap-4 sm:mt-8 sm:flex-row sm:gap-6 ${inter.className}`}>
          <button
            type="button"
            className="w-full rounded-full bg-gradient-to-br from-[#061146] to-[#EB0A1C] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,122,24,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(255,122,24,0.32)] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 sm:w-auto sm:text-base"
          >
            Estimate the project
          </button>

          <a
            href="#about"
            className={`text-sm font-bold text-[#061146] underline decoration-1 underline-offset-4 transition duration-300 hover:text-[#EB0A1C] focus:outline-none focus-visible:rounded focus-visible:ring-4 focus-visible:ring-indigo-200 sm:text-base ${inter.className}`}
          >
            More about us
          </a>
        </div>
      </div>

      {/* Local animations */}
      <style jsx>{`
        .support-float {
          animation: supportFloat 5s ease-in-out infinite;
        }

        .support-delay-one {
          animation-delay: 0.8s;
        }

        .support-delay-two {
          animation-delay: 1.4s;
        }

        @keyframes supportFloat {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }

          50% {
            transform: translateY(-14px);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .support-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}