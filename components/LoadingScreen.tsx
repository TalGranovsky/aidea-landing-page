'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

// Define props interface
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  // State to track loading progress (starting at 0% for accurate feedback)
  const [progress, setProgress] = useState(0);
  const [showCurtain, setShowCurtain] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const initialRenderComplete = useRef(false);
  const lastUpdateTime = useRef<number>(Date.now());
  
  // Critical CSS styles directly injected
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Force black background immediately
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
      
      // Set initial render complete
      initialRenderComplete.current = true;
      
      // Prevent scrolling during loading
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      // Create and inject a critical style element with highest priority
      const criticalStyle = document.createElement('style');
      criticalStyle.setAttribute('id', 'critical-loading-styles');
      criticalStyle.setAttribute('data-priority', 'highest');
      criticalStyle.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        
        html, body {
          background-color: #000 !important;
          margin: 0 !important;
          padding: 0 !important;
          color: #fff !important;
        }
        .loading-screen {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          background-color: #000 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 9999 !important;
          opacity: 1 !important;
          visibility: visible !important;
          font-family: 'Roboto', sans-serif !important;
        }
        
        @keyframes purpleHaze {
          0% { opacity: 0.3; transform: translate(-5%, -5%) scale(0.9); }
          33% { opacity: 0.6; transform: translate(3%, 2%) scale(1.1); }
          66% { opacity: 0.4; transform: translate(-2%, 5%) scale(1); }
          100% { opacity: 0.3; transform: translate(-5%, -5%) scale(0.9); }
        }
        
        @keyframes purpleHaze2 {
          0% { opacity: 0.4; transform: translate(5%, 5%) scale(1.1); }
          33% { opacity: 0.2; transform: translate(-3%, -2%) scale(0.9); }
          66% { opacity: 0.5; transform: translate(2%, -5%) scale(1); }
          100% { opacity: 0.4; transform: translate(5%, 5%) scale(1.1); }
        }
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3); }
          50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(138, 43, 226, 0.7), 0 0 35px rgba(138, 43, 226, 0.5); }
          100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3); }
        }
        
        @keyframes metalicShine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 0.9; }
          100% { opacity: 0.7; }
        }
        
        @keyframes curtain-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        
        .animate-curtain-up {
          animation: curtain-up 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        
        @keyframes slide-up-exit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        .slide-up-exit {
          animation: slide-up-exit 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        
        .purple-haze {
          position: absolute;
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, rgba(138, 43, 226, 0.1) 50%, rgba(0, 0, 0, 0) 70%);
          filter: blur(40px);
          will-change: transform, opacity;
        }
        
        .purple-haze-1 {
          top: 20%;
          left: 20%;
          animation: purpleHaze 8s infinite ease-in-out;
        }
        
        .purple-haze-2 {
          bottom: 20%;
          right: 20%;
          animation: purpleHaze2 10s infinite ease-in-out;
        }
      `;
      
      // Insert the style element at the beginning of the head
      if (document.head.firstChild) {
        document.head.insertBefore(criticalStyle, document.head.firstChild);
      }
      
      return () => {
        // When component unmounts, restore scrolling
        document.documentElement.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
        document.body.style.overflowY = 'auto';
        
        // Remove the critical style element
        const criticalStyleElement = document.getElementById('critical-loading-styles');
        if (criticalStyleElement) {
          criticalStyleElement.remove();
        }
      };
    }
  }, []);
  
  // Handle loading progress simulation
  useEffect(() => {
    if (!initialRenderComplete.current) return;
    
    const simulateLoading = (timestamp: number) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      
      // Only update if enough time has passed (throttle updates for better performance)
      if (deltaTime > 40) { // Reduced from 50ms to 40ms for slightly faster updates
        lastUpdateTime.current = currentTime;
        
        // Optimize increments for faster loading
        let increment: number;
        
        if (progress < 30) {
          // Start faster (early loading)
          increment = Math.random() * 2.5 + 1.5; // Increased speed
        } else if (progress < 60) {
          // Medium speed (middle loading)
          increment = Math.random() * 2 + 0.8; // Increased speed
        } else if (progress < 80) {
          // Slow down (later loading)
          increment = Math.random() * 1 + 0.3; // Increased speed
        } else if (progress < 95) {
          // Very slow (final loading)
          increment = Math.random() * 0.5 + 0.2; // Increased speed
        } else {
          // Final push to 100%
          increment = Math.random() * 0.3 + 0.1; // Increased speed
        }
        
        setProgress(prevProgress => {
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // When we reach 100%, show the curtain and trigger the completion callback
          if (newProgress >= 100 && prevProgress < 100) {
            // Apply slide-up animation to the entire loading screen
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
              loadingScreen.classList.add('slide-up-exit');
            }
            
            // After animation completes, call onLoadingComplete
            setTimeout(() => {
              // Restore scrolling
              if (typeof document !== 'undefined') {
                document.documentElement.style.overflow = 'visible';
                document.body.style.overflow = 'visible';
                document.body.style.overflowY = 'auto';
              }
              
              onLoadingComplete();
            }, 800); // Match with animation duration
            return 100;
          }
          return newProgress;
        });
      }
      
      // Continue animation loop if not at 100%
      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(simulateLoading);
      }
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(simulateLoading);
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [progress, onLoadingComplete, initialRenderComplete]);
  
  // Don't render anything on the server
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div 
      className="loading-screen fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]" 
      style={{ 
        willChange: 'transform', 
        contain: 'layout style paint',
        visibility: 'visible',
        opacity: 1,
        backgroundColor: '#000000'
      }}
    >
      {/* Purple haze effects */}
      <div className="purple-haze purple-haze-1"></div>
      <div className="purple-haze purple-haze-2"></div>
      
      {/* Curtain overlay - slides from bottom to top */}
      {showCurtain && (
        <div 
          className="absolute inset-0 bg-black z-50 animate-curtain-up"
          style={{ 
            willChange: 'transform',
            transformOrigin: 'bottom'
          }}
        />
      )}
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center">
        {/* Logo */}
        <h1 
          className="glowy-text text-8xl font-bold mb-6 tracking-wider"
          style={{
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          AIDEA
        </h1>
        
        {/* Tagline */}
        <p className="text-white text-xl mb-8 font-medium tracking-wide" style={{ fontFamily: "'Roboto', sans-serif" }}>
          YOUR CREATIVE AGENCY
        </p>
        
        {/* Loading bar container */}
        <div className="w-full h-3 bg-gray-800/30 backdrop-blur-sm rounded-full overflow-hidden mb-4 border border-purple-500/20 metalic-bar">
          {/* Progress bar with gradient */}
          <div 
            className="h-full rounded-full"
            style={{
              width: `${Math.floor(progress)}%`,
              background: 'linear-gradient(90deg, #6d28d9, #9333ea, #6d28d9)',
              boxShadow: '0 0 15px rgba(123, 0, 215, 0.7)',
              transition: 'width 250ms ease-out', // Faster transition
              willChange: 'width',
            }}
          />
        </div>
        
        {/* Loading info */}
        <div className="w-full flex justify-between text-sm text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <span>LOADING</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
}