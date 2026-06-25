"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


import logo1 from "../../../public/images/2.svg";
import logo2 from "../../../public/images/2.svg";
import logo3 from "../../../public/images/3.svg";
import logo4 from "../../../public/images/4.svg";
import logo5 from "../../../public/images/5.svg";
import logo6 from "../../../public/images/6.svg";
import logo7 from "../../../public/images/7.svg";
import logo8 from "../../../public/images/8.svg";
import logo9 from "../../../public/images/9.svg";
import logo10 from "../../../public/images/10.svg";

type ResponsiveDimensions = {
  cardW: number;
  cardH: number;
  amplitude: number;
  wavelength: number;
  stepX: number;
};

type SpiralBrandsProps = {
  id?: string;
};

type BrandCardProps = {
  logo: StaticImageData;
  index: number;
  dims: ResponsiveDimensions;
};

type StretchValues = {
  x: number;
  y: number;
};

const marqueeLogos: StaticImageData[] = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
];

const SPEED = 1;
const MAX_X_STRETCH = 1.35;
const MAX_Y_STRETCH = 1.9;
const DEFAULT_SCREEN_WIDTH = 1200;

function getResponsiveDims(width: number): ResponsiveDimensions {
  if (width < 480) {
    return {
      cardW: 82,
      cardH: 46,
      amplitude: 12,
      wavelength: 340,
      stepX: 98,
    };
  }

  if (width < 640) {
    return {
      cardW: 96,
      cardH: 50,
      amplitude: 16,
      wavelength: 400,
      stepX: 114,
    };
  }

  if (width < 1024) {
    return {
      cardW: 120,
      cardH: 60,
      amplitude: 24,
      wavelength: 520,
      stepX: 148,
    };
  }

  return {
    cardW: 140,
    cardH: 70,
    amplitude: 40,
    wavelength: 700,
    stepX: 150,
  };
}

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export default function SpiralBrands({
  id = "our-sector",
}: SpiralBrandsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const offsetRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const stretchRef = useRef<StretchValues>({
    x: 1,
    y: 1,
  });

  const zoomRef = useRef<number>(1.18);

  /*
   * Avoid window.innerWidth during server rendering.
   * Responsive dimensions are updated after mounting.
   */
  const [dims, setDims] = useState<ResponsiveDimensions>(() =>
    getResponsiveDims(DEFAULT_SCREEN_WIDTH)
  );

  const repeatedLogos = useMemo<StaticImageData[]>(
    () => [
      ...marqueeLogos,
      ...marqueeLogos,
      ...marqueeLogos,
    ],
    []
  );

  /*
   * Update responsive dimensions when the browser
   * window changes size.
   */
  useEffect(() => {
    const updateDimensions = (): void => {
      setDims(getResponsiveDims(window.innerWidth));
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  /*
   * Pause expensive item calculations when the section
   * is outside the visible viewport.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Change horizontal stretch, vertical stretch and zoom
   * according to the section scroll position.
   */
  useEffect(() => {
    const handleScroll = (): void => {
      const container = containerRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();

      const progress = clamp(
        (window.innerHeight - rect.top) /
          (window.innerHeight + rect.height),
        0,
        1
      );

      stretchRef.current = {
        x: 1 + progress * (MAX_X_STRETCH - 1),
        y: 1 + progress * (MAX_Y_STRETCH - 1),
      };

      zoomRef.current = 1.18 - progress * 0.24;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Main wave marquee animation.
   */
  useEffect(() => {
    const totalItems = repeatedLogos.length;
    const totalWidth = totalItems * dims.stepX;

    const centerY =
      (dims.cardH +
        dims.amplitude * 2 * MAX_Y_STRETCH +
        24) /
      2;

    lastFrameTimeRef.current = null;

    const animate = (currentTime: number): void => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = currentTime;
      }

      const elapsed = Math.min(
        currentTime - lastFrameTimeRef.current,
        40
      );

      lastFrameTimeRef.current = currentTime;

      /*
       * Keep movement speed consistent across displays
       * with different refresh rates.
       */
      const frameMultiplier = elapsed / 16.67;

      if (isVisibleRef.current) {
        offsetRef.current += SPEED * frameMultiplier;

        const container = containerRef.current;

        if (container) {
          const items =
            container.querySelectorAll<HTMLDivElement>(
              ".sarpakar-item"
            );

          const horizontalStretch = stretchRef.current.x;
          const verticalStretch = stretchRef.current.y;

          const wave =
            dims.wavelength * horizontalStretch;

          const amplitude =
            dims.amplitude * verticalStretch;

          items.forEach((node) => {
            const index = Number(
              node.dataset.index ?? "0"
            );

            let x =
              index * dims.stepX - offsetRef.current;

            while (x < -dims.stepX) {
              x += totalWidth;
            }

            while (
              x >=
              totalWidth - dims.stepX
            ) {
              x -= totalWidth;
            }

            const radians =
              (x / wave) * Math.PI * 2;

            const y =
              centerY +
              Math.sin(radians) * amplitude;

            const slope =
              (Math.cos(radians) *
                amplitude *
                Math.PI *
                2) /
              wave;

            const rotation =
              Math.atan(slope) * (180 / Math.PI);

            node.style.transform = `
              translate3d(
                ${x}px,
                ${y - dims.cardH / 2}px,
                0
              )
              rotate(${rotation}deg)
            `;
          });

          if (trackRef.current) {
            trackRef.current.style.transform =
              `scale(${zoomRef.current})`;
          }
        }
      }

      rafRef.current =
        window.requestAnimationFrame(animate);
    };

    rafRef.current =
      window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(
          rafRef.current
        );
      }

      rafRef.current = null;
      lastFrameTimeRef.current = null;
    };
  }, [
    dims.cardH,
    dims.amplitude,
    dims.stepX,
    dims.wavelength,
    repeatedLogos.length,
  ]);

  const containerHeight =
    dims.cardH +
    dims.amplitude * 2 * MAX_Y_STRETCH +
    24;

  return (
    <section
      id={id}
      className="marquee-section-inner"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Dotted background */}
      <div
        className="marquee-back"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            radial-gradient(
              circle,
              #e8e1d5 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle,
              #e8e1d5 1.5px,
              transparent 1.5px
            )
          `,
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Section heading */}
      <div
        className="sector-heading-wrap"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <p className={`${syne.className} text-[30px] md:text-[50px] tracking-[0.2em] uppercase text-[#061146]`}>Our Sector</p>
      </div>

      {/* Spiral marquee */}
      <div
        ref={containerRef}
        className="spiral-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: `${containerHeight}px`,
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          className="spiral-track"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {repeatedLogos.map((logo, index) => (
            <BrandCard
              key={`sector-logo-${index}`}
              logo={logo}
              index={index}
              dims={dims}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCard({
  logo,
  index,
  dims,
}: BrandCardProps) {
  const originalLogoIndex =
    (index % marqueeLogos.length) + 1;

  return (
    <div
      className="sarpakar-item brand-card"
      data-index={index}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${dims.cardW}px`,
        height: `${dims.cardH}px`,
        borderRadius: `${dims.cardH}px`,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        willChange: "transform",
      }}
    >
      <Image
        src={logo}
        alt={`Sector brand ${originalLogoIndex}`}
        width={dims.cardW}
        height={dims.cardH}
        className="brand-image"
        sizes={`${dims.cardW}px`}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}