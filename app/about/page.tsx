'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');

  useEffect(() => {
    // Ensure scroll position is at the top when this page loads
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
          position: relative;
          overflow: hidden;
        }
        
        .metallic-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0.2) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.2) 60%,
            rgba(255, 255, 255, 0.05) 80%,
            transparent 100%
          );
          z-index: 2;
          opacity: 0;
          pointer-events: none;
          transform: translateX(-100%) skewX(-15deg);
        }
        
        .metallic-shine:hover::before {
          animation: metallic-woosh 1.2s ease-in-out;
        }
        
        @keyframes metallic-woosh {
          0% {
            transform: translateX(-100%) skewX(-15deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
            opacity: 0;
          }
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
        
        .team-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);
        }
      `}</style>
      
      {/* Page Transition Animation */}
      <PageTransition isTransitioning={isTransitioning} />
      
      {/* Main Content */}
      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar onNavigate={handleNavigation} currentPath="/about" />
        </Suspense>

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
                About Us
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Pioneering the future of creative technology through AI innovation
              </p>
            </motion.div>

            {/* About Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${playfair.className}`}>Our Story</h2>
                <p className="text-neutral-300 mb-4">
                  Founded in 2023, AIDEA emerged from a vision to bridge the gap between cutting-edge AI technology and creative expression. Our team of AI specialists, designers, and artists came together with a shared passion for pushing the boundaries of what&#39;s possible.
                </p>
                <p className="text-neutral-300 mb-4">
                  What began as an experimental studio quickly evolved into a comprehensive creative agency, as we discovered the immense potential of AI to transform every aspect of the creative process.
                </p>
                <p className="text-neutral-300">
                  Today, we&#39;re proud to be at the forefront of the AI creative revolution, partnering with forward-thinking brands and individuals who share our excitement for the future of design and content creation.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative h-[400px] rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 z-10 rounded-xl"></div>
                <div className="absolute inset-0 bg-black/40 z-10 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-white/70 text-sm">Image: Our Studio</span>
                </div>
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 bg-neutral-900 z-0"></div>
              </motion.div>
            </div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
            >
              <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-8">
                <div className="w-16 h-16 bg-purple-900/40 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Our Vision</h3>
                <p className="text-neutral-400">
                  To create a world where AI amplifies human creativity rather than replacing it, enabling unprecedented forms of expression and problem-solving through the perfect synergy of human intuition and machine intelligence.
                </p>
              </div>
              
              <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-8">
                <div className="w-16 h-16 bg-blue-900/40 rounded-full mb-6 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Our Mission</h3>
                <p className="text-neutral-400">
                  To democratize access to cutting-edge AI creative tools, empowering businesses and individuals to bring their visions to life with unprecedented speed, quality, and innovation, while maintaining the human touch that makes creativity special.
                </p>
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-20"
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${playfair.className}`}>Our Team</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Team Member 1 */}
                <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-purple-500/70 overflow-hidden group team-card metallic-shine">
                  <div className="h-64 bg-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift z-5"></div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold">Alex Morgan</h3>
                      <p className="text-neutral-400 text-sm">Founder &amp; CEO</p>
                    </div>
                    {/* Placeholder for team member image */}
                    <div className="absolute inset-0 bg-neutral-700 z-0 group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <p className="text-neutral-400 text-sm">
                      AI researcher with a background in computational creativity and human-computer interaction.
                    </p>
                  </div>
                </div>
                
                {/* Team Member 2 */}
                <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-purple-500/70 overflow-hidden group team-card metallic-shine">
                  <div className="h-64 bg-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift z-5"></div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold">Samantha Chen</h3>
                      <p className="text-neutral-400 text-sm">Creative Director</p>
                    </div>
                    {/* Placeholder for team member image */}
                    <div className="absolute inset-0 bg-neutral-700 z-0 group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <p className="text-neutral-400 text-sm">
                      Award-winning designer with expertise in digital experiences and brand identity systems.
                    </p>
                  </div>
                </div>
                
                {/* Team Member 3 */}
                <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-purple-500/70 overflow-hidden group team-card metallic-shine">
                  <div className="h-64 bg-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift z-5"></div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold">Marcus Johnson</h3>
                      <p className="text-neutral-400 text-sm">Technical Lead</p>
                    </div>
                    {/* Placeholder for team member image */}
                    <div className="absolute inset-0 bg-neutral-700 z-0 group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <p className="text-neutral-400 text-sm">
                      Full-stack developer specializing in AI integration and immersive web experiences.
                    </p>
                  </div>
                </div>
                
                {/* Team Member 4 */}
                <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 hover:border-purple-500/70 overflow-hidden group team-card metallic-shine">
                  <div className="h-64 bg-neutral-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-5"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-1000 animate-gradient-shift z-5"></div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold">Olivia Kim</h3>
                      <p className="text-neutral-400 text-sm">AI Researcher</p>
                    </div>
                    {/* Placeholder for team member image */}
                    <div className="absolute inset-0 bg-neutral-700 z-0 group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <p className="text-neutral-400 text-sm">
                      PhD in machine learning with focus on generative models and creative applications.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* CTA Section */}
            <div className="text-center">
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
        <Footer onNavigate={handleNavigation} currentPath="/about" />
      </main>
    </>
  );
}
