"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Light-theme feature card with a cursor-tracking spotlight highlight.
 */
export default function FeatureCard({ icon: Icon, title, description, accent }) {
  const ref = useRef(null);

  // Update CSS vars from mousemove — used by the radial highlight overlay
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-card-hover"
    >
      {/* Cursor-tracking spotlight overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(239,68,68,0.08), transparent 45%)",
        }}
      />

      {/* Icon block */}
      <div
        className={`relative mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-display text-lg font-semibold text-ink-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>

      <div className="mt-5 flex items-center gap-1 text-xs font-medium text-ink-400 transition group-hover:text-brand-red">
        Learn more
        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  );
}
