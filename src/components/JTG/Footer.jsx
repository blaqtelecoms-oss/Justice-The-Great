import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LOGO_URL, DEFAULT_COPY } from "@/lib/landingData";
import { InlineItalic } from "@/components/JTG/landing/Headline";

const FSP_NUMBER = "[FSP Number — pending]";

export default function Footer() {
  const [copy, setCopy] = useState(DEFAULT_COPY);

  useEffect(() => {
    (async () => {
      try {
        const recs = await base44.entities.SectionCopy.list();
        const m = { ...DEFAULT_COPY };
        recs.forEach((r) => {
          if (r.key) m[r.key] = r.value;
        });
        setCopy(m);
      } catch {
        /* keep defaults */
      }
    })();
  }, []);

  const ticker = Array(8).fill("Get Involved •").join(" ");

  return (
    <footer className="mx-3.5 sm:mx-4 mb-3.5 sm:mb-4 rounded-[26px] bg-landing-navy text-white overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-6 items-center max-w-[1080px] mx-auto px-5 pt-[clamp(2rem,5vw,4rem)]">
        <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)] font-normal tracking-tight leading-[1.1]">
          <InlineItalic text={copy.cta_heading} />
        </h2>
        <div className="jtg-mask-fade overflow-hidden border border-white/20 rounded-full py-3">
          <div className="jtg-marquee gap-6 text-[1.5rem] font-medium whitespace-nowrap">
            <span>{ticker}</span>
            <span>{ticker}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 mt-12 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[0.85rem] text-[#b3bdd8]">
        <div>
          <img src={LOGO_URL} alt="Justice The Great" className="w-11 rounded-full mb-2" />
          <p>
            {copy.footer_tagline}
            <br />
            Licensed Financial Services Provider.
          </p>
        </div>
        <div>
          <h3 className="text-white text-[0.85rem] mb-2">Quick Links</h3>
          <Link to="/about" className="block mb-1 hover:text-white">About Us</Link>
          <Link to="/services" className="block mb-1 hover:text-white">What We Do</Link>
          <Link to="/plans" className="block mb-1 hover:text-white">Funeral Plans</Link>
          <Link to="/faq" className="block mb-1 hover:text-white">FAQs</Link>
          <Link to="/contact" className="block mb-1 hover:text-white">Contact</Link>
          <Link to="/complaints" className="block mb-1 hover:text-white">Complaints</Link>
        </div>
        <div>
          <h3 className="text-white text-[0.85rem] mb-2">Contact</h3>
          <a href={`mailto:${copy.contact_email}`} className="block mb-1 hover:text-white">
            {copy.contact_email}
          </a>
          <span className="block mb-1">{copy.contact_phone}</span>
          <span className="block">{copy.contact_address}</span>
          <div className="mt-3 space-y-1">
            <Link to="/login" className="block hover:text-white">Member login</Link>
            <Link to="/admin" className="block hover:text-white">Admin</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 pb-2 text-[0.72rem] text-[#7f8aa8] space-y-1">
        <p className="font-semibold text-[#cfd6ea]">FSP License: {FSP_NUMBER}</p>
        <p>Registered with CIPC (2004) · Licensed FSP (2005) · Photos: Pexels</p>
      </div>
      <div className="text-center text-[0.72rem] text-[#7f8aa8] py-4 border-t border-white/10">
        © {new Date().getFullYear()} Justice The Great. Walk Not Alone. All rights reserved.
      </div>
    </footer>
  );
}