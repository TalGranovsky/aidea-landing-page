'use client';

interface PageTransitionProps {
  isTransitioning: boolean;
}

export default function PageTransition({ isTransitioning }: PageTransitionProps) {
  return (
    <>
      <div className={`page-transition ${isTransitioning ? 'active' : ''}`}></div>
      
      <style jsx>{`
        .page-transition {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0), rgba(123, 0, 215, 0.2), rgba(0,0,0,0));
          transform: translateX(-100%);
          z-index: 100;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .page-transition.active {
          animation: wipeTransition 1s ease-in-out forwards;
          opacity: 1;
        }
        
        @keyframes wipeTransition {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}
