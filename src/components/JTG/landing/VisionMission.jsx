import React from "react";
import { Link } from "react-router-dom";
import { Eye, Compass, Heart, Users, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/landingData";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

const ICONS = { Eye, Compass, Heart, Users };
const features = [
  { icon: "Eye", title: "Our Vision", copyKey: "vision_vision" },
  { icon: "Compass", title: "Our Mission", copyKey: "vision_mission" },
  { icon: "Heart", title: "Dignity", copyKey: "vision_dignity" },
  { icon: "Users", title: "Community", copyKey: "vision_community" },
];

export default function VisionMission({ copy }) {
  return (
    <section id="how" className="px-4 py-[clamp(3rem,8vw,6rem)] bg-landing-alt">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
              <InlineItalic text={copy.vision_heading} />
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-landing-mut mt-4 text-[0.95rem]">{copy.vision_body}</p>
          </Reveal>
          <Reveal delay={160}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 mt-5 bg-landing-blue text-white rounded-full px-5 py-3 text-[0.9rem] font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_24px_#0b57d055] transition"
            >
              Get Involved <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {features.map((f, idx) => {
              const Icon = ICONS[f.icon];
              return (
                <Reveal key={f.title} delay={idx * 80}>
                  <div
                    className={`group relative isolate overflow-hidden bg-landing-card rounded-[20px] p-6 border border-[#e3e8ef] shadow-[0_10px_32px_-18px_rgba(11,31,57,0.24)] flex flex-col items-start transition-all duration-300 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] hover:-translate-y-1.5 hover:border-[#bac9da] hover:shadow-[0_20px_44px_-18px_rgba(11,31,57,0.28)] ${
                      idx % 2 === 1 ? "sm:mt-8" : ""
                    }`}
                  >
                    <span className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-landing-navy/5 -z-10 transition-all duration-400 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] group-hover:scale-150 group-hover:bg-landing-navy/10" />
                    <div className="w-12 h-12 rounded-2xl bg-landing-navy text-white grid place-items-center transition-all duration-300 group-hover:text-[#77b7ff] group-hover:shadow-[0_8px_20px_-7px_#10284470]">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-5 text-[1.05rem] font-bold text-landing-navy tracking-tight">{f.title}</h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-landing-mut">{copy[f.copyKey]}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="grid gap-4">
          <Reveal>
            <div className="relative rounded-[14px] min-h-[200px] overflow-hidden bg-gradient-to-br from-landing-blue to-landing-navy">
              <img
                src={IMAGES.vision1}
                alt="A family together at home"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative rounded-[14px] min-h-[200px] overflow-hidden bg-gradient-to-br from-landing-blue to-landing-navy sm:w-[70%] sm:justify-self-end">
              <img
                src={IMAGES.vision2}
                alt="A diverse community smiling together"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}