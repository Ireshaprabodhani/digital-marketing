"use client";

import { useEffect, useState } from "react";
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

const pillColours = ["bg-sun text-ink", "bg-coral text-white", "bg-sky text-ink", "bg-mint text-ink", "bg-grape text-white"];

export function Marquee({ items }: { items: string[] }) {
  // The list is rendered twice so the strip loops without a gap.
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-grape-soft bg-lilac py-4" aria-label={items.join(", ")}>
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]" aria-hidden>
        {loop.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-base font-bold ${pillColours[i % pillColours.length]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
