'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (href: string) => void;
  currentPath: string;
}

export default function Navbar({ onNavigate, currentPath }: NavbarProps) {
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
      }
      
      return () => {
        // Always restore scrolling when component unmounts
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
      };
    }
  }, [mobileMenuOpen, isClient]);

  // Handle navigation and close mobile menu
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  // Animation variants for mobile menu items
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white font-roboto"
            onClick={(e) => handleNavClick(e, '/')}
          >
            AIDEA
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-white hover:text-purple-400 transition-colors ${currentPath === '/' ? 'text-purple-400 font-medium' : ''} font-roboto`}
              onClick={(e) => handleNavClick(e, '/')}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={`text-white hover:text-purple-400 transition-colors ${currentPath === '/services' ? 'text-purple-400 font-medium' : ''} font-roboto`}
              onClick={(e) => handleNavClick(e, '/services')}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`text-white hover:text-purple-400 transition-colors ${currentPath === '/about' ? 'text-purple-400 font-medium' : ''} font-roboto`}
              onClick={(e) => handleNavClick(e, '/about')}
            >
              About
            </Link>
            <Link 
              href="/projects" 
              className={`text-white hover:text-purple-400 transition-colors ${currentPath === '/projects' ? 'text-purple-400 font-medium' : ''} font-roboto`}
              onClick={(e) => handleNavClick(e, '/projects')}
            >
              Projects
            </Link>
            <Link 
              href="/lets-begin" 
              className={`text-white hover:text-purple-400 transition-colors border border-purple-500 rounded-full px-4 py-1 ${currentPath === '/lets-begin' ? 'bg-purple-500 text-white font-medium' : ''} font-roboto`}
              onClick={(e) => handleNavClick(e, '/lets-begin')}
            >
              Let&#39;s Begin
            </Link>
          </nav>
          
          {/* New Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-purple-900/20 hover:bg-purple-900/40 transition-colors duration-300 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-5 relative">
              <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-0'}`}></span>
              <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'top-2'}`}></span>
              <span className={`absolute h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-4'}`}></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu - Completely separate from the header */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-full bg-black z-50 md:hidden overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          
          <div className="container mx-auto px-6 py-8 relative z-10 min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  href="/" 
                  className="text-3xl font-bold text-white"
                  onClick={(e) => handleNavClick(e, '/')}
                >
                  AIDEA
                </Link>
              </motion.div>
              <motion.button 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-900/50 hover:bg-purple-900/70 transition-colors duration-300 border border-purple-500/30"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <motion.nav 
              className="flex flex-col space-y-8 mb-auto"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={menuItemVariants}>
                <Link 
                  href="/" 
                  className={`text-2xl font-medium ${currentPath === '/' ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors block py-2`}
                  onClick={(e) => handleNavClick(e, '/')}
                >
                  Home
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <Link 
                  href="/services" 
                  className={`text-2xl font-medium ${currentPath === '/services' ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors block py-2`}
                  onClick={(e) => handleNavClick(e, '/services')}
                >
                  Services
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <Link 
                  href="/about" 
                  className={`text-2xl font-medium ${currentPath === '/about' ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors block py-2`}
                  onClick={(e) => handleNavClick(e, '/about')}
                >
                  About
                </Link>
              </motion.div>
              
              <motion.div variants={menuItemVariants}>
                <Link 
                  href="/projects" 
                  className={`text-2xl font-medium ${currentPath === '/projects' ? 'text-purple-400' : 'text-white'} hover:text-purple-400 transition-colors block py-2`}
                  onClick={(e) => handleNavClick(e, '/projects')}
                >
                  Projects
                </Link>
              </motion.div>
              
              <motion.div 
                variants={menuItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/lets-begin" 
                  className={`text-2xl font-medium text-white hover:text-white transition-colors inline-block border border-purple-500 rounded-full px-8 py-3 ${currentPath === '/lets-begin' ? 'bg-purple-600' : 'bg-purple-500/30 hover:bg-purple-500/50'}`}
                  onClick={(e) => handleNavClick(e, '/lets-begin')}
                >
                  Let&#39;s Begin
                </Link>
              </motion.div>
            </motion.nav>
            
            <motion.div 
              className="mt-16 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex gap-8 mb-10">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L5.545 21.75H1.682l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
              
              <p className="text-white/50 text-sm">
                {new Date().getFullYear()} AIDEA
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
