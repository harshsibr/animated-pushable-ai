"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialises Lenis smooth scrolling and wires it into GSAP ScrollTrigger
 * so pinned/scroll-driven animations stay in sync with the smooth scroller.
 */
export default function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    if (typeof window !== "undefined") window.__lenis = lenis;

    // Forward Lenis scroll events to ScrollTrigger so it stays accurate
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's RAF so we have a single tick loop
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") delete window.__lenis;
    };
  }, []);

  return lenisRef;
}
