"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";

type Props = { t: Content["listing"] };

// A mock Google Maps listing that flips between an incomplete profile
// and a finished one. It switches to "after" once on load to show the
// idea, then stays wherever the visitor puts it.
export default function ListingDemo({ t }: Props) {
  const [after, setAfter] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setAfter(true);
      return;
    }
    const id = window.setTimeout(() => {
      if (!touched.current) setAfter(true);
    }, 1600);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (value: boolean) => {
    touched.current = true;
    setAfter(value);
  };

  return (
    <figure className="w-full max-w-[400px]">
      <div
        role="radiogroup"
        aria-label={t.caption}
        className="mb-3 inline-flex rounded-full bg-white/10 p-1 text-sm font-semibold"
      >
        {[
          { label: t.before, value: false },
          { label: t.after, value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            role="radio"
            aria-checked={after === opt.value}
            onClick={() => choose(opt.value)}
            className={`rounded-full px-4 py-1.5 transition-colors duration-300 ${
              after === opt.value ? "bg-white text-sapphire-deep" : "text-white/80 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div
        className={`overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_30px_60px_-20px_rgba(10,16,60,0.55)] ring-4 transition-[box-shadow] duration-700 ${
          after ? "ring-padpa/70" : "ring-transparent"
        }`}
      >
        {/* Photo strip */}
        <div className="relative h-36">
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 bg-mist text-sm text-muted transition-opacity duration-500 ${
              after ? "opacity-0" : "opacity-100"
            }`}
          >
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 15 5-5 4 4 3-3 6 6" />
              <path d="M3 3l18 18" />
            </svg>
            {t.noPhotos}
          </div>
          <div
            aria-hidden={!after}
            className={`absolute inset-0 grid grid-cols-3 gap-0.5 transition-opacity duration-500 ${
              after ? "opacity-100" : "opacity-0"
            }`}
          >
            <Tile bg="#f6c9a0" dish="#d9772b" rice />
            <Tile bg="#c7e3cf" dish="#3f8f5a" />
            <Tile bg="#f3d4dc" dish="#c45b74" cake />
          </div>
          {after && <span className="sr-only">{t.photos}</span>}
        </div>

        <div className="space-y-3 p-5">
          <div>
            <p className="text-xl font-bold tracking-tight">{t.name}</p>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="font-semibold">4.8</span>
              <Stars />
              <span className="text-muted">({after ? t.reviewsAfter : t.reviewsBefore})</span>
            </div>
            <p className="text-sm text-muted">{t.kind}</p>
          </div>

          <Row ok={after} okText={t.hoursOk} badText={t.hoursMissing} />
          <Row ok={after} okText={`${t.website} · ${t.menu}`} badText={t.noWebsite} />

          <div className="flex flex-wrap gap-2 pt-1">
            {after && <Action primary label={t.call} />}
            <Action label={t.directions} />
            {after && <Action label={t.whatsapp} whatsapp />}
            {after && <Action label={t.website} />}
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ${
              after ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="rounded-xl bg-padpa-soft px-3 py-2.5 text-sm font-medium text-[#8a2a3c]">
                {t.post}
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-white/70">{t.caption}</figcaption>
    </figure>
  );
}

function Row({ ok, okText, badText }: { ok: boolean; okText: string; badText: string }) {
  return (
    <p
      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${
        ok ? "text-leaf" : "text-amber"
      }`}
    >
      {ok ? (
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 12 5 5 9-10" />
        </svg>
      ) : (
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 16.5v.5" />
        </svg>
      )}
      {ok ? okText : badText}
    </p>
  );
}

function Action({ label, primary, whatsapp }: { label: string; primary?: boolean; whatsapp?: boolean }) {
  const style = primary
    ? "bg-sapphire text-white border-sapphire"
    : whatsapp
      ? "border-leaf/40 text-leaf"
      : "border-line text-sapphire";
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>{label}</span>;
}

function Stars() {
  return (
    <span aria-hidden className="flex text-[#e8a317]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path d="m10 1.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.7 1-5.9L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

// Simple illustrated "food photos" so the demo needs no image files.
function Tile({ bg, dish, rice, cake }: { bg: string; dish: string; rice?: boolean; cake?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full" style={{ background: bg }}>
      {cake ? (
        <g>
          <rect x="28" y="48" width="44" height="26" rx="4" fill="#fff" />
          <rect x="28" y="48" width="44" height="8" rx="4" fill={dish} />
          <rect x="48" y="34" width="4" height="14" fill="#fff" />
          <ellipse cx="50" cy="31" rx="3" ry="5" fill="#f2a93b" />
        </g>
      ) : (
        <g>
          <circle cx="50" cy="55" r="32" fill="#fff" />
          <circle cx="50" cy="55" r="24" fill={rice ? "#fbf4e4" : "#eaf4ec"} />
          <circle cx="42" cy="50" r="7" fill={dish} />
          <circle cx="58" cy="60" r="6" fill={dish} opacity="0.75" />
          <circle cx="55" cy="46" r="4" fill={dish} opacity="0.55" />
        </g>
      )}
    </svg>
  );
}
