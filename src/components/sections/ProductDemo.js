"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Faux code shown in the editor — kept short to fit small screens
const CODE_LINES = [
  { c: "text-rose-500", t: "// 1. Define an agent" },
  { c: "text-ink-900", t: "const agent = pushable.agent({" },
  { c: "text-ink-900", t: "  name: 'lead-enrichment'," },
  { c: "text-ink-900", t: "  model: 'claude-opus-4-7'," },
  { c: "text-ink-900", t: "  tools: [hubspot, clearbit, slack]," },
  { c: "text-ink-900", t: "});" },
  { c: "text-rose-500", t: "" },
  { c: "text-rose-500", t: "// 2. Trigger on new lead" },
  { c: "text-ink-900", t: "agent.on('lead.created', async (lead) => {" },
  { c: "text-ink-900", t: "  const enriched = await agent.run(lead);" },
  { c: "text-ink-900", t: "  await slack.notify('#sales', enriched);" },
  { c: "text-ink-900", t: "});" },
];

export default function ProductDemo() {
  const ref = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sequentially "type in" each code line as the section scrolls into view
      gsap.fromTo(
        lineRefs.current,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="demo"
      ref={ref}
      className="relative bg-canvas-100 py-28 md:py-36"
    >
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Product demo</span>
          <h2 className="heading-display mt-5 text-4xl md:text-5xl">
            Code-first when you need it.
            <br className="hidden md:block" />
            No-code when you don&apos;t.
          </h2>
          <p className="mt-4 text-base text-ink-500 md:text-lg">
            Drop into the editor for fine-grained control or stay in the visual
            canvas. Both write to the same source of truth.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Code panel */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-black/5 bg-canvas-100 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Terminal className="h-3.5 w-3.5" />
                  <span className="font-mono">workflows/lead-enrichment.js</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                </div>
              </div>

              <pre className="m-0 overflow-x-auto p-5 font-mono text-[13px] leading-7">
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    ref={(el) => (lineRefs.current[i] = el)}
                    className="flex gap-4"
                  >
                    <span className="w-6 select-none text-right text-ink-300">
                      {i + 1}
                    </span>
                    <span className={line.c}>{line.t || " "}</span>
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Live run preview */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-card">
              <div className="flex items-center gap-2 text-xs text-ink-500">
                <Sparkles className="h-3.5 w-3.5 text-brand-red" />
                Live run · lead-enrichment
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Input received", v: "lead.created" },
                  { label: "Tool called", v: "clearbit.lookup()" },
                  { label: "Tool called", v: "hubspot.update()" },
                  { label: "Tool called", v: "slack.notify(#sales)" },
                  { label: "Status", v: "completed · 412ms" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-black/5 bg-canvas-100 px-3.5 py-2.5 text-xs"
                  >
                    <span className="text-ink-400">{row.label}</span>
                    <span className="font-mono text-ink-900">{row.v}</span>
                  </div>
                ))}
              </div>

              <a
                href="#cta"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:text-brand-redDark"
              >
                Open in console
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
