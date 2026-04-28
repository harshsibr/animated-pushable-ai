"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef(null); // small sharp dot — snaps to pointer
  const glowRef = useRef(null); // large soft ball — lags behind

  useEffect(() => {
    const dot  = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    // Center both via GSAP (xPercent/yPercent translate by % of own size)
    gsap.set([dot, glow], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const mouse   = { x: -200, y: -200 };
    const glowPos = { x: -200, y: -200 };

    const setDotX  = gsap.quickSetter(dot,  "x", "px");
    const setDotY  = gsap.quickSetter(dot,  "y", "px");
    const setGlowX = gsap.quickSetter(glow, "x", "px");
    const setGlowY = gsap.quickSetter(glow, "y", "px");

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Scale glow up/down on hover over interactive elements
    const onIn  = () => gsap.to(glow, { scale: 2.2, duration: 0.35, ease: "power2.out" });
    const onOut = () => gsap.to(glow, { scale: 1,   duration: 0.35, ease: "power2.out" });
    const onDown = () => {
      gsap.to(dot,  { scale: 0.6, duration: 0.1, ease: "power2.in" });
      gsap.to(glow, { scale: 0.8, duration: 0.1, ease: "power2.in" });
    };
    const onUp = () => {
      gsap.to(dot,  { scale: 1, duration: 0.4, ease: "elastic.out(1.4,0.4)" });
      gsap.to(glow, { scale: 1, duration: 0.4, ease: "elastic.out(1.4,0.4)" });
    };

    const attachHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, label, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", onIn);
          el.addEventListener("mouseleave", onOut);
        });
    };
    attachHover();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    // RAF loop — dot snaps, glow lerps with lag
    const ticker = gsap.ticker.add(() => {
      setDotX(mouse.x);
      setDotY(mouse.y);

      glowPos.x += (mouse.x - glowPos.x) * 0.11;
      glowPos.y += (mouse.y - glowPos.y) * 0.11;
      setGlowX(glowPos.x);
      setGlowY(glowPos.y);
    });

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.querySelectorAll("a, button, [role='button'], input, label, select")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onIn);
          el.removeEventListener("mouseleave", onOut);
        });
    };
  }, []);

  return (
    <>
      {/* ── Glow ball — lags behind cursor, radial gradient fill ── */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-14 w-14 rounded-full"
        style={{
          willChange: "transform",
          background:
            "radial-gradient(circle at center, rgba(239,68,68,0.65) 0%, rgba(239,68,68,0.28) 40%, rgba(239,68,68,0.06) 70%, transparent 100%)",
          filter: "blur(3px)",
        }}
      />

      {/* ── Sharp dot — exact cursor position ── */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-brand-red"
        style={{
          willChange: "transform",
          boxShadow:
            "0 0 0 2px rgba(239,68,68,0.3), 0 0 12px rgba(239,68,68,0.7)",
        }}
      />
    </>
  );
}
