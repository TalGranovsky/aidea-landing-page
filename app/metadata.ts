import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "AIDEA - Your Creative Agency",
  description: "AI-powered creative solutions for your business",
  keywords: [
    "AI",
    "creative agency",
    "digital design",
    "web development",
    "artificial intelligence",
    "branding",
    "marketing",
  ],
  icons: {
    icon: [
      {
        url: "/images/aidea-logo.svg",
        type: "image/svg+xml",
        sizes: "32x32"
      },
      {
        url: "/images/aidea-logo.svg",
        type: "image/svg+xml",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/images/aidea-logo.svg",
        type: "image/svg+xml",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/images/aidea-logo.svg" }],
    other: [
      {
        rel: "icon",
        url: "/images/aidea-logo.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#000000',
  colorScheme: 'dark',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};
