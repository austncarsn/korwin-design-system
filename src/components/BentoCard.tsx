import { memo, useMemo, useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  span?: '1x1' | '2x1' | '1x2' | '2x2' | '3x1' | '3x2' | string;
  delay?: number;
  interactive?: boolean;
  gradient?: boolean;
}

const SPAN_CLASSES = {
  '1x1': 'col-span-1 row-span-1',
  '2x1': 'col-span-1 md:col-span-2 row-span-1',
  '1x2': 'col-span-1 row-span-1 md:row-span-2',
  '2x2': 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  '3x1': 'col-span-1 md:col-span-3 row-span-1',
  '3x2': 'col-span-1 md:col-span-3 row-span-1 md:row-span-2',
} as const;

const ANIMATION_CONFIG = {
  desktop: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  mobile: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  reduced: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.15 },
  },
} as const;

export const BentoCard = memo(function BentoCard({
  children,
  className = '',
  span = '1x1',
  delay = 0,
  interactive = false,
  gradient = false,
}: BentoCardProps) {
  const { ref, isVisible } = useScrollReveal(0.1, '-50px');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic cursor effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Disable magnetic effect on mobile for performance
    if (!interactive || !cardRef.current || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Subtle magnetic pull (max 8px in any direction)
      mouseX.set(deltaX * 0.08);
      mouseY.set(deltaY * 0.08);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const card = cardRef.current;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive, mouseX, mouseY, isMobile]);

  const cardClasses = useMemo(
    () => {
      // Check if span is a predefined class or a custom Tailwind class string
      const spanClass = typeof span === 'string' && span in SPAN_CLASSES 
        ? SPAN_CLASSES[span as keyof typeof SPAN_CLASSES]
        : span;
      
      return `
        ${spanClass}
        relative
        overflow-hidden
        border
        rounded-2xl
        transition-smooth
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `.trim();
    },
    [span, interactive, className]
  );

  const config = isMobile ? ANIMATION_CONFIG.mobile : ANIMATION_CONFIG.desktop;

  const animationVariants = useMemo(
    () => ({
      initial: config.initial,
      animate: isVisible ? config.animate : config.initial,
    }),
    [isVisible, config]
  );

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore
        ref.current = node;
        // @ts-ignore
        cardRef.current = node;
      }}
      {...animationVariants}
      transition={{ ...config.transition, delay: isMobile ? delay * 0.6 : delay }}
      style={{
        x: interactive && !isMobile ? x : 0,
        y: interactive && !isMobile ? y : 0,
        background: isHovered && interactive
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(99, 102, 241, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.95) 100%)',
        borderColor: isHovered && interactive 
          ? 'rgba(16, 185, 129, 0.25)' 
          : 'rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered && interactive
          ? '0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 8px 24px -8px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
          : '0 2px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      whileHover={interactive && !isMobile ? { scale: 1.02 } : undefined}
      className={cardClasses}
    >
      {/* Shimmer effect on hover - Desktop only */}
      {interactive && !isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            willChange: isHovered ? 'background' : 'auto',
          }}
          animate={{
            background: isHovered
              ? 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 75%, transparent 100%)'
              : 'linear-gradient(135deg, transparent 0%, transparent 100%)',
            backgroundPosition: isHovered ? ['0% 0%', '200% 0%'] : '0% 0%',
          }}
          transition={{
            background: { duration: 0.3 },
            backgroundPosition: {
              duration: isHovered ? 1.5 : 0,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            },
          }}
          style={{
            backgroundSize: '200% 100%',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Gradient background overlay */}
      {gradient && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 0.06 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              'linear-gradient(135deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
          }}
        />
      )}

      {/* Interactive radial gradient - Desktop only */}
      {interactive && !isMobile && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.08) 25%, transparent 60%)',
          }}
        />
      )}

      {/* Subtle noise texture - Reduced opacity on mobile */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: isMobile ? 0.01 : 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid pattern on hover - Desktop only */}
      {interactive && !isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: isHovered ? 0.02 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full p-4 sm:p-5 md:p-6 lg:p-8">{children}</div>

      {/* Corner accent - Desktop only */}
      {interactive && !isMobile && (
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'radial-gradient(circle at top right, var(--action-primary) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
});