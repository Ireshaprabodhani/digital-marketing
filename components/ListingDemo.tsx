"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";

type Props = {
  t: Content["listing"];
  onChange?: (after: boolean) => void;
};

// A mock Google Maps listing. On load, a cursor glides in and clicks
// "After": the profile fills in and the review count climbs. Visitors
// can switch back and forth themselves at any time.
export default function ListingDemo({ t, onChange }: Props) {
  const [after, setAfter] = useState(false);
  const [cursor, setCursor] = useState<"hidden" | "start" | "target" | "click" | "gone">("hidden");
  const touched = useRef(false);
  const reviews = useCountUp(after ? t.reviewsAfter : t.reviewsBefore);

  useEffect(() => {
    onChange?.(after);
  }, [after, onChange]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAfter(true);
      return;
    }
    const steps: [number, () => void][] = [
      [700, () => setCursor("start")],
      [900, () => setCursor("target")],
      [1900, () => setCursor("click")],
      [2050, () => !touched.current && setAfter(true)],
      [2200, () => setCursor("target")],
      [3000, () => setCursor("gone")],
    ];
    const ids = steps.map(([ms, fn]) => window.setTimeout(fn, ms));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const choose = (value: boolean) => {
    touched.current = true;
    setCursor("gone");
    setAfter(value);
  };

  const cursorPos =
    cursor === "start" || cursor === "hidden"
      ? "translate(230px, 150px)"
      : cursor === "click"
        ? "translate(118px, 16px) scale(0.85)"
        : "translate(118px, 16px)";

  return (
    <figure className="relative w-full max-w-[400px]">
      <div
        role="radiogroup"
        aria-label={t.caption}
        className="relative mb-3 inline-flex rounded-full bg-white/10 p-1 text-sm font-semibold ring-1 ring-white/15"
      >
        {/* Sliding highlight behind the selected option */}
        <span
          aria-hidden
          className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(.3,1.4,.5,1)] ${
            after ? "translate-x-full" : "translate-x-0"
          }`}
        />
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
            className={`relative z-10 w-20 rounded-full py-1.5 transition-colors duration-300 ${
              after === opt.value ? "text-ink" : "text-white/70 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Demo cursor */}
      <svg
        aria-hidden
        width="26"
        height="26"
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute left-0 top-0 z-20 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.6,0,.2,1)] ${
          cursor === "hidden" || cursor === "gone" ? "opacity-0" : "opacity-100"
        }`}
        style={{ transform: cursorPos, transitionDuration: cursor === "click" ? "120ms" : undefined }}
      >
        <path d="M4 2l15 10-7 1.5L8.5 21z" fill="#fff" stroke="#1b1530" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {cursor === "click" && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[108px] top-[4px] z-10 h-8 w-8 animate-ping rounded-full bg-white/60"
        />
      )}

      <div
        className={`overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-4 transition-[box-shadow] duration-700 ${
          after ? "ring-coral/80" : "ring-white/10"
        }`}
      >
        {/* Photo strip */}
        <div className="relative h-36">
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2 bg-lilac text-sm text-muted transition-opacity duration-500 ${
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
          <div aria-hidden={!after} className="absolute inset-0 grid grid-cols-3 gap-0.5">
            {[
              <Tile key="a" bg="#f6c9a0" dish="#d9772b" rice />,
              <Tile key="b" bg="#c7e3cf" dish="#3f8f5a" />,
              <Tile key="c" bg="#f3d4dc" dish="#c45b74" cake />,
            ].map((tile, i) => (
              <div
                key={i}
                className={`transition-[opacity,transform] duration-500 ${after ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                style={{ transitionDelay: after ? `${i * 120}ms` : "0ms" }}
              >
                {tile}
              </div>
            ))}
          </div>
          {after && <span className="sr-only">{t.photos}</span>}
        </div>

        <div className="space-y-3 p-5">
          <div>
            <p className="text-xl font-bold tracking-tight">{t.name}</p>
            <div className="mt-1 flex items-center gap-2 text-sm">
              <span className="font-semibold">4.8</span>
              <Stars />
              <span className="tabular-nums text-muted">
                ({reviews} {t.reviewsWord})
              </span>
            </div>
            <p className="text-sm text-muted">{t.kind}</p>
          </div>

          <Row ok={after} delay={200} okText={t.hoursOk} badText={t.hoursMissing} />
          <Row ok={after} delay={350} okText={`${t.website} · ${t.menu}`} badText={t.noWebsite} />

          <div className="flex flex-wrap gap-2 pt-1">
            <Action show={after} delay={450} primary label={t.call} />
            <Action show label={t.directions} />
            <Action show={after} delay={550} whatsapp label={t.whatsapp} />
            <Action show={after} delay={650} label={t.website} />
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ${
              after ? "grid-rows-[1fr] opacity-100 delay-700" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="rounded-xl bg-coral-soft px-3 py-2.5 text-sm font-medium text-[#a3233f]">{t.post}</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-white/55">{t.caption}</figcaption>
    </figure>
  );
}

// Animates a number towards its target.
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    const t0 = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (target - start) * eased);
      setValue(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

function Row({ ok, okText, badText, delay = 0 }: { ok: boolean; okText: string; badText: string; delay?: number }) {
  return (
    <p
      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${
        ok ? "text-mint-deep" : "text-amber"
      }`}
      style={{ transitionDelay: ok ? `${delay}ms` : "0ms" }}
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

function Action({
  label,
  primary,
  whatsapp,
  show,
  delay = 0,
}: {
  label: string;
  primary?: boolean;
  whatsapp?: boolean;
  show: boolean;
  delay?: number;
}) {
  const style = primary
    ? "bg-grape text-white border-grape"
    : whatsapp
      ? "border-mint-deep/40 text-mint-deep"
      : "border-line text-grape";
  if (!show) return null;
  return (
    <span
      className={`animate-pop rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {label}
    </span>
  );
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
