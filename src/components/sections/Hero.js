"use client";

import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";
import { fadeUp, stagger, splitWords } from "@/lib/utils";
import HeroVisual from "@/components/HeroVisual";

const HEADING = "Automated AI Workflow Assistant";
const SUBLINE  = "Handles the routine work so you can focus on what matters.";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">

      {/* ── Ambient colour glows unique to hero ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-brand-red/10 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[110px]" />
      </div>


      <div className="container-x relative z-[5] w-full pt-28 pb-24 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Heading */}
            <h1 className="font-serif font-semibold tracking-tight text-4xl leading-[1.05] text-white md:text-5xl lg:text-6xl">
              {splitWords(HEADING).map(({ word, index }) => (
                <motion.span
                  key={index}
                  variants={fadeUp}
                  custom={index + 1}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subline */}
            <motion.p
              variants={fadeUp}
              custom={7}
              className="mt-6 max-w-lg text-base text-white/80 md:text-lg"
            >
              {SUBLINE}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={8}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a href="#demo" className="btn-primary">
                Watch Demo
                <PlayCircle className="h-4 w-4" />
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/15"
              >
                Try Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

          </motion.div>

          {/* ── Right: animated visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <HeroVisual dark />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
