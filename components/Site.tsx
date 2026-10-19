"use client";

import { useEffect, useState } from "react";
import { content as t } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import ListingDemo from "./ListingDemo";
import { Marquee, Notifications, RotatingWord } from "./HeroBits";

// Soft background + icon colour for each service, in order.
const serviceTones = [
  { bg: "bg-sky-soft", icon: "bg-sky text-ink" },
  { bg: "bg-coral-soft", icon: "bg-coral text-white" },
  { bg: "bg-sun-soft", icon: "bg-sun text-ink" },
  { bg: "bg-grape-soft", icon: "bg-grape text-white" },
  { bg: "bg-mint-soft", icon: "bg-mint text-ink" },
  { bg: "bg-lilac", icon: "bg-ink text-white" },
];

const stepTones = ["bg-sun text-ink", "bg-coral text-white", "bg-mint text-ink"];

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-40 bg-sun/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
            <Logo />
            {site.brandName}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-ink/75 hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(t.hero.ctaMsg)}
              target="_blank"
              rel="noopener"
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-grape sm:inline-flex"
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="rounded-full p-2 hover:bg-ink/10 md:hidden"
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
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/10 px-4 pb-4 md:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-ink/10 py-3 font-semibold"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden bg-sun">
          <Shapes />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
            <div>
              <h1 className="text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
                <span className="animate-pop block" style={{ animationDelay: "50ms" }}>
                  {t.hero.title}
                </span>
                <span className="animate-pop mt-3 block" style={{ animationDelay: "250ms" }}>
                  {t.hero.findOn} <RotatingWord words={t.hero.channels} />
                </span>
              </h1>
              <p className="animate-pop mt-7 max-w-[50ch] text-lg text-ink/80" style={{ animationDelay: "450ms" }}>
                {t.hero.lead}
              </p>
              <div
                className="animate-pop mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                style={{ animationDelay: "600ms" }}
              >
                <WhatsAppButton href={whatsappLink(t.hero.ctaMsg)} label={t.hero.cta} />
                <a
                  href="#packages"
                  className="inline-flex justify-center rounded-full border-2 border-ink px-6 py-3 font-bold transition-colors hover:bg-ink hover:text-white"
                >
                  {t.hero.secondary}
                </a>
              </div>
              <p className="mt-4 text-sm text-ink/70">{t.hero.reassure}</p>
            </div>

            <div className="relative flex justify-center px-2 lg:justify-end lg:px-10">
              <Notifications notes={t.hero.notes} />
              <ListingDemo t={t.listing} />
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
        <section className="relative overflow-hidden bg-grape text-white">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-grape-deep" />
          <div aria-hidden className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full border-[18px] border-white/10" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.process.title}</h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="reveal" style={{ ["--delay" as string]: `${i * 150}ms` }}>
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold ${stepTones[i]} ${
                        i % 2 ? "rotate-3" : "-rotate-3"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i < t.process.steps.length - 1 && (
                      <span aria-hidden className="hidden h-0 flex-1 border-t-2 border-dashed border-white/40 md:block" />
                    )}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 max-w-[38ch] text-white/80">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="reveal text-3xl font-extrabold tracking-tight sm:text-5xl">{t.services.title}</h2>
          <p className="reveal mt-4 max-w-[60ch] text-lg text-muted">{t.services.lead}</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s, i) => {
              const tone = serviceTones[i % serviceTones.length];
              return (
                <div
                  key={s.title}
                  className={`reveal group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-0.6deg] ${tone.bg}`}
                  style={{ ["--delay" as string]: `${(i % 3) * 100}ms` }}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${tone.icon}`}
                  >
                    <ServiceIcon index={i} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-ink/70">{s.body}</p>
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
              <div aria-hidden className="animate-spin-slow absolute -inset-3 rounded-full border-[3px] border-dashed border-coral" />
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
          <div aria-hidden className="animate-float absolute right-[8%] top-12 h-24 w-24 rounded-full bg-coral" />
          <div
            aria-hidden
            className="animate-float absolute bottom-16 right-[24%] h-14 w-14 rounded-2xl bg-sun [--tilt:12deg]"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            aria-hidden
            className="animate-float absolute bottom-24 right-[4%] h-10 w-10 rounded-full bg-sky"
            style={{ animationDelay: "0.7s" }}
          />
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

// Decorative shapes drifting in the hero background.
function Shapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="animate-float absolute -left-10 top-24 h-28 w-28 rounded-full bg-coral/90" />
      <div
        className="animate-float absolute right-[46%] top-8 hidden h-10 w-10 rounded-xl bg-grape lg:block [--tilt:18deg]"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="animate-float absolute bottom-10 left-[42%] h-16 w-16 rounded-full border-[10px] border-sky"
        style={{ animationDelay: "2s" }}
      />
      <svg
        className="animate-spin-slow absolute -right-16 -top-16 h-64 w-64 text-white/60"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 0 58 36 94 22 66 48 100 62 62 64 70 100 50 70 30 100 38 64 0 62 34 48 6 22 42 36z" />
      </svg>
    </div>
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
    <span aria-hidden className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-ink">
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
