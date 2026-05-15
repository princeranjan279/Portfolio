import React, { useEffect, useRef, useState } from 'react';
import './MouseTracker.css';

const MouseTracker: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position references for animation
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Instantly update dot position
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.btn') ||
        target.closest('.skill-tag') ||
        target.closest('.card') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsActive(!!isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth animation for the follower
    let animationFrameId: number;
    const animate = () => {
      // Faster LERP for more responsiveness (less "laggy" feeling)
      const lerp = 0.25; 
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerp;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerp;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mouse-tracker-container">
      <div 
        ref={dotRef} 
        className={`mouse-dot ${isActive ? 'active' : ''}`} 
      />
      <div 
        ref={followerRef} 
        className={`mouse-follower ${isActive ? 'active' : ''}`} 
      />
    </div>
  );
};

export default MouseTracker;
