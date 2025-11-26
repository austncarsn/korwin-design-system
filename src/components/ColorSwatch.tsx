import { memo } from 'react';
import { motion } from 'motion/react';

interface ColorSwatchProps {
  name: string;
  value: string;
  description: string;
}

export const ColorSwatch = memo(function ColorSwatch({ name, value, description }: ColorSwatchProps) {
  const isLight = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 180;
  };

  const light = isLight(value);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      style={{
        willChange: 'transform',
      }}
    >
      <div 
        className="relative overflow-hidden mb-4 rounded-xl transition-all duration-500"
        style={{
          aspectRatio: '1',
          backgroundColor: value,
          boxShadow: `
            0 0 0 1px rgba(0, 0, 0, 0.04),
            0 2px 8px rgba(0, 0, 0, 0.04),
            0 8px 24px ${value}40
          `,
        }}
      >
        {/* Hover shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, ${light ? '0.3' : '0.1'}) 0%, transparent 60%)`,
          }}
        />
        
        {/* Color code on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            backgroundColor: light ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            className="font-mono tracking-wide"
            style={{
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {value}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <h4
            style={{
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            {name}
          </h4>
        </div>
        <p
          className="caption"
          style={{
            color: 'var(--text-tertiary)',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
});