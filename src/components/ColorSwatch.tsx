import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy } from 'lucide-react';

interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
  variant?: 'default' | 'large';
}

export const ColorSwatch = memo(function ColorSwatch({
  name,
  value,
  description,
  variant = 'default',
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [value]);

  const height = variant === 'large' ? 'h-32' : 'h-24';

  return (
    <motion.button
      onClick={copyToClipboard}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary)] focus-visible:ring-offset-2 rounded-xl will-change-transform"
      aria-label={`Copy ${name} color ${value}`}
    >
      <div
        className={`relative w-full ${height} rounded-xl mb-3 border overflow-hidden transition-all duration-300`}
        style={{
          backgroundColor: value,
          borderColor: isHovered ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isHovered
            ? '0 12px 40px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%, transparent 100%)'
              : 'transparent',
            backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '0% 0%',
          }}
          transition={{
            backgroundPosition: {
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear',
            },
            background: { duration: 0.3 },
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--bg-inverse) 15%, transparent)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Copy className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <span className="label-sm" style={{ color: 'var(--text-primary)' }}>
              Copy
            </span>
          </motion.div>
        </motion.div>

        {/* Copied confirmation */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--state-success) 15%, transparent)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="rounded-full p-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--shadow-xl)',
                }}
              >
                <Check className="w-6 h-6" style={{ color: 'var(--state-success)' }} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color info */}
      <div className="space-y-1">
        <div className="label-md" style={{ color: 'var(--text-primary)' }}>
          {name}
        </div>
        <div
          className="caption font-mono"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
          }}
        >
          {value}
        </div>
        {description && (
          <div className="body-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
            {description}
          </div>
        )}
      </div>
    </motion.button>
  );
});