"use client";

import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Mail, ArrowRight, Zap } from "lucide-react";
import Logo from "@/components/Logo";

const NAV = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Guides", "Status", "Security"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
  },
];

const SOCIALS = [
  { Icon: Twitter,  label: "Twitter",  href: "#" },
  { Icon: Github,   label: "GitHub",   href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top edge separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-x relative">
        {/* ── Top band: logo + newsletter ── */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/8 py-14 md:flex-row md:items-center">
          <div className="max-w-sm">
            <Logo size={24} />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              The AI workflow platform that handles your repetitive work —
              automatically, silently, and flawlessly in the background.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Stay in the loop
            </p>
            <p className="mt-1.5 text-sm text-white/75">
              Get product updates and AI workflow tips.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="flex flex-1 items-center gap-2 pl-4">
                <Mail className="h-4 w-4 shrink-0 text-white/50" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent py-3 text-sm text-white placeholder-white/25 outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-brand-red px-4 text-sm font-semibold text-white transition hover:bg-brand-redDark"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* ── Nav columns ── */}
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {NAV.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/75 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 py-7 text-xs text-white/50 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-red/20 text-brand-red">
              <Zap className="h-3 w-3 fill-current" />
            </span>
            <span>© {new Date().getFullYear()} Pushable AI, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security", "Cookies"].map((l) => (
              <a key={l} href="#" className="transition hover:text-white/70">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
