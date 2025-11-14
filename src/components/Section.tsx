import { memo } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id?: string;
  title: string;
  description?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = memo(function Section({
  id,
  title,
  description,
  eyebrow,
  children,
  className = '',
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-20 md:py-32 relative ${className}`}
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 md:mb-28 relative z-10"
      >
        {eyebrow && (
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-12 h-px"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            />
            <span 
              className="overline tracking-[0.15em]"
              style={{ 
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '11px',
              }}
            >
              {eyebrow}
            </span>
          </div>
        )}
        
        <h2
          className="mb-8 text-balance"
          style={{ 
            /* Typography System: Display (Instrument Serif) for editorial sections | Body (Inter) for component/UI sections */
            color: 'black',
            fontFamily: 'var(--font-body)', /* Inter - for component documentation sections */
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: '1.2',
            letterSpacing: '-0.025em',
          }}
        >
          {title}
        </h2>
        
        {description && (
          <p
            className="max-w-3xl text-pretty"
            style={{ 
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: '20px',
              lineHeight: '1.7',
              letterSpacing: '-0.01em',
            }}
          >
            {description}
          </p>
        )}
      </motion.header>
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
});