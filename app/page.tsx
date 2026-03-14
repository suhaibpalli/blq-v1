import HeroSection from "@/components/sections/HeroSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkSection from "@/components/sections/WorkSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full pb-20 overflow-x-hidden">
      <HeroSection />
      <MarqueeSection />
      <IntroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
}
