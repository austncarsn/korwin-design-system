import React, { memo } from 'react';
import { RevealSection } from './RevealSection';
import { EditorialHeader } from './EditorialHeader';
import { UIExample } from './UIExample';

export const FormInputsSection = memo(function FormInputsSection() {
  return (
    <RevealSection id="form-inputs">
      <EditorialHeader
        number="05"
        eyebrow="COMPONENTS"
        title="Form Inputs"
        subtitle="Comprehensive form controls with built-in validation, accessibility features, and consistent styling across all input types."
      />
      
      <div className="mt-12 sm:mt-16 space-y-12">
        {/* Text Inputs */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Text Inputs</h3>
          <UIExample
            title="Standard Text Fields"
            description="Text inputs with labels, placeholders, and helper text"
            code={`<input 
  type="text"
  placeholder="Enter text..."
  className="input-primary"
/>`}
          >
            <div className="max-w-md space-y-6">
              <div>
                <label className="label-md block mb-2" style={{ color: '#09090B', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border transition-smooth"
                  style={{
                    borderColor: '#E5E7EB',
                    backgroundColor: 'white',
                    color: '#09090B',
                  }}
                />
                <p className="caption mt-2" style={{ color: '#71717A', fontSize: '14px' }}>
                  We'll never share your email
                </p>
              </div>
              <div>
                <label className="label-md block mb-2" style={{ color: '#09090B', fontWeight: '500' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg border transition-smooth"
                  style={{
                    borderColor: '#EF4444',
                    backgroundColor: 'white',
                    color: '#09090B',
                  }}
                />
                <p className="caption mt-2" style={{ color: '#DC2626', fontSize: '14px' }}>
                  Password must be at least 8 characters
                </p>
              </div>
            </div>
          </UIExample>
        </div>

        {/* Textarea */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Textarea</h3>
          <UIExample
            title="Multi-line Text Input"
            description="Textarea for longer form content"
            code={`<textarea 
  rows={4}
  placeholder="Enter message..."
  className="textarea-primary"
/>`}
          >
            <div className="max-w-md">
              <label className="label-md block mb-2" style={{ color: '#09090B', fontWeight: '500' }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us more..."
                className="w-full px-4 py-3 rounded-lg border transition-smooth"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                  color: '#09090B',
                  resize: 'vertical',
                }}
              />
            </div>
          </UIExample>
        </div>

        {/* Select Dropdown */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Select Dropdown</h3>
          <UIExample
            title="Dropdown Select"
            description="Select input for choosing from options"
            code={`<select className="select-primary">
  <option>Choose option...</option>
</select>`}
          >
            <div className="max-w-md">
              <label className="label-md block mb-2" style={{ color: '#09090B', fontWeight: '500' }}>
                Country
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border transition-smooth"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                  color: '#09090B',
                  cursor: 'pointer',
                }}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </UIExample>
        </div>

        {/* Checkboxes & Radio */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Checkboxes & Radio Buttons</h3>
          <UIExample
            title="Selection Controls"
            description="Checkboxes for multiple selections, radios for single choice"
            code={`<input type="checkbox" />
<input type="radio" />`}
          >
            <div className="max-w-md space-y-8">
              <div>
                <p className="label-md mb-4" style={{ color: '#09090B', fontWeight: '500' }}>
                  Preferences (multiple)
                </p>
                <div className="space-y-3">
                  {['Email notifications', 'SMS alerts', 'Push notifications'].map((label) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded cursor-pointer"
                        style={{
                          accentColor: '#10B981',
                        }}
                      />
                      <span style={{ color: '#09090B' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-md mb-4" style={{ color: '#09090B', fontWeight: '500' }}>
                  Plan (single choice)
                </p>
                <div className="space-y-3">
                  {['Free', 'Pro', 'Enterprise'].map((label) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="plan"
                        className="w-5 h-5 cursor-pointer"
                        style={{
                          accentColor: '#10B981',
                        }}
                      />
                      <span style={{ color: '#09090B' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </UIExample>
        </div>
      </div>
    </RevealSection>
  );
});