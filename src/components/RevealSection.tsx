import { memo, useMemo, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealSectionProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  stagger?: boolean;
}

// Detect mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || ('ontouchstart' in window);
};

// Reduce motion for mobile and accessibility
const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobile();
};

const ANIMATION_CONFIG = {
  desktop: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  mobile: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: 0.2,
    },
  },
} as const;

export const RevealSection = memo(function RevealSection({
  children,
  id,
  delay = 0,
  stagger = false,
}: RevealSectionProps) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { ref, isVisible } = useScrollReveal(0.1, '-60px');

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();

    // Check for reduced motion preference
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

  const config = reducedMotion 
    ? ANIMATION_CONFIG.reduced 
    : isMobileDevice 
      ? ANIMATION_CONFIG.mobile 
      : ANIMATION_CONFIG.desktop;

  const animationVariants = useMemo(
    () => ({
      initial: config.initial,
      animate: isVisible ? config.animate : config.initial,
    }),
    [isVisible, config]
  );

  return (
    <motion.section
      ref={ref as any}
      id={id}
      {...animationVariants}
      transition={{
        ...config.transition,
        delay: isMobileDevice ? delay * 0.5 : delay, // Faster delays on mobile
        ...(stagger && !reducedMotion && {
          staggerChildren: isMobileDevice ? 0.05 : 0.08,
          delayChildren: delay * 0.7 + 0.15,
        }),
      }}
      className="mb-24 md:mb-32"
    >
      {children}
    </motion.section>
  );
});