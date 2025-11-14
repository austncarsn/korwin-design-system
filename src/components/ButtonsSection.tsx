import React, { memo } from 'react';
import { RevealSection } from './RevealSection';
import { EditorialHeader } from './EditorialHeader';
import { UIExample } from './UIExample';

export const ButtonsSection = memo(function ButtonsSection() {
  return (
    <RevealSection id="buttons">
      <EditorialHeader
        number="04"
        eyebrow="COMPONENTS"
        title="Buttons"
        subtitle="Interactive button components with multiple variants, sizes, and states. Built for accessibility and optimized for every interaction pattern."
      />
      
      <div className="mt-12 sm:mt-16 space-y-12">
        {/* Primary Buttons */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Primary Actions</h3>
          <UIExample
            title="Primary Button Variants"
            description="High-emphasis buttons for primary actions"
            code={`<button className="btn-primary">
  Primary Button
</button>`}
          >
            <div className="flex flex-wrap gap-4">
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Primary
              </button>
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Hover State
              </button>
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#D1D5DB',
                  color: '#9CA3AF',
                  border: 'none',
                  cursor: 'not-allowed',
                  opacity: 0.6,
                  fontWeight: '500',
                }}
                disabled
              >
                Disabled
              </button>
            </div>
          </UIExample>
        </div>

        {/* Secondary Buttons */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Secondary Actions</h3>
          <UIExample
            title="Secondary Button Variants"
            description="Medium-emphasis buttons for secondary actions"
            code={`<button className="btn-secondary">
  Secondary Button
</button>`}
          >
            <div className="flex flex-wrap gap-4">
              <button
                className="px-6 py-3 rounded-full border-2 transition-smooth"
                style={{
                  backgroundColor: 'transparent',
                  color: '#10B981',
                  borderColor: '#10B981',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Secondary
              </button>
              <button
                className="px-6 py-3 rounded-full border-2 transition-smooth"
                style={{
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  borderColor: '#10B981',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Hover State
              </button>
              <button
                className="px-6 py-3 rounded-full border-2 transition-smooth"
                style={{
                  backgroundColor: 'transparent',
                  color: '#D1D5DB',
                  borderColor: '#E5E7EB',
                  cursor: 'not-allowed',
                  opacity: 0.6,
                  fontWeight: '500',
                }}
                disabled
              >
                Disabled
              </button>
            </div>
          </UIExample>
        </div>

        {/* Button Sizes */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Size Variants</h3>
          <UIExample
            title="Button Sizes"
            description="From compact to large, sized for every context"
            code={`<button className="btn-sm">Small</button>
<button className="btn-md">Medium</button>
<button className="btn-lg">Large</button>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="px-4 py-2 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Small
              </button>
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Medium
              </button>
              <button
                className="px-8 py-4 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                Large
              </button>
            </div>
          </UIExample>
        </div>

        {/* Ghost Buttons */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Ghost & Text Buttons</h3>
          <UIExample
            title="Low-Emphasis Buttons"
            description="Subtle buttons for tertiary actions"
            code={`<button className="btn-ghost">
  Ghost Button
</button>`}
          >
            <div className="flex flex-wrap gap-4">
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: 'transparent',
                  color: '#09090B',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Ghost
              </button>
              <button
                className="px-6 py-3 rounded-full transition-smooth"
                style={{
                  backgroundColor: '#F4F4F5',
                  color: '#09090B',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Ghost Hover
              </button>
              <button
                className="px-6 py-3 transition-smooth"
                style={{
                  backgroundColor: 'transparent',
                  color: '#10B981',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
              >
                Text Button
              </button>
            </div>
          </UIExample>
        </div>
      </div>
    </RevealSection>
  );
});