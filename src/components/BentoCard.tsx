import { memo, useMemo, useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
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
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }, // Max 300ms, ease-out only
  },
  mobile: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }, // Ease-out only
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
  // DISABLED: Scroll animations causing glitches
  // const { ref, isVisible } = useScrollReveal(0.1, '-50px');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Render immediately - no scroll animations
  return (
    <div
      ref={cardRef}
      style={{
        // Single clean background - no stacking
        background: isHovered && interactive
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(99, 102, 241, 0.03) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.95) 100%)',
        borderColor: isHovered && interactive 
          ? 'rgba(16, 185, 129, 0.2)' 
          : 'rgba(0, 0, 0, 0.08)',
        // Simplified shadow - single layer for performance
        boxShadow: isHovered && interactive
          ? '0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          : '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        // Force GPU acceleration with translate3d
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden' as const,
        // Smooth transitions only for hover
        transition: 'background 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className={cardClasses}
    >
      {/* Subtle noise texture - minimal opacity */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: isMobile ? 0.008 : 0.012,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content with proper z-index */}
      <div className="relative z-10 h-full p-4 sm:p-5 md:p-6 lg:p-8">{children}</div>
    </div>
  );
});