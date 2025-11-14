import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Header2 } from './components/Header2';
import { Hero } from './components/Hero';
import { FloatingNav } from './components/FloatingNav';
import { Section } from './components/Section';
import { ColorSwatch } from './components/ColorSwatch';
import { TypeSpecimen } from './components/TypeSpecimen';
import { DesignSystemButton } from './components/DesignSystemButton';
import { DesignSystemInput } from './components/DesignSystemInput';
import { DesignSystemCard } from './components/DesignSystemCard';
import { CodeBlock } from './components/CodeBlock';
import { ColorCombination } from './components/ColorCombination';
import { ColorPairing } from './components/ColorPairing';
import { UIExample } from './components/UIExample';
import { BentoCard } from './components/BentoCard';
import { RevealSection } from './components/RevealSection';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';
import { BackToTop } from './components/BackToTop';
import { EditorialDivider } from './components/EditorialDivider';
import { PullQuote } from './components/PullQuote';
import { EditorialHeader } from './components/EditorialHeader';
import { Footer } from './components/Footer';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Palette,
  Zap,
  Shield,
} from 'lucide-react';

// Memoized constants
const BASE_COLORS = [
  { name: 'Ash 50', value: '#FAFAFA', description: 'Lightest neutral' },
  { name: 'Emerald 500', value: '#10B981', description: 'Primary brand color' },
  { name: 'Indigo 500', value: '#6366F1', description: 'Secondary brand' },
  { name: 'Amber 500', value: '#F59E0B', description: 'Warm accent' },
  { name: 'Ash 950', value: '#09090B', description: 'Darkest neutral' },
  { name: 'White', value: '#FFFFFF', description: 'Pure white' },
] as const;

const SEMANTIC_COLORS = [
  { name: 'bg.canvas', value: '#FFFFFF', description: 'Base background' },
  { name: 'bg.surface', value: '#FFFFFF', description: 'Surface background' },
  { name: 'bg.subtle', value: '#F4F4F5', description: 'Subtle background' },
  { name: 'text.primary', value: '#09090B', description: 'Primary text' },
  { name: 'text.secondary', value: '#52525B', description: 'Secondary text' },
  { name: 'text.tertiary', value: '#71717A', description: 'Tertiary text' },
  { name: 'action.primary', value: '#10B981', description: 'Primary action' },
  { name: 'action.secondary', value: '#6366F1', description: 'Secondary action' },
  { name: 'state.success', value: '#10B981', description: 'Success state' },
  { name: 'state.warning', value: '#F59E0B', description: 'Warning state' },
  { name: 'state.error', value: '#F43F5E', description: 'Error state' },
  { name: 'state.info', value: '#6366F1', description: 'Info state' },
] as const;

const SPACING_VALUES = [
  { name: 'space-0', value: '0px' },
  { name: 'space-1', value: '4px' },
  { name: 'space-2', value: '8px' },
  { name: 'space-3', value: '12px' },
  { name: 'space-4', value: '16px' },
  { name: 'space-5', value: '20px' },
  { name: 'space-6', value: '24px' },
  { name: 'space-8', value: '32px' },
  { name: 'space-10', value: '40px' },
  { name: 'space-12', value: '48px' },
  { name: 'space-16', value: '64px' },
  { name: 'space-20', value: '80px' },
  { name: 'space-24', value: '96px' },
] as const;

const CODE_EXAMPLES = {
  button: `import { DesignSystemButton } from './components/DesignSystemButton';

<DesignSystemButton variant="primary" size="medium">
  Click Me
</DesignSystemButton>`,
  
  input: `import { DesignSystemInput } from './components/DesignSystemInput';

<DesignSystemInput 
  label="Email Address"
  placeholder="you@example.com"
  helperText="We'll never share your email"
/>`,
  
  tokens: `{
  "color": {
    "base": {
      "ash-50": "#FAFAFA",
      "emerald-500": "#10B981",
      "indigo-500": "#6366F1",
      "amber-500": "#F59E0B",
      "ash-950": "#09090B",
      "white": "#FFFFFF"
    },
    "semantic": {
      "bg": {
        "canvas": "{color.base.white}",
        "surface": "{color.base.white}",
        "subtle": "#F4F4F5"
      },
      "text": {
        "primary": "{color.base.ash-950}",
        "secondary": "#52525B",
        "tertiary": "#71717A"
      },
      "action": {
        "primary": "{color.base.emerald-500}",
        "primary-hover": "#148F77",
        "primary-pressed": "#0E7461"
      }
    }
  }
}`,
} as const;

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoize sections to prevent unnecessary re-renders
  const overviewSection = useMemo(() => (
    <RevealSection id="overview">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-[var(--space-6)] auto-rows-[minmax(260px,auto)]">
        {/* Hero Card - Design System */}
        <BentoCard span="2x2" delay={0.1} interactive>
          <div className="h-full flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative group"
                style={{
                  background: 'linear-gradient(135deg, var(--action-primary) 0%, #059669 100%)',
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                <Palette className="w-10 h-10" style={{ color: 'white' }} strokeWidth={1.5} />
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                  }}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.3) 0%, transparent 100%)' }} />
                    <span className="caption tracking-[0.15em] uppercase" style={{ color: 'rgba(16, 185, 129, 0.8)' }}>Foundation</span>
                  </div>
                  <h3 
                    className="mb-4" 
                    style={{ 
                      color: 'black',
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      lineHeight: '1.2',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Design System
                  </h3>
                </div>
                <p 
                  className="leading-relaxed max-w-md" 
                  style={{ 
                    color: 'rgba(0, 0, 0, 0.65)',
                    fontSize: '15px',
                    lineHeight: '1.7',
                  }}
                >
                  A comprehensive, production-ready foundation built on accessible colors, refined typography, and systematic spacing—crafted for modern applications.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
              {[
                { label: 'WCAG AAA', color: '#10B981', bg: 'rgba(16, 185, 129, 0.08)' },
                { label: 'React + Tailwind', color: '#6366F1', bg: 'rgba(99, 102, 241, 0.08)' },
                { label: 'Design Tokens', color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
              ].map((tag) => (
                <div
                  key={tag.label}
                  className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: tag.bg,
                    border: `1px solid ${tag.color}20`,
                    color: tag.color,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag.label}
                </div>
              ))}
            </div>
            {/* Decorative grid pattern */}
            <div
              className="absolute bottom-0 right-0 w-48 h-48 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(16, 185, 129, 0.6) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.6) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
              }}
              aria-hidden="true"
            />
          </div>
        </BentoCard>

        {/* Accessible Card */}
        <BentoCard span="2x1" delay={0.2}>
          <div className="h-full flex flex-col justify-between p-6">
            <div>
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative"
                style={{
                  background: 'linear-gradient(135deg, var(--state-success) 0%, #059669 100%)',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)',
                }}
              >
                <CheckCircle className="w-7 h-7" style={{ color: 'white' }} strokeWidth={2} />
              </div>
              <h4 
                className="mb-3" 
                style={{ 
                  color: 'black',
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                Accessible
              </h4>
              <p 
                className="leading-relaxed" 
                style={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                All colors meet WCAG AA/AAA standards with carefully tested contrast ratios for maximum readability.
              </p>
            </div>
            <div 
              className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg w-fit" 
              style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--state-success)' }} />
              <span 
                style={{ 
                  color: 'var(--state-success)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                AA/AAA Compliant
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Comprehensive Card */}
        <BentoCard span="2x1" delay={0.25}>
          <div className="h-full flex flex-col justify-between p-6">
            <div>
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, var(--state-info) 0%, #4F46E5 100%)',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
                }}
              >
                <Info className="w-7 h-7" style={{ color: 'white' }} strokeWidth={2} />
              </div>
              <h4 
                className="mb-3" 
                style={{ 
                  color: 'black',
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                Comprehensive
              </h4>
              <p 
                className="leading-relaxed" 
                style={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                Complete foundation including color palette, typography system, spacing grid, and production-ready components.
              </p>
            </div>
            <div 
              className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg w-fit" 
              style={{ 
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--state-info)' }} />
              <span 
                style={{ 
                  color: 'var(--state-info)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                End-to-End System
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Fast Card */}
        <BentoCard span="1x2" delay={0.3}>
          <div className="h-full flex flex-col justify-between relative overflow-hidden p-6">
            <div className="relative z-10">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, var(--action-primary) 0%, #059669 100%)',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)',
                }}
              >
                <Zap className="w-7 h-7" style={{ color: 'white' }} strokeWidth={2} fill="white" />
              </div>
              <h4 
                className="mb-3" 
                style={{ 
                  color: 'black',
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                Fast
              </h4>
              <p 
                className="mb-6 leading-relaxed" 
                style={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                Optimized for 60fps performance with GPU-accelerated animations and efficient rendering.
              </p>
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit" 
                style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--action-primary)' }} />
                <span 
                  style={{ 
                    color: 'var(--action-primary)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  60fps Smooth
                </span>
              </div>
            </div>
            {/* Decorative speed lines */}
            <div className="absolute bottom-6 right-6 opacity-[0.04] pointer-events-none" aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M10 20 L70 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 35 L70 35" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M15 50 L70 50" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M25 65 L70 65" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </BentoCard>

        {/* Stats Cards */}
        {[
          {
            value: '6',
            label: 'Base Colors',
            caption: 'Curated palette',
            delay: 0.35,
            gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#10B981',
          },
          {
            value: '12+',
            label: 'Components',
            caption: 'Production ready',
            delay: 0.4,
            gradient: 'linear-gradient(135deg, #10B981 0%, #6366F1 100%)',
            color: '#6366F1',
          },
          {
            value: '4px',
            label: 'Grid System',
            caption: 'Consistent spacing',
            delay: 0.45,
            gradient: 'linear-gradient(135deg, #6366F1 0%, #10B981 100%)',
            color: '#059669',
          },
        ].map((stat) => (
          <BentoCard key={stat.label} span="1x1" delay={stat.delay}>
            <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden p-6">
              {/* Background gradient decoration */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ background: stat.gradient }}
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-3">
                <div
                  style={{ 
                    color: stat.color,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    lineHeight: '1',
                    letterSpacing: '-0.03em',
                    fontWeight: 400,
                  }}
                >
                  {stat.value}
                </div>
                <div>
                  <div 
                    className="mb-1" 
                    style={{ 
                      color: 'black',
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div 
                    style={{ 
                      color: 'rgba(0, 0, 0, 0.5)',
                      fontSize: '12px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stat.caption}
                  </div>
                </div>
              </div>
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-[0.08]"
                style={{
                  background: `radial-gradient(circle at top right, ${stat.color} 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />
            </div>
          </BentoCard>
        ))}

        {/* Robust Card */}
        <BentoCard span="1x2" delay={0.5}>
          <div className="h-full flex flex-col justify-between p-6">
            <div>
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: 'linear-gradient(135deg, var(--state-warning) 0%, #D97706 100%)',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.25)',
                }}
              >
                <Shield className="w-7 h-7" style={{ color: 'white' }} strokeWidth={2} />
              </div>
              <h4 
                className="mb-3" 
                style={{ 
                  color: 'black',
                  fontSize: '20px',
                  letterSpacing: '-0.01em',
                }}
              >
                Robust
              </h4>
              <p 
                className="mb-6 leading-relaxed" 
                style={{ 
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                Built with enterprise-grade standards, comprehensive documentation, and accessibility best practices.
              </p>
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg w-fit mb-6" 
                style={{ 
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--state-warning)' }} />
                <span 
                  style={{ 
                    color: 'var(--state-warning)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Enterprise Ready
                </span>
              </div>
            </div>
            {/* Feature list */}
            <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
              {['Type Safety', 'Documentation', 'Best Practices'].map((feature) => (
                <div 
                  key={feature} 
                  className="flex items-center gap-3 group"
                  style={{ 
                    color: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '13px',
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-125" 
                    style={{ backgroundColor: 'rgba(245, 158, 11, 0.4)' }} 
                  />
                  <span className="transition-colors duration-300 group-hover:text-black">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </RevealSection>
  ), []);

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(180deg, #0A0F1C 0%, #0D1421 50%, #111827 100%)',
    }}>
      <ScrollProgress />
      <CommandPalette />
      <Header2 />
      <Hero />
      <FloatingNav />
      
      <main className="container-custom max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" id="main-content" style={{ backgroundColor: 'white' }}>
        {/* Overview Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          {overviewSection}
        </div>

        <EditorialDivider variant="ornament" />

        {/* Pull Quote */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-24">
          <PullQuote 
            quote="Excellence in design is not a destination but a continuous journey of refinement, attention to detail, and unwavering commitment to craft."
            author="Design Philosophy"
            role="Korwin Design System"
          />
        </div>

        <EditorialDivider variant="accent" />

        {/* Colors Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <RevealSection id="colors">
            <EditorialHeader
              number="01"
              eyebrow="FOUNDATION"
              title="Color System"
              subtitle="A sophisticated palette featuring vibrant emerald accents, refined indigo depths, and warm amber highlights—all meticulously tested for WCAG AA/AAA accessibility compliance across every combination."
            />
            <div className="space-y-[var(--space-16)] mt-12 sm:mt-16">
              <div>
                <h3 className="mb-[var(--space-8)]">Base Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-[var(--space-6)]">
                  {BASE_COLORS.map((color) => (
                    <ColorSwatch key={color.value} {...color} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-[var(--space-8)]">Semantic Tokens</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-[var(--space-6)]">
                  {SEMANTIC_COLORS.map((color) => (
                    <ColorSwatch key={color.name} {...color} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-[var(--space-8)]">Color Validation</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-[var(--space-6)]">
                  <ColorCombination
                    foreground="#1F2937"
                    background="#FAFBFC"
                    title="Text on Background"
                    description="Primary text on soft white background"
                  />
                  <ColorCombination
                    foreground="#FFFFFF"
                    background="#10B981"
                    title="CTA Contrast"
                    description="White text on vibrant green buttons"
                  />
                  <ColorCombination
                    foreground="#059669"
                    background="#FFFFFF"
                    title="Link Contrast"
                    description="Link color on white background"
                  />
                  <ColorCombination
                    foreground="#1F2937"
                    background="#F8F9FA"
                    title="Secondary Background"
                    description="Text on cloud white"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-[var(--space-8)]">Recommended Pairings</h3>
                <div className="space-y-[var(--space-4)]">
                  <ColorPairing
                    colors={['#FAFBFC', '#F8F9FA', '#10B981', '#1F2937']}
                    title="Primary Theme"
                    description="Clean, modern interface with vibrant green accents"
                  />
                  <ColorPairing
                    colors={['#FFFFFF', '#FEFDFB', '#059669', '#1F2937']}
                    title="Fresh & Minimal"
                    description="Crisp white backgrounds with natural green highlights"
                  />
                  <ColorPairing
                    colors={['#F8F9FA', '#F0F2F4', '#10B981', '#1F2937']}
                    title="Subtle Contrast"
                    description="Soft grays with energizing green for balanced clarity"
                  />
                </div>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Typography Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <RevealSection id="typography">
            <Section
              title="Typography"
              description="Plus Jakarta Sans provides a modern, geometric typeface with excellent legibility across all sizes. The type scale follows a harmonious progression optimized for readability."
            >
              <div className="space-y-6 sm:space-y-[var(--space-8)]">
                <TypeSpecimen className="display-2xl" label="Display 2XL" example="The quick brown fox" specs="72px / 80px · -2%" />
                <TypeSpecimen className="display-xl" label="Display XL" example="jumps over the lazy dog" specs="56px / 64px · -1.5%" />
                <TypeSpecimen className="display-l" label="Display L" example="The five boxing wizards" specs="48px / 56px · -1%" />
                <TypeSpecimen element="h1" label="Heading 1" example="Pack my box with five" specs="36px / 44px · -0.5%" />
                <TypeSpecimen element="h2" label="Heading 2" example="dozen liquor jugs" specs="28px / 36px · 0%" />
                <TypeSpecimen element="h3" label="Heading 3" example="How vexingly quick daft" specs="24px / 32px · 0%" />
                <TypeSpecimen element="h4" label="Heading 4" example="zebras jump" specs="20px / 28px · 0%" />
                <TypeSpecimen element="h5" label="Heading 5" example="Sphinx of black quartz" specs="18px / 24px · 0%" />
                <TypeSpecimen className="body-l" label="Body Large" example="The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs." specs="18px / 28px · 0%" />
                <TypeSpecimen className="body-m" label="Body Medium" example="How vexingly quick daft zebras jump! The five boxing wizards jump quickly at the exam." specs="16px / 24px · 0%" />
                <TypeSpecimen className="body-s" label="Body Small" example="Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz with style." specs="14px / 20px · 0%" />
                <TypeSpecimen className="label-l" label="Label Large" example="QUICK BROWN FOX" specs="14px / 20px · 0% · 600" />
                <TypeSpecimen className="label-m" label="Label Medium" example="JUMPS OVER DOG" specs="12px / 16px · 0% · 600" />
                <TypeSpecimen className="caption" label="Caption" example="Pack my box with five dozen liquor jugs" specs="12px / 16px · 0% · 400" />
              </div>
            </Section>
          </RevealSection>
        </div>

        {/* Spacing Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <RevealSection id="spacing">
            <Section
              title="Spacing System"
              description="A 4px-based spacing scale ensures visual rhythm and consistency across all components. Each step maintains proportional relationships for harmonious layouts."
            >
              <div className="space-y-[var(--space-4)]">
                {SPACING_VALUES.map((space) => (
                  <div key={space.name} className="flex items-center gap-4 sm:gap-[var(--space-6)]">
                    <div className="w-20 sm:w-32 label-m text-[var(--text-secondary)]">{space.name}</div>
                    <div className="w-12 sm:w-16 body-s text-[var(--text-tertiary)] font-mono">{space.value}</div>
                    <div
                      className="h-[var(--space-4)] bg-gradient-to-r from-[var(--action-primary)] to-[var(--action-primary-hover)] rounded-full"
                      style={{ width: space.value }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </Section>
          </RevealSection>
        </div>

        {/* Components Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <RevealSection id="components">
            <Section
              title="Components"
              description="Production-ready components with full state management, accessibility features, and consistent styling. Every component includes hover, active, disabled, and focus states."
            >
              <div className="space-y-12 sm:space-y-[var(--space-16)]">
                {/* Buttons */}
                <div>
                  <h3 className="mb-6 sm:mb-[var(--space-8)]">Buttons</h3>
                  <div className="space-y-6 sm:space-y-[var(--space-8)]">
                    <UIExample
                      title="Button Variants"
                      description="Three button styles for different hierarchy levels"
                      code={CODE_EXAMPLES.button}
                    >
                      <div className="space-y-[var(--space-4)]">
                        <div className="flex flex-wrap gap-3 sm:gap-[var(--space-4)]">
                          {(['small', 'medium', 'large'] as const).map((size) => (
                            <DesignSystemButton key={`primary-${size}`} variant="primary" size={size}>
                              Primary {size.charAt(0).toUpperCase() + size.slice(1)}
                            </DesignSystemButton>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-[var(--space-4)]">
                          {(['small', 'medium', 'large'] as const).map((size) => (
                            <DesignSystemButton key={`secondary-${size}`} variant="secondary" size={size}>
                              Secondary {size.charAt(0).toUpperCase() + size.slice(1)}
                            </DesignSystemButton>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-[var(--space-4)]">
                          {(['small', 'medium', 'large'] as const).map((size) => (
                            <DesignSystemButton key={`ghost-${size}`} variant="ghost" size={size}>
                              Ghost {size.charAt(0).toUpperCase() + size.slice(1)}
                            </DesignSystemButton>
                          ))}
                        </div>
                      </div>
                    </UIExample>

                    <UIExample title="Button States" description="All interactive states included">
                      <div className="flex flex-wrap gap-3 sm:gap-[var(--space-4)]">
                        <DesignSystemButton variant="primary">Default</DesignSystemButton>
                        <DesignSystemButton variant="primary" loading={loading} onClick={() => setLoading(!loading)}>
                          {loading ? 'Loading...' : 'Click to Load'}
                        </DesignSystemButton>
                        <DesignSystemButton variant="primary" disabled>
                          Disabled
                        </DesignSystemButton>
                      </div>
                    </UIExample>
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <h3 className="mb-6 sm:mb-[var(--space-8)]">Form Inputs</h3>
                  <UIExample
                    title="Text Input"
                    description="Accessible form inputs with labels and helper text"
                    code={CODE_EXAMPLES.input}
                  >
                    <div className="max-w-md space-y-[var(--space-6)]">
                      <DesignSystemInput
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        helperText="We'll never share your email with anyone else"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <DesignSystemInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error="Password must be at least 8 characters"
                      />
                      <DesignSystemInput label="Disabled Input" disabled value="This input is disabled" />
                    </div>
                  </UIExample>
                </div>

                {/* Cards */}
                <div>
                  <h3 className="mb-6 sm:mb-[var(--space-8)]">Cards</h3>
                  <UIExample title="Card Components" description="Flexible card layouts for content organization">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[var(--space-6)]">
                      <DesignSystemCard
                        icon={<CheckCircle className="w-6 h-6" />}
                        title="Success"
                        description="Operation completed successfully"
                        variant="success"
                      />
                      <DesignSystemCard
                        icon={<AlertTriangle className="w-6 h-6" />}
                        title="Warning"
                        description="Please review these items"
                        variant="warning"
                      />
                      <DesignSystemCard
                        icon={<AlertCircle className="w-6 h-6" />}
                        title="Error"
                        description="Something went wrong"
                        variant="error"
                      />
                    </div>
                  </UIExample>
                </div>
              </div>
            </Section>
          </RevealSection>
        </div>

        {/* Design Tokens Section */}
        <div className="py-12 sm:py-16 md:py-20 lg:py-32">
          <RevealSection id="tokens">
            <Section
              title="Design Tokens"
              description="Export ready tokens in JSON format for seamless integration with your development workflow. Tokens are structured for easy consumption by any platform."
            >
              <CodeBlock code={CODE_EXAMPLES.tokens} language="json" />
            </Section>
          </RevealSection>
        </div>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}