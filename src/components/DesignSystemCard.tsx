import { memo, useMemo, useState } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary' | 'secondary';
  children?: React.ReactNode;
  interactive?: boolean;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

const VARIANT_STYLES = {
  success: {
    iconBg: 'linear-gradient(135deg, var(--state-success) 0%, #059669 100%)',
    borderColor: 'var(--state-success-border)',
    titleColor: 'var(--state-success)',
    glow: 'var(--shadow-glow-emerald)',
  },
  warning: {
    iconBg: 'linear-gradient(135deg, var(--state-warning) 0%, #D97706 100%)',
    borderColor: 'var(--state-warning-border)',
    titleColor: 'var(--state-warning)',
    glow: 'var(--shadow-glow-amber)',
  },
  error: {
    iconBg: 'linear-gradient(135deg, var(--state-error) 0%, #DC2626 100%)',
    borderColor: 'var(--state-error-border)',
    titleColor: 'var(--state-error)',
    glow: '0 0 24px rgba(239, 68, 68, 0.2)',
  },
  info: {
    iconBg: 'linear-gradient(135deg, var(--state-info) 0%, #4F46E5 100%)',
    borderColor: 'var(--state-info-border)',
    titleColor: 'var(--state-info)',
    glow: 'var(--shadow-glow-indigo)',
  },
  primary: {
    iconBg: 'linear-gradient(135deg, var(--action-primary) 0%, var(--action-secondary) 100%)',
    borderColor: 'var(--border-default)',
    titleColor: 'var(--text-primary)',
    glow: 'var(--shadow-glow-emerald)',
  },
  secondary: {
    iconBg: 'linear-gradient(135deg, var(--action-secondary) 0%, #4338CA 100%)',
    borderColor: 'var(--border-default)',
    titleColor: 'var(--text-primary)',
    glow: 'var(--shadow-glow-indigo)',
  },
  default: {
    iconBg: 'linear-gradient(135deg, var(--text-tertiary) 0%, var(--text-quaternary) 100%)',
    borderColor: 'var(--border-default)',
    titleColor: 'var(--text-primary)',
    glow: 'var(--shadow-md)',
  },
} as const;

export const DesignSystemCard = memo(function DesignSystemCard({
  icon,
  title,
  description,
  variant = 'default',
  children,
  interactive = false,
  elevated = false,
  className = '',
  onClick,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = VARIANT_STYLES[variant];

  const baseStyles = useMemo(
    () =>
      `
    bg-[var(--bg-surface)]
    border
    rounded-2xl
    p-6
    transition-smooth
    will-change-transform
  `.trim(),
    []
  );

  return (
    <motion.div
      className={`${baseStyles} ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{
        borderColor: isHovered && interactive ? styles.borderColor : 'var(--border-default)',
        boxShadow: elevated || (isHovered && interactive) ? styles.glow : 'var(--shadow-sm)',
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={interactive ? { y: -4 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {/* Icon */}
      {icon && (
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
          style={{
            background: styles.iconBg,
            color: 'white',
            boxShadow: 'var(--shadow-md)',
          }}
          animate={{
            boxShadow: isHovered ? styles.glow : 'var(--shadow-md)',
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Title */}
      {title && (
        <h4 className="mb-2" style={{ color: styles.titleColor }}>
          {title}
        </h4>
      )}

      {/* Description */}
      {description && (
        <p className="body-sm" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}

      {/* Children */}
      {children && <div className="mt-4">{children}</div>}

      {/* Interactive indicator */}
      {interactive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl origin-left"
          style={{ background: styles.iconBg }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
});
