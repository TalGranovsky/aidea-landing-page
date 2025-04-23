'use client';

import React, { useState, useEffect, useRef } from 'react';

// Define props interface
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  // State to track loading progress (starting at 0% for accurate feedback)
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  
  // Simulate loading progress - much faster now
  useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    // Very short minimum loading time
    const minLoadingTime = 800; // Drastically reduced from 1500ms to 800ms
    const startTime = Date.now();
    let lastUpdateTime = Date.now();
    
    const simulateLoading = (timestamp: number) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime;
      const elapsedTime = currentTime - startTime;
      
      // Update very frequently for smoother progress
      if (deltaTime > 16) { // 60fps (16ms)
        lastUpdateTime = currentTime;
        
        // Much faster increments
        let increment = 5; // Fixed large increment for speed
        
        // If we've reached minimum time, jump to 100%
        if (elapsedTime >= minLoadingTime && progress < 100) {
          setProgress(100);
          
          // Complete immediately after reaching 100%
          setTimeout(() => {
            onLoadingComplete();
          }, 200); // Very short transition
          
          return;
        }
        
        setProgress(prev => Math.min(prev + increment, 99));
      }
      
      // Continue animation loop if not at 100% or if minimum time hasn't elapsed
      if (progress < 100 || elapsedTime < minLoadingTime) {
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
  }, [progress, onLoadingComplete]);
  
  // Don't render anything on the server
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div 
      className={`loading-screen fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999] ${progress >= 100 ? 'slide-up-exit' : ''}`}
      style={{ 
        willChange: 'transform', 
        visibility: 'visible',
        opacity: 1,
        backgroundColor: '#000000'
      }}
    >
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
              transition: 'width 100ms linear', // Much faster transition
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        
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
        
        @keyframes textGlow {
          0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3); }
          50% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(138, 43, 226, 0.7), 0 0 35px rgba(138, 43, 226, 0.5); }
          100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3); }
        }
        
        @keyframes slide-up-exit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        .slide-up-exit {
          animation: slide-up-exit 0.3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        
        .glowy-text {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(138, 43, 226, 0.5), 0 0 30px rgba(138, 43, 226, 0.3);
          animation: textGlow 3s ease-in-out infinite;
        }
        
        .metalic-bar {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}