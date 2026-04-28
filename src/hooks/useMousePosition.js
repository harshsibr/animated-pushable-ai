"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current mouse position normalized to the viewport.
 * x and y are in the range [-0.5, 0.5] which makes parallax math trivial:
 *   translateX = x * intensity
 *   translateY = y * intensity
 */
export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pos;
}
