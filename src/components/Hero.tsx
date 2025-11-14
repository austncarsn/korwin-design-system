import { memo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Download, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

const STATS_DATA = [
  { value: '100+', label: 'Design Tokens', icon: Sparkles },
  { value: '20+', label: 'Components', icon: Zap },
  { value: 'AAA', label: 'Accessibility', icon: Shield },
] as const;

const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
};

export const Hero = memo(function Hero() {
  const { scrollY } = useScroll();
  
  // Refined, subtle parallax effects with smooth spring physics
  const y1 = useTransform(scrollY, [0, 600], [0, 100], { clamp: true });
  const y2 = useTransform(scrollY, [0, 600], [0, -60], { clamp: true });
  const opacity = useTransform(scrollY, [0, 200, 400], [1, 0.8, 0], { clamp: true });
  const scale = useTransform(scrollY, [0, 400], [1, 0.98], { clamp: true });

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        backgroundColor: 'var(--bg-inverse)',
        borderColor: 'var(--border-subtle)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Sophisticated background gradients */}
      <div className="absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
        {/* Primary gradient orb */}
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[900px] h-[900px] rounded-full blur-3xl will-change-opacity"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.5) 0%, rgba(16, 185, 129, 0.2) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary gradient orb */}
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-[700px] h-[700px] rounded-full blur-3xl will-change-opacity"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(99, 102, 241, 0.15) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Accent gradient orb */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full blur-3xl will-change-opacity"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.1) 40%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="relative px-6 md:px-12 lg:px-20 py-32 md:py-40 lg:py-48 w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 45%),
            radial-gradient(circle at 60% 80%, rgba(245, 158, 11, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 70%),
            linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F9F9F9 100%)
          `,
          boxShadow: 'inset 0 1px 0 0 rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Enhanced Court Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Animated Gradient Orbs */}
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.08] animate-pulse pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.06] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[90px] opacity-[0.05] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
            animation: 'float 30s ease-in-out infinite',
          }}
        />

        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Spotlight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0, 0, 0, 0.01) 100%)
            `,
          }}
        />

        {/* Court Center Line Accent */}
        <div 
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] opacity-[0.04] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(16, 185, 129, 0.4) 20%, rgba(16, 185, 129, 0.4) 80%, transparent 100%)',
          }}
        />

        <div className="max-w-[1600px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Issue Label */}
              <motion.div
                {...ANIMATION_CONFIG}
                transition={{ ...ANIMATION_CONFIG.transition, delay: 0.1 }}
                className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
              >
                <div 
                  className="h-px flex-1 max-w-[60px] sm:max-w-[80px]"
                  style={{ backgroundColor: 'var(--border-default)' }}
                />
                <span 
                  className="overline tracking-[0.2em] inline-flex items-center gap-3"
                  style={{ 
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(9px, 1.5vw, 11px)',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, var(--text-primary), color-mix(in srgb, var(--action-primary) 80%, var(--text-primary)))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  VOLUME I — KORWIN DESIGN SYSTEM — MMXXV
                </span>
              </motion.div>

              {/* Main Heading - Editorial Style */}
              <motion.h1
                {...ANIMATION_CONFIG}
                transition={{ ...ANIMATION_CONFIG.transition, delay: 0.2 }}
                className="mb-8 sm:mb-12 lg:mb-16"
                style={{ 
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 10vw, 120px)',
                  lineHeight: '0.9',
                  letterSpacing: '-0.04em',
                  fontWeight: 400,
                }}
              >
                Korwin
                <br />
                <motion.span
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: 'linear-gradient(135deg, var(--action-primary) 0%, var(--action-secondary) 50%, var(--action-primary) 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontStyle: 'italic',
                  }}
                >
                  Design System
                </motion.span>
              </motion.h1>

              {/* Editorial Description */}
              <motion.div
                {...ANIMATION_CONFIG}
                transition={{ ...ANIMATION_CONFIG.transition, delay: 0.3 }}
                className="mb-10 sm:mb-12 lg:mb-16 max-w-2xl"
              >
                <p
                  className="mb-6 sm:mb-8"
                  style={{ 
                    color: 'color-mix(in srgb, var(--text-primary) 90%, transparent)',
                    fontSize: 'clamp(18px, 3vw, 24px)',
                    lineHeight: '1.6',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                  }}
                >
                  A meticulously crafted, production-ready design system built on accessible colors, refined typography, and systematic spacing.
                </p>
                <p
                  style={{ 
                    color: 'color-mix(in srgb, var(--text-secondary) 85%, transparent)',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    lineHeight: '1.7',
                    fontWeight: 400,
                  }}
                >
                  Empowering design teams to build exceptional digital experiences with confidence, consistency, and uncompromising attention to detail.
                </p>
              </motion.div>

              {/* CTA Buttons - Refined */}
              <motion.div
                {...ANIMATION_CONFIG}
                transition={{ ...ANIMATION_CONFIG.transition, delay: 0.4 }}
                className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <motion.a
                  href="#overview"
                  onClick={handleScrollTo('overview')}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-4 px-10 py-5 transition-smooth will-change-transform"
                  style={{
                    backgroundColor: 'var(--action-primary)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <span className="label-lg tracking-wide">Explore System</span>
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                    strokeWidth={1.5}
                  />
                </motion.a>

                <motion.a
                  href="#tokens"
                  onClick={handleScrollTo('tokens')}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-10 py-5 border transition-smooth will-change-transform"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-medium)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <span className="label-lg tracking-wide">View Tokens</span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - Stats */}
            <div className="col-span-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12"
              >
                {STATS_DATA.map(({ value, label, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    {/* Decorative line */}
                    <div 
                      className="absolute -left-6 top-0 bottom-0 w-px"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, var(--border-default), transparent)',
                      }}
                    />
                    
                    <div className="flex items-start gap-5">
                      <div
                        className="w-14 h-14 flex items-center justify-center"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--action-primary) 8%, transparent)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid color-mix(in srgb, var(--action-primary) 15%, transparent)',
                        }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{ color: 'var(--action-primary)' }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-display)',
                            fontSize: '56px',
                            lineHeight: '1',
                            letterSpacing: '-0.02em',
                            marginBottom: '8px',
                          }}
                        >
                          {value}
                        </div>
                        <div
                          className="label-sm tracking-wider"
                          style={{
                            color: 'color-mix(in srgb, var(--text-secondary) 80%, transparent)',
                          }}
                        >
                          {label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--bg-canvas), transparent)',
        }}
      />
    </section>
  );
});