"use client";

// Brand logo + name badges for the trusted-by marquee.

const Wrap = ({ icon, name }) => (
  <span className="inline-flex shrink-0 items-center gap-2.5 px-3 py-1 opacity-90 transition-opacity hover:opacity-100">
    {icon}
    <span className="text-[13px] font-semibold text-white whitespace-nowrap">{name}</span>
  </span>
);

export const HubSpotMark = () => (
  <Wrap
    name="HubSpot"
    icon={
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF7A59">
        <circle cx="18" cy="14" r="4" />
        <circle cx="6" cy="14" r="2" />
        <rect x="11" y="2" width="2" height="10" />
        <rect x="11" y="14" width="2" height="8" />
      </svg>
    }
  />
);

export const NotionMark = () => (
  <Wrap
    name="Notion"
    icon={
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0A0A0A" strokeWidth="2" />
        <path d="M8 8 L8 16 M8 8 L16 16 M16 8 L16 16" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    }
  />
);

export const ZoomMark = () => (
  <Wrap
    name="Zoom"
    icon={
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#2D8CFF">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M16 10 L22 7 L22 17 L16 14 Z" />
      </svg>
    }
  />
);

export const FigmaMark = () => (
  <Wrap
    name="Figma"
    icon={
      <svg width="16" height="22" viewBox="0 0 18 24" fill="none">
        <circle cx="6" cy="3" r="3" fill="#F24E1E" />
        <circle cx="12" cy="3" r="3" fill="#FF7262" />
        <circle cx="6" cy="9" r="3" fill="#A259FF" />
        <circle cx="12" cy="9" r="3" fill="#1ABCFE" />
        <circle cx="6" cy="15" r="3" fill="#0ACF83" />
        <circle cx="6" cy="21" r="3" fill="#0ACF83" opacity="0.85" />
      </svg>
    }
  />
);

export const LinearMark = () => (
  <Wrap
    name="Linear"
    icon={
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#5E6AD2">
        <path d="M3 13 L11 21 a10 10 0 0 1 -8 -8 Z" />
        <path d="M3 8 L16 21 a10 10 0 0 1 -5 -1.5 L3 11.5 Z" />
        <path d="M4 4 L20 20 a10 10 0 0 1 -2 1.5 L2.5 5.5 A10 10 0 0 1 4 4 Z" />
        <path d="M9 3 L21 15 a10 10 0 0 0 -12 -12 Z" />
      </svg>
    }
  />
);

export const VercelMark = () => (
  <Wrap
    name="Vercel"
    icon={
      <svg width="20" height="18" viewBox="0 0 24 22" fill="#0A0A0A">
        <path d="M12 1 L23 20 L1 20 Z" />
      </svg>
    }
  />
);

export const AirtableMark = () => (
  <Wrap
    name="Airtable"
    icon={
      <svg width="22" height="22" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="6" rx="1.5" fill="#FFBF00" />
        <path d="M2 12 L11 15.5 L11 22 L2 18.5 Z" fill="#18BFFF" />
        <path d="M22 12 L13 15.5 L13 22 L22 18.5 Z" fill="#F82B60" />
      </svg>
    }
  />
);

export const GoogleMark = () => (
  <Wrap
    name="Google"
    icon={
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path d="M12 22c2.7 0 5-1 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6C4.7 19.7 8.1 22 12 22z" fill="#34A853" />
        <path d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3.1C2.4 8.9 2 10.4 2 12s.4 3.1 1.1 4.5l3.3-2.6z" fill="#FBBC05" />
        <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3 14.7 2 12 2 8.1 2 4.7 4.3 3.1 7.5l3.3 2.6c.8-2.4 3-4.2 5.6-4.2z" fill="#EA4335" />
        <path d="M22 12c0-.6-.1-1.2-.2-1.8H12v3.4h5.6c-.2 1.2-1 2.2-2.1 2.9l3.2 2.5C20.8 17.2 22 14.8 22 12z" fill="#4285F4" />
      </svg>
    }
  />
);

export const ShopifyMark = () => (
  <Wrap
    name="Shopify"
    icon={
      <svg width="20" height="22" viewBox="0 0 20 22" fill="#95BF47">
        <path d="M14 4 C13 2 11.5 1 10 1 C8 1 6.5 2.5 6 5 L3 6 L1 21 L17 22 L19 7 L14 4 Z" />
        <path d="M11 8 L11 7 C11 5 10 4 9 4 C8 4 7 5 7 7 L7 8" stroke="#FFFFFF" strokeWidth="0.6" fill="none" />
        <text x="10" y="15" fontSize="6" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">S</text>
      </svg>
    }
  />
);

export const StripeMark = () => (
  <Wrap
    name="Stripe"
    icon={
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#635BFF">
        <rect width="24" height="24" rx="5" />
        <text x="12" y="17" fontSize="14" fontWeight="900" fill="#FFFFFF" textAnchor="middle">S</text>
      </svg>
    }
  />
);

export const BRAND_LOGOS = [
  HubSpotMark,
  NotionMark,
  ZoomMark,
  FigmaMark,
  LinearMark,
  VercelMark,
  AirtableMark,
  GoogleMark,
  ShopifyMark,
  StripeMark,
];
