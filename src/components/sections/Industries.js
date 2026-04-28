"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Megaphone, DollarSign,
  Settings, Briefcase, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INDUSTRIES = [
  {
    icon: Code2,
    title: "SaaS",
    description:
      "Your AI assistant handles onboarding sequences, churn follow-ups, and renewal reminders automatically — so your team focuses on building, not chasing.",
  },
  {
    icon: Megaphone,
    title: "Marketing Agencies",
    description:
      "Automate client reports, campaign scheduling, and performance tracking across all accounts — so your team delivers more value without adding headcount.",
  },
  {
    icon: DollarSign,
    title: "Finance",
    description:
      "Generate invoices on schedule, reconcile accounts, and flag payment anomalies automatically — so nothing slips through the cracks at month-end.",
  },
  {
    icon: Settings,
    title: "Operations",
    description:
      "Coordinate cross-team workflows, maintain SOPs, and escalate blockers before they delay delivery — so your operations run like clockwork every day.",
  },
  {
    icon: Briefcase,
    title: "Agencies",
    description:
      "Handle client onboarding, automate billing, and keep project timelines on track — so your team spends time on client work, not admin.",
  },
  {
    icon: ArrowRight,
    title: "Your Industry",
    description:
      "Don't see yours listed? Pushable AI adapts to any workflow across any sector. Talk to us and we'll build it together.",
    isCta: true,
  },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const cardsRef   = useRef([]);

  // Sync ref assignment + immediate hide so there's no flash before GSAP
  const setCardRef = (el, i) => {
    cardsRef.current[i] = el;
    if (!el) return;
    // Set synchronously on mount — before the browser paints
    const dir = i % 2 === 0 ? -1 : 1;
    el.style.opacity = "0";
    el.style.transform = `translateX(${dir * 110}%)`;
    el.style.filter = "blur(14px)";
    el.style.willChange = "transform, opacity, filter";
  };

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const flyIn = () => {
      cards.forEach((card, i) => {
        const row = Math.floor(i / 2);
        gsap.to(card, {
          x: 0,
          xPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.8,
          delay: row * 0.15 + (i % 2) * 0.06,
          ease: "expo.out",
          overwrite: "auto",
          clearProps: "filter",
        });
      });
    };

    const flyOut = (bottomFirst = true) => {
      const totalRows = Math.ceil(cards.length / 2);
      cards.forEach((card, i) => {
        const row = Math.floor(i / 2);
        const dir = i % 2 === 0 ? -1 : 1;
        const rowDelay = bottomFirst
          ? (totalRows - 1 - row) * 0.07
          : row * 0.07;
        gsap.to(card, {
          x: `${dir * 110}%`,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.55,
          delay: rowDelay,
          ease: "power3.in",
          overwrite: "auto",
        });
      });
    };

    // Single trigger covers the full section lifetime:
    // enter → stay visible while in viewport → exit only when fully scrolled past
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",   // section enters from below
      end:   "bottom top", // section fully exits above viewport
      onEnter:     flyIn,
      onEnterBack: flyIn,
      onLeave:     () => flyOut(true),   // scrolled down past section
      onLeaveBack: () => flyOut(false),  // scrolled up past section top
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="industries-grid"
      className="relative overflow-hidden py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
            className="font-serif text-3xl font-semibold tracking-tight text-white leading-tight md:text-5xl"
          >
            The Right Push for Every Industry,
            <br />
            Built with Pushable
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg"
          >
            Whatever your business does, Pushable AI finds the routine tasks
            worth automating and handles them for you.
          </motion.p>
        </motion.div>

        {/* Grid — overflow hidden clips cards during slide */}
        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={industry.title}
                ref={(el) => setCardRef(el, i)}
              >
                <IndustryCard {...industry} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ icon: Icon, title, description, isCta }) {
  return (
    <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8 md:p-7">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/15 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
      {isCta && (
        <a
          href="#cta"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
        >
          Talk to us
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
