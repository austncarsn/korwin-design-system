import { memo } from 'react';

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
    <div
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
      <div
        className="h-px mt-8 origin-left transition-all duration-300"
        style={{
          background:
            'linear-gradient(90deg, var(--action-primary) 0%, transparent 100%)',
          transform: 'scaleX(0)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scaleX(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scaleX(0)';
        }}
      />
    </div>
  );
});