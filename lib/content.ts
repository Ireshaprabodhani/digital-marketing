// All page text. Edit wording here.

type Pkg = {
  name: string;
  price: string;
  per: string;
  note: string;
  items: string[];
  featured?: boolean;
};

export type Content = {
  nav: { services: string; packages: string; about: string; faq: string; cta: string };
  hero: {
    title: string;
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
    reviewsBefore: string;
    reviewsAfter: string;
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
  };
  work: {
    title: string;
    celori: { title: string; body: string; stat: string; statLabel: string; link: string };
    audit: { title: string; body: string; findings: string[]; note: string };
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
    packages: "Packages",
    about: "About",
    faq: "Questions",
    cta: "Free audit",
  },
  hero: {
    title: "People are already searching for your business. Let them find it.",
    lead:
      "I help restaurants, salons and local shops in Sri Lanka show up on Google Maps, keep their Facebook and Instagram alive, and turn visitors into bookings.",
    cta: "Get a free audit on WhatsApp",
    ctaMsg: "Hi Iresha, I'd like a free audit for my business.",
    secondary: "See packages",
    reassure: "Free report in Sinhala or English. No obligation.",
  },
  listing: {
    caption: "An example Google Maps listing, before and after setup",
    before: "Before",
    after: "After",
    name: "Hela Rasa Kitchen",
    kind: "Restaurant · Ratnapura",
    reviewsBefore: "9 reviews",
    reviewsAfter: "64 reviews",
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
          "I check your Google, Facebook and Instagram, then send you a one-page report on WhatsApp showing what's stopping new customers.",
      },
      {
        title: "Free first fix",
        body:
          "I complete your Google Maps profile with hours, photos, menu and a WhatsApp button, at no cost, so you can see the difference.",
      },
      {
        title: "Monthly plan, only if you want it",
        body:
          "If you're happy, we agree on a simple monthly plan. You can stop at any time after the first three months.",
      },
    ],
  },
  services: {
    title: "What I can do for you",
    lead: "Pick one service or combine them. Everything is explained in plain Sinhala or English.",
    items: [
      {
        title: "Google Maps profile",
        body: "Hours, photos, menu, WhatsApp link and a steady flow of new reviews.",
      },
      {
        title: "Facebook and Instagram posts",
        body: "Regular posts about your food, offers and events, designed to match your brand.",
      },
      {
        title: "Reels and short videos",
        body: "Short videos that show your place and dishes, without TikTok watermarks.",
      },
      {
        title: "Websites and online menus",
        body:
          "A fast website with your menu, offers, location and booking. I'm a software engineer, so it's built properly.",
      },
      {
        title: "Facebook and Instagram ads",
        body: "Ads aimed at people near you, with clear reports on what you got for the money.",
      },
      {
        title: "Pinterest for events and tourism",
        body:
          "For wedding, birthday and travel businesses that want to reach customers from abroad.",
      },
    ],
  },
  packages: {
    title: "Monthly packages",
    lead: "Prices are per month. Your first three months are agreed in advance, then it's month to month.",
    choose: "Ask about this package",
    choiceMsg: (name) => `Hi Iresha, I'd like to know more about the ${name} package.`,
    popular: "Most chosen",
    list: [
      {
        name: "Starter",
        price: "Rs. 12,000",
        per: "per month",
        note: "For businesses getting online for the first time.",
        items: [
          "8 posts and 2 reels a month",
          "Google Maps profile kept up to date",
          "Replies to comments and messages",
        ],
      },
      {
        name: "Growth",
        price: "Rs. 20,000",
        per: "per month",
        note: "For restaurants and salons that want more bookings.",
        featured: true,
        items: [
          "12 posts and 4 reels a month",
          "Google review campaign with table QR cards",
          "One special campaign a month, like a birthday package",
          "Monthly report with real numbers",
        ],
      },
      {
        name: "Full service",
        price: "Rs. 35,000",
        per: "per month",
        note: "For businesses ready to run ads and grow quickly.",
        items: [
          "Everything in Growth",
          "Facebook and Instagram ad management",
          "TikTok posting",
          "One photo shoot a month",
        ],
      },
    ],
    extrasTitle: "One-time work",
    extras: [
      { label: "Website with menu and booking", value: "from Rs. 35,000" },
      { label: "Google Maps profile setup", value: "Free with any package" },
      { label: "Domain and hosting", value: "about Rs. 12,000 a year" },
    ],
    adsNote:
      "Ad money is paid by you directly to Facebook with your own card. It never passes through me, so you always see exactly what was spent.",
  },
  about: {
    title: "Hi, I'm Iresha",
    body: [
      "I'm a full-stack software engineer with three years of experience building websites and apps for clients in Sri Lanka, Canada and the UAE.",
      "I also run Celori, a Pinterest page about celebration ideas that reaches around 157,000 people a month. Growing it taught me what makes people stop, click and book.",
      "Now I use both skills to help local businesses get the customers they deserve.",
    ],
    facts: [
      { value: "3 years", label: "building websites and apps" },
      { value: "157k", label: "monthly views on my own Pinterest page" },
      { value: "2 languages", label: "I work in Sinhala and English" },
    ],
  },
  work: {
    title: "My work",
    celori: {
      title: "Celori on Pinterest",
      body:
        "My own brand of wedding, birthday, baby shower and anniversary ideas. I plan, design and publish every pin myself.",
      stat: "157,000",
      statLabel: "monthly views",
      link: "Visit Celori",
    },
    audit: {
      title: "Sample audit: a restaurant in Ratnapura",
      body: "What I found in 15 minutes, using only public information:",
      findings: [
        "4.9 star rating on Google, but only 22 reviews",
        "No Facebook post for three months",
        "Opening hours missing from Google Maps",
        "Lots of birthday parties, but no birthday package advertised",
      ],
      note: "This is the kind of report you'll get, free.",
    },
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
        a: "Maybe not. The free audit will show what's working and what isn't. If you're doing well, I'll tell you.",
      },
      {
        q: "My business isn't in Colombo. Can you still help?",
        a: "Yes. Most of the work is online, and I'm happy to visit businesses in Ratnapura and the Colombo area.",
      },
      {
        q: "How do I know it's working?",
        a: "Every month you get a short report showing reviews, page reach, messages and calls, compared with the month before.",
      },
    ],
  },
  contact: {
    title: "Find out what's stopping new customers",
    body: "Send me your business name on WhatsApp. I'll send back a free one-page report within two days.",
    cta: "Get a free audit on WhatsApp",
    ctaMsg: "Hi Iresha, I'd like a free audit. My business name is: ",
    or: "Or contact me directly",
    phone: "Phone",
    email: "Email",
  },
  footer: "Digital marketing and websites for Sri Lankan businesses",
};
