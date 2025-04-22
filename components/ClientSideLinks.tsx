import Link from 'next/link';
import { motion } from 'framer-motion';

interface ClientSideLinksProps {
  onNavigate?: (href: string) => void;
  currentPath: string;
  isMobile?: boolean;
}

export default function ClientSideLinks({ onNavigate = () => {}, currentPath, isMobile = false }: ClientSideLinksProps) {
  // Function to handle navigation
  const handleNavigation = (path: string) => {
    onNavigate(path);
  };

  // Determine active link based on currentPath
  const getLinkClass = (path: string) => {
    return currentPath === path 
      ? 'text-purple-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-purple-500 after:rounded-full' 
      : 'text-muted-foreground hover:text-white transition-colors duration-200';
  };

  // Animation variants for mobile menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (isMobile) {
    return (
      <>
        <motion.div
          className="flex flex-col items-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={itemVariants}>
            <Link 
              href="/" 
              onClick={() => handleNavigation('/')} 
              className={`block text-3xl font-medium py-3 ${currentPath === '/' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              Home
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link 
              href="/about" 
              onClick={() => handleNavigation('/about')} 
              className={`block text-3xl font-medium py-3 ${currentPath === '/about' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              About
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link 
              href="/projects" 
              onClick={() => handleNavigation('/projects')} 
              className={`block text-3xl font-medium py-3 ${currentPath === '/projects' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              Projects
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="pt-6"
          >
            <Link 
              href="/lets-begin" 
              onClick={() => handleNavigation('/lets-begin')} 
              className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 ease-out text-xl font-medium"
            >
              Let's Begin
            </Link>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Link href="/" onClick={() => handleNavigation('/')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/')} text-sm`}>Home</Link>
      <Link href="/about" onClick={() => handleNavigation('/about')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/about')} text-sm`}>About</Link>
      <Link href="/projects" onClick={() => handleNavigation('/projects')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/projects')} text-sm`}>Projects</Link>
      {/* Update button styles for desktop */}
      <Link 
        href="/lets-begin" 
        onClick={() => handleNavigation('/lets-begin')} 
        className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 ease-out text-sm"
      >
        Let's Begin
      </Link>
    </>
  );
}