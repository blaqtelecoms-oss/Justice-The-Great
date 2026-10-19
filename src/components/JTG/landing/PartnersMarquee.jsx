import React from "react";
import Reveal from "./Reveal";

// Infinite-scroll marquee of partner names. Hidden entirely until the admin
// adds real Partner records (never invents names).
export default function PartnersMarquee({ partners = [] }) {
  if (!partners.length) return null;
  const items = [...partners, ...partners];
  return (
    <section className="py-[clamp(3rem,8vw,6rem)] px-4">
      <div className="max-w-[1080px] mx-auto text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
            Supported by <span className="font-serif italic">Partners</span> & Allies
          </h2>
        </Reveal>
        <div className="jtg-mask-fade mt-6 overflow-hidden">
          <div className="jtg-marquee gap-10">
            {items.map((p, idx) => (
              <div
                key={idx}
                className="border border-landing-line px-10 py-5 font-semibold text-[1.15rem] whitespace-nowrap text-landing-mut"
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}