import React, { useState } from "react";
import { Check, Calculator } from "lucide-react";
import { PLAN_TYPES, COVER_OPTIONS, AGE_BAND, PLAN_DETAILS, PREMIUM_TABLE, getPremium } from "@/lib/plansData";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const PLANS_HERO = IMAGES.plans;

export default function Plans() {
  const [planType, setPlanType] = useState("Family");
  const [cover, setCover] = useState(5000);

  const premium = getPremium(planType, cover);
  const detail = PLAN_DETAILS.find((p) => p.type === planType);

  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={PLANS_HERO}
        title="Funeral plans & pricing"
        subtitle={`Three simple plans for members aged ${AGE_BAND.min}–${AGE_BAND.max}. Pick your plan and cover amount to see your monthly premium instantly.`}
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Premium calculator */}
          <div className="mt-2 bg-landing-card rounded-2xl border border-landing-line p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-landing-blue text-white flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-landing-navy">Premium calculator</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-landing-navy mb-2">Plan type</label>
                <div className="grid grid-cols-3 gap-2">
                  {PLAN_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setPlanType(t)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        planType === t
                          ? "bg-landing-blue text-white border-landing-blue"
                          : "bg-landing-card text-landing-navy border-landing-line hover:border-landing-mut"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-landing-navy mb-2">Cover amount</label>
                <div className="grid grid-cols-4 gap-2">
                  {COVER_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCover(c)}
                      className={`px-2 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        cover === c
                          ? "bg-landing-blue text-white border-landing-blue"
                          : "bg-landing-card text-landing-navy border-landing-line hover:border-landing-mut"
                      }`}
                    >
                      R{c.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-landing-navy text-center">
              <p className="text-white/70 text-sm">Your monthly premium</p>
              <p className="text-4xl font-extrabold text-white mt-1">
                R {premium}
                <span className="text-lg font-medium text-white/60">/month</span>
              </p>
              <p className="text-white/60 text-sm mt-2">
                {planType} plan · R{cover.toLocaleString()} cover
              </p>
            </div>
          </div>

          {/* Plan cards */}
          <div className="mt-12 grid sm:grid-cols-3 gap-6 items-start">
            {PLAN_DETAILS.map((p) => {
              const featured = p.type === "Family";
              const price = PREMIUM_TABLE[p.type][cover];
              const selected = planType === p.type;
              return (
                <article
                  key={p.type}
                  className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                    featured
                      ? "bg-landing-navy border-landing-navy text-white shadow-[0_20px_50px_-12px_rgba(6,19,48,0.4)] sm:scale-[1.04] sm:-my-2"
                      : selected
                      ? "bg-landing-card border-landing-blue shadow-md"
                      : "bg-landing-card border-landing-line hover:border-landing-blue/40 hover:shadow-[0_14px_30px_-12px_rgba(11,87,208,0.18)]"
                  }`}
                >
                  {featured && (
                    <span className="absolute top-5 right-5 text-[0.62rem] font-bold uppercase tracking-[0.15em] bg-landing-blue text-white px-2.5 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold tracking-tight ${featured ? "text-white" : "text-landing-navy"}`}>
                    {p.type}
                  </h3>
                  <p className={`mt-1 text-sm font-semibold ${featured ? "text-landing-blue" : "text-landing-blue"}`}>
                    {p.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${featured ? "text-white" : "text-landing-navy"}`}>
                      R {price}
                    </span>
                    <span className={`text-sm font-medium ${featured ? "text-white/60" : "text-landing-mut"}`}>/month</span>
                  </div>
                  <p className={`mt-1 text-xs ${featured ? "text-white/50" : "text-landing-mut"}`}>
                    R{cover.toLocaleString()} cover
                  </p>

                  <ul className={`mt-6 space-y-3 flex-1 ${featured ? "text-white/90" : "text-landing-ink"}`}>
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full grid place-items-center ${
                            featured ? "bg-landing-blue text-white" : "bg-landing-blue/10 text-landing-blue"
                          }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setPlanType(p.type)}
                    className={`mt-7 w-full px-5 py-3 rounded-lg font-semibold transition-all ${
                      featured
                        ? "bg-landing-blue text-white hover:opacity-90"
                        : selected
                        ? "bg-landing-navy text-white"
                        : "bg-landing-bg text-landing-navy border border-landing-line hover:border-landing-blue hover:text-landing-blue"
                    }`}
                  >
                    {selected ? "Selected" : `Select ${p.type}`}
                  </button>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-landing-mut">
            Premiums shown are indicative for members aged {AGE_BAND.min}–{AGE_BAND.max}. Final
            premium is confirmed at underwriting. Contact us to get started.
          </p>
        </div>
      </section>
    </div>
  );
}