"use client";

import { XIcon, GithubIcon, LinkedinIcon, Mail, ArrowRight, Zap } from "lucide-react";
import Logo from "@/components/Logo";

const NAV_COLS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Security"],
  },
];

const SOCIALS = [
  { Icon: XIcon,        label: "X",        href: "#" },
  { Icon: GithubIcon,   label: "GitHub",   href: "#" },
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top edge separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-x relative py-12">
        {/* ── Single row, three sections divided by vertical lines ── */}
        <div className="flex flex-col divide-y divide-white/8 md:flex-row md:divide-x md:divide-y-0">

          {/* Section 1 — Logo + socials */}
          <div className="flex flex-col justify-center gap-5 pb-8 md:pb-0 md:pr-10 md:w-[30%]">
            <Logo size={22} />
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2 — Nav links */}
          <div className="flex justify-around py-8 md:py-0 md:px-14 md:flex-1">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/65 transition hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 3 — Newsletter */}
          <div className="flex flex-col justify-center gap-3 pt-8 md:pt-0 md:pl-10 md:w-[32%]">
            <p className="text-sm font-medium text-white/80">Stay in the loop</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="flex flex-1 items-center gap-2 pl-3">
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/40" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder-white/25 outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 bg-brand-red px-3.5 text-xs font-semibold text-white transition hover:bg-brand-redDark"
              >
                Subscribe
                <ArrowRight className="h-3 w-3" />
              </button>
            </form>
            <p className="text-xs text-white/30">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/8 pt-6 text-xs text-white/40 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-red/20 text-brand-red">
              <Zap className="h-2.5 w-2.5 fill-current" />
            </span>
            <span>© {new Date().getFullYear()} Pushable AI, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="transition hover:text-white/60">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
