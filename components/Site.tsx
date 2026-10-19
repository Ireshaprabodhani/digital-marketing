"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { content as t } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import ListingDemo from "./ListingDemo";
import { Marquee, NotificationStack, Typewriter } from "./HeroBits";

// Soft background + icon colour for each service, in order.
const serviceTones = [
  { bg: "bg-sky-soft", icon: "bg-sky text-ink" },
  { bg: "bg-coral-soft", icon: "bg-coral text-white" },
  { bg: "bg-sun-soft", icon: "bg-sun text-ink" },
  { bg: "bg-grape-soft", icon: "bg-grape text-white" },
  { bg: "bg-mint-soft", icon: "bg-mint text-ink" },
  { bg: "bg-lilac", icon: "bg-ink text-white" },
];

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [live, setLive] = useState(false);
  const onListingChange = useCallback((after: boolean) => setLive(after), []);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const nav = [
    { href: "#services", label: t.nav.services },
    { href: "#packages", label: t.nav.packages },
    { href: "#about", label: t.nav.about },
    { href: "#work", label: t.nav.work },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
            <Logo />
            {site.brandName}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-white/70 transition-colors hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(t.hero.ctaMsg)}
              target="_blank"
              rel="noopener"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sun sm:inline-flex"
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="rounded-full p-2 hover:bg-white/10 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 px-4 pb-4 md:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-3 font-semibold"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden bg-ink text-white">
          <HeroGlow />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
            <div>
              <p className="animate-pop inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white/85 ring-1 ring-white/15">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                {t.hero.badge}
              </p>
              <h1
                className="animate-pop mt-6 max-w-[15ch] text-[2.4rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-6xl"
                style={{ animationDelay: "120ms" }}
              >
                {t.hero.title}
              </h1>
              <p className="animate-pop mt-5 text-xl font-semibold text-white/85 sm:text-2xl" style={{ animationDelay: "260ms" }}>
                {t.hero.findOn} <Typewriter words={t.hero.channels} />
              </p>
              <p className="animate-pop mt-6 max-w-[50ch] text-lg text-white/70" style={{ animationDelay: "380ms" }}>
                {t.hero.lead}
              </p>
              <div
                className="animate-pop mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{ animationDelay: "500ms" }}
              >
                <WhatsAppButton href={whatsappLink(t.hero.ctaMsg)} label={t.hero.cta} />
                <a
                  href="#packages"
                  className="inline-flex justify-center rounded-full border border-white/30 px-6 py-3.5 font-bold transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  {t.hero.secondary}
                </a>
              </div>
              <p className="mt-4 text-sm text-white/55">{t.hero.reassure}</p>
            </div>

            <div className="relative flex justify-center lg:justify-start lg:pl-6">
              <NotificationStack notes={t.hero.notes} active={live} />
              <ListingDemo t={t.listing} onChange={onListingChange} />
            </div>
          </div>
        </section>

        <Marquee items={t.hero.marquee} />

        {/* Problems */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
            <h2 className="reveal max-w-[16ch] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {t.problems.title}
            </h2>
            <div>
              <ul className="space-y-3">
                {t.problems.items.map((p, i) => (
                  <li
                    key={p}
                    className="reveal flex gap-4 rounded-2xl border-2 border-coral-soft bg-white px-5 py-4 text-lg"
                    style={{ ["--delay" as string]: `${i * 90}ms` }}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-sm font-bold text-white"
                    >
                      !
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="reveal mt-6 max-w-[56ch] text-muted">{t.problems.outro}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <ProcessSection />

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.services.title}</h2>
          <p className="reveal mt-4 max-w-[60ch] text-lg text-muted">{t.services.lead}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onMouseMove={trackSpotlight}>
            {t.services.items.map((s, i) => {
              const tone = serviceTones[i % serviceTones.length];
              return (
                <div
                  key={s.title}
                  data-spot
                  className={`reveal group relative overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${tone.bg}`}
                  style={{ ["--delay" as string]: `${(i % 3) * 100}ms` }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.85), transparent 65%)",
                    }}
                  />
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tone.icon}`}
                  >
                    <ServiceIcon index={i} />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="relative mt-2 text-ink/70">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="bg-lilac">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.packages.title}</h2>
            <p className="reveal mt-4 max-w-[60ch] text-lg text-muted">{t.packages.lead}</p>

            <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
              {t.packages.list.map((p, i) => (
                <article
                  key={p.name}
                  className={`reveal flex h-full flex-col rounded-3xl p-7 ${
                    p.featured
                      ? "bg-grape text-white shadow-[0_28px_50px_-24px_rgba(74,31,214,0.75)] lg:-mt-4 lg:pb-11"
                      : "border-2 border-grape-soft bg-white"
                  }`}
                  style={{ ["--delay" as string]: `${i * 120}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.featured && (
                      <span className="rotate-3 rounded-full bg-sun px-3 py-1 text-xs font-extrabold text-ink">
                        {t.packages.popular}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${p.featured ? "text-white/80" : "text-muted"}`}>{p.note}</p>
                  <p className="mt-6 text-4xl font-extrabold tracking-tight">{p.price}</p>
                  <p className={`text-sm ${p.featured ? "text-white/80" : "text-muted"}`}>{p.per}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <Check className={p.featured ? "text-sun" : "text-mint-deep"} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(t.packages.choiceMsg(p.name))}
                    target="_blank"
                    rel="noopener"
                    className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 font-bold transition-colors ${
                      p.featured
                        ? "bg-sun text-ink hover:bg-white"
                        : "border-2 border-grape text-grape hover:bg-grape hover:text-white"
                    }`}
                  >
                    {t.packages.choose}
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <div className="reveal">
                <h3 className="text-xl font-bold">{t.packages.extrasTitle}</h3>
                <dl className="mt-4 divide-y divide-grape-soft border-y border-grape-soft">
                  {t.packages.extras.map((e) => (
                    <div key={e.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3.5">
                      <dt>{e.label}</dt>
                      <dd className="font-bold">{e.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="reveal self-end rounded-2xl border-l-4 border-mint bg-white p-5 text-muted">
                {t.packages.adsNote}
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
            {/* Replace with a real photo: put it in /public/iresha.jpg and swap the initials for an <img>. */}
            <div className="reveal relative mx-auto h-48 w-48 md:h-64 md:w-64">
              <div aria-hidden className="absolute -inset-3 rounded-full border-[3px] border-dashed border-coral" />
              <div aria-hidden className="absolute -right-2 top-2 h-10 w-10 rounded-full bg-sun" />
              <div aria-hidden className="absolute -left-1 bottom-4 h-7 w-7 rotate-12 rounded-lg bg-sky" />
              <div
                aria-hidden
                className="flex h-full w-full items-center justify-center rounded-full bg-grape text-6xl font-extrabold text-white md:text-7xl"
              >
                {site.ownerName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
            </div>
            <div>
              <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.about.title}</h2>
              <div className="reveal mt-6 max-w-[62ch] space-y-4 text-lg text-muted">
                {t.about.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
                {t.about.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`reveal flex flex-col rounded-2xl p-5 ${i % 2 ? "bg-mint-soft" : "bg-sun-soft"}`}
                    style={{ ["--delay" as string]: `${i * 120}ms` }}
                  >
                    <dt className="text-sm text-ink/70">{f.label}</dt>
                    <dd className="order-first text-3xl font-extrabold tracking-tight">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="bg-mint-soft">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.work.title}</h2>
            <p className="reveal mt-4 max-w-[60ch] text-lg text-muted">{t.work.lead}</p>
            {t.work.projects.map((p) => (
              <article key={p.name} className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                {/* Browser frame showing the live site's tagline and occasions */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={p.link}
                  className="reveal block overflow-hidden rounded-2xl bg-white shadow-[0_28px_50px_-26px_rgba(15,140,98,0.6)] transition-transform duration-500 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-coral" />
                    <span className="h-3 w-3 rounded-full bg-sun" />
                    <span className="h-3 w-3 rounded-full bg-mint" />
                    <span className="ml-3 truncate rounded-full bg-lilac px-3 py-1 text-xs text-muted">{p.domain}</span>
                  </div>
                  <div className="bg-coral-soft px-7 py-10 sm:px-10 sm:py-14">
                    <p className="text-sm font-bold text-[#a3233f]">{p.name}</p>
                    <p className="mt-2 max-w-[14ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#5b1f2c] sm:text-5xl">
                      Ideas for every celebration
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {["Weddings", "Birthdays", "Baby showers", "Anniversaries"].map((o) => (
                        <span key={o} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#a3233f]">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
                <div className="reveal" style={{ ["--delay" as string]: "150ms" }}>
                  <h3 className="text-2xl font-extrabold">{p.name}</h3>
                  <p className="mt-3 max-w-[52ch] text-lg text-muted">{p.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <Check className="text-mint-deep" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 font-bold text-white transition-colors hover:bg-grape"
                  >
                    {p.link}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.faq.title}</h2>
          <div className="mt-10 space-y-3">
            {t.faq.items.map((f, i) => (
              <details
                key={f.q}
                className="reveal group rounded-2xl border-2 border-grape-soft px-5 py-4 open:border-grape open:bg-lilac"
                style={{ ["--delay" as string]: `${i * 80}ms` }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-grape text-white transition-transform duration-300 group-open:rotate-45">
                    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden bg-ink text-white">
          <HeroGlow />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="reveal max-w-[18ch] text-3xl font-extrabold tracking-tight sm:text-6xl">{t.contact.title}</h2>
            <p className="reveal mt-5 max-w-[52ch] text-lg text-white/75">{t.contact.body}</p>
            <div className="reveal mt-8">
              <WhatsAppButton href={whatsappLink(t.contact.ctaMsg)} label={t.contact.cta} />
            </div>
            <p className="mt-12 text-sm text-white/60">{t.contact.or}</p>
            <dl className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-12">
              <div>
                <dt className="text-sm text-white/50">{t.contact.phone}</dt>
                <dd>
                  <a href={`tel:+${site.whatsapp}`} className="text-lg font-bold hover:text-sun">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/50">{t.contact.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-lg font-bold hover:text-sun">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="bg-[#120e22] text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-bold text-white">{site.brandName}</p>
            <p>{t.footer}</p>
          </div>
          <div className="flex gap-5">
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-sun">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-sun">
              Instagram
            </a>
            <a href={site.pinterest} target="_blank" rel="noopener" className="hover:text-sun">
              Pinterest
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

// Soft colour glows and a faint dot grid behind dark sections.
function HeroGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-grape opacity-50 blur-[120px]" />
      <div className="absolute -bottom-48 -left-24 h-[420px] w-[420px] rounded-full bg-coral opacity-25 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-[260px] w-[260px] rounded-full bg-sky opacity-20 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at 70% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 40%, black, transparent 75%)",
        }}
      />
    </div>
  );
}

// Moves the light under the mouse inside whichever service tile it's over.
function trackSpotlight(e: React.MouseEvent<HTMLElement>) {
  const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
  if (!tile) return;
  const r = tile.getBoundingClientRect();
  tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
  tile.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const stepTones = ["bg-sun text-ink", "bg-coral text-white", "bg-mint text-ink"];

// "How we start": a line fills from step 1 to 3 as you scroll through,
// and each number lights up when the line reaches it.
function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (r.height * 0.75);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const steps = t.process.steps;
  return (
    <section ref={ref} className="relative overflow-hidden bg-grape text-white">
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-grape-deep" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.process.title}</h2>
        <div className="relative mt-14">
          {/* Track and fill: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-7 right-[calc((100%_-_4rem)/3_-_1.75rem)] top-7 hidden h-1 rounded-full bg-white/15 md:block">
            <div
              className="h-full origin-left rounded-full bg-gradient-to-r from-sun via-coral to-mint"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <div aria-hidden className="absolute bottom-10 left-7 top-7 w-1 rounded-full bg-white/15 md:hidden">
            <div
              className="w-full origin-top rounded-full bg-gradient-to-b from-sun via-coral to-mint"
              style={{ height: "100%", transform: `scaleY(${progress})` }}
            />
          </div>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => {
              const on = progress >= (steps.length > 1 ? i / (steps.length - 1) : 0) - 0.02;
              return (
                <li key={s.title} className="relative pl-20 md:pl-0">
                  <span
                    className={`absolute left-0 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold transition-all duration-500 md:static ${
                      on ? `${stepTones[i]} scale-100 shadow-[0_0_0_6px_rgba(255,255,255,0.12)]` : "scale-90 bg-grape-deep text-white/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3 className={`text-xl font-bold transition-opacity duration-500 md:mt-6 ${on ? "opacity-100" : "opacity-60"}`}>
                    {s.title}
                  </h3>
                  <p className={`mt-2 max-w-[38ch] transition-opacity duration-500 ${on ? "text-white/85" : "text-white/50"}`}>
                    {s.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-mint-deep px-6 py-3.5 font-bold text-white shadow-[0_12px_26px_-10px_rgba(15,140,98,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-[#0b7a55]"
    >
      <svg
        aria-hidden
        className="transition-transform duration-300 group-hover:rotate-12"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
      </svg>
      {label}
    </a>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`mt-1 shrink-0 ${className}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

function Logo() {
  return (
    <span aria-hidden className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-grape">
      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-coral" />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffd23f" strokeWidth="3" strokeLinecap="round">
        <path d="M4 18 10 11l4 4 6-8" />
      </svg>
    </span>
  );
}

// Icons in the same order as the services list.
function ServiceIcon({ index }: { index: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (index) {
    case 0: // map pin
      return (
        <svg {...common}>
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case 1: // post
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="m7 15 3-3 3 3 4-5" />
        </svg>
      );
    case 2: // play
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m10 9 5 3-5 3z" />
        </svg>
      );
    case 3: // code window
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="3" />
          <path d="M2.5 8.5h19M9 13l-2 2 2 2M15 13l2 2-2 2" />
        </svg>
      );
    case 4: // megaphone
      return (
        <svg {...common}>
          <path d="M3 10v4h3l7 4V6L6 10z" />
          <path d="M17 9a4 4 0 0 1 0 6" />
        </svg>
      );
    default: // pin board
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M11 17l1.5-6M10 9.5a2.5 2.5 0 1 1 3 2.4" />
        </svg>
      );
  }
}
