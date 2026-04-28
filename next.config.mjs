/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GSAP and Lenis are CJS packages — transpile them so Next 15's
  // page-data-collection step on Windows can resolve their chunks.
  transpilePackages: ["gsap", "lenis"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
