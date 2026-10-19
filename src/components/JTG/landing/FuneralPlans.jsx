import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { IMAGES } from "@/lib/landingData";
import { PLAN_DETAILS } from "@/lib/plansData";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

export default function FuneralPlans({ copy, plans = [] }) {
  const list = plans.length
    ? plans
    : PLAN_DETAILS.map((p) => ({
        name: p.type,
        tagline: p.tagline,
        blurb: p.blurb,
        benefits: p.includes,
        photo_url: IMAGES.plans,
      }));

  const [tab, setTab] = useState(0);
  const [swapKey, setSwapKey] = useState(0);
  const active = list[Math.min(tab, list.length - 1)];

  useEffect(() => {
    setSwapKey((k) => k + 1);
  }, [tab]);

  if (!active) return null;

  return (
    <section id="programs" className="px-4 py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1080px] mx-auto text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
            <InlineItalic text={copy.plans_heading} />
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-landing-mut max-w-[560px] mx-auto mt-4 text-[0.95rem]">{copy.plans_body}</p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {list.map((p, idx) => (
            <button
              key={p.name + idx}
              onClick={() => setTab(idx)}
              aria-selected={tab === idx}
              role="tab"
              className={`border rounded-full px-4 py-2 text-[0.82rem] font-medium transition ${
                tab === idx
                  ? "bg-landing-blue text-white border-landing-blue"
                  : "bg-landing-card text-landing-ink border-landing-line"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] rounded-[20px] overflow-hidden bg-landing-navy text-left min-h-[380px]">
            <div
              key={`l-${swapKey}`}
              className="jtg-tab-swap relative p-8 flex flex-col justify-end gap-4"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 70% 30%, #0b57d0aa, transparent 60%), linear-gradient(135deg, #0b3a8f, #061330)",
              }}
            >
              <img
                src={active.photo_url || IMAGES.plans}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <h3 className="relative text-[2.3rem] font-normal text-white">{active.name}</h3>
              <Link
                to="/plans"
                className="relative self-start inline-flex items-center gap-2 bg-white text-landing-navy rounded-full px-5 py-3 text-[0.9rem] font-medium hover:-translate-y-0.5 transition"
              >
                Ask About This Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div key={`r-${swapKey}`} className="jtg-tab-swap p-8 bg-[#07102a]">
              <h3 className="text-[1.1rem] font-medium text-white mb-2">{active.name}</h3>
              {active.tagline && <p className="text-[0.8rem] text-[#aab5d2] mb-3">{active.tagline}</p>}
              {active.blurb && <p className="text-[0.8rem] text-[#aab5d2] mb-4">{active.blurb}</p>}
              <ul className="space-y-4">
                {(active.benefits || []).map((b, i) => (
                  <li key={i} className="relative pl-7 text-[0.85rem] text-white/90">
                    <span className="absolute left-0 top-0 w-[1.2rem] h-[1.2rem] border border-white/40 rounded-full grid place-items-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}