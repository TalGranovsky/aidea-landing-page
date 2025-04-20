import Link from 'next/link';
import { motion } from 'framer-motion';
import ClientSideLinks from './ClientSideLinks';
import { useState } from 'react';

interface NavbarProps {
  onNavigate?: (href: string) => void;
  currentPath: string;
}

export default function Navbar({ onNavigate = () => {}, currentPath }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-white font-bold text-xl tracking-wider">
            <Link href="/" className="hover:text-blue-400 transition-colors duration-200">AIDEA</Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <ClientSideLinks onNavigate={onNavigate} currentPath={currentPath} />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={handleMobileMenuToggle}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-black bg-opacity-90 backdrop-filter backdrop-blur-lg border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <ClientSideLinks onNavigate={onNavigate} currentPath={currentPath} isMobile={true} />
          </div>
        </motion.div>
      )}
    </header>
  );
}
