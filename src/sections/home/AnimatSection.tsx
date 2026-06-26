"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Search,
    ClipboardList,
    Palette,
    Code2,
    Rocket,
    TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Understand",
        description:
            "We analyze your business goals, competitors and target audience.",
        icon: Search,
    },
    {
        number: "02",
        title: "Plan",
        description:
            "We create a growth roadmap and strategy tailored for your business.",
        icon: ClipboardList,
    },
    {
        number: "03",
        title: "Design",
        description:
            "We craft beautiful visuals, branding and user experiences.",
        icon: Palette,
    },
    {
        number: "04",
        title: "Develop",
        description:
            "We build websites, systems and digital products that perform.",
        icon: Code2,
    },
    {
        number: "05",
        title: "Launch",
        description:
            "We deploy, test and optimize everything for production.",
        icon: Rocket,
    },
    {
        number: "06",
        title: "Grow",
        description:
            "We scale your business with marketing and automation.",
        icon: TrendingUp,
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop
        mm.add("(min-width: 1024px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(".process-card");

            gsap.set(cards, {
                scale: 0.8,
                opacity: 0.5,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${cards.length * 200}`,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            cards.forEach((card, index) => {
                tl.to(
                    card,
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1,
                        ease: "none",
                    },
                    index
                );
            });
        });

        // Mobile + Tablet
        mm.add("(max-width: 1023px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(".process-card");

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        scale: 0.85,
                        y: 100,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            end: "center center",
                            scrub: true,
                        },
                    }
                );
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#050816] py-24 text-white overflow-hidden"
        >
            <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-20 text-center">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
                        OUR SIGNATURE PROCESS
                    </p>

                    <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                        Our Process Is Built
                        <span className="block text-red-500">
                            For Growth
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
                        From understanding your business to scaling your growth,
                        every step is designed to create measurable results.
                    </p>
                </div>

                {/* Process Cards */}
                <div
                    className="
            grid
           grid-cols-1
lg:grid-cols-6
            gap-6
          "
                >
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                               className="
process-card
min-h-[300px]
lg:min-h-auto
transform-gpu
will-change-transform
rounded-3xl
border
border-white/10
bg-white/5
p-6
text-center
backdrop-blur-sm
flex
flex-col
justify-center
"
                            >
                                {/* Number */}
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-500/50 bg-red-500/10 text-2xl font-bold text-red-500">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="mt-6 flex justify-center">
                                    <Icon
                                        size={32}
                                        className="text-red-500"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mt-6 text-xl font-semibold">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-4 text-sm leading-7 text-gray-400">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}