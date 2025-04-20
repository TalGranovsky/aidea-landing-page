'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SkeletonLoaderProps {
  isLoading: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Navbar skeleton */}
      <div className="border-b border-white/10 px-4 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="skeleton-pulse h-8 w-32 bg-purple-700/30 rounded-md"></div>
          <div className="hidden md:flex space-x-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-pulse h-4 w-16 bg-purple-700/30 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="skeleton-pulse h-12 w-3/4 md:w-1/2 bg-purple-700/30 rounded-md mx-auto mb-6"></div>
            <div className="skeleton-pulse h-6 w-full md:w-2/3 bg-purple-700/30 rounded-md mx-auto"></div>
          </div>
          <div className="skeleton-pulse h-10 w-40 bg-purple-700/30 rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Content sections skeletons */}
      <div className="max-w-7xl mx-auto px-4 space-y-24">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="skeleton-pulse h-8 w-3/4 bg-purple-700/30 rounded-md"></div>
            <div className="skeleton-pulse h-4 w-full bg-purple-700/30 rounded-md"></div>
            <div className="skeleton-pulse h-4 w-5/6 bg-purple-700/30 rounded-md"></div>
            <div className="skeleton-pulse h-4 w-4/5 bg-purple-700/30 rounded-md"></div>
          </div>
          <div className="skeleton-pulse h-64 w-full bg-purple-700/30 rounded-lg"></div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton-pulse h-48 w-full bg-purple-700/30 rounded-lg"></div>
              <div className="skeleton-pulse h-6 w-3/4 bg-purple-700/30 rounded-md"></div>
              <div className="skeleton-pulse h-4 w-full bg-purple-700/30 rounded-md"></div>
              <div className="skeleton-pulse h-4 w-5/6 bg-purple-700/30 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-24 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="skeleton-pulse h-6 w-24 bg-purple-700/30 rounded-md"></div>
                <div className="skeleton-pulse h-4 w-full bg-purple-700/30 rounded-md"></div>
                <div className="skeleton-pulse h-4 w-3/4 bg-purple-700/30 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
