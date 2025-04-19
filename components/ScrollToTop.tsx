'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Scroll to top when the route changes (including on initial load)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' to avoid visual stuttering
    });
  }, [pathname, searchParams]); // Re-run when pathname or search params change

  // Handle page refresh specifically
  useEffect(() => {
    // This function will run on component mount (page load/refresh)
    if (window.performance) {
      // Check if it's a page refresh using the older API
      if ('navigation' in performance && (performance as any).navigation.type === 1) {
        // Type 1 is reload
        window.scrollTo(0, 0);
      } else if ('getEntriesByType' in performance) {
        // Modern browsers
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length > 0 && (navEntries[0] as any).type === 'reload') {
          window.scrollTo(0, 0);
        }
      }
    }
    
    // Also handle beforeunload event
    const handleBeforeUnload = () => {
      // Store the fact that we're refreshing, so we can scroll to top when the page loads again
      sessionStorage.setItem('shouldScrollToTop', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check if we should scroll to top based on session storage
    if (sessionStorage.getItem('shouldScrollToTop') === 'true') {
      window.scrollTo(0, 0);
      sessionStorage.removeItem('shouldScrollToTop');
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
}
