"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 px-8 py-20 text-center backdrop-blur-lg md:px-24"
        >
          {/* Soft red glow behind heading */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/15 blur-[100px]" />

          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Ready to ship?
          </span>

          <h2 className="relative mx-auto mt-6 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Push your AI ideas into
            <br />
            <span className="bg-gradient-to-r from-brand-red via-rose-400 to-brand-red bg-clip-text text-transparent">
              production today.
            </span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Start free. Invite your team. Ship your first agent before lunch.
          </p>

          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#" className="btn-primary px-8 py-3.5 text-base">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/35 hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" />
              Watch Demo
            </a>
          </div>

          <p className="relative mt-6 text-xs text-white/55">
            No credit card · Cancel anytime · SOC 2 certified
          </p>
        </motion.div>
      </div>
    </section>
  );
}
