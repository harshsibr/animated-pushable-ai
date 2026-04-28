"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepVisual from "@/components/StepVisual";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01", label: "DESIGN", accent: "text-rose-400", bar: "bg-rose-500",
    title: "Sketch your workflow with AI.",
    desc: "Describe the outcome in plain English. Pushable lays out the agents, tools and branches automatically — your blueprint is ready in seconds.",
    checks: ["Plain-language input", "Auto-suggested branches", "Editable canvas"],
    visual: { variant: "design", label: "Workflow Designer" },
  },
  {
    n: "02", label: "CONNECT", accent: "text-emerald-400", bar: "bg-emerald-500",
    title: "Connect your tools in one click.",
    desc: "Link Gmail, Slack, HubSpot, Stripe and 50+ more tools instantly. Your agent learns your existing workflow — no APIs, no code, no configuration.",
    checks: ["50+ one-click integrations", "Auto-detects your workflow", "Zero API setup"],
    visual: { variant: "connect", label: "Integrations", footer: { icon: "⚡", title: "Integrations", subtitle: "3 tools connected" } },
  },
  {
    n: "03", label: "EXECUTE", accent: "text-amber-400", bar: "bg-amber-500",
    title: "Watch every task run in real time.",
    desc: "Your AI agents work around the clock — processing invoices, screening candidates, following up on leads — all tracked live on a clean dashboard.",
    checks: ["24/7 autonomous execution", "Full audit trail of every action", "Live task feed"],
    visual: { variant: "execute", label: "Live Dashboard", footer: { icon: "▶", title: "Live Dashboard", subtitle: "340 tasks completed" } },
  },
  {
    n: "04", label: "OPTIMIZE", accent: "text-blue-400", bar: "bg-blue-500",
    title: "Refine performance with insights.",
    desc: "Pushable surfaces bottlenecks and suggests improvements. Cost-per-run, latency and success rate are tracked across every workflow.",
    checks: ["Cost & latency analytics", "Auto-recommendations", "Versioned rollbacks"],
    visual: { variant: "optimize", label: "Insights", footer: { icon: "✦", title: "Insights", subtitle: "Latency −18% this week" } },
  },
];

const AUTO_MS = 5000;

const panelVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -22, transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } },
};

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const stRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false); // true while user is manually scrolling

  const [active, setActive] = useState(0);
  const [barProgress, setBarProgress] = useState(0);

  /* ── scroll to a specific step via lenis ── */
  const scrollToStep = useCallback((idx) => {
    const st = stRef.current;
    if (!st) return;
    const clamped = ((idx % STEPS.length) + STEPS.length) % STEPS.length;
    const frac = STEPS.length > 1 ? clamped / (STEPS.length - 1) : 0;
    const target = st.start + frac * (st.end - st.start);
    window.__lenis?.scrollTo(target, { duration: 1.15 });
  }, []);

  /* ── progress-bar RAF (resets every time `active` changes) ── */
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    setBarProgress(0);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / AUTO_MS, 1);
      setBarProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  /* ── auto-advance ticker ── */
  const startAutoAdvance = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (pausedRef.current || !stRef.current) return;
      const cur = Math.min(STEPS.length - 1, Math.floor(stRef.current.progress * STEPS.length));
      scrollToStep(cur + 1);
    }, AUTO_MS);
  }, [scrollToStep]);

  /* ── GSAP pin + scroll tracks active ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${STEPS.length * 90}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate(self) {
          stRef.current = self;
          const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          setActive(idx);
        },
        onEnter:      () => startAutoAdvance(),
        onLeave:      () => clearInterval(timerRef.current),
        onEnterBack:  () => startAutoAdvance(),
        onLeaveBack:  () => clearInterval(timerRef.current),
      });
      stRef.current = st;
      return () => st.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, [startAutoAdvance]);

  /* ── pause timer while user scrolls, resume 2.5 s after they stop ── */
  useEffect(() => {
    let resume;
    const onWheel = () => {
      pausedRef.current = true;
      clearTimeout(resume);
      resume = setTimeout(() => { pausedRef.current = false; }, 2500);
    };
    window.addEventListener("wheel",      onWheel, { passive: true });
    window.addEventListener("touchmove",  onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel",     onWheel);
      window.removeEventListener("touchmove", onWheel);
      clearTimeout(resume);
      clearInterval(timerRef.current);
    };
  }, []);

  const step = STEPS[active];

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-x flex h-full flex-col justify-center pt-20">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
            How it Works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white md:text-5xl">
            From Idea to Automation,
            <br />
            in Four Simple Steps
          </h2>
        </div>

        {/* Progress-bar dots */}
        <div className="mx-auto mb-10 flex w-full max-w-xs items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => scrollToStep(i)}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15"
              aria-label={`Go to step ${i + 1}`}
            >
              {i < active && (
                <span className={`absolute inset-0 rounded-full ${s.bar}`} />
              )}
              {i === active && (
                <span
                  className={`absolute inset-y-0 left-0 rounded-full ${s.bar}`}
                  style={{ width: `${barProgress * 100}%` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Two-column content */}
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">

          {/* Left — text */}
          <div className="relative h-[380px] md:h-[420px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-white/65">{step.n}</span>
                    <span className={`h-px w-10 ${step.bar}`} />
                    <span className={`text-xs font-bold uppercase tracking-[0.18em] ${step.accent}`}>{step.label}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base text-white/80">{step.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {step.checks.map((c) => (
                      <li key={c} className="flex items-center gap-3 text-sm font-medium text-white/95">
                        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${step.bar} text-white`}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — visual */}
          <div className="relative h-[380px] md:h-[420px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <StepVisual
                  variant={step.visual.variant}
                  label={step.visual.label}
                  footer={step.visual.footer}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
