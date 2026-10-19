import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HERO_SLIDES } from "@/lib/landingData";
import Headline from "./Headline";

export default function HeroSlideshow() {
  const [i, setI] = useState(0);
  const reduce = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduce.current) return;
    const t = setTimeout(() => setI((p) => (p + 1) % HERO_SLIDES.length), 6500);
    return () => clearTimeout(t);
  }, [i]);

  const slide = HERO_SLIDES[i];

  return (
    <header
      data-t={i}
      className="relative mx-3.5 sm:mx-4 rounded-[26px] overflow-hidden min-h-[70vh] lg:min-h-[min(92vh,780px)] flex items-end bg-landing-navy text-white isolate"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={slide.image}
          alt=""
          className="w-full h-full object-cover"
          loading={i === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-landing-navy/40 to-landing-navy" />
      </div>

      <i className="jtg-glow b1 absolute rounded-full blur-[70px] opacity-75 -z-10 w-[560px] h-[560px] bg-landing-blue -top-40 -left-20" />
      <i
        className="jtg-glow b2 absolute rounded-full blur-[70px] opacity-75 -z-10 w-[480px] h-[480px] right-[-100px] top-[10%]"
        style={{ animationDelay: "-5s", background: "#16a5e6" }}
      />
      <i
        className="jtg-glow b3 absolute rounded-full blur-[70px] opacity-75 -z-10 w-[420px] h-[420px] bg-[#3b2cc9] -bottom-[200px] left-[35%]"
        style={{ animationDelay: "-9s" }}
      />

      <div key={i} className="relative p-[clamp(1.2rem,4vw,3.4rem)] max-w-[760px] pb-16 min-h-[240px] lg:pb-[5.4rem] lg:min-h-[340px]">
        <h1 className="text-[clamp(2.2rem,5.4vw,4.1rem)] font-normal tracking-tight leading-[1.1]">
          <Headline text={slide.headline} />
        </h1>
        <p
          className="jtg-fade-in mt-4 max-w-[460px] text-[#d6def0] text-[0.95rem]"
          style={{ animationDelay: "0.9s" }}
        >
          {slide.body}
        </p>
        <Link
          to={slide.link}
          className="jtg-fade-in inline-flex items-center gap-2 mt-5 bg-landing-blue text-white rounded-full px-5 py-3 text-[0.9rem] font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_24px_#0b57d055] transition"
          style={{ animationDelay: "1.1s" }}
        >
          {slide.cta} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="absolute left-[clamp(1.4rem,4vw,3.4rem)] bottom-4 flex items-center gap-3">
        <div className="flex gap-1">
          {HERO_SLIDES.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Slide ${j + 1}`}
              className="w-[30px] h-1 rounded-full bg-white/30 relative overflow-hidden p-0"
            >
              <span className={`jtg-progress-fill absolute inset-0 bg-white ${j === i ? "on" : ""}`} />
            </button>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="jtg-fade-in hidden sm:flex absolute left-1/2 -translate-x-1/2 bottom-4 flex-col items-center gap-1 text-[#dfe6f7] hover:text-white transition"
        style={{ animationDelay: "1.3s" }}
        aria-label="Scroll down"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

      <div className="hidden sm:block absolute right-[clamp(1rem,6vw,5rem)] bottom-8 w-28 h-28">
        <svg viewBox="0 0 120 120" className="w-full h-full jtg-badge-spin">
          <defs>
            <path id="jtg-circle" d="M60 60m-48 0a48 48 0 1 1 96 0a48 48 0 1 1 -96 0" />
          </defs>
          <text fill="white" className="uppercase" style={{ font: "500 10.5px Inter", letterSpacing: "0.14em" }}>
            <textPath href="#jtg-circle">Walk not alone • Walk not alone •</textPath>
          </text>
        </svg>
        <div className="absolute inset-[26px] rounded-full bg-landing-blue grid place-items-center text-xl">♥</div>
      </div>
    </header>
  );
}