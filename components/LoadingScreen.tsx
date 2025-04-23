'use client';

import React, { useState, useEffect } from 'react';

// Define props interface
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  // State to track loading progress
  const [progress, setProgress] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  
  // Simple timer-based loading simulation
  useEffect(() => {
    // Total loading time in ms (4 seconds)
    const totalLoadingTime = 4000;
    // Update interval in ms (50ms = 20 updates per second)
    const updateInterval = 50;
    // Number of updates to reach 100%
    const totalUpdates = totalLoadingTime / updateInterval;
    // Progress increment per update
    const increment = 100 / totalUpdates;
    
    let currentProgress = 1;
    let timer: NodeJS.Timeout;
    
    // Function to update progress
    const updateProgress = () => {
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        // Cap at 100% and complete
        setProgress(100);
        setIsComplete(true);
        
        // Call onLoadingComplete after a short delay
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      } else {
        // Update progress and schedule next update
        setProgress(Math.min(currentProgress, 99));
        timer = setTimeout(updateProgress, updateInterval);
      }
    };
    
    // Start the progress updates
    timer = setTimeout(updateProgress, updateInterval);
    
    // Cleanup
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [onLoadingComplete]);
  
  return (
    <div 
      className={`loading-screen fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999] ${isComplete ? 'slide-up-exit' : ''}`}
      style={{ 
        visibility: 'visible',
        opacity: 1,
        backgroundColor: '#000000'
      }}
    >
      {/* Purple haze effects */}
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
              width: `${Math.floor(progress)}%`,
              background: 'linear-gradient(90deg, #6d28d9, #9333ea, #6d28d9)',
              boxShadow: '0 0 15px rgba(123, 0, 215, 0.7)',
              transition: 'width 50ms linear',
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