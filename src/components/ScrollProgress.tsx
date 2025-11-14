import { memo, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = memo(function ScrollProgress() {
  const progress = useScrollProgress();
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progressValue = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update motion value when progress changes
  useEffect(() => {
    progressValue.set(progress / 100);
  }, [progress, progressValue]);

  // Simplified progress on mobile - no spring animation
  const smoothProgress = useSpring(progressValue, {
    stiffness: reducedMotion || isMobile ? 300 : 100,
    damping: reducedMotion || isMobile ? 50 : 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        height: isMobile ? '2px' : '1px', // Slightly thicker on mobile for better visibility
        background: 'linear-gradient(90deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
        scaleX: smoothProgress,
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