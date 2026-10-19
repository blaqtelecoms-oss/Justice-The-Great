import React, { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

// 3D tilting testimonial carousel. Hidden entirely until the admin adds real
// Testimonial records (never invents quotes or names).
export default function Testimonials({ copy, testimonials = [] }) {
  const [cur, setCur] = useState(0);
  const reduce = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduce.current || testimonials.length < 2) return;
    const t = setInterval(() => setCur((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length, reduce]);

  if (!testimonials.length) return null;
  const n = testimonials.length;

  return (
    <section className="px-4 py-[clamp(3rem,8vw,6rem)] bg-landing-alt">
      <div className="max-w-[1080px] mx-auto text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
            <InlineItalic text={copy.testimonials_heading} />
          </h2>
        </Reveal>
        <div className="flex items-center justify-center gap-5 mt-10 [perspective:1200px] min-h-[230px]">
          {testimonials.map((t, i) => {
            const d = (i - cur + n) % n;
            const shown = d === 0 || d === 1 || d === n - 1;
            const cls =
              d === 0
                ? "opacity-100"
                : d === 1
                ? "opacity-45 [transform:rotateY(-18deg)_rotateZ(6deg)_scale(0.88)]"
                : "opacity-45 [transform:rotateY(18deg)_rotateZ(-6deg)_scale(0.88)]";
            return (
              <div
                key={i}
                className={`bg-landing-card border border-landing-line rounded-[14px] p-6 w-[min(330px,80vw)] text-left text-[0.9rem] transition-[transform,opacity] duration-700 ${cls} ${
                  d === 0 ? "" : "hidden sm:block"
                }`}
              >
                <span className="text-landing-blue text-[2rem] leading-none">❝</span>
                <q className="block my-2 text-landing-mut before:content-none after:content-none">{t.quote}</q>
                <small className="font-semibold block">{t.name}</small>
                {t.role_city && <small className="block font-normal text-landing-mut">{t.role_city}</small>}
              </div>
            );
          })}
        </div>
        <div className="flex gap-1.5 justify-center mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setCur(i)}
              className={`h-2 rounded-full border-0 transition-all ${
                i === cur ? "w-[26px] bg-landing-blue" : "w-2 bg-landing-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}