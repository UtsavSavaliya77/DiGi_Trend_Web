import HeroSection from "@/sections/home/HeroSection";
import LetsTalkSection from "@/sections/home/LetsTalkSection";
import SpiralBrands from "@/sections/home/MarqueeSection";
import OurSupport from "@/sections/home/OurSupportSection";
import AnimatSection from "@/sections/home/AnimatSection";

export const metadata = {
  title: "DiGi Trend | Branding & Digital Growth Agency",
  description:
    "We build brands with strategy, design, marketing and technology. Premium digital growth agency in India.",
};

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden">

      {/* HERO SECTION */}
      <HeroSection />

      {/* MARQUEE SECTION */}
      <div className="w-full bg-white">
        <div className="w-full mx-auto">
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <SpiralBrands />
          </div>
        </div>
      </div>

      {/* Animate Section */}
      <div className="w-full bg-[#061146]">
        <div className="w-full mx-auto">
          <div className="w-full">
            <AnimatSection />
          </div>
        </div>
      </div>

      {/* Let's Talk SECTION */}
      <div className="w-full bg-[#061146]">
        <div className="w-full mx-auto">
          <div className="w-full">
            <LetsTalkSection />
          </div>
        </div>
      </div>

      {/* Our Support SECTION */}
      <div className="w-full bg-white">
        <div className="w-full mx-auto">
          <div className="w-full">
            <OurSupport />
          </div>
        </div>
      </div>

      
    </main>

    
  );
}