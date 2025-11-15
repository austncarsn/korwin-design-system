import { memo } from 'react';
import { motion } from 'motion/react';

interface EditorialDividerProps {
  variant?: 'ornament' | 'minimal' | 'accent';
}

export const EditorialDivider = memo(function EditorialDivider({ 
  variant = 'minimal' 
}: EditorialDividerProps) {
  if (variant === 'ornament') {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
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
        </motion.div>
      </div>
    );
  }

  if (variant === 'accent') {
    return (
      <div className="w-full py-24">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px mx-auto max-w-md"
          style={{
            background: 'linear-gradient(to right, transparent, var(--action-primary), transparent)',
            transformOrigin: 'center',
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full py-16">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px"
        style={{
          backgroundColor: 'var(--border-default)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
});