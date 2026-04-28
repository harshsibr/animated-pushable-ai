"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, stagger } from "@/lib/utils";

const FAQS = [
  {
    q: "What's the difference between Pushable AI agents and regular AI tools?",
    a: "Traditional AI tools respond to prompts — you ask, they answer. Pushable AI agents proactively run complete workflows autonomously. They don't wait for instructions; they work continuously in the background across your real business systems.",
  },
  {
    q: "Do I need any technical knowledge to use Pushable AI?",
    a: "None whatsoever. If you can use Slack or send an email, you can deploy an agent. Our setup wizard connects your tools in under 10 minutes. No code, no APIs, no developers needed.",
  },
  {
    q: "Which industries does Pushable AI support?",
    a: "Pushable AI works across SaaS, marketing agencies, finance, operations, and service agencies. If your business has repetitive workflows — and every business does — we have an agent built for you.",
  },
  {
    q: "Will AI replace my team?",
    a: "No. Pushable AI handles the repetitive, low-value tasks your team dreads — sending follow-up emails, generating reports, updating records. Your team focuses on the creative, strategic, and relationship-driven work that actually needs a human.",
  },
  {
    q: "How does Pushable AI improve day-to-day operations?",
    a: "Every workflow your agent handles runs faster, more consistently, and without human error. Approvals don't wait in inboxes. Reports don't slip. Follow-ups don't get forgotten. Everything moves faster because nothing requires manual action.",
  },
  {
    q: "What integrations are available?",
    a: "Pushable AI connects with HubSpot, Notion, Slack, Google Workspace, Airtable, Stripe, Shopify, Zoom, and 80+ more tools out of the box. Custom integrations are available on the Business plan.",
  },
  {
    q: "How secure is my data with Pushable AI?",
    a: "We use AES-256 encryption at rest and TLS 1.3 in transit. Your data is never used to train models, never sold, and stored in SOC 2 Type II certified infrastructure. Enterprise plans include dedicated environments.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(232,53,42,0.07)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-x">
        {/* Heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.32em] text-brand-red">
            Got questions?
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 font-serif text-3xl font-semibold tracking-tight text-white leading-tight md:text-5xl">
            Everything you need to know
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-white/75">
            Can't find the answer? Reach out to our team and we'll get back to you within one business day.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-14 max-w-3xl divide-y divide-white/10"
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div key={i} variants={fadeUp}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-semibold leading-snug transition-colors duration-200 md:text-lg ${isOpen ? "text-brand-red" : "text-white group-hover:text-brand-red"}`}>
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-brand-red text-white" : "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white"}`}>
                    <AnimatePresence mode="wait" initial={false}>
                      {isOpen ? (
                        <motion.span
                          key="minus"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="plus"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>

                {/* Answer — smooth height + fade */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-white/80 md:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
