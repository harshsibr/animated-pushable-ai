"use client";

import useLenis from "@/hooks/useLenis";

// Mounts Lenis once at the root of the app. Render-only — has no UI.
export default function SmoothScrollProvider({ children }) {
  useLenis();
  return children;
}
