# a11y00p Icons

**Developer-friendly icons with accessibility and change-safe features built-in.**

## Installation

```bash
npm install @razorloaf/a11y00p-icons
# or
yarn add @razorloaf/a11y00p-icons
# or
pnpm add @razorloaf/a11y00p-icons
```

## Adding Your Own Icons

1. Place SVG files in the `src/svg` directory
2. Run the build process: `npm run build:icons`
3. Import and use in your project

## The Icon Problem

Working with icons in modern web applications has had issues:

**Traditional approaches force you to choose between:**

- **Icon fonts**: Simple to use but poor for accessibility, performance, and customization
- **Manual SVG imports**: Better control but tedious implementation and inconsistent accessibility
- **Copy-paste components**: Results in code duplication, inconsistency, and tech debt
- **Complex abstraction layers**: Adds unnecessary dependencies and complexity

None of these approaches consider the complete lifecycle of icons in a design system. Things change. Regularly.

This icon library is built with an approach that is both simpler for developers and more comprehensive in addressing real-world needs. You may be used to this kind of setup below:

```jsx
// Import only what you need
import { Home, Settings } from '@razorloaf/a11y00p-icons';

// Use with zero configuration
function App() {
  return (
    <nav>
      <Home />
      <Settings />
    </nav>
  );
}
```

## Transformative Build Process

Our build pipeline transforms raw SVG files into fully-featured React components with zero developer overhead:

**Simply add...**

```svg
<!-- Your original raw SVG file -->
<svg viewBox="0 0 24 24">
  <path d="M3 9.5L12 4L21 9.5" stroke="black" />
  <path d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" stroke="black" />
</svg>
```

**...and transform!**

```jsx
// Automatically generated React component with accessibility, OS integration, and more
import { Home } from '@razorloaf/a11y00p-icons';

function MyComponent() {
  return <Home />;
}
```

### What Happens Behind the Scenes

When you add an SVG to the library, our build process:

1. **Optimizes the SVG**: Removes unnecessary attributes, normalizes structure, and prepares for React
2. **Generates a TypeScript component**: Creates a properly typed React component with intelligent props
3. **Implements accessibility features**: Adds proper ARIA attributes, screen reader support, and more
4. **Adds OS adaptability**: Builds in support for high contrast mode, reduced motion, and other OS settings
5. **Creates a semantic API**: Transforms filenames into intuitive component names with type safety

This completely eliminates the gap between design assets and implementation, providing a zero-friction workflow.

## Invisible Accessibility Infrastructure

Unlike traditional icon libraries that make accessibility an afterthought or extra work, a11y00p icons include a comprehensive accessibility infrastructure that works invisibly:

### Context-Aware Accessibility

Our icons automatically detect their context and adapt:

```jsx
// Icon inside a button - no manual ARIA needed!
<button>
  <Home /> Home
</button>

// Standalone icon - automatically gets proper ARIA attributes
<Home />
```

When an icon appears inside an interactive element, it knows to become decorative automatically preventing duplicate screen reader announcements. When used standalone, it gets proper semantic roles and accessible names.

### OS Integration Without Overhead

Traditional icons ignore OS accessibility settings, creating a disconnect between user preferences and actual experience. a11y00p icons automatically respect:

- **High Contrast Mode**: Icons adapt their appearance when Windows High Contrast Mode is active, enhancing visibility for low-vision users
- **Reduced Motion Preferences**: Any animations respect the user's motion preferences
- **Color Scheme Adaptation**: Icons work seamlessly with light/dark mode transitions
- **Forced Colors Mode**: Display correctly when browser color-forcing modes are active

All of this happens invisibly with zero configuration required. This isn't just convenient—it creates truly inclusive experiences that conform to WCAG standards. Was it worth the slight additional file size? Absolutely!

### Developer Flexibility with Defaults

While accessibility is automatic, developers retain full control:

```jsx
// Override the automatic accessible name
<Home title="Return to dashboard" />

// Mark as explicitly decorative
<Home decorative />

// Override high contrast adaptation
<Home highContrastStrokeWidth={2.5} />

// Disable OS adaptations in specific cases
<Home disableOSAdaptation />
```

## IconFamily: Design System Acceleration

Traditional icon libraries treat icons as isolated entities, ignoring their role in design systems. a11y00p's IconFamily feature enables true design system thinking:

**The Pattern Problem:**

Design systems group icons by context and visual properties, but traditional libraries require manual coordination:

```jsx
// Traditional approach - manual coordination across multiple components (not always the case but you'd be suprised!)
<Home size={20} color="var(--nav-color)" className="nav-icon" />
<Settings size={20} color="var(--nav-color)" className="nav-icon" />
<User size={20} color="var(--nav-color)" className="nav-icon" />

// When design system changes, every instance requires updates
```

**The Family Solution:**

IconFamily creates coordinated icon groups that eliminate redundancy:

```jsx
<IconFamily size={20} color="var(--nav-color)" variant="navigation">
  <Home />
  <Settings />
  <User />
</IconFamily>
```

### Why This Matters

Design systems evolve constantly. IconFamily provides:

1. **Single Source of Truth**: Update icon styles in one place when design systems change
2. **Visual Consistency**: Guarantee icon consistency across your application
3. **Semantic Grouping**: Create meaningful relationships between related icons
4. **Variant Support**: Support different icon variants (outline, solid, etc.) without code duplication
5. **Nested Inheritance**: Create complex inheritance patterns that mirror UI composition

For teams managing dozens or hundreds of icons, this reduces maintenance effort by orders of magnitude. When design requirements change, updates happen in one place, not hundreds.

## Usage Examples

### Basic Usage

```jsx
import { Home, Settings, User } from '@razorloaf/a11y00p-icons';

function App() {
  return (
    <nav>
      <Home />
      <Settings color="blue" size={24} />
      <User title="User profile" />
    </nav>
  );
}
```

### Icon Families

```jsx
import { IconFamily, Home, Settings, User } from '@razorloaf/a11y00p-icons';

function Navigation() {
  // Create a navigation icon family with consistent styling
  return (
    <IconFamily 
      size={20} 
      color="var(--primary)" 
      variant="navigation"
    >
      <Home />
      <Settings />
      <User />
    </IconFamily>
  );
}
```

### Advanced Usage

```jsx
function DashboardUI() {
  return (
    <IconFamily variant="dashboard" size={24}>
      {/* Primary navigation - inherits dashboard family styles */}
      <IconFamily variant="navigation" color="var(--nav-color)">
        <Home />
        <Settings />
        <User />
      </IconFamily>
      
      {/* Content area - different styling, same family consistency */}
      <IconFamily variant="content" color="var(--content-color)" size={32}>
        <Chart />
        <Data />
        {/* Individual override while maintaining family membership */}
        <Alert color="var(--warning-color)" />
      </IconFamily>
    </IconFamily>
  );
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 86+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Author

- Josh Hoy ([j-o.sh](https://j-o.sh))

### License

Licensed under the MIT License, Copyright (c) 2025 Josh Hoy

See [LICENSE](./LICENSE) for more information.