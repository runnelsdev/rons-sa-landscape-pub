// Single source of truth for public marketing content (header, footer, pages).
// Keeps services, contact details, and stats consistent across the site.

export const COMPANY = {
  name: "Ron's S A Landscape",
  legalName: "Ron's S A Landscape LLC",
  tagline: "Landscaping & lawn care, done right.",
};

export const CONTACT = {
  phone: "(210) 668-4924",
  phoneHref: "tel:+12106684924",
  email: "ron@ronssalandscape.com",
  emailHref: "mailto:ron@ronssalandscape.com",
  city: "San Antonio, TX",
  // NOTE: hours not published on ronssalandscape.com — placeholder, confirm with Ron.
  hours: "Mon–Sat, by appointment",
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

// Non-numeric, verifiable claims only — no fabricated counts. Swap in real
// figures (years in business, properties served, etc.) once confirmed with Ron.
export const STATS = [
  { value: "Local", label: "Family-run, San Antonio" },
  { value: "Free", label: "On-site estimates" },
  { value: "Full-service", label: "Lawn → hardscape" },
  { value: "6-day", label: "Weekly service" },
];

// ---- Imagery (placeholder stock in /public/images — swap for Ron's real photos) ----
export const HERO_IMAGE = "/images/hero.jpg";
export const ABOUT_IMAGE = "/images/patio.jpg";
export const DETAIL_IMAGE = "/images/detail-lantern.jpg";

export const SERVICE_IMAGES: Record<string, string> = {
  maintenance: "/images/lawn-stripes.jpg",
  installation: "/images/garden-golden.jpg",
  hardscape: "/images/patio.jpg",
  irrigation: "/images/lawn-green.jpg",
  cleanups: "/images/backyard.jpg",
  "mulch-rock": "/images/beds-rock.jpg",
};

export type GalleryItem = {
  title: string;
  category: string;
  area: string;
  blurb: string;
  image: string;
};

// Who we serve — the property segments Ron works with. Drives the Work
// gallery filter and the "Who we serve" section.
export const SEGMENTS: { name: string; blurb: string }[] = [
  { name: "Residential", blurb: "Homes kept sharp — from the weekly mow to a full yard redesign." },
  { name: "Commercial", blurb: "Storefronts and offices that stay presentable year-round." },
  { name: "HOA", blurb: "Reliable common-area grounds care your board can count on." },
  { name: "Multi-family", blurb: "Apartment and condo grounds that lease themselves." },
];

// GalleryItem.category is the property segment (one of SEGMENTS above).
export const GALLERY: GalleryItem[] = [
  {
    title: "Front-yard reset & sod",
    category: "Residential",
    area: "Alamo Heights",
    blurb: "Tired turf out, fresh sod and crisp steel edging in.",
    image: "/images/hero.jpg",
  },
  {
    title: "Flagstone patio & seat wall",
    category: "Residential",
    area: "Stone Oak",
    blurb: "A shaded gathering space built to last in Hill Country soil.",
    image: "/images/patio.jpg",
  },
  {
    title: "Common-area grounds care",
    category: "HOA",
    area: "Helotes",
    blurb: "Same crew, same day — sharp lines across the community.",
    image: "/images/lawn-stripes.jpg",
  },
  {
    title: "Property irrigation tune-up",
    category: "Commercial",
    area: "Boerne",
    blurb: "Water-wise zones that keep it green without the waste.",
    image: "/images/lawn-green.jpg",
  },
  {
    title: "Site cleanup & reset",
    category: "Commercial",
    area: "Schertz",
    blurb: "Neglected to presentable in a single push — then on a plan.",
    image: "/images/backyard.jpg",
  },
  {
    title: "Courtyard bed & mulch refresh",
    category: "Multi-family",
    area: "New Braunfels",
    blurb: "Texas-native plantings with clean, defined beds.",
    image: "/images/beds-rock.jpg",
  },
  {
    title: "Entrance landscape & retaining wall",
    category: "HOA",
    area: "San Antonio",
    blurb: "Grading, stone, and plantings that hold the slope.",
    image: "/images/garden-golden.jpg",
  },
  {
    title: "Walkway & border design",
    category: "Multi-family",
    area: "Stone Oak",
    blurb: "Defined lines that frame the whole property.",
    image: "/images/patio-aerial.jpg",
  },
];
