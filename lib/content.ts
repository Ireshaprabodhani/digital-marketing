// All page text, in English and Sinhala.
// To change wording, edit both `en` and `si` so the two languages stay in step.

export type Lang = "en" | "si";

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
  langLabel: string;
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

export const content: Record<Lang, Content> = {
  en: {
    nav: {
      services: "Services",
      packages: "Packages",
      about: "About",
      faq: "Questions",
      cta: "Free audit",
    },
    langLabel: "සිංහල",
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
        { value: "සිං / EN", label: "I work in Sinhala and English" },
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
  },

  si: {
    nav: {
      services: "සේවා",
      packages: "පැකේජ",
      about: "මා ගැන",
      faq: "ප්‍රශ්න",
      cta: "නොමිලේ audit",
    },
    langLabel: "English",
    hero: {
      title: "මිනිස්සු දැනටමත් ඔයාගේ business එක හොයනවා. ඔවුන්ට එය හොයාගන්න දෙන්න.",
      lead:
        "ලංකාවේ restaurants, salons සහ local කඩවලට Google Maps එකේ පේන්න, Facebook සහ Instagram ජීවමානව තියාගන්න, සහ බලන අය bookings බවට පත් කරගන්න මම උදව් කරනවා.",
      cta: "WhatsApp හරහා නොමිලේ audit එකක්",
      ctaMsg: "ආයුබෝවන් ඉරේෂා, මගේ business එකට නොමිලේ audit එකක් ඕන.",
      secondary: "පැකේජ බලන්න",
      reassure: "සිංහලෙන් හෝ ඉංග්‍රීසියෙන් නොමිලේ report එකක්. කිසිම බැඳීමක් නෑ.",
    },
    listing: {
      caption: "Google Maps listing එකක උදාහරණයක්, හදන්න කලින් සහ පස්සේ",
      before: "කලින්",
      after: "පස්සේ",
      name: "Hela Rasa Kitchen",
      kind: "Restaurant · රත්නපුර",
      reviewsBefore: "reviews 9",
      reviewsAfter: "reviews 64",
      hoursMissing: "Open වෙලාවල් දාලා නෑ",
      hoursOk: "දැන් open · රෑ 10ට වහනවා",
      noPhotos: "අයිතිකරුගේ photos නෑ",
      photos: "කෑම, menu සහ ඇතුළත photos",
      noWebsite: "Website එකක් හෝ menu එකක් නෑ",
      website: "Website",
      call: "Call",
      directions: "පාර",
      whatsapp: "WhatsApp",
      menu: "Menu",
      post: "අලුත්: අමුත්තන් 25 දක්වා Birthday party package",
    },
    problems: {
      title: "මේ ඔයාගේ business එකටත් වෙනවද?",
      items: [
        "Customersලා කෑමට ආසයි, ඒත් review දාලා තියෙන්නේ ටික දෙනයි.",
        "Facebook page එකේ මාස ගාණකින් අලුත් post එකක් නෑ.",
        "Google Maps එකේ open වෙලාවල් පෙන්නන්නේ නැති නිසා, මිනිස්සු open කියලා දන්න වෙන තැනකට යනවා.",
        "Birthdays, events කරනවා, ඒත් online කවුරුත් ඒ ගැන දන්නේ නෑ.",
      ],
      outro: "මේවා හදන්න ලේසි පොඩි දේවල්. ඒත් හැම සතියකම මේවා නිසා customersලා නැති වෙනවා.",
    },
    process: {
      title: "අපි පටන් ගන්නේ මෙහෙමයි",
      steps: [
        {
          title: "නොමිලේ audit එක",
          body:
            "මම ඔයාගේ Google, Facebook සහ Instagram බලලා, අලුත් customersලා එන එක නවත්වන දේවල් පෙන්නන පිටුවක report එකක් WhatsApp කරනවා.",
        },
        {
          title: "නොමිලේ පළමු fix එක",
          body:
            "ඔයාගේ Google Maps profile එක වෙලාවල්, photos, menu සහ WhatsApp button එකත් එක්ක නොමිලේ සම්පූර්ණ කරලා දෙනවා, වෙනස ඔයාටම බලන්න.",
        },
        {
          title: "කැමති නම් විතරක් මාසික plan එක",
          body:
            "ඔයා සතුටු නම්, සරල මාසික plan එකකට එකඟ වෙමු. මුල් මාස තුනෙන් පස්සේ ඕන වෙලාවක නවත්වන්න පුළුවන්.",
        },
      ],
    },
    services: {
      title: "මට ඔයාට කරලා දෙන්න පුළුවන් දේවල්",
      lead: "එක සේවාවක් හෝ කිහිපයක් එකට තෝරන්න. හැමදේම සරල සිංහලෙන් හෝ ඉංග්‍රීසියෙන් පැහැදිලි කරනවා.",
      items: [
        {
          title: "Google Maps profile",
          body: "වෙලාවල්, photos, menu, WhatsApp link සහ නිතරම අලුත් reviews.",
        },
        {
          title: "Facebook සහ Instagram posts",
          body: "ඔයාගේ කෑම, offers සහ events ගැන, ඔයාගේ brand එකට ගැලපෙන විදියට නිතර posts.",
        },
        {
          title: "Reels සහ කෙටි videos",
          body: "ඔයාගේ තැන සහ කෑම පෙන්නන කෙටි videos, TikTok logo නැතුව.",
        },
        {
          title: "Websites සහ online menus",
          body:
            "Menu, offers, ලිපිනය සහ booking එක්ක වේගවත් website එකක්. මම software engineer කෙනෙක් නිසා හරියටම හදනවා.",
        },
        {
          title: "Facebook සහ Instagram ads",
          body: "ඔයා ළඟ ඉන්න අයට යන ads, සල්ලි වලට ලැබුණු දේ පැහැදිලිව පෙන්නන reports එක්ක.",
        },
        {
          title: "Events සහ tourism සඳහා Pinterest",
          body: "විදේශීය customersලාට යන්න ඕන wedding, birthday සහ travel businesses සඳහා.",
        },
      ],
    },
    packages: {
      title: "මාසික පැකේජ",
      lead: "මිල මාසයකට. මුල් මාස තුන කලින් එකඟ වෙනවා, ඊට පස්සේ මාසෙන් මාසෙට.",
      choose: "මේ පැකේජය ගැන අහන්න",
      choiceMsg: (name) => `ආයුබෝවන් ඉරේෂා, ${name} පැකේජය ගැන තව දැනගන්න කැමතියි.`,
      popular: "වැඩිපුරම තෝරන",
      list: [
        {
          name: "Starter",
          price: "රු. 12,000",
          per: "මාසයකට",
          note: "මුල්ම වතාවට online එන businesses සඳහා.",
          items: [
            "මාසෙට posts 8ක් සහ reels 2ක්",
            "Google Maps profile එක update කරලා තියනවා",
            "Comments සහ messages වලට පිළිතුරු",
          ],
        },
        {
          name: "Growth",
          price: "රු. 20,000",
          per: "මාසයකට",
          note: "තව bookings ඕන restaurants සහ salons සඳහා.",
          featured: true,
          items: [
            "මාසෙට posts 12ක් සහ reels 4ක්",
            "Table QR cards එක්ක Google review campaign එකක්",
            "මාසෙට විශේෂ campaign එකක්, උදා: birthday package",
            "ඇත්ත ගණන් එක්ක මාසික report එකක්",
          ],
        },
        {
          name: "Full service",
          price: "රු. 35,000",
          per: "මාසයකට",
          note: "Ads දාලා ඉක්මනට වර්ධනය වෙන්න ලෑස්ති businesses සඳහා.",
          items: [
            "Growth එකේ තියෙන හැමදේම",
            "Facebook සහ Instagram ads කළමනාකරණය",
            "TikTok posting",
            "මාසෙට photo shoot එකක්",
          ],
        },
      ],
      extrasTitle: "එක වතාවක වැඩ",
      extras: [
        { label: "Menu සහ booking සහිත website එකක්", value: "රු. 35,000 සිට" },
        { label: "Google Maps profile setup", value: "ඕනම පැකේජයක් එක්ක නොමිලේ" },
        { label: "Domain සහ hosting", value: "අවුරුද්දකට රු. 12,000 පමණ" },
      ],
      adsNote:
        "Ads සල්ලි ඔයාම ඔයාගේ card එකෙන් කෙලින්ම Facebook එකට ගෙවනවා. ඒ සල්ලි මා හරහා යන්නේ නෑ, ඉතින් වියදම් වුණු දේ ඔයාට හරියටම පේනවා.",
    },
    about: {
      title: "ආයුබෝවන්, මම ඉරේෂා",
      body: [
        "මම අවුරුදු තුනක අත්දැකීම් තියෙන full-stack software engineer කෙනෙක්. ලංකාව, කැනඩාව සහ UAE වල clientsලාට websites සහ apps හදලා තියෙනවා.",
        "ඒ වගේම මම Celori කියන celebration ideas Pinterest page එක පවත්වාගෙන යනවා. ඒක මාසෙකට 157,000ක් පමණ අයට යනවා. ඒක වර්ධනය කරද්දී මිනිස්සු නතර වෙලා, click කරලා, book කරන්නේ මොකද කියලා මම ඉගෙන ගත්තා.",
        "දැන් මේ හැකියාවන් දෙකම local businesses වලට ඔවුන්ට ලැබිය යුතු customersලා ගෙන්න පාවිච්චි කරනවා.",
      ],
      facts: [
        { value: "අවු. 3", label: "websites සහ apps හදනවා" },
        { value: "157k", label: "මගේම Pinterest page එකේ මාසික views" },
        { value: "සිං / EN", label: "සිංහලෙන් සහ ඉංග්‍රීසියෙන් වැඩ කරනවා" },
      ],
    },
    work: {
      title: "මගේ වැඩ",
      celori: {
        title: "Pinterest එකේ Celori",
        body:
          "Wedding, birthday, baby shower සහ anniversary ideas ගැන මගේම brand එක. හැම pin එකක්ම මමම plan කරලා, design කරලා, publish කරනවා.",
        stat: "157,000",
        statLabel: "මාසික views",
        link: "Celori බලන්න",
      },
      audit: {
        title: "Audit උදාහරණයක්: රත්නපුරේ restaurant එකක්",
        body: "Public තොරතුරු විතරක් පාවිච්චි කරලා විනාඩි 15කින් හොයාගත්ත දේ:",
        findings: [
          "Google එකේ 4.9 star rating එකක්, ඒත් reviews 22යි",
          "මාස තුනකින් Facebook post එකක් නෑ",
          "Google Maps එකේ open වෙලාවල් නෑ",
          "Birthday parties ගොඩක්, ඒත් birthday package එකක් advertise කරලා නෑ",
        ],
        note: "ඔයාටත් නොමිලේ ලැබෙන්නේ මේ වගේ report එකක්.",
      },
    },
    faq: {
      title: "නිතර අහන ප්‍රශ්න",
      items: [
        {
          q: "දිගු කාලීන ගිවිසුමකට අත්සන් කරන්න ඕනද?",
          a: "නෑ. Results බලන්න කාලය ලැබෙන්න මුල් මාස තුනට එකඟ වෙනවා. ඊට පස්සේ ඕන වෙලාවක නවත්වන්න පුළුවන්.",
        },
        {
          q: "මම දැනටමත් Facebook එකේ post දානවා. එහෙනම් මේක ඕනද?",
          a: "සමහරවිට ඕන නැති වෙයි. නොමිලේ audit එකෙන් හරියට යන දේ සහ නොයන දේ පේනවා. ඔයා හොඳට කරනවා නම්, මම ඒකත් කියනවා.",
        },
        {
          q: "මගේ business එක කොළඹ නෙවෙයි. උදව් කරන්න පුළුවන්ද?",
          a: "ඔව්. වැඩ වැඩිපුරම online. රත්නපුරේ සහ කොළඹ අවට businesses වලට එන්නත් කැමතියි.",
        },
        {
          q: "වැඩ කරනවද කියලා මම දැනගන්නේ කොහොමද?",
          a: "හැම මාසෙම reviews, page reach, messages සහ calls, කලින් මාසෙත් එක්ක සසඳලා පෙන්නන කෙටි report එකක් ලැබෙනවා.",
        },
      ],
    },
    contact: {
      title: "අලුත් customersලා එන එක නවත්වන්නේ මොකද කියලා දැනගන්න",
      body: "ඔයාගේ business එකේ නම WhatsApp කරන්න. දවස් දෙකක් ඇතුළත නොමිලේ පිටුවක report එකක් එවනවා.",
      cta: "WhatsApp හරහා නොමිලේ audit එකක්",
      ctaMsg: "ආයුබෝවන් ඉරේෂා, නොමිලේ audit එකක් ඕන. මගේ business එකේ නම: ",
      or: "නැත්නම් කෙලින්ම සම්බන්ධ වෙන්න",
      phone: "දුරකථනය",
      email: "Email",
    },
    footer: "ලාංකීය businesses සඳහා digital marketing සහ websites",
  },
};
