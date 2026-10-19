import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import PageHero from "@/components/JTG/PageHero";
import { IMAGES } from "@/lib/landingData";

const FAQ_HERO = IMAGES.faq;

const faqs = [
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

export default function FAQ() {
  return (
    <div className="bg-landing-bg min-h-screen">
      <PageHero
        image={FAQ_HERO}
        title="Frequently asked questions"
        subtitle="Plain answers about waiting periods, cover, claims and updating your beneficiaries."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mt-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-landing-line">
                  <AccordionTrigger className="text-left text-landing-navy font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-landing-mut">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}