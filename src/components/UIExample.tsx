import { memo } from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface UIExampleProps {
  variant: 'button' | 'alert' | 'badge' | 'card' | 'hero';
}

export const UIExample = memo(function UIExample({ variant }: UIExampleProps) {
  if (variant === 'hero') {
    return (
      <div className="bg-[var(--bg-primary)] p-[var(--space-12)] rounded-[var(--radius-lg)]">
        <div className="max-w-2xl">
          <div className="overline text-[var(--action-primary)] mb-[var(--space-3)]">
            New Feature
          </div>
          <h2 className="mb-[var(--space-4)]">
            Build faster with our design system
          </h2>
          <p className="body-l text-[var(--text-secondary)] mb-[var(--space-6)]">
            A comprehensive toolkit for creating beautiful, accessible interfaces with confidence.
          </p>
          <div className="flex gap-[var(--space-4)]">
            <button className="px-[var(--space-6)] py-[var(--space-3)] bg-[var(--action-primary)] text-[var(--text-on-dark)] rounded-[var(--radius-md)] button-m hover:bg-[var(--action-primary-hover)]">
              Get Started
            </button>
            <button className="px-[var(--space-6)] py-[var(--space-3)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[var(--radius-md)] button-m border border-[var(--border-default)] hover:bg-[var(--bg-secondary)]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-4)]">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-[var(--space-6)]">
          <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--action-primary)] flex items-center justify-center mb-[var(--space-4)]">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-[var(--space-2)]">Premium Quality</h5>
          <p className="body-s text-[var(--text-secondary)]">
            Built with attention to every detail for the best experience.
          </p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-[var(--space-6)]">
          <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--state-success)] flex items-center justify-center mb-[var(--space-4)]">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-[var(--space-2)]">Accessible</h5>
          <p className="body-s text-[var(--text-secondary)]">
            WCAG compliant colors and markup for everyone.
          </p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-[var(--space-6)]">
          <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--state-info)] flex items-center justify-center mb-[var(--space-4)]">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h5 className="mb-[var(--space-2)]">Lovingly Crafted</h5>
          <p className="body-s text-[var(--text-secondary)]">
            Designed and developed with care and expertise.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'alert') {
    return (
      <div className="space-y-[var(--space-3)]">
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-success)' }}>
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-success)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Success</div>
            <div className="body-s text-[var(--text-secondary)]">Your changes have been saved successfully.</div>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-info)' }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-info)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Information</div>
            <div className="body-s text-[var(--text-secondary)]">You have 3 new notifications to review.</div>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-error)' }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-error)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Error</div>
            <div className="body-s text-[var(--text-secondary)]">Something went wrong. Please try again.</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className="space-y-[var(--space-3)]">
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-success)' }}>
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-success)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Success</div>
            <div className="body-s text-[var(--text-secondary)]">Your changes have been saved successfully.</div>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-info)' }}>
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-info)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Information</div>
            <div className="body-s text-[var(--text-secondary)]">You have 3 new notifications to review.</div>
          </div>
        </div>
        <div className="bg-[var(--bg-surface)] border-l-4 rounded-[var(--radius-md)] p-[var(--space-4)] flex items-start gap-[var(--space-3)]" style={{ borderLeftColor: 'var(--state-error)' }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--state-error)' }} />
          <div>
            <div className="label-m mb-[var(--space-1)]">Error</div>
            <div className="body-s text-[var(--text-secondary)]">Something went wrong. Please try again.</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className="space-y-[var(--space-3)]">
        <button className="px-[var(--space-6)] py-[var(--space-3)] bg-[var(--action-primary)] text-[var(--text-on-dark)] rounded-[var(--radius-md)] button-m hover:bg-[var(--action-primary-hover)]">
          Get Started
        </button>
        <button className="px-[var(--space-6)] py-[var(--space-3)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[var(--radius-md)] button-m border border-[var(--border-default)] hover:bg-[var(--bg-secondary)]">
          Learn More
        </button>
      </div>
    );
  }

  return null;
});