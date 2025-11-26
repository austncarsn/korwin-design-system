import { memo, useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';

interface TypeSpecimenProps {
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  label: string;
  example: string;
  specs: string;
}

export const TypeSpecimen = memo(function TypeSpecimen({
  className,
  element: Element = 'div',
  label,
  example,
  specs,
}: TypeSpecimenProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(example);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback to older method
        fallbackCopy();
      }
    } catch (err) {
      // Silently fallback on permission errors - this is expected behavior
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    try {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = example;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Copy failed:', err);
      // Silently fail - don't show error to user
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative py-12 border-b transition-all duration-300"
      style={{ 
        borderColor: isHovered ? 'var(--action-primary-subtle)' : 'var(--border-subtle)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 70%)',
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
        {/* Left column - Meta info */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit"
            style={{
              backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-subtle)',
              border: `1px solid ${isHovered ? 'rgba(16, 185, 129, 0.2)' : 'transparent'}`,
              transition: 'all 0.3s ease',
            }}
          >
            <span 
              className="label-md tracking-wide"
              style={{ 
                color: isHovered ? 'var(--action-primary)' : 'var(--text-primary)',
                transition: 'color 0.3s ease',
              }}
            >
              {label}
            </span>
          </div>
          <div
            className="caption font-mono leading-relaxed"
            style={{
              color: 'var(--text-tertiary)',
              letterSpacing: '0.02em',
              fontSize: '12px',
            }}
          >
            {specs}
          </div>
          
          {/* Copy button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit mt-2 transition-all duration-300"
            style={{
              backgroundColor: copied ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-muted)',
              color: copied ? 'var(--action-primary)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 500,
              opacity: 1, // Always visible
              border: copied ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
            }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Copy text</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Right column - Example text - Click to copy */}
        <div 
          className="lg:col-span-9 cursor-pointer"
          onClick={handleCopy}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCopy();
            }
          }}
          aria-label={`Click to copy: ${example}`}
        >
          <Element
            className={className}
            style={{
              color: 'var(--text-primary)',
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
              userSelect: 'none', // Prevent manual selection since we're handling copy
            }}
          >
            {example}
          </Element>
        </div>
      </div>

      {/* Animated indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
});