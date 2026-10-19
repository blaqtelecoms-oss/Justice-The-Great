import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { IMAGES } from "@/lib/landingData";
import Reveal from "./Reveal";

export default function MediaTiles() {
  return (
    <section className="px-4 pb-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Reveal>
          <Link
            to="/services"
            className="group relative block rounded-[14px] min-h-[260px] overflow-hidden bg-gradient-to-br from-landing-blue to-landing-navy"
          >
            <img
              src={IMAGES.media1}
              alt="A consultation session with a family"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-[0.98] transition-transform duration-500"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white text-landing-ink rounded-lg px-3 py-1.5 text-[0.75rem] font-medium">
              <Play className="w-3.5 h-3.5" /> Play video
            </span>
            <span className="absolute left-4 bottom-3 text-white/70 text-[0.75rem]">Community in conversation</span>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative block rounded-[14px] min-h-[260px] overflow-hidden bg-gradient-to-br from-landing-blue to-landing-navy">
            <img
              src={IMAGES.media2}
              alt="An African family portrait"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-[0.98] transition-transform duration-500"
            />
            <span className="absolute left-4 bottom-3 text-white/80 text-[0.75rem]">The families we serve</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}