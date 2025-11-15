/**
 * Scroll Animations System
 * 
 * A comprehensive, performance-optimized scroll animation system featuring:
 * - Parallax scrolling with multi-speed layers
 * - Scroll-triggered fade-in animations
 * - Accessibility support (respects prefers-reduced-motion)
 * - GPU-accelerated transforms for 60fps performance
 * 
 * @example Parallax
 * <ParallaxLayer speed={0.5}>Background content</ParallaxLayer>
 * 
 * @example Fade In
 * <ScrollFadeIn delay={200}>Content that fades in</ScrollFadeIn>
 */

import { useEffect, useRef, useState, memo, CSSProperties, ReactNode } from 'react';
import { motion } from 'motion/react';

// ============================================================================
// TYPES
// ============================================================================

interface ParallaxOptions {
  speed?: number; // 0.5 = slow (background), 0.75 = mid, 1 = normal (foreground)
  disabled?: boolean;
}

interface ScrollTriggerOptions {
  threshold?: number; // 0-1, how much of element must be visible
  rootMargin?: string; // Margin around viewport for early triggering
  once?: boolean; // Only trigger animation once
  delay?: number; // Delay in ms before animation starts
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number; // Duration in seconds
  translateY?: number; // How far to translate from (in px)
  translateX?: number; // Horizontal translation (optional)
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
  scale?: number; // Optional scale animation (0-1)
}

interface ScrollScaleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scaleFrom?: number; // Starting scale (default 0.9)
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * useParallax Hook
 * 
 * Creates optimized parallax scroll effect using RAF and viewport detection.
 * Automatically disables on mobile and respects reduced motion preferences.
 * 
 * @param speed - Parallax speed multiplier (0.5 = slow, 1 = normal)
 * @param disabled - Manually disable parallax
 * @returns ref and offset value for the element
 */
export function useParallax({ speed = 0.5, disabled = false }: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Skip if disabled or user prefers reduced motion
    if (disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Skip on mobile/touch devices for better performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     'ontouchstart' in window;
    if (isMobile) {
      return;
    }

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth 60fps updates
      rafRef.current = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const scrollY = window.scrollY;
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Only calculate parallax when element is near viewport (performance optimization)
        if (
          scrollY + viewportHeight > elementTop - 200 &&
          scrollY < elementTop + elementHeight + 200
        ) {
          // Calculate parallax offset
          // Subtract 1 from speed so foreground (speed=1) has 0 offset
          const parallaxOffset = (scrollY - elementTop) * (speed - 1);
          setOffset(parallaxOffset);
        }
      });
    };

    // Throttle scroll events for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [speed, disabled]);

  return { ref: elementRef, offset };
}

/**
 * useScrollTrigger Hook
 * 
 * Efficiently detects when element enters viewport using Intersection Observer.
 * Respects reduced motion preferences and provides configurable thresholds.
 * 
 * @param options - Configuration for scroll trigger behavior
 * @returns ref and visibility state
 */
export function useScrollTrigger({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  once = true,
  delay = 0,
}: ScrollTriggerOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasTriggered)) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                setHasTriggered(true);
              }, delay);
            } else {
              setIsVisible(true);
              setHasTriggered(true);
            }
          } else if (!once && !entry.isIntersecting) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay, hasTriggered]);

  return { ref: elementRef, isVisible };
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * ParallaxLayer Component
 * 
 * Wrapper component for parallax scroll effects. Use multiple layers with
 * different speeds to create depth.
 * 
 * @example
 * <ParallaxLayer speed={0.5}>Background</ParallaxLayer>
 * <ParallaxLayer speed={0.75}>Mid-ground</ParallaxLayer>
 * <ParallaxLayer speed={1}>Foreground</ParallaxLayer>
 */
export const ParallaxLayer = memo(function ParallaxLayer({
  children,
  speed = 1,
  className = '',
  style = {},
}: ParallaxLayerProps) {
  const { ref, offset } = useParallax({ speed });

  return (
    <div
      ref={ref as any}
      className={className}
      style={{
        ...style,
        // Use translate3d for GPU acceleration
        transform: `translate3d(0, ${offset}px, 0)`,
        // Prevent subpixel rendering issues
        backfaceVisibility: 'hidden',
        // Only use will-change when actively parallaxing
        willChange: offset !== 0 ? 'transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
});

/**
 * ScrollFadeIn Component
 * 
 * Fades in and translates element when it enters viewport.
 * Highly configurable with multiple animation options.
 * 
 * @example
 * <ScrollFadeIn delay={200} translateY={40}>
 *   <h2>This fades in from below</h2>
 * </ScrollFadeIn>
 */
export const ScrollFadeIn = memo(function ScrollFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  translateY = 40,
  translateX = 0,
  className = '',
  style = {},
  threshold = 0.1,
  once = true,
  scale,
}: ScrollFadeInProps) {
  const { ref, isVisible } = useScrollTrigger({ threshold, once, delay });

  return (
    <motion.div
      ref={ref as any}
      initial={{ 
        opacity: 0, 
        y: translateY,
        x: translateX,
        ...(scale !== undefined && { scale }),
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : translateY,
        x: isVisible ? 0 : translateX,
        ...(scale !== undefined && { scale: isVisible ? 1 : scale }),
      }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Ease out cubic (as specified)
      }}
      className={className}
      style={{
        ...style,
        // GPU acceleration
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
});

/**
 * ScrollScale Component
 * 
 * Scales and fades in element when it enters viewport.
 * Great for cards and images.
 * 
 * @example
 * <ScrollScale scaleFrom={0.9}>
 *   <img src="..." alt="Zooms in slightly" />
 * </ScrollScale>
 */
export const ScrollScale = memo(function ScrollScale({
  children,
  delay = 0,
  duration = 0.6,
  scaleFrom = 0.9,
  className = '',
  style = {},
  threshold = 0.1,
  once = true,
}: ScrollScaleProps) {
  const { ref, isVisible } = useScrollTrigger({ threshold, once, delay });

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, scale: scaleFrom }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : scaleFrom,
      }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Ease out cubic
      }}
      className={className}
      style={{
        ...style,
        // GPU acceleration
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
});

/**
 * ScrollReveal Component
 * 
 * Reveals content from left or right with fade.
 * Perfect for alternating content layouts.
 * 
 * @example
 * <ScrollReveal direction="left">Content slides in from left</ScrollReveal>
 * <ScrollReveal direction="right">Content slides in from right</ScrollReveal>
 */
export const ScrollReveal = memo(function ScrollReveal({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.7,
  distance = 60,
  className = '',
  style = {},
  threshold = 0.1,
  once = true,
}: {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
}) {
  const { ref, isVisible } = useScrollTrigger({ threshold, once, delay });

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -distance, y: 0 };
      case 'right': return { x: distance, y: 0 };
      case 'up': return { x: 0, y: -distance };
      case 'down': return { x: 0, y: distance };
      default: return { x: 0, y: distance };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, ...initial }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : initial.x,
        y: isVisible ? 0 : initial.y,
      }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={{
        ...style,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
});

/**
 * ScrollStagger Component
 * 
 * Staggers animations for child elements.
 * Each child animates in sequence with a delay.
 * 
 * @example
 * <ScrollStagger staggerDelay={0.1}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ScrollStagger>
 */
export const ScrollStagger = memo(function ScrollStagger({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  translateY = 30,
  className = '',
  style = {},
  threshold = 0.1,
  once = true,
}: {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  translateY?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  once?: boolean;
}) {
  const { ref, isVisible } = useScrollTrigger({ threshold, once });

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        hidden: {},
      }}
      className={className}
      style={{
        ...style,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
                },
                hidden: {
                  opacity: 0,
                  y: translateY,
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
});

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Hooks
  useParallax,
  useScrollTrigger,
  
  // Components
  ParallaxLayer,
  ScrollFadeIn,
  ScrollScale,
  ScrollReveal,
  ScrollStagger,
};
