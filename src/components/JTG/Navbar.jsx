import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { LOGO_URL } from "@/lib/landingData";

const links = [
  { label: "About Us", to: "/about" },
  { label: "What We Do", to: "/services" },
  { label: "Funeral Plans", to: "/plans" },
  { label: "FAQs", to: "/faq" },
  { label: "Apply", to: "/apply" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="jtg-nav-drop -translate-x-1/2 fixed top-2 left-1/2 z-50 w-[min(960px,92vw)] flex items-center justify-between gap-3 bg-landing-bg/90 backdrop-blur-md rounded-full pl-2.5 pr-1 py-1 lg:top-3.5 lg:gap-4 lg:pl-3 lg:pr-1.5 lg:py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.13)] text-landing-ink">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <img src={LOGO_URL} alt="Justice The Great" className="w-6 h-6 rounded-full object-cover lg:w-7 lg:h-7" />
          <span className="text-xs lg:text-sm">Justice The Great</span>
        </Link>
        <ul className="hidden lg:flex gap-7 list-none m-0 p-0 text-[0.85rem] font-medium">
          {links.map((l) => (
            <li key={l.label}>
              <Link to={l.to} className="relative hover:text-landing-blue transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden lg:inline text-[0.85rem] font-medium text-landing-ink hover:text-landing-blue transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center bg-landing-blue text-white rounded-full px-3 py-1.5 text-[0.72rem] lg:px-4 lg:py-2 lg:text-[0.85rem] font-medium hover:-translate-y-0.5 transition"
          >
            Get Involved
          </Link>
          <button
            className="lg:hidden p-1.5 text-landing-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed top-[2.75rem] left-1/2 -translate-x-1/2 z-50 w-[min(960px,92vw)] bg-landing-bg rounded-2xl shadow-lg p-2.5 lg:hidden">
          <div className="flex flex-col gap-0.5">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-[0.82rem] font-medium hover:bg-landing-alt rounded-lg"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-[0.82rem] font-medium hover:bg-landing-alt rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}