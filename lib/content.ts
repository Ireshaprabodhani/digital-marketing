// All page text. Edit wording here.

type Pkg = {
  name: string;
  price: string;
  per: string;
  worth?: string;
  save?: string;
  note: string;
  items: string[];
  featured?: boolean;
};

export type Content = {
  nav: { services: string; work: string; packages: string; about: string; faq: string; cta: string };
  hero: {
    badge: string;
    title: string;
    findOn: string;
    channels: string[];
    notes: { text: string; sub: string; tone: "coral" | "mint" | "sky" | "sun" }[];
    journey: {
      title: string;
      lead: string;
      steps: { label: string; body: string }[];
    };
    lead: string;
    cta: string;
    ctaMsg: string;
    secondary: string;
    reassure: string;
  };
  listing: {
    caption: string;
    before: string;
    after: string;
    name: string;
    kind: string;
    reviewsBefore: number;
    reviewsAfter: number;
    reviewsWord: string;
    hoursMissing: string;
    hoursOk: string;
    noPhotos: string;
    photos: string;
    noWebsite: string;
    website: string;
    call: string;
    directions: string;
    whatsapp: string;
    menu: string;
    post: string;
  };
  problems: { title: string; items: string[]; outro: string };
  process: { title: string; steps: { title: string; body: string }[] };
  services: { title: string; lead: string; items: { title: string; body: string }[] };
  packages: {
    title: string;
    lead: string;
    choose: string;
    choiceMsg: (name: string) => string;
    popular: string;
    list: Pkg[];
    extrasTitle: string;
    extras: { label: string; value: string }[];
    adsNote: string;
  };
  about: {
    title: string;
    body: string[];
    facts: { value: string; label: string }[];
    link: string;
  };
  work: {
    title: string;
    lead: string;
    projects: {
      name: string;
      url: string;
      domain: string;
      summary: string;
      points: string[];
      link: string;
    }[];
  };
  faq: { title: string; items: { q: string; a: string }[] };
  contact: {
    title: string;
    body: string;
    cta: string;
    ctaMsg: string;
    or: string;
    phone: string;
    email: string;
  };
  footer: string;
};

export const content: Content = {
  nav: {
    services: "Services",
    work: "Work",
    packages: "Packages",
    about: "About",
    faq: "Questions",
    cta: "Free audit",
  },
  hero: {
    badge: "Digital marketing for Sri Lankan businesses",
    title: "People are already searching for your business.",
    findOn: "Let them find you on",
    channels: ["Google Maps", "Facebook", "Instagram", "WhatsApp", "TikTok"],
    notes: [
      { text: "12 new reviews", sub: "this month", tone: "sun" },
      { text: "New booking", sub: "via WhatsApp", tone: "mint" },
      { text: "1.4k people reached", sub: "on Facebook", tone: "coral" },
      { text: "Found on Google Maps", sub: "2 km away", tone: "sky" },
    ],
    journey: {
      title: "How a customer finds you today",
      lead: "Every step has to work. If one is missing, they pick the place down the road.",
      steps: [
        { label: "Search", body: "Types \"restaurant near me\" into Google Maps" },
        { label: "Check", body: "Looks at your photos, hours and reviews" },
        { label: "Scroll", body: "Sees your latest posts on Facebook or Instagram" },
        { label: "Message", body: "Taps WhatsApp to book a table" },
      ],
    },
    lead:
      "We help restaurants, salons and local shops in Sri Lanka show up on Google Maps, keep their Facebook and Instagram alive, and turn visitors into bookings.",
    cta: "Get a free audit on WhatsApp",
    ctaMsg: "Hi, I'd like a free audit for my business.",
    secondary: "See packages",
    reassure: "Free report in Sinhala or English. No obligation.",
  },
  listing: {
    caption: "An example Google Maps listing, before and after setup",
    before: "Before",
    after: "After",
    name: "Hela Rasa Kitchen",
    kind: "Restaurant · Ratnapura",
    reviewsBefore: 9,
    reviewsAfter: 64,
    reviewsWord: "reviews",
    hoursMissing: "Opening hours not added",
    hoursOk: "Open now · Closes 10 pm",
    noPhotos: "No photos from the owner",
    photos: "Food, menu and dining area photos",
    noWebsite: "No website or menu",
    website: "Website",
    call: "Call",
    directions: "Directions",
    whatsapp: "WhatsApp",
    menu: "Menu",
    post: "New: Birthday party package for up to 25 guests",
  },
  problems: {
    title: "Does this sound like your business?",
    items: [
      "Customers love your food, but only a handful have left a review.",
      "Your Facebook page hasn't had a new post in months.",
      "Google Maps doesn't show your opening hours, so people go somewhere they know is open.",
      "You host birthdays and events, but nobody online knows you offer them.",
    ],
    outro: "These are small things to fix, and each one costs you customers every week.",
  },
  process: {
    title: "How we start",
    steps: [
      {
        title: "Free audit",
        body:
          "We check your Google, Facebook and Instagram, then send you a one-page report on WhatsApp showing what's stopping new customers.",
      },
      {
        title: "Free first fix",
        body:
          "We complete your Google Maps profile with hours, photos, menu and a WhatsApp button, at no cost, so you can see the difference.",
      },
      {
        title: "Monthly plan, only if you want it",
        body:
          "If you're happy, we agree on a simple monthly plan. You can stop at any time after the first three months.",
      },
    ],
  },
  services: {
    title: "What we can do for you",
    lead: "Pick one service or combine them. Everything is explained in plain Sinhala or English.",
    items: [
      {
        title: "Google Business Profile",
        body:
          "Get found on Google Maps when people search nearby. We set up and look after your profile: opening hours, photos, menu, posts, a WhatsApp button and a steady flow of new reviews.",
      },
      {
        title: "Website development and SEO",
        body:
          "A fast, mobile-friendly website with your menu, offers, gallery and bookings, built by software engineers and set up to show on Google for searches like \"restaurant near me\".",
      },
      {
        title: "Social media management",
        body:
          "Facebook, Instagram and TikTok handled for you: designed posts, short videos, daily specials, replies to comments and ads aimed at people near you, with a simple monthly report.",
      },
    ],
  },
  packages: {
    title: "Monthly packages",
    lead: "Prices are per month. Your first three months are agreed in advance, then it's month to month.",
    choose: "Ask about this package",
    choiceMsg: (name) => `Hi, I'd like to know more about the ${name} package.`,
    popular: "Most chosen",
    list: [
      {
        name: "Starter",
        price: "Rs. 15,000",
        per: "per month",
        worth: "Rs. 17,000",
        save: "Rs. 2,000",
        note: "For businesses getting online for the first time.",
        items: [
          "8 posts and 1 reel a month",
          "Google Business Profile kept up to date",
          "Replies to comments and messages",
        ],
      },
      {
        name: "Growth",
        price: "Rs. 28,000",
        per: "per month",
        worth: "Rs. 33,000",
        save: "Rs. 5,000",
        note: "For restaurants, hotels and salons that want more bookings.",
        featured: true,
        items: [
          "12 posts and 3 reels a month",
          "Google review campaign with table QR cards",
          "One special campaign a month, like a birthday or wedding package",
          "Monthly report with real numbers",
        ],
      },
      {
        name: "Full service",
        price: "Rs. 45,000",
        per: "per month",
        worth: "Rs. 54,000",
        save: "Rs. 9,000",
        note: "For businesses ready to run ads and grow quickly.",
        items: [
          "16 posts and 6 reels a month",
          "Everything in Growth",
          "Facebook and Instagram ad management",
          "TikTok posting",
        ],
      },
    ],
    extrasTitle: "Single items and one-time work",
    extras: [
      { label: "One designed post (Facebook or Instagram)", value: "Rs. 1,500" },
      { label: "One reel (short video, edited)", value: "Rs. 5,000" },
      { label: "Website with menu and booking", value: "from Rs. 35,000" },
      { label: "Google Business Profile setup", value: "Free with any package" },
      { label: "Domain and hosting", value: "about Rs. 12,000 a year" },
    ],
    adsNote:
      "Ad money is paid by you directly to Facebook with your own card. It never passes through us, so you always see exactly what was spent.",
  },
  about: {
    title: "Who we are",
    body: [
      "We're a small team of software engineers and digital marketers who help Sri Lankan businesses get found online and get more bookings.",
      "We've spent the last three years building websites and web apps, and running social media, SEO and Pinterest for real brands. Having both skills in one team means your website, Google profile and social pages all work together.",
      "Our own site, hellocelori.com, shows how we work: we designed and built it, set it up for Google search, and grew its Pinterest page to around 157,000 views a month.",
    ],
    facts: [
      { value: "3 years", label: "building websites and web apps" },
      { value: "157k", label: "monthly Pinterest views for hellocelori.com" },
      { value: "1 team", label: "for your website, social media and SEO" },
    ],
    link: "See hellocelori.com",
  },
  work: {
    title: "Websites we've built",
    lead: "Every site we build is fast, works well on phones and is set up so Google can find it.",
    projects: [
      {
        name: "Celori",
        url: "https://hellocelori.com/",
        domain: "hellocelori.com",
        summary:
          "Our own website of ideas for weddings, birthdays, baby showers and anniversaries. We designed and built it from scratch, and we grow it through Pinterest.",
        points: [
          "Idea pages grouped by occasion, plus a shop and free printables",
          "Page titles, descriptions and share previews set up for Google and social media",
          "Linked to the Celori Pinterest page, which gets around 157,000 views a month",
          "Email sign-up for the free party planning checklist",
        ],
        link: "Visit hellocelori.com",
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        q: "Do I have to sign a long contract?",
        a: "No. We agree on the first three months so there's time to see results. After that you can stop whenever you like.",
      },
      {
        q: "I already post on Facebook myself. Do I still need this?",
        a: "Maybe not. The free audit will show what's working and what isn't. If you're doing well, we'll tell you.",
      },
      {
        q: "My business isn't in Colombo. Can you still help?",
        a: "Yes. Most of the work is online, and we're happy to visit businesses in Ratnapura and the Colombo area.",
      },
      {
        q: "How do I know it's working?",
        a: "Every month you get a short report showing reviews, page reach, messages and calls, compared with the month before.",
      },
    ],
  },
  contact: {
    title: "Find out what's stopping new customers",
    body: "Send us your business name on WhatsApp. We'll send back a free one-page report within two days.",
    cta: "Get a free audit on WhatsApp",
    ctaMsg: "Hi, I'd like a free audit. My business name is: ",
    or: "Or contact us directly",
    phone: "Phone",
    email: "Email",
  },
  footer: "Digital marketing and websites for Sri Lankan businesses",
};
