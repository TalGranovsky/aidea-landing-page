import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';

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
        <script dangerouslySetInnerHTML={{
          __html: `
            // Custom cursor handling script
            document.addEventListener('DOMContentLoaded', () => {
              // Apply custom cursor to the document
              const customCursorCSS = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><path d=\'M6,6 L30,20 L15,34 L6,6\' fill=\'%23333333\' stroke=\'white\' stroke-width=\'3\' stroke-linejoin=\'round\' /></svg>") 6 6, auto';
              
              // Force cursor through mousemove if needed
              document.addEventListener('mousemove', (e) => {
                const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
                if (elementUnderCursor && elementUnderCursor.tagName === 'IFRAME') {
                  const overlay = document.createElement('div');
                  overlay.className = 'cursor-inheritor';
                  overlay.style.position = 'absolute';
                  overlay.style.top = '0';
                  overlay.style.left = '0';
                  overlay.style.right = '0';
                  overlay.style.bottom = '0';
                  overlay.style.pointerEvents = 'none';
                  overlay.style.cursor = customCursorCSS;
                  
                  // Add this overlay to document body if not already there
                  if (!document.querySelector('.cursor-inheritor')) {
                    document.body.appendChild(overlay);
                  }
                }
              });
            });
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: #6d28d9;
              --color-primary-dark: #4c1d95;
              --color-secondary: #1e293b;
              --color-accent: #8b5cf6;
              --color-text: #f8fafc;
              --color-background: #000000;
            }
            
            body {
              background-color: var(--color-background);
              color: var(--color-text);
            }
            
            .text-shadow-purple {
              text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
            }
            
            .bg-dotted-grid {
              background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
              background-size: 30px 30px;
            }
            
            .hero-glow {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
              pointer-events: none;
            }
          `
        }} />
      </head>
      <body className={`${roboto.className} bg-black bg-dotted-grid`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
