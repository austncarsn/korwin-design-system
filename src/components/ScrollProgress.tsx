import { memo } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = memo(function ScrollProgress() {
  const progress = useScrollProgress();

  // Refined spring physics for silky smooth 60fps animation
  const smoothProgress = useSpring(progress, {
    damping: 25,
    stiffness: 120,
    mass: 0.3,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  const scaleX = useTransform(smoothProgress, [0, 100], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left will-change-transform"
      style={{
        background: 'linear-gradient(90deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
        scaleX,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
});