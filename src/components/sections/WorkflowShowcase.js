"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, DollarSign, Users, TrendingUp, Settings } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WORKFLOWS = [
  {
    tag: "Finance",
    Icon: DollarSign,
    title: "Automate Your Finance Operations",
    description:
      "Routine financial tasks are handled in the background — helping your team save time, reduce errors, and focus on decision-making instead of manual work.",
    bullets: [
      "Auto-generate & send invoices on schedule",
      "Reconcile expenses and flag anomalies",
      "Compile P&L and tax reports automatically",
    ],
  },
  {
    tag: "HR & Hiring",
    Icon: Users,
    title: "Agent That Simplifies Your HR Workflow",
    description:
      "Simplifies HR end-to-end by automating recruitment, onboarding, and employee management — reducing manual effort and improving team efficiency.",
    bullets: [
      "Screen and rank applicants automatically",
      "Send onboarding documents without lifting a finger",
      "Manage employee lifecycle tasks seamlessly",
    ],
  },
  {
    tag: "Sales",
    Icon: TrendingUp,
    title: "Automate Your Sales Pipeline with AI",
    description:
      "Automates your pipeline end-to-end — capturing, nurturing, and converting leads while reducing manual effort and improving conversion rates.",
    bullets: [
      "Follow up on every lead automatically",
      "Generate tailored proposals in seconds",
      "Monitor deals and flag at-risk accounts",
    ],
  },
  {
    tag: "Operations",
    Icon: Settings,
    title: "Automate Your Daily Business Workflows",
    description:
      "Your operations backbone — manages all recurring tasks so you can focus entirely on the strategies that grow your business.",
    bullets: [
      "Coordinate cross-team workflows daily",
      "Maintain and update SOPs automatically",
      "Escalate blockers before they cause delays",
    ],
  },
];

const N = WORKFLOWS.length;

function cardCenter(i) {
  return i / (N - 1);
}

export default function WorkflowShowcase() {
  const sectionRef  = useRef(null);
  const stageRef    = useRef(null);
  const cardsRef    = useRef([]);
  const stRef       = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = useCallback((i) => {
    const st = stRef.current;
    if (!st) return;
    const idx = Math.max(0, Math.min(N - 1, i));
    const target = st.start + (idx / (N - 1)) * (st.end - st.start);
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.0 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const update = (progress) => {
        const stage = stageRef.current;
        if (!stage) return;
        const stageW = stage.clientWidth;
        const stageH = stage.clientHeight;
        const travelLen = (1 / (N + 1)) * 1.5;

        let bestPeak = 0;
        let activeIdx = 0;

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const center   = cardCenter(i);
          const startProg = center - travelLen / 2;
          const endProg   = center + travelLen / 2;
          const t = (progress - startProg) / (endProg - startProg);

          if (t <= 0 || t >= 1) {
            card.style.opacity      = "0";
            card.style.filter       = "blur(18px)";
            card.style.pointerEvents = "none";
            return;
          }
          card.style.pointerEvents = "auto";

          const tc = Math.max(0, Math.min(1, t));
          const startX = stageW * 0.68;
          const startY = stageH * 0.08;
          const endX   = -stageW * 0.68;
          const endY   = stageH * 0.08;
          const ctrlX  = 0;
          const ctrlY  = -stageH * 0.06;

          const omt = 1 - tc;
          const x   = omt * omt * startX + 2 * omt * tc * ctrlX + tc * tc * endX;
          const y   = omt * omt * startY + 2 * omt * tc * ctrlY + tc * tc * endY;
          const peak    = Math.sin(tc * Math.PI);
          const scale   = 0.72 + 0.28 * peak;
          const opacity = Math.pow(Math.max(0, peak), 0.5);
          const blurPx  = (1 - peak) * 14;
          const rotate  = (tc - 0.5) * -6;

          card.style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
          card.style.opacity = String(opacity);
          card.style.filter  = `blur(${blurPx.toFixed(1)}px)`;
          card.style.zIndex  = String(Math.round(peak * 100));

          if (peak > bestPeak) { bestPeak = peak; activeIdx = i; }
        });

        setActiveIndex(activeIdx);
      };

      update(0);

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${WORKFLOWS.length * 90}%`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => update(self.progress),
        onRefresh: () => update(0),
      });
      stRef.current = st;
      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workflow-showcase"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Corner markers */}
      <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block">
        {["top-24 left-24", "top-24 right-24", "bottom-24 left-24", "bottom-24 right-24"].map((pos) => (
          <span key={pos} className={`absolute ${pos} font-mono text-2xl text-white/10`}>+</span>
        ))}
      </div>

      {/* Heading + dots */}
      <div className="container-x relative z-30 pt-16 text-center md:pt-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-brand-red">
          Fully Dynamic
        </span>
        <h2 className="mx-auto mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          Your AI Agents, Each Built
          <br />
          for a Specific Role
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          From finance to operations, deploy specialised agents that handle your entire workflow — automatically, accurately, every time.
        </p>

        {/* Step dots */}
        <div className="mt-5 flex justify-center gap-2">
          {WORKFLOWS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-10 bg-brand-red" : "w-3 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card stage */}
      <div
        ref={stageRef}
        className="absolute inset-x-0 top-[36%] bottom-[4%] z-20"
      >
        {WORKFLOWS.map((wf, i) => (
          <article
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute left-1/2 top-1/2 w-[90vw] max-w-[460px] will-change-transform"
            style={{ opacity: 0, filter: "blur(18px)", pointerEvents: "none" }}
          >
            <Card {...wf} />
          </article>
        ))}
      </div>

      {/* Left-side nav */}
      <div className="absolute left-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 md:left-10">
        <button
          onClick={() => scrollToCard(activeIndex - 1)}
          disabled={activeIndex <= 0}
          aria-label="Previous"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/8 text-white/70 backdrop-blur transition hover:border-white/35 hover:bg-white/15 hover:text-white disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollToCard(activeIndex + 1)}
          disabled={activeIndex >= N - 1}
          aria-label="Next"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/8 text-white/70 backdrop-blur transition hover:border-white/35 hover:bg-white/15 hover:text-white disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function Card({ tag, Icon, title, description, bullets }) {
  return (
    <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.4)] md:p-8">
      {/* Icon + tag row */}
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-red/20 text-brand-red">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
          {tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-serif text-xl font-semibold leading-snug text-white md:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2.5 text-sm leading-relaxed text-white/90">
        {description}
      </p>

      {/* Bullets */}
      <ul className="mt-5 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-white">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
            {b}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#cta"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/18"
      >
        Start Building
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
