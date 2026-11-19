export const site = {
  name: "FilterHaus",
  tagline: "We create visuals. We build perceptions.",
  url: "https://filterhaus.in",
  showPrices: true,
  features: {
    introLoader: true,
    customCursor: true,
    smoothScroll: true,
    showTestimonials: false,
  },
  contact: {
    phoneDisplay: "+91 95356 75192",
    phoneTel: "+919535675192",
    whatsappMessage: "Hi FilterHaus, I'd like a quote for a shoot.",
    email: "team.filterhaus@gmail.com",
    emailSubject: "Quote enquiry — FilterHaus",
    instagram: "https://instagram.com/TODO",
    instagramLabel: "Instagram",
    location: "Bengaluru and Chikkamagaluru, India",
    serviceAreas: ["Bengaluru, Karnataka", "Chikkamagaluru, Karnataka"],
    travelNote: "Travel outside Bengaluru and Chikkamagaluru is quoted separately.",
    hoursLabel: "Available for calls and WhatsApp",
    hours: [
      { days: "Mon–Sat", time: "9:00 AM–8:00 PM" },
      { days: "Sunday", time: "Available for calls and WhatsApp" },
    ],
  },
  seo: {
    title: "FilterHaus | Photography, Reels & Brand Films in Bengaluru & Chikkamagaluru",
    description:
      "Photography, short-form reels and brand films for cafés, hospitality and D2C brands in Bengaluru and Chikkamagaluru. FilterHaus is a creative production house.",
    ogAlt: "FilterHaus — creative production house in Bengaluru and Chikkamagaluru",
    locale: "en_IN",
  },
  jsonLd: {
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
    openingHours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
  },
  ui: {
    skipToContent: "Skip to content",
    skipIntro: "Skip",
    introLabel: "FilterHaus introduction",
    introStorageKey: "filterhaus-intro-seen",
    opensInNewTab: "opens in a new tab",
    close: "Close",
    menu: "Menu",
    menuLabel: "Primary",
    cursorView: "View",
    home: "Home",
  },
  nav: {
    cta: "WhatsApp us",
    links: [
      { href: "#services", label: "Services" },
      { href: "#packages", label: "Packages" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
  },
  hero: {
    eyebrow: "CREATIVE PRODUCTION HOUSE · BENGALURU · CHIKKAMAGALURU",
    lines: [
      { text: "We create visuals.", italic: false },
      { text: "We build perceptions.", italic: true },
    ],
    sub: "A commercial studio. Photography, reels and brand films for brands.",
    primaryCta: "View our work",
    primaryHref: "#services",
    secondaryCta: "Get a quote",
    mediaAlt: "TODO: Hero film still — describe the frame",
    mediaWidth: 1600,
    mediaHeight: 2000,
    poster: "/hero.jpg",
    video: "/hero.mp4",
  },
  showreel: {
    id: "showreel",
    eyebrow: "Showreel",
    title: "The work, in motion.",
    body: "A short reel of photography, vertical films and brand films.",
    video: "/showreel.mp4",
    play: "Play reel",
    pause: "Pause reel",
  },
  marquee: {
    items: [
      "Photography",
      "Reels",
      "Brand films",
      "Cafés",
      "Hospitality",
      "D2C",
    ],
    separator: "·",
  },
  audiences: {
    id: "clients",
    index: "01",
    eyebrow: "Who we work with",
    title: "Brands, hospitality and products — photographed with the same care.",
    items: [
      {
        id: "brands",
        index: "01",
        title: "Brands",
        body: "Companies with a launch, a campaign or a look to put in front of people.",
        gets: "Stills and films for the site, the ad and the feed.",
      },
      {
        id: "hospitality",
        index: "02",
        title: "Hospitality",
        body: "Homestays, boutique stays, villas and small resorts.",
        gets: "Rooms, grounds and the feeling of arrival, framed for your listing and website.",
      },
      {
        id: "products",
        index: "03",
        title: "Products",
        body: "Objects, packaging and the details a buyer sees before they decide.",
        gets: "Product frames and short clips, ready for your site and social.",
      },
    ],
  },
  services: {
    id: "services",
    index: "02",
    eyebrow: "Services",
    title: "Three ways to make the work.",
    intro:
      "Every job starts with a brief. The shape of the day follows from what you actually need to publish.",
    expand: "Details",
    collapse: "Hide details",
    items: [
      {
        id: "photography",
        index: "01",
        title: "Photography",
        sentence:
          "Still photographs of spaces, food, stays and products, edited for print and for the screen.",
        image: "/services/photography.jpg",
        imageAlt: "TODO: Photography — describe this preview frame",
        width: 900,
        height: 1200,
      },
      {
        id: "reels",
        index: "02",
        title: "Short-form reels",
        sentence:
          "Vertical films, cut to the length in your package, for Reels and stories.",
        image: "/services/reels.jpg",
        imageAlt: "TODO: Reels — describe this preview frame",
        width: 900,
        height: 1200,
      },
      {
        id: "films",
        index: "03",
        title: "Brand films",
        sentence:
          "A longer film for a property, a launch or a founder story, commissioned one brief at a time.",
        image: "/services/brand-films.jpg",
        imageAlt: "TODO: Brand films — describe this preview frame",
        width: 900,
        height: 1200,
      },
    ],
    pipeline: [
      { step: "Brief", note: "Scope and references" },
      { step: "Shoot", note: "On the agreed day" },
      { step: "Edit", note: "Selects and grade" },
      { step: "Deliver", note: "Files, ready to publish" },
    ],
  },
  work: {
    id: "work",
    index: "03",
    eyebrow: "Work",
    title: "Selected work",
    intro:
      "A first hospitality study is below. Café and D2C projects will be added as they are ready to show.",
    skipGallery: "Skip image gallery",
    skipHref: "#work-after",
    caseStudy: {
      kicker: "Hospitality",
      title: "Homestay",
      propertyType: "Boutique stay",
      briefLabel: "Brief",
      brief:
        "TODO: Describe what the property needed — rooms, grounds, and the feeling of a stay.",
      approachLabel: "Approach",
      approach:
        "TODO: Describe how the shoot was planned — time of day, the rooms walked, the details held.",
      deliveredLabel: "What we delivered",
      delivered:
        "TODO: List what was handed over — stills, reel length and file formats. No invented numbers.",
    },
    images: [
      {
        src: "/work/homestay-01.jpg",
        width: 1200,
        height: 1600,
        alt: "TODO: Homestay image 1 — describe the frame",
      },
      {
        src: "/work/homestay-02.jpg",
        width: 1600,
        height: 1100,
        alt: "TODO: Homestay image 2 — describe the frame",
      },
      {
        src: "/work/homestay-03.jpg",
        width: 1200,
        height: 1500,
        alt: "TODO: Homestay image 3 — describe the frame",
      },
      {
        src: "/work/homestay-04.jpg",
        width: 1400,
        height: 1700,
        alt: "TODO: Homestay image 4 — describe the frame",
      },
      {
        src: "/work/homestay-05.jpg",
        width: 1600,
        height: 1200,
        alt: "TODO: Homestay image 5 — describe the frame",
      },
      {
        src: "/work/homestay-06.jpg",
        width: 1200,
        height: 1600,
        alt: "TODO: Homestay image 6 — describe the frame",
      },
      {
        src: "/work/homestay-07.jpg",
        width: 1500,
        height: 1300,
        alt: "TODO: Homestay image 7 — describe the frame",
      },
      {
        src: "/work/homestay-08.jpg",
        width: 1200,
        height: 1680,
        alt: "TODO: Homestay image 8 — describe the frame",
      },
    ],
    lightbox: {
      label: "Image gallery",
      viewImage: "View image: {alt}",
      previous: "Previous image",
      next: "Next image",
      count: "{current} of {total}",
    },
  },
  testimonials: [] as { quote: string; name: string; role: string }[],
  packages: {
    id: "packages",
    index: "03",
    eyebrow: "Packages",
    title: "Starting points for how you are seen.",
    intro:
      "Each card is a scope of time and files. Tell us if the brief needs more, and we will quote it.",
    tabsLabel: "Package categories",
    enquire: "Enquire",
    enquirePrefix: "Package:",
    pricePrefix: "from",
    brandFilm: {
      priced: "From ₹15,000–₹22,000, custom quote after brief.",
      hidden: "Brand films are quoted after a brief.",
    },
    footnote:
      "Starting prices. Models, stylists, props, studio or location fees and travel outside Bengaluru and Chikkamagaluru are quoted separately. Taxes extra if applicable.",
    tabs: [
      {
        id: "brand",
        label: "Brand",
        items: [
          {
            id: "brand-photo",
            name: "Brand Photo",
            price: 9500,
            scope: ["Up to 2 hours", "Up to 10 edited images", "One location"],
          },
          {
            id: "brand-content",
            name: "Brand Content",
            price: 16500,
            featured: true,
            scope: [
              "Up to 4 hours",
              "Up to 15 edited images",
              "1 vertical reel, up to 20 seconds",
            ],
          },
          {
            id: "brand-campaign",
            name: "Brand Campaign",
            price: 27500,
            scope: [
              "Up to 6 hours",
              "Up to 20 images",
              "2 vertical reels, up to 30 seconds each",
              "Pre-shoot shot list",
            ],
          },
        ],
      },
      {
        id: "hospitality",
        label: "Hospitality",
        items: [
          {
            id: "stay-photo",
            name: "Room Stills",
            price: 12500,
            scope: ["Up to 3 hours", "Up to 15 edited images"],
          },
          {
            id: "property-story",
            name: "Arrival Story",
            price: 22500,
            featured: true,
            scope: [
              "Up to 5 hours",
              "Up to 20 images",
              "1 vertical reel, up to 30 seconds",
            ],
          },
          {
            id: "stay-campaign",
            name: "Stay Launch",
            price: 35000,
            scope: [
              "Up to 7 hours",
              "Up to 25 images",
              "2 vertical reels",
              "Pre-shoot shot list",
            ],
          },
        ],
      },
      {
        id: "d2c",
        label: "D2C",
        items: [
          {
            id: "product-starter",
            name: "Product Starter",
            price: 8500,
            scope: [
              "Up to 8 final images",
              "Simple background",
              "Up to 4 similar-size products",
            ],
          },
          {
            id: "styled-product",
            name: "Styled Product",
            price: 16500,
            featured: true,
            scope: [
              "Up to 8 styled images",
              "One creative setup",
              "Up to 4 products",
            ],
          },
          {
            id: "d2c-launch",
            name: "D2C Launch",
            price: 26500,
            scope: [
              "Up to 12 images",
              "2 vertical reels, up to 20 seconds",
              "Up to 2 setups",
            ],
          },
        ],
      },
    ],
  },
  process: {
    id: "process",
    index: "04",
    eyebrow: "Process",
    title: "From the first message to the files.",
    intro: "Five steps. The date is held only after the advance is in.",
    steps: [
      {
        id: "enquiry",
        title: "Enquiry",
        body: "Tell us the business, the niche and what you need.",
      },
      {
        id: "brief",
        title: "Brief and quote",
        body: "We confirm scope, timing and a written quote.",
      },
      {
        id: "booking",
        title: "Booking (50% advance)",
        body: "The date is held once the advance is received.",
      },
      {
        id: "shoot",
        title: "Shoot and edit",
        body: "We shoot on the agreed day and edit to the brief.",
      },
      {
        id: "delivery",
        title: "Delivery (one revision round included)",
        body: "You receive the files, with one round of revisions.",
      },
    ],
  },
  about: {
    id: "about",
    index: "05",
    eyebrow: "About",
    title: "A studio, in Bengaluru and Chikkamagaluru.",
    body: "FilterHaus is a creative production house in Bengaluru and Chikkamagaluru, helping cafés, hospitality businesses and D2C brands present themselves through thoughtful photography, short-form video and visual storytelling.",
    founder: {
      name: "TODO — founder name",
      role: "Founder",
      bio: "TODO — replace with a short, factual bio: background, what they shoot, and that they work in Bengaluru and Chikkamagaluru.",
      image: "/about/founder.jpg",
      imageAlt: "TODO: Portrait of the founder",
      width: 900,
      height: 1120,
    },
  },
  contactForm: {
    id: "contact",
    index: "06",
    eyebrow: "Contact",
    title: "Tell us about the shoot.",
    intro:
      "The form opens WhatsApp with your note already written. Nothing is stored on this site.",
    submit: "Send on WhatsApp",
    emailInstead: "Email instead",
    opening: "Opening WhatsApp…",
    fallback: "If WhatsApp did not open, use this link.",
    requiredNote: "Fields marked required must be filled in.",
    fields: {
      name: { label: "Name", error: "Please enter your name." },
      business: {
        label: "Business",
        error: "Please enter the business name.",
      },
      niche: { label: "Niche", error: "Please choose a niche." },
      nicheOther: { label: "Your niche", error: "Please type your niche." },
      need: {
        label: "What you need",
        error: "Tell us a little about what you need.",
      },
      date: { label: "Preferred date", error: "Enter a valid date." },
      budget: { label: "Budget range", error: "Choose a budget range." },
    },
    nichePlaceholder: "Select a niche",
    budgetPlaceholder: "Select a range",
    niches: [
      { value: "cafes", label: "Cafés" },
      { value: "hospitality", label: "Hospitality" },
      { value: "d2c", label: "D2C" },
      { value: "other", label: "Other" },
    ],
    budgets: [
      { value: "under-10", label: "Under ₹10,000" },
      { value: "10-20", label: "₹10,000–₹20,000" },
      { value: "20-35", label: "₹20,000–₹35,000" },
      { value: "35-plus", label: "₹35,000 and above" },
      { value: "unsure", label: "Not sure yet" },
    ],
    errorSummary: "Please fix the highlighted fields.",
  },
  footer: {
    copyright: "© {year} FilterHaus",
  },
  notFound: {
    title: "This page is not on the reel.",
    body: "The link does not match anything on the site.",
    cta: "Back to FilterHaus",
  },
  logo: {
    src: "/logo.png",
    width: 1024,
    height: 1024,
    alt: "FilterHaus",
  },
  admin: {
    loginTitle: "Studio desk",
    loginBody: "This page is not linked from the site. Open it only from the address you were given.",
    passwordLabel: "Password",
    passwordError: "Enter the studio password.",
    signIn: "Open the desk",
    signingIn: "Checking…",
    badPassword: "That password is not right.",
    backHome: "Back to the site",
    title: "Photos",
    intro: "Replace a frame here and it shows on the homepage. Nothing else on the page changes.",
    signOut: "Sign out",
    hero: "Hero",
    heroNote: "The large frame beside the headline.",
    showreel: "Showreel",
    showreelNote: "The film in the brown frame. Upload an MP4 under 80 MB.",
    videoLabel: "Video",
    videoError: "Choose an MP4 under 80 MB.",
    showreelEmpty: "No film yet. The brown frame stays until you upload an MP4.",
    services: "Services",
    servicesNote: "The photograph on each service card.",
    work: "Work",
    workNote: "The homestay gallery. Add, reorder, or remove frames.",
    founder: "Founder",
    founderNote: "The portrait in the about section.",
    altLabel: "Description",
    altError: "Describe the photo in a short sentence.",
    fileLabel: "Photo",
    fileError: "Choose a JPG, PNG or WebP under 30 MB.",
    heicError: "That file is a HEIC photo. Export it as a JPG, then upload the JPG.",
    replace: "Replace photo",
    add: "Add a photo",
    remove: "Remove",
    moveUp: "Move up",
    moveDown: "Move down",
    save: "Save",
    saving: "Saving…",
    saved: "Saved. It is on the homepage.",
    failed: "Could not save that photo. Try again.",
    emptyWork: "Frames you add in the studio appear in this gallery.",
    preview: "Current frame",
  },
} as const;

export type PackageItem = {
  id: string;
  name: string;
  price: number;
  featured?: boolean;
  scope: readonly string[];
};

export function waLink(extraText?: string) {
  const message = extraText
    ? `${site.contact.whatsappMessage}\n\n${extraText}`
    : site.contact.whatsappMessage;
  const number = site.contact.phoneTel.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${site.contact.phoneTel}`;
}

export function mailLink(body?: string) {
  const subject = encodeURIComponent(site.contact.emailSubject);
  const encodedBody = body ? `&body=${encodeURIComponent(body)}` : "";
  return `mailto:${site.contact.email}?subject=${subject}${encodedBody}`;
}

export function fill(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}
