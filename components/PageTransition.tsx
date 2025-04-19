'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  isTransitioning: boolean;
}

export default function PageTransition({ isTransitioning }: PageTransitionProps) {
  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 bg-black z-[9999] pointer-events-none flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Purple gradient sweep effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            
            {/* Skeleton loader */}
            <div className="container mx-auto px-4 h-full flex flex-col pt-24">
              {/* Navbar skeleton */}
              <div className="fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-4">
                <div className="w-24 h-8 bg-purple-900/30 rounded-md animate-pulse"></div>
                <div className="hidden md:flex space-x-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-16 h-4 bg-purple-900/30 rounded-md animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="md:hidden w-8 h-8 bg-purple-900/30 rounded-full animate-pulse"></div>
              </div>
              
              {/* Hero section skeleton */}
              <div className="flex flex-col items-center justify-center mt-8 mb-16">
                <div className="w-3/4 h-10 bg-purple-900/30 rounded-lg animate-pulse mb-4"></div>
                <div className="w-1/2 h-6 bg-purple-900/30 rounded-lg animate-pulse mb-12"></div>
                <div className="w-40 h-12 bg-purple-900/30 rounded-full animate-pulse"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-video bg-purple-900/20 rounded-lg overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="h-2/3 w-full bg-purple-900/10"></div>
                    <div className="p-4">
                      <div className="w-3/4 h-5 bg-purple-900/30 rounded-md mb-3"></div>
                      <div className="w-full h-3 bg-purple-900/20 rounded-md mb-2"></div>
                      <div className="w-2/3 h-3 bg-purple-900/20 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
