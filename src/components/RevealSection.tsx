import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealSectionProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  stagger?: boolean;
}

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.7, 
    ease: [0.25, 0.1, 0.25, 1], // Refined cubic-bezier for smoother motion
  },
} as const;

export const RevealSection = memo(function RevealSection({
  children,
  id,
  delay = 0,
  stagger = false,
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal(0.1, '-60px');

  const animationVariants = useMemo(
    () => ({
      initial: ANIMATION_CONFIG.initial,
      animate: isVisible ? ANIMATION_CONFIG.animate : ANIMATION_CONFIG.initial,
    }),
    [isVisible]
  );

  return (
    <motion.section
      ref={ref as any}
      id={id}
      {...animationVariants}
      transition={{
        ...ANIMATION_CONFIG.transition,
        delay,
        ...(stagger && {
          staggerChildren: 0.08,
          delayChildren: delay + 0.15,
        }),
      }}
      className="mb-24 md:mb-32"
    >
      {children}
    </motion.section>
  );
});