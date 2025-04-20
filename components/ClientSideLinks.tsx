import Link from 'next/link';

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

  if (isMobile) {
    return (
      <>
        <Link 
          href="/" 
          onClick={() => handleNavigation('/')} 
          className={`block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white ${getLinkClass('/')} text-sm ${currentPath === '/' ? 'bg-purple-900/30 border-l-2 border-purple-500' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          onClick={() => handleNavigation('/about')} 
          className={`block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white ${getLinkClass('/about')} text-sm ${currentPath === '/about' ? 'bg-purple-900/30 border-l-2 border-purple-500' : ''}`}
        >
          About
        </Link>
        <Link 
          href="/services" 
          onClick={() => handleNavigation('/services')} 
          className={`block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white ${getLinkClass('/services')} text-sm ${currentPath === '/services' ? 'bg-purple-900/30 border-l-2 border-purple-500' : ''}`}
        >
          Services
        </Link>
        <Link 
          href="/projects" 
          onClick={() => handleNavigation('/projects')} 
          className={`block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white ${getLinkClass('/projects')} text-sm ${currentPath === '/projects' ? 'bg-purple-900/30 border-l-2 border-purple-500' : ''}`}
        >
          Projects
        </Link>
        {/* Update button styles for mobile */}
        <Link 
          href="/lets-begin" 
          onClick={() => handleNavigation('/lets-begin')} 
          className="block mt-2 text-center px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 ease-out text-sm"
        >
          Let's Begin
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/" onClick={() => handleNavigation('/')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/')} text-sm`}>Home</Link>
      <Link href="/about" onClick={() => handleNavigation('/about')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/about')} text-sm`}>About</Link>
      <Link href="/services" onClick={() => handleNavigation('/services')} className={`hover:text-white transition-colors duration-200 ${getLinkClass('/services')} text-sm`}>Services</Link>
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