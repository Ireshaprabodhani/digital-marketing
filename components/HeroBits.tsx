"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";

// Each channel name gets its own colour as it rotates in.
const wordColours = ["bg-grape", "bg-coral", "bg-sky", "bg-mint-deep", "bg-ink"];

export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom" aria-live="polite">
      <span
        key={i}
        className={`animate-word inline-block rounded-2xl px-3 py-0.5 text-white sm:rounded-3xl sm:px-4 ${
          wordColours[i % wordColours.length]
        }`}
      >
        {words[i]}
      </span>
    </span>
  );
}

const toneStyles: Record<Content["hero"]["notes"][number]["tone"], { dot: string; icon: string }> = {
  sun: { dot: "bg-sun", icon: "★" },
  mint: { dot: "bg-mint", icon: "✓" },
  coral: { dot: "bg-coral", icon: "♥" },
  sky: { dot: "bg-sky", icon: "⌖" },
};

// Floating "phone notification" bubbles placed around the listing card.
const positions = [
  "left-0 top-24 [--tilt:-4deg]",
  "right-0 top-12 translate-x-1/3 [--tilt:3deg]",
  "left-0 -bottom-2 [--tilt:2deg]",
  "right-0 top-56 translate-x-1/3 [--tilt:-3deg]",
];

export function Notifications({ notes }: { notes: Content["hero"]["notes"] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {notes.map((n, i) => (
        <div key={n.text} className={`absolute ${positions[i % positions.length]}`}>
          <div className="animate-pop" style={{ animationDelay: `${1900 + i * 350}ms` }}>
            <div className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_14px_30px_-12px_rgba(27,21,48,0.35)]">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-ink ${toneStyles[n.tone].dot}`}
                >
                  {toneStyles[n.tone].icon}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-ink">{n.text}</span>
                  <span className="block text-xs text-muted">{n.sub}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const pillColours = ["bg-sun text-ink", "bg-coral text-white", "bg-sky text-ink", "bg-mint text-ink", "bg-grape text-white"];

export function Marquee({ items }: { items: string[] }) {
  // The list is rendered twice so the strip loops without a gap.
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink py-4" aria-label={items.join(", ")}>
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]" aria-hidden>
        {loop.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-base font-bold sm:text-lg ${
              pillColours[i % pillColours.length]
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
