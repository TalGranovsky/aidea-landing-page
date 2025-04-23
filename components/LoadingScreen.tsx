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
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Simulate loading progress - adjusted to be about 4 seconds
  useEffect(() => {
    // Safety check for SSR and mounting
    if (!mounted) return;
    
    // Set to 4 seconds minimum loading time
    const minLoadingTime = 4000; // 4 seconds
    const startTime = Date.now();
    let lastUpdateTime = Date.now();
    
    // Start with a small initial progress to show movement
    setProgress(1);
    
    const simulateLoading = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime;
      const elapsedTime = currentTime - startTime;
      
      // Update every 30ms for smooth progress
      if (deltaTime > 30) {
        lastUpdateTime = currentTime;
        
        // Calculate progress based on elapsed time
        // We want to reach 100% in about 4 seconds
        const targetProgress = Math.min((elapsedTime / minLoadingTime) * 100, 99);
        
        // Smooth progress updates with slight randomness for natural feel
        let increment = (targetProgress - progress) * 0.1; // Smooth easing
        increment = Math.max(0.2, Math.min(increment, 2)); // Clamp between 0.2 and 2
        
        // If we've reached minimum time, go to 100%
        if (elapsedTime >= minLoadingTime && progress > 95) {
          setProgress(100);
          
          // Complete after reaching 100%
          setTimeout(() => {
            if (mounted) {
              onLoadingComplete();
            }
          }, 400); // Transition delay
          
          return;
        }
        
        setProgress(prev => Math.min(prev + increment, targetProgress));
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
  }, [progress, onLoadingComplete, mounted]);
  
  // Don't render anything on the server or before mounting
  if (typeof window === 'undefined' || !mounted) {
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
      {/* Purple haze effects - adding back for visual interest */}
      <div className="purple-haze purple-haze-1"></div>
      <div className="purple-haze purple-haze-2"></div>
      
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
              width: `${Math.max(1, Math.floor(progress))}%`, // Ensure at least 1% width
              background: 'linear-gradient(90deg, #6d28d9, #9333ea, #6d28d9)',
              boxShadow: '0 0 15px rgba(123, 0, 215, 0.7)',
              transition: 'width 200ms ease-out', // Smoother transition
              willChange: 'width',
            }}
          />
        </div>
        
        {/* Loading info */}
        <div className="w-full flex justify-between text-sm text-white" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <span>LOADING</span>
          <span>{Math.max(1, Math.floor(progress))}%</span>
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
        
        @keyframes slide-up-exit {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        .slide-up-exit {
          animation: slide-up-exit 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        
        .purple-haze {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }
        
        .purple-haze-1 {
          background: radial-gradient(circle at 30% 30%, rgba(123, 0, 255, 0.3) 0%, rgba(123, 0, 255, 0.1) 30%, transparent 70%);
          animation: purpleHaze 15s ease-in-out infinite;
        }
        
        .purple-haze-2 {
          background: radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0.1) 30%, transparent 70%);
          animation: purpleHaze2 15s ease-in-out infinite;
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
        
        .metalic-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          width: 150%;
          transform: translateX(-100%);
          animation: metalicShine 3s ease-in-out infinite;
        }
        
        @keyframes metalicShine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}