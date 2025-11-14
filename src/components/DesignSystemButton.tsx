import React, { memo, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles = {
  primary: {
    base: 'bg-[var(--action-primary)] text-white border border-transparent relative overflow-hidden',
    hover: 'hover:bg-[var(--action-primary-hover)]',
    active: 'active:bg-[var(--action-primary-active)]',
    shadow: 'shadow-sm hover:shadow-[var(--shadow-glow-emerald)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
  secondary: {
    base: 'bg-[var(--action-secondary)] text-white border border-transparent relative overflow-hidden',
    hover: 'hover:bg-[var(--action-secondary-hover)]',
    active: 'active:bg-[var(--action-secondary-active)]',
    shadow: 'shadow-sm hover:shadow-md',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
  outline: {
    base: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] relative overflow-hidden',
    hover: 'hover:bg-[var(--action-neutral)] hover:border-[var(--border-strong)]',
    active: 'active:bg-[var(--action-neutral-active)]',
    shadow: 'shadow-sm hover:shadow-md',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
  ghost: {
    base: 'bg-transparent text-[var(--text-secondary)] border border-transparent relative overflow-hidden',
    hover: 'hover:bg-[var(--action-neutral)] hover:text-[var(--text-primary)]',
    active: 'active:bg-[var(--action-neutral-active)]',
    shadow: '',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },
} as const;

const sizeStyles = {
  sm: {
    height: 'h-9',
    padding: 'px-3',
    fontSize: 'label-sm',
    radius: 'rounded-lg',
    gap: 'gap-1.5',
  },
  md: {
    height: 'h-11',
    padding: 'px-4',
    fontSize: 'label-md',
    radius: 'rounded-xl',
    gap: 'gap-2',
  },
  lg: {
    height: 'h-12',
    padding: 'px-6',
    fontSize: 'label-lg',
    radius: 'rounded-xl',
    gap: 'gap-2',
  },
  xl: {
    height: 'h-14',
    padding: 'px-8',
    fontSize: 'label-lg',
    radius: 'rounded-xl',
    gap: 'gap-2.5',
  },
} as const;

export const DesignSystemButton = memo(function DesignSystemButton({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  disabled,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const variantClasses = variantStyles[variant];
  const sizeClasses = sizeStyles[size];

  const buttonClasses = `
    inline-flex items-center justify-center
    ${variantClasses.base}
    ${variantClasses.hover}
    ${variantClasses.active}
    ${variantClasses.shadow}
    ${variantClasses.disabled}
    ${sizeClasses.height}
    ${sizeClasses.padding}
    ${sizeClasses.fontSize}
    ${sizeClasses.radius}
    ${sizeClasses.gap}
    transition-all duration-300
    will-change-transform
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary)] focus-visible:ring-offset-2
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect for primary/secondary variants */}
      {(variant === 'primary' || variant === 'secondary') && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '0% 0%',
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
          </>
        )}
      </span>
    </motion.button>
  );
});