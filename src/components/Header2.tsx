import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useCallback, memo, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Colors', href: '#colors' },
  { label: 'Typography', href: '#typography' },
  { label: 'Spacing', href: '#spacing' },
  { label: 'Components', href: '#components' },
  { label: 'Tokens', href: '#tokens' },
] as const;

export const Header2 = memo(function Header2() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('#overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((item) => {
        const id = item.href.replace('#', '');
        return { href: item.href, element: document.getElementById(id) };
      }).filter(s => s.element);

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.href);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (index: number, href: string) => (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveIndex(index);
      setMobileMenuOpen(false);
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-smooth"
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.85)',
          borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: isScrolled 
            ? '0 4px 24px rgba(0, 0, 0, 0.08)'
            : 'none',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="container-custom max-w-[var(--container-3xl)] relative px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* K1 Logo - Left Side */}
            <motion.a
              href="#"
              className="flex items-center relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: 'black',
                  border: '2px solid black',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  K1
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="relative px-3 sm:px-4 py-2 rounded-lg transition-all duration-300"
                    style={{
                      color: isActive ? 'black' : 'rgba(0, 0, 0, 0.6)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'black';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span className="label-sm relative z-10">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* CTA Button - Desktop */}
            <motion.button
              className="hidden md:flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden ml-auto"
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: '1px solid black',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  backgroundPosition: ['200% 0%', '-200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.25) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                }}
              />
              <span className="label-sm relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg transition-colors duration-300 ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'black',
                backgroundColor: mobileMenuOpen ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <nav className="container-custom max-w-[var(--container-3xl)] py-6">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg transition-all duration-300"
                      style={{
                        color: isActive ? 'black' : 'rgba(0, 0, 0, 0.6)',
                        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                        borderLeft: isActive ? '2px solid black' : '2px solid transparent',
                      }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: NAV_ITEMS.length * 0.05 }}
                  className="mt-4 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});