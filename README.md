# Iresha Digital – portfolio site

A one-page site for my digital marketing and website services for Sri Lankan businesses. Every call to action opens WhatsApp with a ready-made message.

Built with Next.js 15, TypeScript and Tailwind CSS 4, exported as a static site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit the content

| What | File |
|---|---|
| Brand name, WhatsApp number, phone, email, social links | `lib/site.ts` |
| All page text | `lib/content.ts` |
| Page layout and sections | `components/Site.tsx` |
| Before/after Google listing in the hero | `components/ListingDemo.tsx` |
| Colours and fonts | `app/globals.css` |

**Before going live:** set your real WhatsApp number (`94` + number without the leading 0), phone, email and social links in `lib/site.ts`.

**Adding your photo:** put it at `public/iresha.jpg`, then in `components/Site.tsx` replace the initials circle in the About section with:

```tsx
<img src="/iresha.jpg" alt="Iresha Prabodhani" className="h-40 w-40 rounded-full object-cover md:h-56 md:w-56" />
```

## Deploy (free)

**Vercel (easiest):** import this repo at vercel.com/new and click Deploy. No settings needed.

**Netlify:** build command `npm run build`, publish directory `out`.

`npm run build` writes the finished website to `out/`, which can be uploaded to any static host.
