import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import WorkflowShowcase from "@/components/sections/WorkflowShowcase";
import Industries from "@/components/sections/Industries";
import ScrollStory from "@/components/sections/ScrollStory";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

// Single-page composition. Each section is self-contained so it can be
// re-ordered or removed without touching the rest of the layout.
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <TrustedBy />
        {/* Curved-arc workflow showcase (top-right → dip → top-left) */}
        <WorkflowShowcase />
        {/* 4-step "From Idea to Automation" with crossfading text + visuals */}
        <ScrollStory />
        {/* "Right Push for Every Industry" — 6-card grid over landscape */}
        <Industries />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
