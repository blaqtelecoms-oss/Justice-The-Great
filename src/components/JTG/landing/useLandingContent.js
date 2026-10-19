import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_COPY } from "@/lib/landingData";

// Fetches all entity-backed landing content once and merges SectionCopy rows
// over the default copy. Falls back to defaults if the fetch fails, so the
// page always renders (public reads are open to anonymous visitors).
export function useLandingContent() {
  const [data, setData] = useState({
    copy: DEFAULT_COPY,
    plans: [],
    faqs: [],
    testimonials: [],
    partners: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const [copyRecs, plans, faqs, testimonials, partners] = await Promise.all([
          base44.entities.SectionCopy.list(),
          base44.entities.FuneralPlan.list("order"),
          base44.entities.FAQItem.list("order"),
          base44.entities.Testimonial.list("order"),
          base44.entities.Partner.list("order"),
        ]);
        const copy = { ...DEFAULT_COPY };
        copyRecs.forEach((r) => {
          if (r.key) copy[r.key] = r.value;
        });
        setData({ copy, plans, faqs, testimonials, partners, loading: false });
      } catch {
        setData((d) => ({ ...d, loading: false }));
      }
    })();
  }, []);

  return data;
}