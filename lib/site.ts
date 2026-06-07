// Single source of truth for public marketing content (header, footer, pages).
// Keeps services, contact details, and stats consistent across the site.

export const COMPANY = {
  name: "Ron's Landscape",
  tagline: "Landscaping & lawn care, done right.",
  foundedYear: 2012,
};

export const CONTACT = {
  phone: "(210) 555-0199",
  phoneHref: "tel:+12105550199",
  email: "hello@ronslandscape.com",
  emailHref: "mailto:hello@ronslandscape.com",
  city: "San Antonio, TX",
  hours: "Mon–Sat · 7am–6pm",
};

export const SERVICE_AREA = [
  "San Antonio",
  "Alamo Heights",
  "Stone Oak",
  "Helotes",
  "Boerne",
  "Schertz",
  "New Braunfels",
];

export type Service = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  blurb: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "maintenance",
    icon: "◆",
    name: "Lawn & Turf Maintenance",
    tagline: "Recurring mow, edge & blow",
    blurb:
      "Scheduled crews keep your property sharp week in, week out — mowing, edging, line-trimming, and cleanup on a route you can count on.",
    bullets: [
      "Weekly, biweekly & monthly plans",
      "Edging, trimming & blow-down every visit",
      "Same crew, same day, every cycle",
      "Bed weeding & shrub touch-ups",
    ],
  },
  {
    slug: "installation",
    icon: "✦",
    name: "Landscape Installation",
    tagline: "Beds, sod & design-build",
    blurb:
      "From a fresh sod lawn to a full front-yard redesign — native-friendly plantings built for the South Texas climate and your water bill.",
    bullets: [
      "Sod, plant beds & tree planting",
      "Drought-tolerant, Texas-native palettes",
      "Soil prep, grading & edging",
      "Full design-build projects",
    ],
  },
  {
    slug: "hardscape",
    icon: "▲",
    name: "Hardscape",
    tagline: "Patios, walls & stone",
    blurb:
      "Flagstone patios, retaining walls, walkways, and decorative rock that hold up to Hill Country soil and stand out from the curb.",
    bullets: [
      "Flagstone & paver patios",
      "Retaining & seat walls",
      "Walkways & borders",
      "Decorative rock & gravel",
    ],
  },
  {
    slug: "irrigation",
    icon: "≡",
    name: "Irrigation",
    tagline: "Install, repair & tune-ups",
    blurb:
      "Efficient sprinkler systems and fast repairs — dialed in to SAWS watering rules so your landscape thrives without the waste.",
    bullets: [
      "New system installs",
      "Leak & head repairs",
      "Seasonal tune-ups & audits",
      "Smart controller setup",
    ],
  },
  {
    slug: "cleanups",
    icon: "→",
    name: "Seasonal Cleanups",
    tagline: "First-time & storm cleanups",
    blurb:
      "Overgrown, neglected, or storm-hit? We get a property back to baseline fast — then keep it there with a maintenance plan.",
    bullets: [
      "First-time / overgrown cleanups",
      "Leaf & debris haul-off",
      "Storm & freeze recovery",
      "Pre-sale curb-appeal resets",
    ],
  },
  {
    slug: "mulch-rock",
    icon: "◳",
    name: "Mulch & Rock",
    tagline: "Material delivery & install",
    blurb:
      "Fresh mulch and decorative rock delivered and installed by the yard — clean lines, healthy beds, and less weeding all season.",
    bullets: [
      "Hardwood & cedar mulch",
      "Decorative & river rock",
      "Bed prep & weed barrier",
      "Delivery included",
    ],
  },
];

export const STATS = [
  { value: "12+", label: "Years in San Antonio" },
  { value: "200+", label: "Properties on route" },
  { value: "6 days", label: "Weekly route coverage" },
  { value: "100%", label: "Licensed & insured" },
];
