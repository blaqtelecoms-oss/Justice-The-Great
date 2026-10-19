import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { IMAGES } from "@/lib/landingData";
import Reveal from "./Reveal";
import { InlineItalic } from "./Headline";

const DEFAULT_FAQS = [
  {
    q: "What is the waiting period?",
    a: "Most plans have a waiting period for natural death (usually a few months from the policy start date). Accidental death is covered immediately. Your specific waiting period is confirmed in your policy schedule.",
  },
  {
    q: "What's covered under the funeral plans?",
    a: "Cover includes a lump-sum payout on the death of the insured person (accidental and natural), funeral arrangement assistance, and — on family plans — cover for the main member, spouse and dependent children. See your policy schedule for full details.",
  },
  {
    q: "How do claims work?",
    a: "When a loved one passes, log in to your member portal and submit a claim, or contact us directly. Upload the death certificate, ID copies and proof of relationship. We review the claim, keep you updated on its status, and pay out once approved.",
  },
  {
    q: "How do I update my beneficiaries?",
    a: "Go to the Beneficiaries & Dependents page in your member portal and submit a change request. Changes are sent to our admin team for approval — we never overwrite your existing beneficiaries without an audit trail.",
  },
  {
    q: "Who can become a member?",
    a: "Anyone aged 16–64 can join a funeral plan. You'll need a policy number and ID number to link your online account. Contact us if you don't have a policy yet.",
  },
  {
    q: "How do I pay my premium?",
    a: "Premiums are collected monthly by debit order or the method agreed at sign-up. Your payment history and paid-up-to date are visible in your member portal.",
  },
];

export default function FAQ({ copy, faqs = [] }) {
  const list = faqs.length
    ? faqs.map((f) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;

  return (
    <section id="faq" className="px-4 py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-normal tracking-tight">
              <InlineItalic text={copy.faq_heading} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative rounded-[14px] min-h-[220px] overflow-hidden bg-gradient-to-br from-landing-blue to-landing-navy mt-6">
              <img
                src={IMAGES.faq}
                alt="A friendly consultation in our office"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            </div>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <Accordion type="single" collapsible className="w-full">
            {list.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-landing-card border border-landing-line rounded-[12px] px-5 mb-3"
              >
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-landing-mut">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}