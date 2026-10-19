// Centralised landing-page content: real Pexels imagery, hero slides, and
// default section copy. The landing page reads entities (FuneralPlan, FAQItem,
// Testimonial, Partner, SectionCopy) and falls back to these defaults when a
// record is missing, so the page always renders even before the admin adds
// content. Copy keys use a leading "*" to mark an Instrument Serif italic word.

export const LOGO_URL =
  "https://media.base44.com/images/public/6aad9a9d1bff6a57f97c0775/aca533eb1_jtg-logo.png";

// Real, dignified photographs from Pexels (free licence).
const px = (id, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero1: px(28278677), // community gathering on a balcony — togetherness
  hero2: px(6192006), // family lighting candles — warm, peaceful
  hero3: px(33525563), // elderly hands holding — care & support
  hero4: px(23914296), // joyful community gathering — unity
  media1: px(8204963), // consultation session — people talking together
  media2: px(8470528), // African family in traditional attire — portrait
  vision1: px(33693372), // African family portrait
  vision2: px(36409051), // generational portrait of African women
  plans: px(8986709), // white flowers on dark cloth — dignified, peaceful
  faq: px(14797778), // two women in a friendly office consultation
};

// Hero slideshow. Headline uses "|" for a line break and a leading "*" on a
// word to render it in Instrument Serif italic.
export const HERO_SLIDES = [
  {
    headline: "Walk Not|*Alone.",
    body: "Justice The Great stands with families and communities through life's hardest moments.",
    cta: "Join Us",
    link: "/register",
    image: IMAGES.hero1,
  },
  {
    headline: "Honouring|*Every Life",
    body: "Funeral plans that help your family say goodbye with dignity and peace of mind.",
    cta: "View Funeral Plans",
    link: "/plans",
    image: IMAGES.hero2,
  },
  {
    headline: "Care That|*Reaches Home",
    body: "Funeral cover, family support and community action, all in one trusted place.",
    cta: "What We Do",
    link: "/services",
    image: IMAGES.hero3,
  },
  {
    headline: "Together,|*For Justice",
    body: "Our vision and mission: a community where no family walks alone.",
    cta: "Our Vision",
    link: "/about",
    image: IMAGES.hero4,
  },
];

export const WHAT_WE_DO_CARDS = [
  {
    icon: "ShieldCheck",
    title: "Funeral Cover",
    description: "Plans that help families give a loved one a dignified farewell.",
    image: px(8986709, 900),
    image_alt: "White flowers arranged on dark cloth for a dignified farewell",
    gradient: "linear-gradient(145deg,#0b57d0,#061f5c)",
  },
  {
    icon: "HeartHandshake",
    title: "Family Support",
    description: "Guidance and a listening ear from the first call to the final goodbye.",
    image: px(33525563, 900),
    image_alt: "Elderly hands held gently by a family member in support",
    gradient: "linear-gradient(145deg,#1393d6,#0b3a8f)",
  },
  {
    icon: "Users",
    title: "Community Action",
    description: "Standing together for fairness, so no one has to walk alone.",
    image: px(23914296, 900),
    image_alt: "A joyful community gathering united together",
    gradient: "linear-gradient(145deg,#3b2cc9,#0a1a5c)",
  },
];

export const VISION_FEATURES = [
  { icon: "Eye", title: "Our Vision", copy_key: "vision_vision" },
  { icon: "Compass", title: "Our Mission", copy_key: "vision_mission" },
  { icon: "Heart", title: "Dignity", copy_key: "vision_dignity" },
  { icon: "Users", title: "Community", copy_key: "vision_community" },
];

// Default section copy. Each key maps to a SectionCopy entity row (key/label/value).
export const DEFAULT_COPY = {
  intro_heading: "Walking beside you, in life and in *farewell*",
  intro_body:
    "Justice The Great is a licensed Financial Services Provider that stands with families through life's hardest moments, offering dignity, support and care when it matters most.",
  what_heading: "What We *Do",
  what_body:
    "Six disciplines, one relationship. Everything is handled in-house so a family never has to repeat their story to a stranger.",
  what_card1_title: "Funeral Cover",
  what_card1_body: "Plans that help families give a loved one a dignified farewell.",
  what_card2_title: "Family Support",
  what_card2_body: "Guidance and a listening ear from the first call to the final goodbye.",
  what_card3_title: "Community Action",
  what_card3_body: "Standing together for fairness, so no one has to walk alone.",
  vision_heading: "Our *Vision* & Mission",
  vision_body: "What guides Justice The Great and the people we serve.",
  vision_vision: "To be the best financial advisory and planning practice serving families in our community.",
  vision_mission:
    "To provide well-balanced financial services to our clients — funeral cover, investments and estate planning under one trusted relationship.",
  vision_dignity: "Every life is honoured with respect.",
  vision_community: "Strength grows when we stand together.",
  plans_heading: "Funeral *Plans* for Every Family",
  plans_body: "Choose the cover that fits your household. Ask our team for plan details.",
  testimonials_heading: "Straight from the *Community",
  faq_heading: "Frequently *Asked Questions",
  cta_heading: "Let's walk the road to *justice* together",
  contact_email: "jtfgunerals@gmail.com",
  contact_phone: "Phone number on request",
  contact_address: "Office no. 6, Building 40 Scott Street, Newcastle 2940, KwaZulu-Natal",
  footer_tagline: "Justice The Great. Walk Not Alone.",
};

// Labels shown in the admin Section Copy editor.
export const COPY_LABELS = {
  intro_heading: "Intro — Heading",
  intro_body: "Intro — Body",
  what_heading: "What We Do — Heading",
  what_body: "What We Do — Body",
  what_card1_title: "What We Do — Card 1 Title",
  what_card1_body: "What We Do — Card 1 Body",
  what_card2_title: "What We Do — Card 2 Title",
  what_card2_body: "What We Do — Card 2 Body",
  what_card3_title: "What We Do — Card 3 Title",
  what_card3_body: "What We Do — Card 3 Body",
  vision_heading: "Vision & Mission — Heading",
  vision_body: "Vision & Mission — Body",
  vision_vision: "Vision — Text",
  vision_mission: "Mission — Text",
  vision_dignity: "Dignity — Text",
  vision_community: "Community — Text",
  plans_heading: "Funeral Plans — Heading",
  plans_body: "Funeral Plans — Body",
  testimonials_heading: "Testimonials — Heading",
  faq_heading: "FAQ — Heading",
  cta_heading: "Closing CTA — Heading",
  contact_email: "Contact — Email",
  contact_phone: "Contact — Phone",
  contact_address: "Contact — Address",
  footer_tagline: "Footer — Tagline",
};