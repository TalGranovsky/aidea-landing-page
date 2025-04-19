import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: "AIDEA | Your Creative Agency",
  description: "AIDEA brings your creative ideas to life with cutting-edge AI solutions",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/images/aidea-logo.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/images/aidea-logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/aidea-logo.svg" />
        <link rel="manifest" href="/manifest.json" />
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
      </head>
      <body className={`${inter.className} bg-black bg-dotted-grid`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
