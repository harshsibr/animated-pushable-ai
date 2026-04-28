/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Light theme tokens — surfaces lean warm, ink leans near-black
      colors: {
        canvas: {
          50: "#FFFFFF",
          100: "#FAFAF9",
          200: "#F4F4F2",
          300: "#E8E8E5",
        },
        ink: {
          900: "#0A0A0A",
          800: "#1C1C1C",
          700: "#2A2A2A",
          500: "#525252",
          400: "#737373",
          300: "#A3A3A3",
        },
        // Primary CTA color — vivid red matching the reference
        brand: {
          red: "#C0302B",      // deep crimson — premium, less neon than the prior orange-red
          redDark: "#9E2722",
          // Secondary accent — kept for AI/gradient flourishes
          purple: "#8B5CF6",
          indigo: "#6366F1",
          blue: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      boxShadow: {
        nav: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        cta: "0 10px 30px rgba(232, 53, 42, 0.35)",
        card: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
