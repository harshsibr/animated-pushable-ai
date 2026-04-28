"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { fadeUp, stagger } from "@/lib/utils";

const TASKS = [
  {
    label: "Invoice #1034 generated and dispatched",
    time: "2s ago",
    status: "done",
  },
  {
    label: "Lead follow-up email scheduled for 9am",
    time: "14s ago",
    status: "done",
  },
  {
    label: "Onboarding document sent to candidate",
    time: "1m ago",
    status: "done",
  },
  { label: "Weekly P&L report compiled", time: "3m ago", status: "done" },
  {
    label: "Summarising team standup notes…",
    time: "running",
    status: "running",
  },
];

// Per-row progress for the dark "Live Operations" panel
const PROGRESS = [78, 92, 61, 85, 44];

const LOG = [
  { agent: "Sara", action: "invoice_generate(#1034)" },
  { sub: "Sent to client@acmecorp.com" },
  { agent: "Marco", action: "lead_followup(8 leads)" },
  { agent: "Layla", action: "onboarding_send(J Doe)" },
];

export default function LiveTaskFeed() {
  return (
    <section
      id="live-feed"
      className="relative overflow-hidden py-28 md:py-36"
    >
      {/* Landscape backdrop with stronger wash so dark panels read clearly */}
      <div className="hero-bg-fallback hero-bg absolute inset-0 -z-20" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-white/65" aria-hidden />

      <div className="container-x">
        {/* Heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="heading-display text-3xl leading-tight md:text-5xl"
          >
            See How Your AI Assistant Handles
            <br />
            Work Behind The Scenes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-ink-500 md:text-lg"
          >
            Your AI assistant runs real tasks in the background — generating
            invoices, following up on leads, onboarding candidates, and
            compiling reports — without you lifting a finger. Watch exactly
            what it handles, when it happened, and what&apos;s running right now.
          </motion.p>
        </motion.div>

        {/* Two-column dashboard */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {/* LEFT — white live task feed */}
          <motion.div variants={fadeUp}>
            <TaskFeed />
          </motion.div>

          {/* RIGHT — dark live ops bars + code log stacked */}
          <motion.div variants={fadeUp} className="space-y-5">
            <LiveOps />
            <CodeLog />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   Live Task Feed (white card, left side)
   Tasks fade in sequentially when the section enters view.
   ────────────────────────────────────────────────────────── */
function TaskFeed() {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-5 shadow-card md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live task feed
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-3 py-1 text-[11px] font-semibold text-brand-red">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />4 agents
          active
        </span>
      </div>

      {/* Task list */}
      <ul className="mt-5 space-y-2">
        {TASKS.map((task, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-between rounded-lg border border-black/5 bg-canvas-100 px-3.5 py-3 text-sm"
          >
            <div className="flex items-center gap-3">
              {task.status === "done" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              ) : (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-red" />
              )}
              <span
                className={
                  task.status === "running"
                    ? "text-brand-red"
                    : "text-ink-800"
                }
              >
                {task.label}
              </span>
            </div>
            <span className="ml-3 shrink-0 font-mono text-[11px] text-ink-400">
              {task.time}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Live Operations (dark card, top-right)
   Red progress bars fill on view.
   ────────────────────────────────────────────────────────── */
function LiveOps() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-5 ring-1 ring-black/10 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-white/85">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-red/15 text-brand-red ring-1 ring-brand-red/30">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2 L4 14 H11 L11 22 L20 10 H13 Z" />
            </svg>
          </span>
          Pushable AI — Live Operations
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live
        </div>
      </div>

      {/* Progress bars */}
      <div className="mt-5 space-y-3">
        {PROGRESS.map((pct, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-brand-red"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.1,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            <span className="w-10 text-right font-mono text-[11px] font-medium text-brand-red">
              {pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Code Log (dark card, bottom-right)
   Lines type in sequentially with stagger.
   ────────────────────────────────────────────────────────── */
function CodeLog() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-5 ring-1 ring-black/10 md:p-6">
      <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/40">
        <span className="grid h-5 w-5 place-items-center rounded bg-white/5">
          {">"}
        </span>
        agent_runtime.log
      </div>

      <div className="space-y-1.5 font-mono text-[12px] leading-6">
        {LOG.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.4 + i * 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={line.sub ? "pl-6 text-white/55" : "text-white/85"}
          >
            {line.sub ? (
              <>
                <span className="text-emerald-400">↳</span> {line.sub}
              </>
            ) : (
              <>
                <span className="text-brand-red">Agent {line.agent}</span>
                <span className="px-1.5 text-white/30">→</span>
                <span className="text-white/90">{line.action}</span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
