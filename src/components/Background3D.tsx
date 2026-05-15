import { useEffect, useRef } from 'react';

// =========================================================================
// PREMIUM MOTION DESIGN: "INTERACTIVE SPOTLIGHT & DARK GRID"
// Concept: A hidden premium grid that reveals itself only where the user's mouse hovers
// =========================================================================

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      // Set the exact pixel coordinates of the mouse as CSS variables
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    // Initialize to center in case mouse hasn't moved
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', `${window.innerWidth / 2}px`);
      containerRef.current.style.setProperty('--mouse-y', `${window.innerHeight / 2}px`);
    }

    // Attach to window so it tracks anywhere on the page
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="spotlight-container" ref={containerRef}>
      {/* Dynamic color glow that follows the mouse */}
      <div className="spotlight-color-layer"></div>
      
      {/* The architectural grid pattern revealed by the mouse */}
      <div className="spotlight-grid"></div>
    </div>
  );
}
