import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Colors', href: '#colors' },
  { label: 'Typography', href: '#typography' },
  { label: 'Spacing', href: '#spacing' },
  { label: 'Components', href: '#components' },
  { label: 'Tokens', href: '#tokens' },
];

// Custom hook for scroll direction
function useScrollDir() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollDir;
}

export const Navigation = memo(function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dir = useScrollDir();

  // Memoized tokens
  const tokens = useMemo(() => ({
    bg: 'rgba(21, 21, 21, 0.85)',
    border: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.6)',
    lightest: '#FFFFFF',
    accent: 'var(--action-primary)',
  }), []);

  // Detect scroll position
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 100);

          // Update active section
          const sections = navItems.map(item => {
            const id = item.href.replace('#', '');
            return document.getElementById(id);
          }).filter(Boolean);

          const scrollPosition = window.scrollY + 250;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveIndex(i);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((index: number, href: string) => {
    setActiveIndex(index);
    setMobileMenuOpen(false);
    
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      
      // Butter smooth scroll with custom easing
      const startPosition = window.scrollY;
      const distance = offsetTop - startPosition;
      const duration = 800; // Slightly longer for smoothness
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }, []);

  // Show floating nav when scrolling up and scrolled past hero
  const showFloatingNav = scrolled && dir === 'up';

  return (
    <>
      {/* Floating Navigation - Only appears when scrolling up */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
            role="banner"
          >
            <div className="mx-4 mt-4">
              <div
                className="max-w-6xl mx-auto px-6 py-4 rounded-2xl border shadow-2xl"
                style={{
                  backgroundColor: tokens.bg,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  borderColor: tokens.border,
                }}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Brand */}
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent }} />
                    <span className="tracking-tight select-none" style={{ color: tokens.lightest }}>
                      DESIGN SYSTEM
                    </span>
                  </motion.div>

                  {/* Desktop Nav Items */}
                  <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
                    {navItems.map((item, index) => {
                      const isActive = activeIndex === index;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(index, item.href);
                          }}
                          className="px-4 py-2 rounded-full transition-all duration-300 text-sm relative"
                          style={{
                            color: isActive ? tokens.lightest : tokens.light,
                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                          }}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="floatingActiveTab"
                              className="absolute inset-0 rounded-full"
                              style={{
                                backgroundColor: 'rgba(255, 56, 0, 0.15)',
                                border: '1px solid rgba(255, 56, 0, 0.3)',
                              }}
                              transition={{ 
                                type: 'spring',
                                stiffness: 500,
                                damping: 35,
                                mass: 0.5,
                              }}
                            />
                          )}
                          <span className="relative z-10">{item.label}</span>
                        </a>
                      );
                    })}
                  </nav>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setIsDark(!isDark)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      style={{ color: tokens.lightest }}
                      aria-label="Toggle theme"
                    >
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      whileTap={{ scale: 0.95 }}
                      className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                      style={{ color: tokens.lightest }}
                      aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                      {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="md:hidden overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t space-y-1" style={{ borderColor: tokens.border }}>
                        {navItems.map((item, index) => {
                          const isActive = activeIndex === index;
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(index, item.href);
                              }}
                              className="block px-4 py-3 rounded-lg transition-all duration-200"
                              style={{
                                color: isActive ? tokens.lightest : tokens.light,
                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                              }}
                            >
                              {item.label}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          backgroundColor: tokens.bg, 
          color: tokens.lightest,
          ringColor: tokens.accent,
        }}
      >
        Skip to content
      </a>
    </>
  );
});