import React, { memo } from 'react';
import { RevealSection } from './RevealSection';
import { EditorialHeader } from './EditorialHeader';
import { UIExample } from './UIExample';
import { CheckCircle, AlertTriangle, Info, Palette, Zap } from 'lucide-react';

export const CardsSection = memo(function CardsSection() {
  return (
    <RevealSection id="cards">
      <EditorialHeader
        number="06"
        eyebrow="COMPONENTS"
        title="Cards"
        subtitle="Flexible card components for organizing content, featuring multiple variants, interactive states, and responsive layouts."
      />
      
      <div className="mt-12 sm:mt-16 space-y-12">
        {/* Basic Cards */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Basic Cards</h3>
          <UIExample
            title="Standard Card Layout"
            description="Clean cards with consistent padding and borders"
            code={`<div className="card">
  <h4>Card Title</h4>
  <p>Card content...</p>
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Typography System', desc: 'Instrument Serif for displays, Inter for UI. Fluid scales from 12-120px with precise hierarchy.' },
                { title: 'Color Tokens', desc: 'Semantic palette with Ash Neutrals, Emerald Primary, Amber Accent, Indigo Secondary.' },
                { title: 'Grid System', desc: '4px base unit with responsive breakpoints. Asymmetric editorial layouts with generous whitespace.' },
              ].map(({ title, desc }, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border transition-smooth"
                  style={{
                    borderColor: '#E5E7EB',
                    backgroundColor: 'white',
                  }}
                >
                  <h4 className="mb-3" style={{ color: '#09090B', fontSize: '20px', fontWeight: '600' }}>
                    {title}
                  </h4>
                  <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.6' }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </UIExample>
        </div>

        {/* Icon Cards */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Icon Cards</h3>
          <UIExample
            title="Cards with Icons"
            description="Feature cards with icon headers"
            code={`<div className="card-icon">
  <Icon />
  <h4>Title</h4>
  <p>Description</p>
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="p-6 rounded-xl border transition-smooth"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: '#D1FAE5',
                  }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: '#10B981' }} />
                </div>
                <h4 className="mb-2" style={{ color: '#09090B', fontSize: '20px', fontWeight: '600' }}>
                  Success
                </h4>
                <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.6' }}>
                  Operation completed successfully with no errors.
                </p>
              </div>
              <div
                className="p-6 rounded-xl border transition-smooth"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: '#FEF3C7',
                  }}
                >
                  <AlertTriangle className="w-6 h-6" style={{ color: '#F59E0B' }} />
                </div>
                <h4 className="mb-2" style={{ color: '#09090B', fontSize: '20px', fontWeight: '600' }}>
                  Warning
                </h4>
                <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.6' }}>
                  Please review these items before proceeding.
                </p>
              </div>
              <div
                className="p-6 rounded-xl border transition-smooth"
                style={{
                  borderColor: '#E5E7EB',
                  backgroundColor: 'white',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: '#DBEAFE',
                  }}
                >
                  <Info className="w-6 h-6" style={{ color: '#3B82F6' }} />
                </div>
                <h4 className="mb-2" style={{ color: '#09090B', fontSize: '20px', fontWeight: '600' }}>
                  Information
                </h4>
                <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.6' }}>
                  Additional details and helpful context provided.
                </p>
              </div>
            </div>
          </UIExample>
        </div>

        {/* Interactive Cards */}
        <div>
          <h3 className="mb-6" style={{ color: '#09090B', fontSize: '24px' }}>Interactive Cards</h3>
          <UIExample
            title="Clickable Cards"
            description="Cards with hover states and click interactions"
            code={`<div className="card-interactive">
  <h4>Clickable Card</h4>
  <p>Hover to see effect</p>
</div>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Palette, title: 'Design', desc: 'Beautiful UI components' },
                { icon: Zap, title: 'Performance', desc: 'Optimized for speed' },
              ].map(({ icon: Icon, title, desc }) => (
                <button
                  key={title}
                  className="p-6 rounded-xl border transition-smooth text-left w-full cursor-pointer"
                  style={{
                    borderColor: '#E5E7EB',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10B981';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon className="w-8 h-8 mb-4" style={{ color: '#10B981' }} />
                  <h4 className="mb-2" style={{ color: '#09090B', fontSize: '20px', fontWeight: '600' }}>
                    {title}
                  </h4>
                  <p style={{ color: '#52525B', fontSize: '15px', lineHeight: '1.6' }}>
                    {desc}
                  </p>
                </button>
              ))}
            </div>
          </UIExample>
        </div>
      </div>
    </RevealSection>
  );
});