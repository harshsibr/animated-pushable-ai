"use client";

import { useEffect, useRef } from "react";

export default function HeroParticleBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Particle factory
    const mkParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.5 + 0.8,
      accent: Math.random() < 0.13,
    });

    const N = 95;
    let pts = Array.from({ length: N }, mkParticle);

    const CONNECT = 130;
    const MOUSE_R = 160;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Move + wrap
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Gentle mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R) {
          const d = Math.sqrt(d2);
          const f = ((MOUSE_R - d) / MOUSE_R) * 0.018;
          p.x += (dx / d) * f * MOUSE_R;
          p.y += (dy / d) * f * MOUSE_R;
        }
      });

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.28;
            const isAccent = pts[i].accent || pts[j].accent;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = isAccent
              ? `rgba(192,48,43,${a * 0.9})`
              : `rgba(160,170,210,${a * 0.55})`;
            ctx.lineWidth = isAccent ? 0.9 : 0.6;
            ctx.stroke();
          }
        }
      }

      // Dots
      pts.forEach((p) => {
        if (p.accent) {
          // Outer bloom
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 9);
          g.addColorStop(0, "rgba(192,48,43,0.75)");
          g.addColorStop(0.35, "rgba(192,48,43,0.25)");
          g.addColorStop(1, "rgba(192,48,43,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(210,70,65,1)";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180,190,230,0.6)";
          ctx.fill();
        }
      });

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}
