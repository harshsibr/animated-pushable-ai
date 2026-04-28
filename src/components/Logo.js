"use client";

import Image from "next/image";

/**
 * Pushable AI logo — uses /public/logo.png.
 *
 * Props:
 *   variant: "full" (logo image only) | "icon" (same, just smaller)
 *   size: pixel height of the logo image
 *   className: forwarded to the wrapper
 */
export default function Logo({ size = 36, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div
        className="rounded-lg bg-ink-900 px-3 py-1.5"
        style={{ lineHeight: 0 }}
      >
        <Image
          src="/logo.png.png"
          alt="Pushable AI"
          height={size}
          width={size * 4}
          style={{ height: size, width: "auto", objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}
