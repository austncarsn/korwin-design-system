import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const DesignSystemInput = memo(function DesignSystemInput({
  label,
  error,
  success,
  helperText,
  icon,
  showPasswordToggle,
  className = '',
  id,
  type: initialType = 'text',
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const type = showPasswordToggle && showPassword ? 'text' : initialType;

  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="label-md block mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {icon}
          </div>
        )}

        {/* Input */}
        <motion.input
          id={inputId}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-12 body-md
            bg-[var(--bg-surface)]
            border
            rounded-xl
            px-4 py-3
            text-[var(--text-primary)]
            placeholder:text-[var(--text-tertiary)]
            transition-smooth
            focus:outline-none focus:ring-2
            disabled:bg-[var(--bg-subtle)]
            disabled:cursor-not-allowed
            disabled:text-[var(--text-disabled)]
            ${icon ? 'pl-10' : ''}
            ${showPasswordToggle ? 'pr-12' : ''}
            ${
              hasError
                ? 'border-[var(--state-error)] focus:ring-[var(--state-error)] focus:border-[var(--state-error)]'
                : hasSuccess
                ? 'border-[var(--state-success)] focus:ring-[var(--state-success)] focus:border-[var(--state-success)]'
                : 'border-[var(--border-default)] focus:ring-[var(--action-primary)] focus:border-[var(--action-primary)]'
            }
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          animate={{
            boxShadow: isFocused
              ? hasError
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                : hasSuccess
                ? '0 0 0 3px rgba(16, 185, 129, 0.1)'
                : '0 0 0 3px rgba(16, 185, 129, 0.1)'
              : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {/* Password Toggle */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-smooth hover:bg-[var(--action-neutral)]"
            style={{ color: 'var(--text-secondary)' }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Status Icon */}
        {(hasError || hasSuccess) && !showPasswordToggle && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {hasError ? (
              <AlertCircle className="w-5 h-5" style={{ color: 'var(--state-error)' }} />
            ) : (
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--state-success)' }} />
            )}
          </motion.div>
        )}
      </div>

      {/* Helper/Error/Success Text */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="caption flex items-center gap-1.5 mt-2"
            style={{ color: 'var(--state-error)' }}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </motion.p>
        )}
        {success && !error && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="caption flex items-center gap-1.5 mt-2"
            style={{ color: 'var(--state-success)' }}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{success}</span>
          </motion.p>
        )}
        {helperText && !error && !success && (
          <motion.p
            key="helper"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="caption mt-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {helperText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});
