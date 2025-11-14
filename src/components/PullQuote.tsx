import { memo } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

interface PullQuoteProps {
  quote: string;
  author?: string;
  role?: string;
}

export const PullQuote = memo(function PullQuote({ quote, author, role }: PullQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-16 px-8 md:px-16 lg:px-24"
    >
      {/* Decorative quote mark */}
      <div 
        className="absolute top-8 left-0 w-16 h-16 flex items-center justify-center opacity-10"
        style={{
          color: 'var(--action-primary)',
        }}
      >
        <Quote className="w-full h-full" strokeWidth={1} />
      </div>

      {/* Quote text */}
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 48px)',
          lineHeight: '1.3',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          marginBottom: author ? '32px' : 0,
        }}
      >
        "{quote}"
      </blockquote>

      {/* Attribution */}
      {author && (
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-px"
            style={{ backgroundColor: 'var(--border-medium)' }}
          />
          <div>
            <div
              className="label-md"
              style={{ 
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}
            >
              {author}
            </div>
            {role && (
              <div
                className="caption"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {role}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
});
