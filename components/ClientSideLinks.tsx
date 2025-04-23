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
    // Proportional scaling of underline thickness and position
    return currentPath === path 
      ? 'text-purple-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-purple-500 after:rounded-full 2k:after:h-[3px] 4k:after:h-[4px] 8k:after:h-[5px] 2k:after:bottom-[-6px] 4k:after:bottom-[-8px] 8k:after:bottom-[-10px]' 
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
          // Proportionally scaled spacing between mobile menu items
          className="flex flex-col items-center space-y-8 2k:space-y-12 4k:space-y-16 8k:space-y-20"
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
              // Proportionally scaled text size and padding
              className={`block text-3xl font-medium py-3 2k:text-4xl 4k:text-5xl 8k:text-6xl 2k:py-4 4k:py-6 8k:py-8 ${currentPath === '/' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              Home
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link 
              href="/about" 
              onClick={() => handleNavigation('/about')} 
              // Proportionally scaled text size and padding
              className={`block text-3xl font-medium py-3 2k:text-4xl 4k:text-5xl 8k:text-6xl 2k:py-4 4k:py-6 8k:py-8 ${currentPath === '/about' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              About
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link 
              href="/projects" 
              onClick={() => handleNavigation('/projects')} 
              // Proportionally scaled text size and padding
              className={`block text-3xl font-medium py-3 2k:text-4xl 4k:text-5xl 8k:text-6xl 2k:py-4 4k:py-6 8k:py-8 ${currentPath === '/projects' ? 'text-white' : 'text-gray-300 hover:text-white'} transition-colors duration-300`}
            >
              Projects
            </Link>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            // Proportionally scaled top padding
            className="pt-6 2k:pt-9 4k:pt-12 8k:pt-15"
          >
            <Link 
              href="/lets-begin" 
              onClick={() => handleNavigation('/lets-begin')} 
              // Proportionally scaled button padding and text size
              className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 ease-out text-xl font-medium 2k:px-15 2k:py-6 2k:text-2xl 4k:px-20 4k:py-8 4k:text-3xl 8k:px-25 8k:py-10 8k:text-4xl"
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
      {/* Proportionally scaled text sizes for navigation links */}
      <Link href="/" onClick={() => handleNavigation('/')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/')} text-sm 2k:text-lg 4k:text-2xl 8k:text-3xl`}>Home</Link>
      <Link href="/about" onClick={() => handleNavigation('/about')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/about')} text-sm 2k:text-lg 4k:text-2xl 8k:text-3xl`}>About</Link>
      <Link href="/projects" onClick={() => handleNavigation('/projects')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/projects')} text-sm 2k:text-lg 4k:text-2xl 8k:text-3xl`}>Projects</Link>
      {/* Proportionally scaled button */}
      <Link 
        href="/lets-begin" 
        onClick={() => handleNavigation('/lets-begin')} 
        className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 ease-out text-sm 2k:ml-6 2k:px-6 2k:py-3 2k:text-lg 4k:ml-8 4k:px-8 4k:py-4 4k:text-2xl 8k:ml-10 8k:px-10 8k:py-5 8k:text-3xl"
      >
        Let's Begin
      </Link>
    </>
  );
}