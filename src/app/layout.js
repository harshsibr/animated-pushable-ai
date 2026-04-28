import { Inter, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import GlobalBackground from "@/components/GlobalBackground";

// Body font — geometric sans
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// UI / mono-ish display
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Editorial serif — used for hero/section headings
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

export const metadata = {
  title: "Pushable AI — Automated AI Workflow Assistant",
  description:
    "Pushable AI handles repetitive tasks automatically and works quietly in the background to keep your daily operations running smoothly.",
  keywords: ["AI", "Automation", "Workflows", "SaaS", "Pushable AI"],
  openGraph: {
    title: "Pushable AI",
    description: "Automated AI Workflow Assistant.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${fraunces.variable}`}
    >
      <body className="bg-[#07071a] text-ink-900 antialiased">
        <GlobalBackground />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
