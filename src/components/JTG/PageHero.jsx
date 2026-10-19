import React from "react";

export default function PageHero({ image, title, subtitle, align = "left" }) {
  return (
    <header className="mx-3.5 sm:mx-4 mt-20 rounded-[26px] overflow-hidden relative min-h-[260px] sm:min-h-[320px] flex items-end bg-landing-navy text-white isolate">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-landing-navy/55 via-landing-navy/45 to-landing-navy" />
      </div>
      <div
        className={`relative p-[clamp(1.2rem,4vw,3.4rem)] pb-10 sm:pb-12 max-w-[760px] ${
          align === "center" ? "mx-auto text-center" : ""
        }`}
      >
        <h1 className="text-[clamp(1.8rem,4.4vw,3rem)] font-normal tracking-tight leading-[1.12]">
          {title}
        </h1>
        {subtitle && (
          <p className="jtg-fade-in mt-3 max-w-[520px] text-[#d6def0] text-[0.92rem] sm:text-[1rem]">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}