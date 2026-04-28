"use client";

import { Check, Minus } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    credits: "100 credits / month",
    cta: "Get started free",
    ctaVariant: "outline",
    popular: false,
    features: [
      { text: "2 active agents", included: true },
      { text: "Support + Research agents", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "Credit rollover", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Growth",
    price: { monthly: 49, annual: 39 },
    credits: "3,000 credits + rollover",
    cta: "Start free trial",
    ctaVariant: "green",
    popular: true,
    features: [
      { text: "All 6 agent types", included: true },
      { text: "Credit rollover", included: true },
      { text: "Priority support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom workflows", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    credits: "Unlimited credits",
    cta: "Contact sales",
    ctaVariant: "outline",
    popular: false,
    features: [
      { text: "Custom AI agents", included: true },
      { text: "SSO / SAML", included: true },
      { text: "99.9% SLA guarantee", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "On-premise deployment", included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      {/* Subtle top separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-x">
        {/* Header */}
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-brand-red">
            Pricing
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-3 text-sm text-white/60">Start free. Scale as you grow.</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition ${
                plan.popular
                  ? "border-brand-red/30 bg-white/[0.07] shadow-[0_0_40px_rgba(192,48,43,0.08)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-red px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                {plan.name}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-end gap-1">
                {plan.price.monthly === null ? (
                  <span className="font-serif text-4xl font-semibold text-white">Custom</span>
                ) : (
                  <>
                    <span className="font-serif text-5xl font-semibold text-white">
                      ${plan.price.monthly}
                    </span>
                    <span className="mb-1.5 text-sm text-white/50">/mo</span>
                  </>
                )}
              </div>

              <p className="mt-1 text-xs text-white/40">{plan.credits}</p>

              {/* CTA */}
              <a
                href="#"
                className={`mt-6 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition ${
                  plan.ctaVariant === "green"
                    ? "bg-brand-red text-white hover:bg-brand-redDark"
                    : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>

              {/* Divider */}
              <div className="my-6 h-px bg-white/8" />

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-sm">
                    {f.included ? (
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <Minus className="h-4 w-4 shrink-0 text-white/20" />
                    )}
                    <span className={f.included ? "text-white/80" : "text-white/30 line-through"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
