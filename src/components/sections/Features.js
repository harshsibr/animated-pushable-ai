"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, BarChart3, Plug } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { fadeUp, stagger } from "@/lib/utils";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Spin up autonomous agents that reason, plan and call tools to handle multi-step business tasks end to end.",
    accent: "from-brand-red to-rose-600",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Visually compose triggers, conditions and AI steps. Branch on outputs without writing orchestration code.",
    accent: "from-ink-900 to-ink-700",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track latency, cost-per-run and success rate across every workflow with sub-second observability.",
    accent: "from-brand-purple to-brand-indigo",
  },
  {
    icon: Plug,
    title: "120+ Integrations",
    description:
      "Native connectors for Slack, HubSpot, Postgres, Snowflake, GitHub and the rest of your stack.",
    accent: "from-brand-blue to-cyan-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-canvas-100 py-28 md:py-36">
      <div className="container-x">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Capabilities
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="heading-display mt-5 text-4xl md:text-5xl"
          >
            One platform. Every AI workflow.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-base text-ink-500 md:text-lg"
          >
            Everything you need to ship production-grade AI features — from the
            first prototype to traffic at scale.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.title} variants={fadeUp} custom={i}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
