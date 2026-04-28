"use client";

import { motion } from "framer-motion";
import { BRAND_LOGOS } from "@/components/BrandLogos";

export default function TrustedBy() {
  // Duplicate the list once so the marquee can loop seamlessly
  const row = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className="relative py-16">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
        >
          Trusted by AI leaders
        </motion.p>

        {/* Two-row marquee — second row reverses for visual rhythm */}
        <div
          className="space-y-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee gap-4">
              {row.map((Mark, i) => (
                <Mark key={`r1-${i}`} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee-reverse gap-4">
              {row.map((Mark, i) => (
                <Mark key={`r2-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
