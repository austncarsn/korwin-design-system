import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, ArrowUp, ArrowDown } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description?: string;
}

const SECTIONS: readonly Section[] = [
  { id: 'overview', title: 'Overview', description: 'Introduction and key features' },
  { id: 'colors', title: 'Colors', description: 'Color palette and validation' },
  { id: 'typography', title: 'Typography', description: 'Type scale and specimens' },
  { id: 'spacing', title: 'Spacing', description: 'Grid and spacing system' },
  { id: 'components', title: 'Components', description: 'UI component library' },
  { id: 'tokens', title: 'Tokens', description: 'Design token exports' },
] as const;

const SCROLL_OFFSET = 100;

export const CommandPalette = memo(function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts for opening/closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        if (!isOpen) {
          setQuery('');
          setSelectedIndex(0);
        }
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter sections based on query
  const filteredSections = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery === '') return [...SECTIONS];

    return SECTIONS.filter(
      (section) =>
        section.title.toLowerCase().includes(trimmedQuery) ||
        section.description?.toLowerCase().includes(trimmedQuery)
    );
  }, [query]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredSections.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && filteredSections[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredSections[selectedIndex].id);
      }
    },
    [filteredSections, selectedIndex]
  );

  const handleSelect = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - SCROLL_OFFSET;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] will-change-opacity"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4 will-change-transform"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              className="bg-white rounded-[var(--radius-xl)] overflow-hidden will-change-transform"
              style={{
                boxShadow: 'var(--shadow-xl), 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border-subtle)]">
                <Search className="w-5 h-5 text-[var(--text-tertiary)] flex-shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search sections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none body-l placeholder:text-[var(--text-tertiary)]"
                  aria-label="Search sections"
                />
                <kbd className="flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--bg-secondary)] caption text-[var(--text-tertiary)] flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto" role="listbox">
                {filteredSections.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-12 text-center text-[var(--text-tertiary)]"
                  >
                    No sections found for "{query}"
                  </motion.div>
                ) : (
                  <div className="py-2">
                    {filteredSections.map((section, index) => (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.02,
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onClick={() => handleSelect(section.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`
                          w-full px-6 py-3 text-left transition-colors duration-150 flex items-center justify-between group will-change-auto
                          ${
                            selectedIndex === index
                              ? 'bg-[var(--bg-secondary)]'
                              : 'hover:bg-[var(--bg-secondary)]'
                          }
                        `}
                        role="option"
                        aria-selected={selectedIndex === index}
                      >
                        <div className="flex-1">
                          <div className="label-l mb-1">{section.title}</div>
                          {section.description && (
                            <div className="caption text-[var(--text-tertiary)]">{section.description}</div>
                          )}
                        </div>
                        <motion.div
                          className="text-[var(--text-tertiary)] ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: selectedIndex === index ? 1 : 0 }}
                          transition={{ duration: 0.15 }}
                          aria-hidden="true"
                        >
                          ↵
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between">
                <div className="flex items-center gap-3 caption text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded-md bg-white border border-[var(--border-subtle)] shadow-sm flex items-center gap-1">
                      <Command className="w-3 h-3" aria-hidden="true" />
                      <span>K</span>
                    </kbd>
                    <span>to toggle</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 caption text-[var(--text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded-md bg-white border border-[var(--border-subtle)] shadow-sm">
                      <ArrowUp className="w-3 h-3" aria-hidden="true" />
                    </kbd>
                    <kbd className="px-2 py-1 rounded-md bg-white border border-[var(--border-subtle)] shadow-sm">
                      <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    </kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded-md bg-white border border-[var(--border-subtle)] shadow-sm">↵</kbd>
                    <span>to select</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
