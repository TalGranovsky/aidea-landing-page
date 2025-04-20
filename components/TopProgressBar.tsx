'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import nprogress CSS

// Configure NProgress appearance (optional)
NProgress.configure({
  showSpinner: false, // Hide the default spinner
  // You can customize the color here if needed, or do it via CSS
  // template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
});

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress bar on route change
    NProgress.start();

    // Complete progress bar when component unmounts or dependencies change
    // This effectively covers when navigation completes
    return () => {
      NProgress.done();
    };
    // Trigger effect on pathname or searchParams change
  }, [pathname, searchParams]);

  // This component doesn't render anything itself
  return null;
}
