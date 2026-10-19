import React from "react";
import ProgressBar from "@/components/JTG/landing/ProgressBar";
import HeroSlideshow from "@/components/JTG/landing/HeroSlideshow";
import PartnersMarquee from "@/components/JTG/landing/PartnersMarquee";
import IntroStatement from "@/components/JTG/landing/IntroStatement";
import WhatWeDo from "@/components/JTG/landing/WhatWeDo";
import MediaTiles from "@/components/JTG/landing/MediaTiles";
import VisionMission from "@/components/JTG/landing/VisionMission";
import FuneralPlans from "@/components/JTG/landing/FuneralPlans";
import Testimonials from "@/components/JTG/landing/Testimonials";
import FAQ from "@/components/JTG/landing/FAQ";
import { useLandingContent } from "@/components/JTG/landing/useLandingContent";

export default function Home() {
  const { copy, plans, faqs, testimonials, partners } = useLandingContent();

  return (
    <div className="bg-landing-bg overflow-x-hidden">
      <ProgressBar />
      <HeroSlideshow />
      <PartnersMarquee partners={partners} />
      <IntroStatement copy={copy} />
      <WhatWeDo copy={copy} />
      <MediaTiles />
      <VisionMission copy={copy} />
      <FuneralPlans copy={copy} plans={plans} />
      <Testimonials copy={copy} testimonials={testimonials} />
      <FAQ copy={copy} faqs={faqs} />
    </div>
  );
}