'use client';

import { Suspense } from 'react';
import Navbar from './Navbar';

interface NavbarWrapperProps {
  onNavigate: (href: string) => void;
  currentPath: string;
}

export default function NavbarWrapper({ onNavigate, currentPath }: NavbarWrapperProps) {
  return (
    <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md h-16"></div>}>
      <Navbar onNavigate={onNavigate} currentPath={currentPath} />
    </Suspense>
  );
}
