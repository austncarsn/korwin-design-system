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
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
} as const;

export const RevealSection = memo(function RevealSection({
  children,
  id,
  delay = 0,
  stagger = false,
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal(0.15, '-80px');

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
          staggerChildren: 0.1,
          delayChildren: delay + 0.2,
        }),
      }}
      className="mb-24 md:mb-32"
    >
      {children}
    </motion.section>
  );
});
