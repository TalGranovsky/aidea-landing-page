'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    // Apply custom cursor to the document
    const customCursorCSS = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><path d=\'M6,6 L30,20 L15,34 L6,6\' fill=\'%23333333\' stroke=\'white\' stroke-width=\'3\' stroke-linejoin=\'round\' /></svg>") 6 6, auto';
    
    // Force cursor through mousemove if needed
    const handleMouseMove = (e: MouseEvent) => {
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
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return null; // This component doesn't render anything
}
