import { memo, useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = memo(function ScrollProgress() {
  const progress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lighter spring physics on mobile for better performance
  const smoothProgress = useSpring(progress, {
    damping: isMobile ? 30 : 25,
    stiffness: isMobile ? 150 : 120,
    mass: isMobile ? 0.2 : 0.3,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const scaleX = useTransform(smoothProgress, [0, 100], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        height: isMobile ? '2px' : '1px', // Slightly thicker on mobile for better visibility
        background: 'linear-gradient(90deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
        scaleX,
        willChange: 'transform',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
});