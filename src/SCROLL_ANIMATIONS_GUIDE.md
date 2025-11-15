# Scroll Animations System - Usage Guide

All scroll animation utilities are consolidated in `/components/ScrollAnimations.tsx` for easy management and optimal performance.

## 📦 **Available Components & Hooks**

### **Components:**
- `ParallaxLayer` - Multi-speed parallax scrolling
- `ScrollFadeIn` - Fade in with translation
- `ScrollScale` - Scale and fade animation
- `ScrollReveal` - Directional reveal (left/right/up/down)
- `ScrollStagger` - Staggered children animations

### **Hooks:**
- `useParallax` - Custom parallax scroll effect
- `useScrollTrigger` - Intersection observer visibility detection

---

## 🎯 **Component Examples**

### **1. ParallaxLayer - Depth Effect**

Create depth with multi-speed layers:

```tsx
import { ParallaxLayer } from './components/ScrollAnimations';

// Background layer (moves slower)
<ParallaxLayer speed={0.5} className="absolute inset-0">
  <div className="bg-gradient...">Background</div>
</ParallaxLayer>

// Mid-ground layer
<ParallaxLayer speed={0.75}>
  <img src="mountain.jpg" alt="Mid-ground" />
</ParallaxLayer>

// Foreground layer (normal speed)
<ParallaxLayer speed={1}>
  <h1>Content</h1>
</ParallaxLayer>
```

**Speed Guide:**
- `0.5` - Background (slow)
- `0.75` - Mid-ground (medium)
- `1.0` - Foreground (normal)

---

### **2. ScrollFadeIn - Fade & Translate**

Fade in elements as they enter viewport:

```tsx
import { ScrollFadeIn } from './components/ScrollAnimations';

// Basic fade in from bottom
<ScrollFadeIn>
  <h2>This fades in</h2>
</ScrollFadeIn>

// Custom animation
<ScrollFadeIn 
  delay={200}          // Delay before animation starts (ms)
  duration={0.8}       // Animation duration (seconds)
  translateY={60}      // Translate distance (px)
  threshold={0.2}      // Trigger when 20% visible
>
  <div>Custom animation</div>
</ScrollFadeIn>

// Fade in from left with scale
<ScrollFadeIn 
  translateX={-40}     // Slide from left
  translateY={0}       // No vertical movement
  scale={0.95}         // Start at 95% scale
  duration={0.7}
>
  <div>Slides in from left</div>
</ScrollFadeIn>
```

---

### **3. ScrollScale - Scale Animation**

Scale up elements on reveal:

```tsx
import { ScrollScale } from './components/ScrollAnimations';

// Scale from 90% to 100%
<ScrollScale scaleFrom={0.9}>
  <img src="product.jpg" alt="Product" />
</ScrollScale>

// Custom scale with delay
<ScrollScale 
  scaleFrom={0.85} 
  duration={0.8}
  delay={100}
>
  <div className="card">Card content</div>
</ScrollScale>
```

---

### **4. ScrollReveal - Directional Reveal**

Reveal content from different directions:

```tsx
import { ScrollReveal } from './components/ScrollAnimations';

// From left
<ScrollReveal direction="left">
  <p>Slides in from left</p>
</ScrollReveal>

// From right
<ScrollReveal direction="right" distance={80}>
  <p>Slides in from right</p>
</ScrollReveal>

// From top
<ScrollReveal direction="up" duration={0.8}>
  <p>Slides in from top</p>
</ScrollReveal>

// From bottom
<ScrollReveal direction="down">
  <p>Slides in from bottom</p>
</ScrollReveal>
```

---

### **5. ScrollStagger - Sequential Animation**

Animate children in sequence:

```tsx
import { ScrollStagger } from './components/ScrollAnimations';

// Stagger with 100ms between each
<ScrollStagger staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ScrollStagger>

// Custom stagger animation
<ScrollStagger 
  staggerDelay={0.15}
  duration={0.6}
  translateY={30}
>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</ScrollStagger>
```

---

## 🔧 **Hook Examples**

### **useParallax Hook**

Create custom parallax effects:

```tsx
import { useParallax } from './components/ScrollAnimations';

function CustomParallax() {
  const { ref, offset } = useParallax({ speed: 0.6 });

  return (
    <div 
      ref={ref}
      style={{ 
        transform: `translateY(${offset}px)`,
        opacity: 1 - Math.abs(offset) / 500 
      }}
    >
      Custom parallax effect
    </div>
  );
}
```

---

### **useScrollTrigger Hook**

Detect viewport visibility:

```tsx
import { useScrollTrigger } from './components/ScrollAnimations';

function CustomAnimation() {
  const { ref, isVisible } = useScrollTrigger({ 
    threshold: 0.3,
    once: true 
  });

  return (
    <div 
      ref={ref}
      className={isVisible ? 'animate-in' : 'opacity-0'}
    >
      Animated content
    </div>
  );
}
```

---

## ⚙️ **Common Parameters**

All components accept these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delay` | `number` | `0` | Delay before animation (ms) |
| `duration` | `number` | `0.6` | Animation duration (seconds) |
| `threshold` | `number` | `0.1` | How much must be visible (0-1) |
| `once` | `boolean` | `true` | Only animate once |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |

---

## 🎨 **Real-World Examples**

### **Hero Section with Parallax**

```tsx
<section className="relative">
  {/* Background layer - slow */}
  <ParallaxLayer speed={0.5} className="absolute inset-0">
    <div className="bg-gradient-to-br from-emerald-500/20" />
  </ParallaxLayer>

  {/* Content - normal speed */}
  <ParallaxLayer speed={1}>
    <ScrollFadeIn delay={200}>
      <h1>Welcome</h1>
    </ScrollFadeIn>
  </ParallaxLayer>
</section>
```

### **Feature Cards Grid**

```tsx
<div className="grid grid-cols-3 gap-6">
  <ScrollScale scaleFrom={0.9} delay={0}>
    <Card>Feature 1</Card>
  </ScrollScale>
  
  <ScrollScale scaleFrom={0.9} delay={100}>
    <Card>Feature 2</Card>
  </ScrollScale>
  
  <ScrollScale scaleFrom={0.9} delay={200}>
    <Card>Feature 3</Card>
  </ScrollScale>
</div>
```

### **Alternating Content**

```tsx
<div className="space-y-20">
  <ScrollReveal direction="left">
    <ContentBlock align="left" />
  </ScrollReveal>
  
  <ScrollReveal direction="right">
    <ContentBlock align="right" />
  </ScrollReveal>
  
  <ScrollReveal direction="left">
    <ContentBlock align="left" />
  </ScrollReveal>
</div>
```

---

## ⚡ **Performance Features**

✅ **GPU Acceleration** - All animations use `translate3d`  
✅ **Reduced Motion Support** - Respects user preferences  
✅ **Mobile Optimized** - Parallax disabled on touch devices  
✅ **Intersection Observer** - Efficient visibility detection  
✅ **RequestAnimationFrame** - Smooth 60fps updates  
✅ **Viewport Detection** - Only calculates when near screen  

---

## 🎯 **Best Practices**

1. **Use sparingly** - Too many animations can overwhelm
2. **Stagger delays** - Space out multiple animations (100-200ms apart)
3. **Keep it subtle** - Small translate distances (30-60px)
4. **Test on mobile** - Ensure good performance on lower-end devices
5. **Respect motion preferences** - Always honor `prefers-reduced-motion`

---

## 📝 **Technical Specifications**

As per requirements:

- ✅ **Ease-Out Curves**: `[0.25, 0.1, 0.25, 1]` cubic bezier
- ✅ **Duration**: 600-800ms (default 600ms, configurable)
- ✅ **Parallax Speeds**: 0.5x (background), 0.75x (mid), 1x (foreground)
- ✅ **Performance**: 60fps with RAF and GPU acceleration
- ✅ **Accessibility**: Full `prefers-reduced-motion` support
