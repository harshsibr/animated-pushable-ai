"use client";

import { motion } from "framer-motion";

/**
 * Compact dark "live workflow" mockup card.
 *
 * Props
 *   icon, title, subtitle, rows[], stats[]
 *   animateProgress (bool) — when true, the per-row red progress bars animate
 *     from 0 → row.progress with a small stagger. Used by the orbital scroll
 *     section so bars only fill when the card rotates to the front.
 */
export default function WorkflowMockup({
  icon,
  title,
  subtitle,
  rows,
  stats,
  animateProgress = true,
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-ink-900 text-white ring-1 ring-black/10">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        </div>
        <div className="font-mono text-[10px] text-white/40">
          pushable.ai / workflow-builder
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </div>
      </div>

      <div className="p-3.5">
        {/* Header */}
        <div className="mb-3 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-red/15 text-sm text-brand-red ring-1 ring-brand-red/30">
            {icon}
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold">{title}</div>
            <div className="text-[10px] text-white/50">{subtitle}</div>
          </div>
          <div className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-400">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12 L7 12 L10 4 L14 20 L17 12 L21 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            live
          </div>
        </div>

        {/* Status rows with progress bars */}
        <div className="space-y-2.5">
          {rows.map((row, i) => (
            <div key={i}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-white/85">{row.label}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${getStatusClass(
                    row.status
                  )}`}
                >
                  {row.status}
                </span>
              </div>
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                {/* Progress fill — animates only when the card is "active" */}
                <motion.div
                  className="h-full rounded-full bg-brand-red"
                  initial={false}
                  animate={{
                    width: animateProgress ? `${row.progress}%` : "0%",
                  }}
                  transition={{
                    duration: 0.9,
                    delay: animateProgress ? i * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Metric strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="font-display text-base font-semibold text-brand-red">
                {s.value}
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Status pill colors — red for "done"-style states, amber for warnings,
// neutral for in-flight / queued
function getStatusClass(status) {
  const s = status.toLowerCase();
  if (
    ["sent", "done", "confirmed", "published", "booked", "followed up"].includes(
      s
    )
  ) {
    return "bg-brand-red/20 text-brand-red";
  }
  if (["scheduled", "escalated"].includes(s)) {
    return "bg-amber-500/15 text-amber-400";
  }
  return "bg-white/[0.08] text-white/60";
}
