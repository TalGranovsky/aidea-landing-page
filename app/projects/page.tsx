'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

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

  // Project data
  const projects = [
    {
      id: 1,
      title: "NeoVerse Brand Identity",
      category: "branding",
      description: "Complete AI-generated brand identity for a virtual reality startup, including logo design, color palette, and brand guidelines.",
      image: "/placeholder-project-1.jpg",
      tags: ["Branding", "Logo Design", "AI Art"]
    },
    {
      id: 2,
      title: "Harmonic Fusion",
      category: "music",
      description: "AI-composed ambient music album created for a meditation app, featuring procedurally generated soundscapes.",
      image: "/placeholder-project-2.jpg",
      tags: ["Music Production", "Sound Design", "AI Composition"]
    },
    {
      id: 3,
      title: "EcoVision Web Platform",
      category: "web",
      description: "Responsive web application for an environmental nonprofit with interactive data visualizations and donation platform.",
      image: "/placeholder-project-3.jpg",
      tags: ["Web Development", "UI/UX", "Interactive Design"]
    },
    {
      id: 4,
      title: "Quantum Realm",
      category: "3d",
      description: "Series of 3D environments inspired by quantum physics, created using AI-assisted modeling and rendering techniques.",
      image: "/placeholder-project-4.jpg",
      tags: ["3D Modeling", "Animation", "AI Generation"]
    },
    {
      id: 5,
      title: "Synthetic Storyteller",
      category: "video",
      description: "Short film created with AI-generated visuals and narrative, exploring themes of human-machine creativity.",
      image: "/placeholder-project-5.jpg",
      tags: ["Video Production", "Narrative Design", "AI Visuals"]
    },
    {
      id: 6,
      title: "Neural Canvas Collection",
      category: "branding",
      description: "Series of AI-generated artworks commissioned for a luxury hotel chain's new property.",
      image: "/placeholder-project-6.jpg",
      tags: ["AI Art", "Interior Design", "Brand Expression"]
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <style jsx global>{`
        .menu-link {
          position: relative;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .project-card {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -15px rgba(123, 0, 215, 0.3);
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .project-image {
          transition: transform 0.5s ease;
        }
        
        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
          opacity: 0.7;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }
        
        .filter-button {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .filter-button::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #a855f7;
          transition: width 0.3s ease;
        }
        
        .filter-button:hover::after,
        .filter-button.active::after {
          width: 100%;
        }
      `}</style>
      
      {/* Page Transition Animation */}
      <PageTransition isTransitioning={isTransitioning} />
      
      {/* Main Content */}
      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <Navbar onNavigate={handleNavigation} currentPath="/projects" />

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
                Our Projects
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Explore our portfolio of AI-powered creative work
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === 'all' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('all')}
              >
                All Projects
              </button>
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === 'branding' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('branding')}
              >
                Branding
              </button>
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === 'web' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('web')}
              >
                Web Development
              </button>
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === '3d' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('3d')}
              >
                3D Models
              </button>
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === 'music' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('music')}
              >
                Music
              </button>
              <button 
                className={`filter-button px-4 py-2 rounded-full text-sm ${activeFilter === 'video' ? 'text-purple-400 active' : 'text-neutral-400'}`}
                onClick={() => setActiveFilter('video')}
              >
                Video
              </button>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="project-card border border-neutral-800 rounded-xl overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    {/* Project image placeholder */}
                    <div className="project-image absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30"></div>
                    
                    <div className="project-overlay">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-neutral-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-neutral-300 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-900/50">
                    <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      View Project →
                    </button>
                  </div>
                </motion.div>
              ))}
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
                Start Your Project!
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer onNavigate={handleNavigation} currentPath="/projects" />
      </main>
    </>
  );
}
