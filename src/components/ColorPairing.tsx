import { memo } from 'react';

interface ColorPairingProps {
  title: string;
  description: string;
  colors: string[];
  example?: string;
}

export const ColorPairing = memo(function ColorPairing({ title, description, colors, example }: ColorPairingProps) {
  return (
    <div className="border border-[var(--border-default)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="p-[var(--space-6)]">
        {example}
      </div>
      <div className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] p-[var(--space-4)]">
        <div className="label-l mb-[var(--space-2)]">{title}</div>
        <div className="body-s text-[var(--text-secondary)] mb-[var(--space-4)]">
          {description}
        </div>
        <div className="flex gap-[var(--space-2)]">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--border-subtle)]"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
});