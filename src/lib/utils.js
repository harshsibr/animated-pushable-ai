import clsx from "clsx";

// Thin wrapper over clsx so component code reads naturally
export function cn(...inputs) {
  return clsx(inputs);
}

// Reusable Framer Motion variants — keeps animation language consistent
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Splits a sentence into word spans for staggered word-level reveals
export function splitWords(text) {
  return text.split(" ").map((w, i) => ({ word: w, index: i }));
}
