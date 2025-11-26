import { memo } from 'react';
import { motion } from 'motion/react';

interface EditorialHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  number?: string;
}

export const EditorialHeader = memo(function EditorialHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  number,
}: EditorialHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const maxWidthClass = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-5xl';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignClass} ${maxWidthClass} mb-16 md:mb-24`}
    >
      {/* Number + Eyebrow */}
      {(number || eyebrow) && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mb-8"
        >
          {number && (
            <>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  color: 'var(--action-primary)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                }}
              >
                {number}
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-px w-16 origin-left"
                style={{ 
                  background: 'linear-gradient(90deg, var(--action-primary), transparent)',
                }}
              />
            </>
          )}
          {eyebrow && (
            <motion.span
              whileHover={{ scale: 1.05, x: 4 }}
              transition={{ duration: 0.2 }}
              className="tracking-[0.15em] inline-flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300 cursor-default"
              style={{
                color: 'var(--action-primary)',
                fontSize: '11px',
                backgroundColor: 'color-mix(in srgb, var(--action-primary) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--action-primary) 20%, transparent)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)',
              }}
            >
              <motion.span 
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--action-primary), var(--action-secondary))',
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                }}
              />
              {eyebrow}
            </motion.span>
          )}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: subtitle ? '24px' : 0,
          background: 'linear-gradient(135deg, var(--text-primary) 0%, color-mix(in srgb, var(--text-primary) 70%, var(--action-primary)) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={align === 'center' ? 'max-w-3xl' : 'max-w-2xl'}
          style={{
            fontSize: '20px',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
});