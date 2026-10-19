// Funeral plan definitions and premium lookup for JTG

export const PLAN_TYPES = ["Family", "Single Parent", "Individual"];

export const COVER_OPTIONS = [1000, 5000, 7000, 10000];

export const AGE_BAND = { min: 16, max: 64 };

// Monthly premium (ZAR) per plan type + cover amount
export const PREMIUM_TABLE = {
  Family: { 1000: 80, 5000: 150, 7000: 200, 10000: 280 },
  "Single Parent": { 1000: 60, 5000: 120, 7000: 160, 10000: 220 },
  Individual: { 1000: 40, 5000: 90, 7000: 130, 10000: 180 },
};

export const PLAN_DETAILS = [
  {
    type: "Family",
    tagline: "Cover for you, your spouse and your children",
    blurb:
      "The whole household under one policy. A single monthly premium covers the main member, a spouse and all dependent children up to age 21.",
    includes: [
      "Main member + spouse cover",
      "All dependent children covered",
      "Accidental and natural death cover",
      "Funeral arrangement assistance",
    ],
  },
  {
    type: "Single Parent",
    tagline: "Cover for a parent and their children",
    blurb:
      "Built for single-parent families. One premium covers the main member and all dependent children, with no spouse on the policy.",
    includes: [
      "Main member cover",
      "All dependent children covered",
      "Accidental and natural death cover",
      "Funeral arrangement assistance",
    ],
  },
  {
    type: "Individual",
    tagline: "Cover for one person",
    blurb:
      "Single-person cover for adults who only need to insure themselves. The simplest plan, with the lowest premium.",
    includes: [
      "Main member cover only",
      "Accidental and natural death cover",
      "Funeral arrangement assistance",
    ],
  },
];

export function getPremium(planType, coverAmount) {
  const table = PREMIUM_TABLE[planType];
  if (!table) return null;
  return table[coverAmount] ?? null;
}