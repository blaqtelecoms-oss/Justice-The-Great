import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WHAT_WE_DO_CARDS, LOGO_URL } from "@/lib/landingData";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

const ICONS = { ShieldCheck, HeartHandshake, Users };

const CAROUSEL_CSS = `
.car-13{max-width:1080px;margin:auto}
.car-13__stage{position:relative;border-radius:26px;overflow:hidden;background:radial-gradient(ellipse at 50% 85%,#0b3a8f66,#0000 60%),#061330;padding:clamp(2rem,5vw,3.4rem) 0 1.4rem;isolation:isolate;outline:none;touch-action:pan-y}
.car-13__stage:after{content:"";position:absolute;inset:auto 0 0;height:45%;background:linear-gradient(#0000,#0b57d022);z-index:-1;pointer-events:none}
.car-13__stage:focus-visible{outline:3px solid #7aa7ff;outline-offset:3px}
.car-13__deck{--w:min(300px,60vw);position:relative;height:calc(var(--w) + 40px);perspective:1400px;transform-style:preserve-3d}
.car-13__cover{--o:calc(var(--i) - var(--c));--a:max(var(--o),calc(var(--o) * -1));--sg:clamp(-1,var(--o),1);position:absolute;left:50%;top:20px;width:var(--w);aspect-ratio:1;margin-left:calc(var(--w) / -2);border-radius:18px;transform:translateX(calc(var(--o) * 44% + var(--sg) * 16%)) translateZ(calc(var(--a) * -90px)) rotateY(calc(var(--sg) * -42deg)) scale(calc(1 - min(var(--a),3) * .06));z-index:calc(10 - var(--a));opacity:calc(1 - var(--a) * .17);filter:brightness(calc(1 - var(--a) * .16));transition:transform .9s cubic-bezier(.2,.8,.2,1),opacity .9s,filter .9s;box-shadow:0 30px 50px -18px #000c;-webkit-box-reflect:below 6px linear-gradient(transparent 72%,#0004)}
.car-13__stage:not(.in) .car-13__cover{transform:translateZ(-200px) scale(.6);opacity:0}
.car-13__face{position:absolute;inset:0;border-radius:inherit;overflow:hidden;padding:1.4rem;display:flex;flex-direction:column;justify-content:space-between;color:#fff;text-align:left;background:var(--g)}
.car-13__face:before{content:"";position:absolute;inset:0;background:var(--logo) 120% 120%/78% no-repeat;opacity:.16;mix-blend-mode:screen;z-index:0;pointer-events:none}
.car-13__img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.car-13__cover:hover .car-13__img{transform:scale(1.07)}
.car-13__ovl{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,transparent 30%,#061330e6 100%);pointer-events:none}
.car-13__face:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,#fff3 0,#fff0 38%);transform:translateX(-120%);transition:transform 1.2s;z-index:3;pointer-events:none}
.car-13__cover:hover .car-13__face:after{transform:none}
.car-13__ic{width:52px;height:52px;border-radius:14px;background:#ffffff1f;border:1px solid #fff3;display:grid;place-items:center;backdrop-filter:blur(6px);color:#fff}
.car-13__ic svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.car-13__num{font:400 .8rem Inter,system-ui,sans-serif;letter-spacing:.14em;opacity:.7}
.car-13__ttl{font-size:1.5rem;font-weight:500;line-height:1.15;position:relative}
.car-13__top{display:flex;justify-content:space-between;align-items:center;position:relative}
.car-13__hit{position:absolute;inset:0;cursor:pointer;border-radius:inherit;background:transparent;border:none;padding:0}
.car-13__cap{color:#fff;text-align:center;padding:1.8rem 1.4rem 0;min-height:128px;position:relative}
.car-13__cap h3{font-size:1.4rem;font-weight:500}
.car-13__cap p{color:#b3bdd8;font-size:.9rem;max-width:460px;margin:.4rem auto 0}
.car-13__sw{animation:car13-sw .7s cubic-bezier(.2,.9,.3,1)}
@keyframes car13-sw{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.car-13__ctl{display:flex;align-items:center;justify-content:center;gap:.9rem;padding-bottom:.4rem}
.car-13__ctl>button{width:40px;height:40px;border-radius:50%;border:1px solid #fff5;background:#ffffff14;color:#fff;cursor:pointer;transition:.3s;display:grid;place-items:center}
.car-13__ctl>button:hover{background:#fff;color:#061330}
.car-13__ctl>button:focus-visible{outline:3px solid #7aa7ff}
.car-13__dots{display:flex;gap:.45rem}
.car-13__dots button{width:9px;height:9px;border-radius:9px;background:#fff4;cursor:pointer;transition:.5s;border:none;padding:0}
.car-13__dots button.on{width:28px;background:#fff}
@media(prefers-reduced-motion:reduce){.car-13__cover,.car-13__img,.car-13__face:after{transition-duration:.01s!important}.car-13__sw{animation-duration:.01s!important}}
`;

export default function WhatWeDo({ copy }) {
  const cards = WHAT_WE_DO_CARDS;
  const n = cards.length;
  const [current, setCurrent] = useState(1);
  const stageRef = useRef(null);
  const hoverRef = useRef(false);
  const x0Ref = useRef(null);

  const go = useCallback(
    (i) => setCurrent((((i - 1) % n) + n) % n + 1),
    [n]
  );

  // Fly-in when the stage scrolls into view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (x.isIntersecting) {
            el.classList.add("in");
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay (paused on hover and under reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const tm = setInterval(() => {
      if (!hoverRef.current) setCurrent((c) => (c % n) + 1);
    }, 4200);
    return () => clearInterval(tm);
  }, [n]);

  const onPointerDown = (e) => {
    x0Ref.current = e.clientX;
  };
  const onPointerUp = (e) => {
    const x0 = x0Ref.current;
    if (x0 !== null && Math.abs(e.clientX - x0) > 40) {
      go(current + (e.clientX < x0 ? 1 : -1));
    }
    x0Ref.current = null;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(current + 1);
    else if (e.key === "ArrowLeft") go(current - 1);
  };

  const active = cards[current - 1];

  return (
    <section id="what" className="px-4 pb-[clamp(3rem,8vw,6rem)]">
      <style>{CAROUSEL_CSS}</style>
      <div className="max-w-[1080px] mx-auto">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
            <InlineItalic text={copy.what_heading} />
          </h2>
          <p className="text-landing-mut max-w-[560px] mx-auto mt-4 text-[0.95rem]">
            {copy.what_body}
          </p>
        </Reveal>

        <Reveal>
          <div className="car-13">
            <div
              ref={stageRef}
              className="car-13__stage"
              tabIndex={0}
              role="group"
              aria-label="What we do carousel"
              onMouseEnter={() => {
                hoverRef.current = true;
              }}
              onMouseLeave={() => {
                hoverRef.current = false;
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onKeyDown={onKeyDown}
            >
              <div className="car-13__deck" style={{ "--c": String(current) }}>
                {cards.map((card, idx) => {
                  const Icon = ICONS[card.icon] || ShieldCheck;
                  const i = idx + 1;
                  return (
                    <figure
                      key={card.title}
                      className="car-13__cover"
                      style={{ "--i": String(i) }}
                    >
                      <div
                        className="car-13__face"
                        style={{
                          "--g": card.gradient,
                          "--logo": `url(${LOGO_URL})`,
                        }}
                      >
                        <img
                          className="car-13__img"
                          src={card.image}
                          alt={card.image_alt}
                          loading="lazy"
                        />
                        <div className="car-13__ovl" />
                        <div className="car-13__top">
                          <div className="car-13__ic">
                            <Icon strokeWidth={1.7} />
                          </div>
                          <span className="car-13__num">
                            {String(i).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="car-13__ttl">{card.title}</div>
                      </div>
                      <button
                        type="button"
                        className="car-13__hit"
                        onClick={() => go(i)}
                        aria-label={`Show ${card.title}`}
                        tabIndex={-1}
                      />
                    </figure>
                  );
                })}
              </div>

              <div className="car-13__cap" aria-live="polite">
                <h3 key={`t-${current}`} className="car-13__sw">
                  {active.title}
                </h3>
                <p key={`d-${current}`} className="car-13__sw">
                  {active.description}
                </p>
              </div>

              <div className="car-13__ctl">
                <button
                  type="button"
                  onClick={() => go(current - 1)}
                  aria-label="Previous discipline"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="car-13__dots">
                  {cards.map((card, idx) => (
                    <button
                      key={card.title}
                      type="button"
                      className={current === idx + 1 ? "on" : ""}
                      onClick={() => go(idx + 1)}
                      aria-label={`Go to ${card.title}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(current + 1)}
                  aria-label="Next discipline"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-landing-blue font-medium text-[0.9rem] hover:gap-3 transition-all"
          >
            View more <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-[0.7rem] text-landing-mut">Photos: Pexels</p>
        </Reveal>
      </div>
    </section>
  );
}