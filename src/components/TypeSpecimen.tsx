import { memo } from 'react';
import { motion } from 'motion/react';

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group py-8 border-b transition-smooth last:border-b-0"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left column - Meta info */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <div className="label-md" style={{ color: 'var(--text-primary)' }}>
            {label}
          </div>
          <div
            className="caption font-mono"
            style={{
              color: 'var(--text-tertiary)',
              letterSpacing: '0.02em',
            }}
          >
            {specs}
          </div>
        </div>

        {/* Right column - Example text */}
        <div className="lg:col-span-9">
          <Element
            className={className}
            style={{
              color: 'var(--text-primary)',
              transition: 'color var(--duration-normal) var(--ease-out)',
            }}
          >
            {example}
          </Element>
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="h-px mt-8 origin-left"
        style={{
          background:
            'linear-gradient(90deg, var(--action-primary) 0%, transparent 100%)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});
