import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import GlobalStyles from '@/components/GlobalStyles';

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});

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
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${roboto.className} bg-black bg-dotted-grid`}>
        <ScrollToTop />
        <CustomCursor />
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}
