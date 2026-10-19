import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

export default function IntroStatement({ copy }) {
  return (
    <section id="about" className="px-4 pt-0 pb-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1080px] mx-auto text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
            <InlineItalic text={copy.intro_heading} />
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-landing-mut max-w-[560px] mx-auto mt-4 mb-6 text-[0.95rem]">
            {copy.intro_body}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-landing-blue text-white rounded-full px-5 py-3 text-[0.9rem] font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_24px_#0b57d055] transition"
          >
            More About Us <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}