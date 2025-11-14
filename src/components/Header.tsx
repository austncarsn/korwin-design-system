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

export const Header = memo(function Header() {
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
                  backgroundColor: 'white',
                  border: '2px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <span
                  style={{
                    color: 'black',
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
            <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="relative px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300"
                    style={{
                      color: isActive ? '#09090B' : '#71717A', // Ash-900 : Ash-500
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#09090B';
                        e.currentTarget.style.backgroundColor = '#F4F4F5'; // Ash-100
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#71717A';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span className="label-sm relative z-10">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          backgroundColor: '#FAFAFA', // Ash-50
                          border: '1.5px solid #E4E4E7', // Ash-200
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-full transition-colors duration-300 ml-auto relative will-change-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              style={{
                color: 'black',
                backgroundColor: mobileMenuOpen ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              }}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px] relative">
                <motion.span
                  className="block h-[2px] rounded-full bg-current origin-center will-change-transform"
                  style={{ width: '18px' }}
                  animate={mobileMenuOpen ? {
                    rotate: 45,
                    y: 7,
                    backgroundColor: '#10B981',
                  } : {
                    rotate: 0,
                    y: 0,
                    backgroundColor: 'currentColor',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block h-[2px] rounded-full bg-current will-change-transform"
                  style={{ width: '18px' }}
                  animate={mobileMenuOpen ? {
                    opacity: 0,
                    x: -10,
                  } : {
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="block h-[2px] rounded-full bg-current origin-center will-change-transform"
                  style={{ width: '18px' }}
                  animate={mobileMenuOpen ? {
                    rotate: -45,
                    y: -7,
                    backgroundColor: '#10B981',
                  } : {
                    rotate: 0,
                    y: 0,
                    backgroundColor: 'currentColor',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 md:hidden bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-40 md:hidden overflow-hidden rounded-2xl shadow-2xl will-change-transform"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <nav className="py-4 px-2">
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.href;
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.04,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        onClick={handleNavClick(index, item.href)}
                        className="relative px-4 py-3.5 rounded-xl transition-all duration-300 group will-change-transform"
                        style={{
                          color: isActive ? '#09090B' : '#52525B',
                          backgroundColor: isActive ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '15px',
                          fontWeight: isActive ? 600 : 500,
                          letterSpacing: '-0.01em',
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full"
                            style={{ backgroundColor: '#10B981' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        
                        <span className="relative z-10 pl-2">{item.label}</span>
                        
                        {/* Hover effect */}
                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});