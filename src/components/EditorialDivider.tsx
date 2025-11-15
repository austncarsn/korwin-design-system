import { memo } from 'react';

interface EditorialDividerProps {
  variant?: 'ornament' | 'minimal' | 'accent';
}

export const EditorialDivider = memo(function EditorialDivider({ 
  variant = 'minimal' 
}: EditorialDividerProps) {
  if (variant === 'ornament') {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div 
            className="w-20 h-px"
            style={{ backgroundColor: 'var(--border-medium)' }}
          />
          <div className="flex gap-2">
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--action-primary)' }}
            />
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--action-secondary)' }}
            />
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--action-primary)' }}
            />
          </div>
          <div 
            className="w-20 h-px"
            style={{ backgroundColor: 'var(--border-medium)' }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'accent') {
    return (
      <div className="w-full py-24">
        <div
          className="h-px mx-auto max-w-md"
          style={{
            background: 'linear-gradient(to right, transparent, var(--action-primary), transparent)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <div
        className="h-px"
        style={{
          backgroundColor: 'var(--border-default)',
        }}
      />
    </div>
  );
});