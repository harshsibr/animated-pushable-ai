"use client";

import HeroParticleBg from "@/components/HeroParticleBg";

export default function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <HeroParticleBg />
    </div>
  );
}
