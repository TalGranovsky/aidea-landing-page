'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

interface PageTransitionWrapperProps {
  children: ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [loadingKey, setLoadingKey] = useState(0); // Used to force re-render of skeleton

  // Track navigation events
  useEffect(() => {
    // Create event listeners
    const handleRouteChangeStart = () => {
      setIsRouteChanging(true);
      setLoadingKey(prev => prev + 1); // Force skeleton to re-render
    };

    const handleRouteChangeComplete = () => {
      // Reduce the delay before hiding the skeleton for faster page transitions
      setTimeout(() => {
        setIsRouteChanging(false);
      }, 800);
    };

    // We need to manually track navigation in Next.js App Router
    // This uses MutationObserver to detect navigation changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Check if we're navigating
          if (document.documentElement.classList.contains('nprogress-busy')) {
            handleRouteChangeStart();
          } else if (isRouteChanging) {
            handleRouteChangeComplete();
          }
        }
      }
    });

    // Start observing
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Simulate route change on initial load for a consistent experience
    if (typeof window !== 'undefined' && window.location.pathname === pathname) {
      setIsRouteChanging(true);
      setTimeout(() => {
        setIsRouteChanging(false);
      }, 1000);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [pathname, isRouteChanging]);

  // Listen for clicks on anchor tags to trigger the skeleton
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && 
          anchor.href && 
          anchor.href.startsWith(window.location.origin) && 
          !anchor.target && 
          !anchor.hasAttribute('download') &&
          !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        
        // Skip skeleton animation for lets-begin page
        if (anchor.href.includes('/lets-begin')) {
          return; // Don't show skeleton for lets-begin page
        }
        
        // Prevent default behavior to allow our custom transition
        e.preventDefault();
        
        // Show skeleton loader
        setIsRouteChanging(true);
        setLoadingKey(prev => prev + 1);
        
        // Navigate sooner for faster perceived performance
        setTimeout(() => {
          router.push(anchor.href);
        }, 50);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);

  return (
    <>
      {/* Skeleton loader - shown during route changes, except for lets-begin page */}
      <SkeletonLoader 
        key={loadingKey} 
        isLoading={isRouteChanging && !pathname.includes('/lets-begin')} 
      />
      
      {/* Page content with fade animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransitionWrapper;
