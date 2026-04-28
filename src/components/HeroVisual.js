"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Zap, TrendingUp, Users, DollarSign } from "lucide-react";

// Tasks that cycle through with a typewriter effect
const LIVE_TASKS = [
  "Generating invoice #1047 for Acme Corp…",
  "Scheduling follow-up for 6 warm leads…",
  "Compiling weekly P&L report…",
  "Sending onboarding docs to J. Martinez…",
  "Flagging anomaly in payment #8821…",
];

// Floating notification cards that pop in
const NOTIFS = [
  { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", text: "Invoice #1034 sent", sub: "Acme Corp • 2s ago" },
  { icon: TrendingUp,   color: "text-brand-red",   bg: "bg-brand-red/10",   text: "$4,200 recovered",  sub: "Churn win • 14s ago" },
  { icon: Users,        color: "text-violet-400",  bg: "bg-violet-400/10",  text: "Onboarding complete", sub: "J. Doe • 1m ago" },
  { icon: DollarSign,   color: "text-amber-400",   bg: "bg-amber-400/10",   text: "P&L report ready",   sub: "Q2 summary • 3m ago" },
];

// Stat counters shown at the bottom of the main panel
const STATS = [
  { value: 1240, label: "Tasks/mo",  suffix: "+" },
  { value: 98,   label: "Success",   suffix: "%" },
  { value: 340,  label: "Hrs saved", suffix: "+" },
];

/* ─── animated counter ─── */
function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame;
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{val}{suffix}</>;
}

/* ─── typewriter ─── */
function Typewriter({ texts }) {
  const [idx, setIdx]   = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = texts[idx];
    let timeout;
    if (!deleting && shown.length < full.length) {
      timeout = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 38);
    } else if (!deleting && shown.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && shown.length > 0) {
      timeout = setTimeout(() => setShown(shown.slice(0, -1)), 18);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [shown, deleting, idx, texts]);

  return (
    <span>
      {shown}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative flex h-[520px] w-full items-center justify-center md:h-[580px]">

      {/* ── Glow blobs behind everything ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-56 w-56 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-violet-500/8 blur-3xl" />
      </div>

      {/* ══════ Main AI panel ══════ */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[310px] overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 shadow-2xl backdrop-blur-xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-red/20 text-brand-red ring-1 ring-brand-red/30">
              <Zap className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="font-mono text-[11px] font-semibold text-white/70">
              pushable.ai / agent
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            LIVE
          </div>
        </div>

        {/* Typewriter task line */}
        <div className="border-b border-white/5 px-4 py-3">
          <p className="text-[11px] text-white/35 mb-1">Currently running</p>
          <p className="min-h-[18px] font-mono text-[12px] text-brand-red">
            <Typewriter texts={LIVE_TASKS} />
          </p>
        </div>

        {/* Recent completions */}
        <div className="space-y-0 divide-y divide-white/5 px-4">
          {NOTIFS.slice(0, 3).map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
              className="flex items-center gap-3 py-2.5"
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${n.bg}`}>
                <n.icon className={`h-3.5 w-3.5 ${n.color}`} />
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-white/85 truncate">{n.text}</p>
                <p className="text-[10px] text-white/35">{n.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8 bg-white/3"
        >
          {STATS.map(({ value, label, suffix }) => (
            <div key={label} className="py-3 text-center">
              <p className="font-mono text-sm font-bold text-brand-red">
                <Counter target={value} suffix={suffix} />
              </p>
              <p className="text-[10px] text-white/35">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══════ Floating notification cards ══════ */}

      {/* Top-right float */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
        style={{ animation: "float-a 4s ease-in-out infinite 1.1s" }}
        className="absolute right-2 top-8 z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-500/15">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </span>
        <div>
          <p className="text-[12px] font-semibold text-ink-900">Invoice sent</p>
          <p className="text-[10px] text-ink-400">Acme Corp • just now</p>
        </div>
      </motion.div>

      {/* Bottom-left float */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.22,1,0.36,1] }}
        style={{ animation: "float-b 4.5s ease-in-out infinite 1.4s" }}
        className="absolute bottom-12 left-0 z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-500/15">
          <Users className="h-4 w-4 text-violet-500" />
        </span>
        <div>
          <p className="text-[12px] font-semibold text-ink-900">4 agents active</p>
          <p className="text-[10px] text-ink-400">Running in background</p>
        </div>
      </motion.div>

      {/* Mid-right small badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.4, ease: [0.22,1,0.36,1] }}
        style={{ animation: "float-a 3.8s ease-in-out infinite 1.6s" }}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur"
      >
        <p className="text-[11px] font-semibold text-brand-red">98% success rate</p>
        <p className="text-[10px] text-ink-400">Last 30 days</p>
      </motion.div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float-a {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(-8px); }
        }
        @keyframes float-b {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(7px); }
        }
      `}</style>
    </div>
  );
}
