'use client';

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      :root {
        --color-primary: #6d28d9;
        --color-primary-dark: #4c1d95;
        --color-secondary: #1e293b;
        --color-accent: #8b5cf6;
        --color-text: #f8fafc;
        --color-background: #000000;
      }
      
      body {
        background-color: var(--color-background);
        color: var(--color-text);
      }
      
      .text-shadow-purple {
        text-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
      }
      
      .bg-dotted-grid {
        background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 30px 30px;
      }
      
      .hero-glow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
        pointer-events: none;
      }
    `}</style>
  );
}
