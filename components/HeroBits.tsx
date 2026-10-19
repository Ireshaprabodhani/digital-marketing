"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";

// Each channel is typed out in its own colour, then erased for the next.
const wordColours = ["text-sky", "text-coral", "text-[#ff8fd8]", "text-mint", "text-sun"];

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<"hold" | "erase" | "type">("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[index];
    let id: number;
    if (phase === "hold") {
      id = window.setTimeout(() => setPhase("erase"), 1600);
    } else if (phase === "erase") {
      if (text.length === 0) {
        setIndex((i) => (i + 1) % words.length);
        setPhase("type");
        return;
      }
      id = window.setTimeout(() => setText(text.slice(0, -1)), 35);
    } else {
      const next = words[index];
      if (text === next) {
        setPhase("hold");
        return;
      }
      id = window.setTimeout(() => setText(next.slice(0, text.length + 1)), 75);
    }
    void word;
    return () => window.clearTimeout(id);
  }, [phase, text, index, words]);

  return (
    <span className="whitespace-nowrap">
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={`font-extrabold ${wordColours[index % wordColours.length]}`}>
        {text}
      </span>
      <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.15em] animate-pulse rounded bg-white/80" />
    </span>
  );
}

const toneStyles: Record<Content["hero"]["notes"][number]["tone"], { dot: string; icon: string }> = {
  sun: { dot: "bg-sun text-ink", icon: "★" },
  mint: { dot: "bg-mint text-ink", icon: "✓" },
  coral: { dot: "bg-coral text-white", icon: "♥" },
  sky: { dot: "bg-sky text-ink", icon: "⌖" },
};

const SLOT = 68; // px between stacked notifications
const VISIBLE = 3;

// Phone-style notifications that arrive one by one while the listing is
// in its "after" state, stacking up like a real lock screen.
export function NotificationStack({ notes, active }: { notes: Content["hero"]["notes"]; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const first = window.setTimeout(() => setCount(1), 900);
    const id = window.setInterval(() => setCount((c) => c + 1), 2300);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [active]);

  // Newest first; keep one extra so the oldest can fade out smoothly.
  const items = Array.from({ length: Math.min(count, VISIBLE + 1) }, (_, slot) => {
    const seq = count - 1 - slot;
    return { seq, slot, note: notes[seq % notes.length] };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute -right-6 top-14 z-20 hidden h-[230px] w-[250px] lg:block xl:-right-16">
      {items.map(({ seq, slot, note }) => (
        <div
          key={seq}
          className="absolute inset-x-0 top-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,.9,.3,1)]"
          style={{
            transform: `translateY(${slot * SLOT}px) scale(${1 - slot * 0.04})`,
            opacity: slot >= VISIBLE ? 0 : 1 - slot * 0.18,
          }}
        >
          <div className="animate-notif flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-[0_16px_32px_-14px_rgba(0,0,0,0.6)] ring-1 ring-black/5 backdrop-blur">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${toneStyles[note.tone].dot}`}>
              {toneStyles[note.tone].icon}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-ink">{note.text}</span>
              <span className="block text-xs text-muted">{note.sub}</span>
            </span>
            <span className="ml-auto self-start text-[10px] text-muted">now</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const journeyTones = [
  { on: "bg-sky text-ink", ring: "ring-sky/40", glow: "bg-sky" },
  { on: "bg-sun text-ink", ring: "ring-sun/40", glow: "bg-sun" },
  { on: "bg-coral text-white", ring: "ring-coral/40", glow: "bg-coral" },
  { on: "bg-mint text-ink", ring: "ring-mint/40", glow: "bg-mint" },
];

// A customer's path from search to booking. When the band is on screen,
// a glowing dot travels from step to step and lights each one up, then
// the journey starts over. Hovering a step jumps straight to it.
export function Journey({ journey }: { journey: Content["hero"]["journey"] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const last = journey.steps.length - 1;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(last);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [last]);

  useEffect(() => {
    if (!inView || paused) return;
    const wait = active === last ? 2600 : active === -1 ? 400 : 1500;
    const id = window.setTimeout(() => setActive((a) => (a >= last ? -1 : a + 1)), wait);
    return () => window.clearTimeout(id);
  }, [inView, paused, active, last]);

  const progress = Math.max(0, active) / last;

  return (
    <section ref={ref} className="border-b border-line bg-white" aria-labelledby="journey-title">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 id="journey-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {journey.title}
          </h2>
          <p className="max-w-[44ch] text-muted">{journey.lead}</p>
        </div>

        <ol
          className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6"
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track (horizontal on desktop, vertical on phones) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-1 rounded-full bg-lilac md:block">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-sky via-sun via-60% to-mint transition-[width] duration-[1100ms] ease-[cubic-bezier(.5,0,.2,1)]"
              style={{ width: `${progress * 100}%`, transitionDuration: active === -1 ? "400ms" : undefined }}
            >
              <span
                className={`absolute -right-2 -top-1.5 h-4 w-4 rounded-full bg-white shadow-[0_0_0_4px_rgba(107,59,255,0.35),0_0_18px_4px_rgba(107,59,255,0.45)] transition-opacity duration-300 ${
                  active >= 0 ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
          <div aria-hidden className="absolute bottom-6 left-7 top-7 w-1 rounded-full bg-lilac md:hidden">
            <div
              className="w-full rounded-full bg-gradient-to-b from-sky via-sun to-mint transition-[height] duration-[1100ms] ease-[cubic-bezier(.5,0,.2,1)]"
              style={{ height: `${progress * 100}%`, transitionDuration: active === -1 ? "400ms" : undefined }}
            />
          </div>

          {journey.steps.map((step, i) => {
            const tone = journeyTones[i % journeyTones.length];
            const reached = i <= active;
            const current = i === active;
            return (
              <li
                key={step.label}
                className="relative flex gap-5 md:flex-col md:items-center md:text-center"
                onMouseEnter={() => {
                  setPaused(true);
                  setActive(i);
                }}
              >
                <span className="relative shrink-0">
                  {current && (
                    <span aria-hidden className={`absolute inset-0 animate-ping rounded-2xl opacity-40 ${tone.glow}`} />
                  )}
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ring-8 transition-all duration-500 ${
                      reached ? `${tone.on} ${tone.ring} scale-100` : "scale-90 bg-lilac text-muted ring-transparent"
                    }`}
                  >
                    <JourneyIcon index={i} />
                  </span>
                </span>
                <span className="pt-1 md:pt-4">
                  <span
                    className={`block text-lg font-bold transition-colors duration-500 ${reached ? "text-ink" : "text-muted"}`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`mt-1 block max-w-[24ch] text-sm transition-colors duration-500 md:mx-auto ${
                      reached ? "text-ink/75" : "text-muted/80"
                    }`}
                  >
                    {step.body}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function JourneyIcon({ index }: { index: number }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (index) {
    case 0: // search
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case 1: // star
      return (
        <svg {...common}>
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.2 1 6L12 16.9 6.6 19.7l1-6L3.2 9.5l6.1-.9z" />
        </svg>
      );
    case 2: // post with heart
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 16.5s-4-2.4-4-5.2A2.2 2.2 0 0 1 12 10a2.2 2.2 0 0 1 4 1.3c0 2.8-4 5.2-4 5.2Z" />
        </svg>
      );
    default: // chat bubble
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
          <path d="M9 11h.01M12 11h.01M15 11h.01" />
        </svg>
      );
  }
}
