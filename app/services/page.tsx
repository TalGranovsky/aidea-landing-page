'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');

  // Ensure scroll position is at the top when this page loads
  useEffect(() => {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Navigation transition
  const handleNavigation = (href: string) => {
    setTransitionTarget(href);
    setIsTransitioning(true);
    
    setTimeout(() => {
      window.location.href = href;
    }, 800); // Increased from 500ms to 800ms to ensure transition completes before navigation
  };

  return (
    <>
      <style jsx global>{`
        .menu-link {
          position: relative;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .metallic-shine {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        
        .metallic-shine:hover {
          transform: scale(1.05);
        }
        
        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
      
      {/* Page Transition Animation */}
      <PageTransition isTransitioning={isTransitioning} />
      
      {/* Main Content */}
      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <NavbarWrapper onNavigate={handleNavigation} currentPath="/services" />

        {/* Page Content */}
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 ${playfair.className} text-white`}>
                Our Services
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Cutting-edge AI solutions to transform your creative vision into reality
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <ServiceCard 
                title="AI Branding"
                description="Create a cohesive brand identity with AI-powered design solutions that capture your unique vision and values."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                }
                color="blue"
              />
              
              <ServiceCard 
                title="Content Creation"
                description="Generate high-quality content with our AI tools, from compelling copy to stunning visuals that engage your audience."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                  </svg>
                }
                color="purple"
              />
              
              <ServiceCard 
                title="Web Development"
                description="Custom web solutions powered by AI to create responsive, engaging, and high-performing digital experiences."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                }
                color="green"
              />
              
              <ServiceCard 
                title="3D Models"
                description="Create stunning 3D models and environments for various applications, from product visualization to immersive experiences."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                }
                color="green"
              />
              
              <ServiceCard 
                title="Music Production"
                description="AI-powered music composition and production services to create unique soundscapes for your projects."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                  </svg>
                }
                color="pink"
              />
              
              <ServiceCard 
                title="Video Production"
                description="Create compelling video content with our AI-powered video production services, from concept to final edit."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                }
                color="orange"
              />
            </div>
            
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <Link 
                href="/lets-begin" 
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/lets-begin');
                }}
              >
                Let&#39;s Begin
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer onNavigate={handleNavigation} currentPath="/services" />
      </main>
    </>
  );
}

// Service Card Component
function ServiceCard({ title, description, icon, color }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'pink' | 'orange';
}) {
  const bgColorMap = {
    blue: 'bg-blue-900/40',
    purple: 'bg-purple-900/40',
    green: 'bg-green-900/40',
    pink: 'bg-pink-900/40',
    orange: 'bg-orange-900/40'
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="service-card p-6 md:p-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-purple-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 flex flex-col items-center text-center metallic-shine hover-scale relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift"></div>
      <div className={`w-16 h-16 md:w-20 md:h-20 ${bgColorMap[color]} rounded-full mb-4 md:mb-6 flex items-center justify-center relative z-10`}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 relative z-10">{title}</h3>
      <p className="text-neutral-400 relative z-10">{description}</p>
    </motion.div>
  );
}
