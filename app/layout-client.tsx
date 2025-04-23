"use client";

import React, { useEffect } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import GlobalStyles from '@/components/GlobalStyles';
import { Suspense } from 'react';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

interface ClientLayoutProps {
  children: React.ReactNode;
  robotoClassName: string;
}

export default function ClientLayout({ children, robotoClassName }: ClientLayoutProps) {
  // Set background color immediately on client-side
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#000000';
    document.body.style.backgroundColor = '#000000';
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" as="style" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${robotoClassName} bg-black`}>
        <style jsx global>{`
          html, body {
            background-color: #000000 !important;
            color: #ffffff;
          }
          
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(circle at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 1) 70%),
              radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 2px, transparent 0);
            background-size: 100% 100%, 32px 32px;
            background-position: center, center;
            pointer-events: none;
            z-index: -1;
          }
          
          /* Prevent flash of unstyled content */
          .js-loading {
            opacity: 0;
          }
          
          /* Will be set to visible by JavaScript */
          .js-loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
          }
        `}</style>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <CustomCursor />
        <GlobalStyles />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
