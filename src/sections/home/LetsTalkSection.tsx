"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
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
  FiCheck,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

type FormData = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type SubmitStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

type ContactApiResponse = {
  success: boolean;
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const initialStatus: SubmitStatus = {
  type: "idle",
  message: "",
};

export default function Talk() {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [loading, setLoading] = useState(false);

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>(initialStatus);

  const resetTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const fieldName = event.target.name as keyof FormData;
    const { value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }));

    if (submitStatus.type !== "idle") {
      setSubmitStatus(initialStatus);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setSubmitStatus({
        type: "error",
        message: "Please complete all required fields.",
      });

      return;
    }

    if (message.length < 5) {
      setSubmitStatus({
        type: "error",
        message:
          "Your message must contain at least 5 characters.",
      });

      return;
    }

    setLoading(true);
    setSubmitStatus(initialStatus);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website: formData.website,
        }),
      });

      const data: ContactApiResponse = await response
        .json()
        .catch(() => ({
          success: false,
          message: "Invalid response from the server.",
        }));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your message."
        );
      }

      setFormData(initialFormData);

      setSubmitStatus({
        type: "success",
        message:
          data.message || "Message sent successfully.",
      });

      resetTimerRef.current = setTimeout(() => {
        setSubmitStatus(initialStatus);
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send your message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-white px-3 py-[80px] font-sans sm:px-5"
    >

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative rounded-[24px] border border-blue-900/20 bg-white px-8 py-10 sm:px-7 sm:py-10 md:px-14 md:py-12 border-transparent lg:px-18 lg:py-14 xl:px-22 xl:py-16">
          {/* Custom border for desktop */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="-4 -4 408 753"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EB0A1C" />
                <stop offset="100%" stopColor="#061146" />
              </linearGradient>
            </defs>

            <path
              d="M 0 35 C 0 15 15 0 35 0 L 170 0 C 180 0 188 6 190 15 C 194 28 210 28 214 15 C 216 6 224 0 234 0 L 365 0 C 385 0 400 15 400 35 L 400 250 C 400 259 395 267 387 269 C 376 273 376 287 387 291 C 395 293 400 301 400 310 L 400 500 C 400 509 395 517 387 519 C 376 523 376 537 387 541 C 395 543 400 551 400 560 L 400 710 C 400 730 385 745 365 745 L 255 745 C 245 745 238 739 236 730 C 232 717 216 717 212 730 C 210 739 203 745 193 745 L 35 745 C 15 745 0 730 0 710 L 0 560 C 0 551 5 543 13 541 C 24 537 24 523 13 519 C 5 517 0 509 0 500 L 0 310 C 0 301 5 293 13 291 C 24 287 24 273 13 269 C 5 267 0 259 0 250 L 0 35 Z"
              fill="transparent"
              stroke="url(#borderGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{
                filter: "drop-shadow(1px 30px 30px rgba(0,0,0,0.05))",
              }}
            />
          </svg>

          <div className="relative z-10 grid min-w-0 grid-cols-1 items-center gap-12 md:gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] lg:gap-12 xl:gap-20">
            {/* Left column */}
            <div className="min-w-0">
              <span className="mb-4 inline-flex rounded-full bg-[#EB0A1C]/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#EB0A1C] sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                Contact us
              </span>

              <h2 className={` ${syne.className} text-[clamp(2.25rem,7vw,4rem)] font-black leading-[1.05] tracking-tight text-[#061146]`}>
                Let&apos;s talk
              </h2>

              <p className={` ${inter.className} mt-4 max-w-xl text-sm leading-6 text-[#061146]/70 sm:mt-5 sm:text-base sm:leading-7 `}>
                To request a quote or meet up for coffee,
                contact us directly or fill out the form. We
                will get back to you promptly.
              </p>

              <form
                onSubmit={handleSubmit}
                className="relative mt-8 space-y-5 sm:mt-10 sm:space-y-6"
                aria-busy={loading}
              >
                {/* Honeypot spam field */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor="contact-website">
                    Website
                  </label>

                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className={`${inter.className} mb-2 block text-sm font-bold text-slate-900`}
                  >
                    Your Name
                    <span
                      aria-hidden="true"
                      className="ml-1 text-red-500"
                    >
                      *
                    </span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                    className="min-h-12 w-full rounded-xl border border-[#EB0A1C] bg-white px-4 py-3 text-base text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 hover:border-[#EB0A1C] focus:border-blue-700 focus:ring-4 focus:ring-[#061146]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 sm:min-h-14 sm:rounded-2xl sm:py-3.5"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className={`${inter.className} mb-2 block text-sm font-bold text-slate-900`}
                  >
                    Your Email
                    <span
                      aria-hidden="true"
                      className="ml-1 text-red-500"
                    >
                      *
                    </span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="min-h-12 w-full rounded-xl border border-[#EB0A1C] bg-white px-4 py-3 text-base text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 hover:border-[#EB0A1C] focus:border-blue-700 focus:ring-4 focus:ring-[#061146]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 sm:min-h-14 sm:rounded-2xl sm:py-3.5"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="contact-message"
                      className={`${inter.className} block text-sm font-bold text-slate-900`}
                    >
                      Your Message
                      <span
                        aria-hidden="true"
                        className="ml-1 text-red-500"
                      >
                        *
                      </span>
                    </label>

                    <span className="text-[11px] text-slate-400 sm:text-xs">
                      {formData.message.length}/5000
                    </span>
                  </div>

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    minLength={5}
                    maxLength={5000}
                    required
                    rows={5}
                    className="min-h-32 w-full resize-y rounded-xl border border-[#EB0A1C] bg-white px-4 py-3 text-base text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 hover:border-[#EB0A1C] focus:border-blue-700 focus:ring-4 focus:ring-[#061146]/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 sm:min-h-36 sm:rounded-2xl sm:py-3.5"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex min-h-13 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-slate-200 px-5 py-3.5 text-sm font-bold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.22)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:min-h-14 sm:w-auto sm:rounded-2xl sm:px-7 sm:py-4 sm:text-base"
                >
                  {!loading && (
                    <span className="pointer-events-none absolute inset-[-150%] bg-[conic-gradient(transparent_55%,#EB0A1C_75%,transparent_95%)] opacity-0 transition-opacity duration-300 group-hover:animate-spin group-hover:opacity-100" />
                  )}

                  <span className="absolute inset-[2px] rounded-[10px] bg-gradient-to-b from-slate-50 to-slate-200 sm:rounded-[14px]" />

                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    {loading ? (
                      <>
                        <FiLoader
                          className={`${inter.className} animate-spin text-xl text-blue-800`}
                          aria-hidden="true"
                        />
                        <span>Sending...</span>
                      </>
                    ) : submitStatus.type ===
                      "success" ? (
                      <>
                        <FiCheck
                          className="text-xl text-emerald-600"
                          aria-hidden="true"
                        />
                        <span className={` ${inter.className} text-emerald-700`}>
                          Message Sent
                        </span>
                      </>
                    ) : (
                      <>
                        <FiSend
                          className="text-xl transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 group-hover:text-[#EB0A1C]"
                          aria-hidden="true"
                        />
                        <span className={` ${inter.className} group-hover:text-[#EB0A1C]`}>Send Message</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Form response */}
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="min-h-6"
                >
                  {submitStatus.message && (
                    <div
                      role={
                        submitStatus.type === "error"
                          ? "alert"
                          : "status"
                      }
                      className={`flex items-start gap-3 rounded-xl border px-3 py-3 text-sm font-medium sm:px-4 ${submitStatus.type === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                      {submitStatus.type === "success" ? (
                        <FiCheck className="mt-0.5 shrink-0 text-lg" />
                      ) : (
                        <span className={` ${inter.className} flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold`}>
                          !
                        </span>
                      )}

                      <p className={` ${inter.className} min-w-0 break-words`}>
                        {submitStatus.message}
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right column */}
            <div className="flex min-w-0 flex-col items-center lg:items-start">
              {/* Responsive illustration */}
              <div
                className="relative aspect-[320/230] w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[300px] xl:max-w-[340px]"
                aria-hidden="true"
              >
                <div className="absolute left-1/2 top-1/2 h-[62%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl" />

                {/* Top pill */}
                <div className="animate-drift-one absolute left-[11%] top-[9%] h-[14%] w-[30%] rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]" />

                {/* Back card */}
                <div className="animate-drift-two absolute left-[18%] top-[28%] h-[49%] w-[45%] rounded-[14px] border border-white/60 bg-white/55 shadow-[0_16px_35px_rgba(0,0,0,0.09)] backdrop-blur-xl sm:rounded-2xl" />

                {/* Paper */}
                <div className="animate-paper absolute left-[51%] top-[16%] z-10 h-[36%] w-[20%] rotate-[5deg] rounded-sm border-2 border-slate-900 bg-white shadow-lg">
                  <span className="absolute left-[20%] top-[20%] h-1 w-[58%] rounded-full bg-slate-200" />
                  <span className="absolute left-[20%] top-[40%] h-1 w-[45%] rounded-full bg-slate-200" />
                  <span className="absolute left-[20%] top-[60%] h-1 w-[62%] rounded-full bg-slate-200" />
                </div>

                {/* Envelope */}
                <div className="animate-drift-three absolute left-[30%] top-[46%] z-20 flex h-[18%] w-[18%] items-center justify-center overflow-hidden rounded-md border-[3px] border-slate-950 bg-white sm:rounded-lg sm:border-4">
                  <span className="absolute -top-[60%] h-[110%] w-[80%] rotate-45 border-b-[3px] border-r-[3px] border-slate-950 bg-white sm:border-b-4 sm:border-r-4" />
                </div>

                {/* Send arrow */}
                <div className="animate-drift-four absolute left-[71%] top-[17%] z-20">
                  <FiSend className="-rotate-[8deg] text-[clamp(2rem,9vw,3rem)] text-slate-950" />
                </div>

                <div className="animate-drift-five absolute left-[68%] top-[32%] h-1 w-[13%] -rotate-[8deg] rounded-full bg-white" />
              </div>

              {/* Contact details */}
              <div className="mt-5 w-full max-w-md space-y-4 sm:mt-7 sm:space-y-5">
                <div className="group flex min-w-0 items-start gap-3 sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#061146] transition duration-300 group-hover:bg-[#061146] group-hover:text-white sm:h-11 sm:w-11">
                    <FiMapPin className="text-lg sm:text-xl" />
                  </span>

                  <p className={`${inter.className} min-w-0 pt-0.5 text-sm leading-6 text-slate-700 sm:pt-1 sm:text-base`}>
                    151 New Park Ave, Hartford, CT 06106
                    <br />
                    United States
                  </p>
                </div>

                <div className="group flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#061146] transition duration-300 group-hover:bg-[#061146] group-hover:text-white sm:h-11 sm:w-11">
                    <FiPhone className="text-lg sm:text-xl" />
                  </span>

                  <a
                    href="tel:+12033029545"
                    className={`${inter.className} min-w-0 text-sm font-medium text-slate-700 transition hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-base`}
                  >
                    +1 (203) 302-9545
                  </a>
                </div>

                <div className="group flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#061146] transition duration-300 group-hover:bg-[#061146] group-hover:text-white sm:h-11 sm:w-11">
                    <FiMail className="text-lg sm:text-xl" />
                  </span>

                  <a
                    href="mailto:contactus@inveritasoft.com"
                    className={`${inter.className} min-w-0 break-all text-sm font-medium text-slate-700 transition hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-base`}
                  >
                    contactus@inveritasoft.com
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 mb-2 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#1877f2] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 sm:h-11 sm:w-11"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our X page"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:h-11 sm:w-11"
                >
                  <FaXTwitter />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram page"
                  className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-100 sm:h-11 sm:w-11"
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <FaInstagram className="relative z-10" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-drift-one {
          animation: driftOne 3.5s ease-in-out infinite;
        }

        .animate-drift-two {
          animation: driftTwo 4.2s ease-in-out infinite;
        }

        .animate-drift-three {
          animation: driftThree 3.8s ease-in-out infinite;
        }

        .animate-drift-four {
          animation: driftFour 3.2s ease-in-out infinite;
        }

        .animate-drift-five {
          animation: driftFive 3.2s ease-in-out infinite;
        }

        .animate-paper {
          animation: paperFloat 4s ease-in-out infinite;
        }

        @keyframes driftOne {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(3px, -5px);
          }
        }

        @keyframes driftTwo {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-3px, 4px);
          }
        }

        @keyframes driftThree {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }

          50% {
            transform: translate(2px, -4px)
              rotate(-2deg);
          }
        }

        @keyframes driftFour {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(4px, -4px);
          }
        }

        @keyframes driftFive {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(4px, -4px);
          }
        }

        @keyframes paperFloat {
          0%,
          100% {
            transform: rotate(5deg) translate(0, 0);
          }

          50% {
            transform: rotate(8deg)
              translate(3px, -6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-one,
          .animate-drift-two,
          .animate-drift-three,
          .animate-drift-four,
          .animate-drift-five,
          .animate-paper {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}