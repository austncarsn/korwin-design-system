import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Command, ArrowUp } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Colors', href: '#colors' },
  { label: 'Typography', href: '#typography' },
  { label: 'Spacing', href: '#spacing' },
  { label: 'Buttons', href: '#buttons' },
  { label: 'Form Inputs', href: '#form-inputs' },
  { label: 'Cards', href: '#cards' },
  { label: 'Tokens', href: '#tokens' },
] as const;

const SCROLL_THRESHOLD = 400;
const SCROLL_OFFSET = 80;
const ACTIVE_SECTION_OFFSET = 200;

export const FloatingNav = memo(function FloatingNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > SCROLL_THRESHOLD);

          // Update active section
          const sections = NAV_ITEMS.map((item) => {
            const id = item.href.replace('#', '');
            return document.getElementById(id);
          }).filter(Boolean) as HTMLElement[];

          const scrollPosition = scrollY + ACTIVE_SECTION_OFFSET;

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
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - SCROLL_OFFSET;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleCommandPalette = useCallback(() => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-8 z-50 hidden lg:block will-change-transform"
        >
          <div
            className="px-2 py-2 rounded-2xl border glass relative overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
                radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.04) 0%, transparent 60%),
                linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 250, 0.96) 50%, rgba(255, 255, 255, 0.98) 100%)
              `,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(16, 185, 129, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Tennis Court Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '12px 12px',
              }}
              aria-hidden="true"
            />

            {/* Subtle glow orb */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
              }}
            />

            <div className="flex flex-col gap-1 relative z-10">
              {/* Navigation Dots */}
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(index, item.href)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-smooth will-change-transform"
                    style={{
                      backgroundColor: isActive
                        ? 'var(--action-primary-subtle)'
                        : 'transparent',
                    }}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Indicator dot */}
                    <motion.div
                      className="w-2 h-2 rounded-full will-change-transform"
                      style={{
                        backgroundColor: isActive
                          ? 'var(--action-primary)'
                          : 'var(--border-strong)',
                      }}
                      animate={{
                        scale: isActive ? 1.3 : 1,
                        boxShadow: isActive
                          ? '0 0 12px rgba(16, 185, 129, 0.4)'
                          : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute right-full mr-3 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none label-sm glass"
                      style={{
                        backgroundColor: 'var(--bg-inverse)',
                        color: 'var(--text-inverse)',
                        boxShadow: 'var(--shadow-xl)',
                      }}
                    >
                      {item.label}
                      {/* Arrow */}
                      <div
                        className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                        style={{
                          borderLeft: '6px solid var(--bg-inverse)',
                          borderTop: '6px solid transparent',
                          borderBottom: '6px solid transparent',
                        }}
                      />
                    </motion.div>

                    {/* Active ring with court lines */}
                    {isActive && (
                      <motion.div
                        layoutId="floatingActiveRing"
                        className="absolute inset-0 rounded-xl will-change-transform"
                        style={{
                          border: '2px solid var(--action-primary)',
                          opacity: 0.3,
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Divider with court line style */}
              <div className="relative h-px my-1 mx-2">
                <div className="absolute inset-0" style={{ backgroundColor: 'var(--border-subtle)' }} />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: 'var(--border-default)' }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--action-primary)' }}
                  />
                </div>
              </div>

              {/* Command palette button */}
              <motion.button
                onClick={handleCommandPalette}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-smooth will-change-transform hover:bg-[var(--action-neutral)]"
                aria-label="Open command palette (⌘K)"
              >
                <Command className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none label-sm flex items-center gap-2 glass"
                  style={{
                    backgroundColor: 'var(--bg-inverse)',
                    color: 'var(--text-inverse)',
                    boxShadow: 'var(--shadow-xl)',
                  }}
                >
                  Search
                  <kbd
                    className="ml-1 px-1.5 py-0.5 rounded caption"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--text-inverse) 15%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--text-inverse) 20%, transparent)',
                    }}
                  >
                    ⌘K
                  </kbd>
                  {/* Arrow */}
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderLeft: '6px solid var(--bg-inverse)',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                    }}
                  />
                </motion.div>
              </motion.button>

              {/* Scroll to top button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-11 h-11 flex items-center justify-center rounded-xl transition-smooth will-change-transform"
                style={{
                  backgroundColor: 'var(--action-primary)',
                  color: 'white',
                  boxShadow: 'var(--shadow-glow-emerald)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" strokeWidth={2.5} />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-full mr-3 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none label-sm glass"
                  style={{
                    backgroundColor: 'var(--bg-inverse)',
                    color: 'var(--text-inverse)',
                    boxShadow: 'var(--shadow-xl)',
                  }}
                >
                  Back to top
                  {/* Arrow */}
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderLeft: '6px solid var(--bg-inverse)',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                    }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});