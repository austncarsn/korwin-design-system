import React, { memo, ReactNode } from 'react';

interface UIExampleProps {
  title?: string;
  description?: string;
  code?: string;
  children: ReactNode;
}

export const UIExample = memo(function UIExample({ 
  title, 
  description, 
  code,
  children 
}: UIExampleProps) {
  return (
    <div 
      className="rounded-xl border p-6 sm:p-8" 
      style={{
        borderColor: '#E5E7EB',
        backgroundColor: 'white',
      }}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h4 className="mb-2" style={{ color: '#09090B', fontSize: '18px', fontWeight: '600' }}>
              {title}
            </h4>
          )}
          {description && (
            <p style={{ color: '#71717A', fontSize: '14px', lineHeight: '1.6' }}>
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="rounded-lg p-6" style={{ backgroundColor: '#FAFAFA' }}>
        {children}
      </div>
      
      {code && (
        <div className="mt-4">
          <details className="group">
            <summary 
              className="cursor-pointer text-sm font-medium list-none flex items-center gap-2"
              style={{ color: '#10B981' }}
            >
              <span className="transition-transform group-open:rotate-90">▶</span>
              View Code
            </summary>
            <pre 
              className="mt-3 p-4 rounded-lg overflow-x-auto text-sm"
              style={{ 
                backgroundColor: '#18181B',
                color: '#FAFAFA',
              }}
            >
              <code>{code}</code>
            </pre>
          </details>
        </div>
      )}
    </div>
  );
});
