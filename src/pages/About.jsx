import React from "react";
import { Target, Compass, Award } from "lucide-react";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const ABOUT_HERO = IMAGES.vision1;

const timeline = [
  { year: "2004", text: "Justice The Great registered with CIPC." },
  { year: "2005", text: "Licensed as a Financial Services Provider (FSP)." },
  { year: "2006", text: "Commenced operation as an authorised FSP, administering funeral schemes." },
];

export default function About() {
  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={ABOUT_HERO}
        title="About Justice The Great"
        subtitle="Never walk alone — a financial services practice built on two decades of trusted family care."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="group relative isolate overflow-hidden p-8 rounded-[20px] bg-landing-card border border-[#e3e8ef] shadow-[0_10px_32px_-18px_rgba(11,31,57,0.24)] flex flex-col items-start transition-all duration-300 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] hover:-translate-y-1.5 hover:border-[#bac9da] hover:shadow-[0_20px_44px_-18px_rgba(11,31,57,0.28)]">
              <span className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-landing-navy/5 -z-10 transition-all duration-400 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] group-hover:scale-150 group-hover:bg-landing-navy/10" />
              <div className="w-12 h-12 rounded-2xl bg-landing-navy text-white flex items-center justify-center transition-all duration-300 group-hover:text-[#77b7ff] group-hover:shadow-[0_8px_20px_-7px_#10284470]">
                <Target className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-landing-navy tracking-tight">Our Vision</h3>
              <p className="mt-3 text-landing-mut leading-relaxed">
                To be the best financial advisory and planning practice serving families in our
                community.
              </p>
            </div>
            <div className="group relative isolate overflow-hidden p-8 rounded-[20px] bg-landing-card border border-[#e3e8ef] shadow-[0_10px_32px_-18px_rgba(11,31,57,0.24)] flex flex-col items-start transition-all duration-300 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] hover:-translate-y-1.5 hover:border-[#bac9da] hover:shadow-[0_20px_44px_-18px_rgba(11,31,57,0.28)]">
              <span className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-landing-navy/5 -z-10 transition-all duration-400 [transition-timing-function:cubic-bezier(0.2,0.9,0.3,1)] group-hover:scale-150 group-hover:bg-landing-navy/10" />
              <div className="w-12 h-12 rounded-2xl bg-landing-navy text-white flex items-center justify-center transition-all duration-300 group-hover:text-[#77b7ff] group-hover:shadow-[0_8px_20px_-7px_#10284470]">
                <Compass className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-landing-navy tracking-tight">Our Mission</h3>
              <p className="mt-3 text-landing-mut leading-relaxed">
                To provide well-balanced financial services to our clients — funeral cover,
                investments and estate planning under one trusted relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-landing-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-landing-navy text-center">Our history</h2>
          <div className="mt-10 space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-landing-blue text-white flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div className="pt-3">
                  <p className="text-lg font-bold text-landing-navy">{t.year}</p>
                  <p className="text-landing-mut mt-1">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-landing-navy">Our team</h2>
          <p className="mt-4 text-landing-mut leading-relaxed">
            Justice The Great is led by Justice Thanjekwayo, an accredited financial planner with
            two decades of experience guiding families across northern KwaZulu-Natal. Our team
            handles every discipline in-house — the same people who write your plan review it each
            year and stand with your family when it is claimed on.
          </p>
        </div>
      </section>
    </div>
  );
}