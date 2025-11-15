import { memo } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  stagger?: boolean;
}

// DISABLED: Scroll animations causing glitches
// Render immediately without animation

export const RevealSection = memo(function RevealSection({
  children,
  id,
  delay = 0,
  stagger = false,
}: RevealSectionProps) {
  return (
    <section
      id={id}
      className="mb-12 sm:mb-20 md:mb-24 lg:mb-32"
      style={{
        // Force GPU acceleration for smooth scrolling
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        // Use content-visibility for off-screen performance
        contentVisibility: 'auto',
      }}
    >
      {children}
    </section>
  );
});