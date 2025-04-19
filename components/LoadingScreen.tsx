'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Playfair_Display } from 'next/font/google'

// Initialize fonts with all required weights
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

// Define props interface
interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  // State to track loading progress (starting at 0% for accurate feedback)
  const [progress, setProgress] = useState(0)
  const [showCurtain, setShowCurtain] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const initialRenderComplete = useRef(false)
  const lastUpdateTime = useRef<number>(Date.now())
  
  // Critical CSS styles directly injected
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Set initial render complete
      initialRenderComplete.current = true
      
      // Create and inject a critical style element with highest priority
      const criticalStyle = document.createElement('style')
      criticalStyle.setAttribute('id', 'critical-loading-styles')
      criticalStyle.setAttribute('data-priority', 'highest')
      criticalStyle.innerHTML = `
        html, body {
          background-color: #000 !important;
          margin: 0 !important;
          padding: 0 !important;
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
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
      `
      
      // Insert at the beginning of head for highest priority
      if (document.head) {
        document.head.insertBefore(criticalStyle, document.head.firstChild)
      }
      
      // Force body styles only during loading
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // When component unmounts, restore scrolling
        document.documentElement.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
        document.body.style.overflowY = 'auto';
        
        // Remove the critical styles
        const styleElement = document.getElementById('critical-loading-styles');
        if (styleElement && styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    }
  }, [])
  
  // Handle loading progress simulation
  useEffect(() => {
    if (!initialRenderComplete.current) return

    const simulateLoading = (timestamp: number) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current
      
      // Only update if enough time has passed (throttle updates)
      if (deltaTime > 50) { // Reduced from 100ms to 50ms for faster updates
        lastUpdateTime.current = currentTime
        
        // Faster increments for quicker loading
        let increment: number
        
        if (progress < 30) {
          // Start faster (early loading)
          increment = Math.random() * 3 + 2
        } else if (progress < 70) {
          // Medium speed (bulk of loading)
          increment = Math.random() * 2.5 + 1.5
        } else if (progress < 90) {
          // Slower (approaching completion)
          increment = Math.random() * 1.5 + 1
        } else {
          // Very slow (final stage)
          increment = Math.random() * 1 + 0.5
        }
        
        // Update progress
        setProgress(prev => {
          const newProgress = Math.min(prev + increment, 100)
          // When loading is complete, trigger the callback
          if (newProgress >= 100) {
            // Wait for the curtain animation to complete before calling onLoadingComplete
            setTimeout(() => {
              // Before calling onLoadingComplete, ensure scrolling is restored
              if (typeof document !== 'undefined') {
                document.documentElement.style.overflow = 'visible';
                document.body.style.overflow = 'visible';
                document.body.style.overflowY = 'auto';
              }
              
              onLoadingComplete()
            }, 800) // Reduced from 1000ms to 800ms for faster transition
            return 100
          }
          return newProgress
        })
      }
      
      // Continue animation loop if not at 100%
      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(simulateLoading)
      }
    }
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(simulateLoading)
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [progress, onLoadingComplete, initialRenderComplete])
  
  // Don't render anything on the server or before client-side hydration
  if (typeof window === 'undefined' || !initialRenderComplete.current) {
    return null
  }

  return (
    <div 
      className="loading-screen fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]" 
      style={{ 
        willChange: 'transform', 
        contain: 'layout style paint',
        visibility: 'visible',
        opacity: 1
      }}
    >
      {/* Animated gradient background - preloaded with CSS */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #000000, #3a0048, #600060, #4300b0, #000000)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 10s ease infinite',
          willChange: 'background-position',
        }}
      >
        {/* Radial overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(123, 0, 215, 0.3) 0%, rgba(0, 0, 0, 0.7) 70%)',
            animation: 'pulse 8s ease-in-out infinite',
            willChange: 'opacity',
          }}
        />
      </div>
      
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
          className={`${playfair.className} text-8xl font-bold mb-6 tracking-wider`}
          style={{
            background: 'linear-gradient(to right, #bd00ff, #7000f8, #4287f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(123, 0, 215, 0.5)'
          }}
        >
          AIDEA
        </h1>
        
        {/* Tagline */}
        <p className="text-white text-xl mb-16 font-medium tracking-wide">
          WE BRING YOUR AIDEAS TO LIFE
        </p>
        
        {/* Loading bar container */}
        <div className="w-full h-3 bg-gray-800/70 rounded-full overflow-hidden mb-4 border border-purple-500/20">
          {/* Progress bar with gradient */}
          <div 
            className="h-full rounded-full"
            style={{
              width: `${Math.floor(progress)}%`,
              background: 'linear-gradient(to right, #bd00ff, #7000f8, #4287f5)',
              boxShadow: '0 0 10px rgba(123, 0, 215, 0.5)',
              transition: 'width 300ms ease-out', // Smoother transition
              willChange: 'width',
            }}
          />
        </div>
        
        {/* Loading info */}
        <div className="w-full flex justify-between text-sm text-white">
          <span>LOADING</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  )
} 