import { memo } from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  product: [
    { label: 'Overview', href: '#overview' },
    { label: 'Colors', href: '#colors' },
    { label: 'Typography', href: '#typography' },
    { label: 'Components', href: '#components' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Design Tokens', href: '#tokens' },
    { label: 'GitHub', href: '#' },
    { label: 'Figma File', href: '#' },
  ],
} as const;

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@korwin.design' },
] as const;

export const Footer = memo(function Footer() {
  return (
    <footer
      className="relative border-t mt-32 overflow-hidden"
      style={{
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex" aria-hidden="true">
        <div className="flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} />
        <div
          className="w-64"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(0, 0, 0, 0.05) 100%)',
          }}
        />
        <div className="flex-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} />
      </div>

      <div className="container-custom max-w-[var(--container-3xl)] py-16 sm:py-20 relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                  style={{
                    backgroundColor: 'black',
                    border: '2px solid black',
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    K1
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      color: 'black',
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Korwin
                  </h3>
                  <div
                    className="caption -mt-1 tracking-wider"
                    style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(0, 0, 0, 0.5)' }}
                  >
                    DESIGN SYSTEM
                  </div>
                </div>
              </div>

              <p className="body-md mb-8 max-w-sm text-pretty" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                A comprehensive, accessible design system built with modern best practices. Empowering teams to create
                exceptional interfaces.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-smooth will-change-transform"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--action-primary)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                    }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links], columnIndex) => (
            <div
              key={category}
              className="lg:col-span-2"
            >
              <h4 className="label-md mb-4 uppercase" style={{ color: 'black' }}>
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 body-sm transition-smooth"
                      style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--action-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                      }}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-2 caption" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            <span>© 2025 Korwin. Created by Austin Carson</span>
          </div>
        </div>
      </div>
    </footer>
  );
});