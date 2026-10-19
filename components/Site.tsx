"use client";

import { useState } from "react";
import { content as t } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import ListingDemo from "./ListingDemo";

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-40 bg-sapphire-deep/95 text-white backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <Gem />
            {site.brandName}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-white/80 hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(t.hero.ctaMsg)}
              target="_blank"
              rel="noopener"
              className="hidden rounded-full bg-leaf px-4 py-1.5 text-sm font-semibold hover:bg-leaf-deep sm:inline-flex"
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="block border-b border-white/10 py-3 font-medium"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="bg-sapphire-deep text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-20">
            <div>
              <h1 className="max-w-[17ch] text-[2.4rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg text-sapphire-soft">{t.hero.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton href={whatsappLink(t.hero.ctaMsg)} label={t.hero.cta} />
                <a
                  href="#packages"
                  className="inline-flex justify-center rounded-full border border-white/30 px-6 py-3.5 font-semibold hover:bg-white/10"
                >
                  {t.hero.secondary}
                </a>
              </div>
              <p className="mt-4 text-sm text-white/70">{t.hero.reassure}</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <ListingDemo t={t.listing} />
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
            <h2 className="max-w-[16ch] text-3xl font-bold tracking-tight sm:text-4xl">{t.problems.title}</h2>
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {t.problems.items.map((p) => (
                  <li key={p} className="flex gap-4 py-5 text-lg">
                    <span aria-hidden className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[56ch] text-muted">{t.problems.outro}</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.process.title}</h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sapphire text-lg font-bold text-white">
                      {i + 1}
                    </span>
                    {i < t.process.steps.length - 1 && (
                      <span aria-hidden className="hidden h-px flex-1 bg-sapphire/25 md:block" />
                    )}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 max-w-[38ch] text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.services.title}</h2>
          <p className="mt-4 max-w-[60ch] text-lg text-muted">{t.services.lead}</p>
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s) => (
              <div key={s.title} className="border-t-2 border-ink py-6">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.packages.title}</h2>
            <p className="mt-4 max-w-[60ch] text-lg text-muted">{t.packages.lead}</p>

            <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
              {t.packages.list.map((p) => (
                <article
                  key={p.name}
                  className={`flex h-full flex-col rounded-3xl p-7 ${
                    p.featured
                      ? "bg-sapphire-deep text-white shadow-[0_24px_50px_-24px_rgba(26,38,104,0.7)] lg:-mt-4 lg:pb-11"
                      : "border border-line bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.featured && (
                      <span className="rounded-full bg-padpa px-3 py-1 text-xs font-bold text-sapphire-deep">
                        {t.packages.popular}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${p.featured ? "text-sapphire-soft" : "text-muted"}`}>{p.note}</p>
                  <p className="mt-6 text-4xl font-bold tracking-tight">{p.price}</p>
                  <p className={`text-sm ${p.featured ? "text-sapphire-soft" : "text-muted"}`}>{p.per}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <svg
                          aria-hidden
                          className={`mt-1 shrink-0 ${p.featured ? "text-padpa" : "text-leaf"}`}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                        >
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(t.packages.choiceMsg(p.name))}
                    target="_blank"
                    rel="noopener"
                    className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 font-semibold ${
                      p.featured
                        ? "bg-leaf text-white hover:bg-leaf-deep"
                        : "border border-sapphire text-sapphire hover:bg-sapphire hover:text-white"
                    }`}
                  >
                    {t.packages.choose}
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h3 className="text-xl font-bold">{t.packages.extrasTitle}</h3>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {t.packages.extras.map((e) => (
                    <div key={e.label} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3.5">
                      <dt>{e.label}</dt>
                      <dd className="font-semibold">{e.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <p className="self-end rounded-2xl border-l-4 border-leaf bg-white p-5 text-muted">{t.packages.adsNote}</p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid gap-12 md:grid-cols-[auto_1fr] md:gap-16">
            {/* Replace with a real photo: put it in /public/iresha.jpg and swap this block for an <img>. */}
            <div
              aria-hidden
              className="flex h-40 w-40 items-center justify-center rounded-full bg-padpa-soft text-5xl font-bold text-sapphire-deep md:h-56 md:w-56 md:text-7xl"
            >
              {site.ownerName
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.title}</h2>
              <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-muted">
                {t.about.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <dl className="mt-10 grid max-w-xl gap-6 sm:grid-cols-2">
                {t.about.facts.map((f) => (
                  <div key={f.label} className="flex flex-col border-t border-line pt-4">
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="order-first text-3xl font-bold tracking-tight text-sapphire">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="bg-mist">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.work.title}</h2>
            <p className="mt-4 max-w-[60ch] text-lg text-muted">{t.work.lead}</p>
            {t.work.projects.map((p) => (
              <article key={p.name} className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                {/* Browser frame showing the live site's name and occasions */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={p.link}
                  className="block overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_50px_-28px_rgba(26,38,104,0.5)]"
                >
                  <div className="flex items-center gap-2 border-b border-line bg-mist/60 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f0a4ae]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f3d08a]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#9fd3b5]" />
                    <span className="ml-3 truncate rounded-full bg-white px-3 py-1 text-xs text-muted">{p.domain}</span>
                  </div>
                  <div className="bg-padpa-soft px-7 py-10 sm:px-10 sm:py-14">
                    <p className="text-sm font-semibold text-[#8a2a3c]">{p.name}</p>
                    <p className="mt-2 max-w-[14ch] text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#5b1f2c] sm:text-5xl">
                      Ideas for every celebration
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {["Weddings", "Birthdays", "Baby showers", "Anniversaries"].map((o) => (
                        <span key={o} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-[#8a2a3c]">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
                <div>
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <p className="mt-3 max-w-[52ch] text-lg text-muted">{p.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <svg aria-hidden className="mt-1 shrink-0 text-leaf" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex rounded-full border border-sapphire px-5 py-3 font-semibold text-sapphire hover:bg-sapphire hover:text-white"
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.faq.title}</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    aria-hidden
                    className="shrink-0 text-sapphire transition-transform duration-200 group-open:rotate-45"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-[62ch] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-sapphire-deep text-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight sm:text-5xl">{t.contact.title}</h2>
            <p className="mt-5 max-w-[56ch] text-lg text-sapphire-soft">{t.contact.body}</p>
            <div className="mt-8">
              <WhatsAppButton href={whatsappLink(t.contact.ctaMsg)} label={t.contact.cta} />
            </div>
            <p className="mt-12 text-sm text-white/70">{t.contact.or}</p>
            <dl className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-12">
              <div>
                <dt className="text-sm text-white/60">{t.contact.phone}</dt>
                <dd>
                  <a href={`tel:+${site.whatsapp}`} className="text-lg font-semibold hover:underline">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">{t.contact.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-lg font-semibold hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-semibold text-white">{site.brandName}</p>
            <p>{t.footer}</p>
          </div>
          <div className="flex gap-5">
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-white">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-white">
              Instagram
            </a>
            <a href={site.pinterest} target="_blank" rel="noopener" className="hover:text-white">
              Pinterest
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function WhatsAppButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-leaf px-6 py-3.5 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(18,128,90,0.8)] hover:bg-leaf-deep"
    >
      <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
      </svg>
      {label}
    </a>
  );
}

function Gem() {
  return (
    <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12l4 6-10 12L2 9z" fill="#ec7a8a" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6z" stroke="#1a2668" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
