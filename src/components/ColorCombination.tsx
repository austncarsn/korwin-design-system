import { CheckCircle, XCircle } from 'lucide-react';
import { memo } from 'react';

interface ColorCombinationProps {
  background: string;
  foreground: string;
  label: string;
  ratio: string;
  passes: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  example?: string;
}

export const ColorCombination = memo(function ColorCombination({ background, foreground, label, ratio, passes, example }: ColorCombinationProps) {
  const getPassColor = () => {
    switch(passes) {
      case 'AAA': return 'var(--state-success)';
      case 'AA': return 'var(--state-success)';
      case 'AA Large': return 'var(--state-info)';
      case 'Fail': return 'var(--state-error)';
    }
  };

  const isPass = passes !== 'Fail';

  return (
    <div className="border border-[var(--border-default)] rounded-[var(--radius-lg)] overflow-hidden">
      <div 
        className="p-[var(--space-6)] min-h-[120px] flex items-center justify-center"
        style={{ backgroundColor: background }}
      >
        <div className="text-center" style={{ color: foreground }}>
          <div className="h4 mb-[var(--space-2)]">{example || 'Sample Text'}</div>
          <div className="body-m">The quick brown fox jumps over the lazy dog</div>
        </div>
      </div>
      <div className="bg-[var(--bg-surface)] p-[var(--space-4)] border-t border-[var(--border-subtle)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="label-m mb-[var(--space-1)]">{label}</div>
            <div className="caption text-[var(--text-secondary)]">
              Contrast: {ratio}
            </div>
          </div>
          <div className="flex items-center gap-[var(--space-2)]">
            {isPass ? (
              <CheckCircle className="w-4 h-4" style={{ color: getPassColor() }} />
            ) : (
              <XCircle className="w-4 h-4" style={{ color: getPassColor() }} />
            )}
            <span className="label-s" style={{ color: getPassColor() }}>
              {passes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});