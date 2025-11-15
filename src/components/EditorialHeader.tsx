import { memo } from 'react';

interface EditorialHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  number?: string;
}

export const EditorialHeader = memo(function EditorialHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  number,
}: EditorialHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const maxWidthClass = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-5xl';

  return (
    <div className={`flex flex-col ${alignClass} ${maxWidthClass} mb-16 md:mb-24`}>
      {/* Number + Eyebrow */}
      {(number || eyebrow) && (
        <div className="flex items-center gap-6 mb-8">
          {number && (
            <>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--action-primary)',
                  fontStyle: 'italic',
                }}
              >
                {number}
              </span>
              <div 
                className="h-px w-12"
                style={{ backgroundColor: 'var(--border-medium)' }}
              />
            </>
          )}
          {eyebrow && (
            <span
              className="tracking-[0.15em] inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                color: 'var(--text-primary)',
                fontSize: '11px',
                backgroundColor: 'color-mix(in srgb, var(--action-primary) 6%, transparent)',
                border: '1px solid color-mix(in srgb, var(--action-primary) 12%, transparent)',
                fontWeight: 600,
                letterSpacing: '0.12em',
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--action-primary), var(--action-secondary))',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
                }}
              />
              {eyebrow}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: subtitle ? '24px' : 0,
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={align === 'center' ? 'max-w-3xl' : 'max-w-2xl'}
          style={{
            fontSize: '20px',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
});