# 📱 Responsive Design Quick Reference

## Breakpoints

```js
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large screens
```

---

## Typography (Responsive)

### Use Tailwind responsive classes:
```jsx
// Heading hierarchy
<h1 className="text-2xl md:text-3xl lg:text-4xl">Main Heading</h1>
<h2 className="text-xl md:text-2xl lg:text-3xl">Subheading</h2>
<h3 className="text-lg md:text-xl lg:text-2xl">Section Title</h3>

// Body text
<p className="text-sm md:text-base lg:text-lg">Body content</p>
<small className="text-xs md:text-sm">Small text</small>
```

### Auto-scaling with clamp() (built-in):
```jsx
// These automatically scale between breakpoints
<h1 className="text-4xl">Scales from 36px → 48px</h1>
<p className="text-base">Scales from 16px → 18px</p>
```

---

## Spacing (Responsive)

### Standard Tailwind (Recommended):
```jsx
// Padding
<div className="p-4 md:p-6 lg:p-8">Content</div>
<div className="px-4 py-6 md:px-6 md:py-8">Content</div>

// Margin
<div className="mb-4 md:mb-6 lg:mb-8">Content</div>
<div className="mt-6 md:mt-8 lg:mt-12">Content</div>

// Gap (Grid/Flex)
<div className="gap-4 md:gap-6 lg:gap-8">Items</div>
```

### Fluid Spacing (Auto-scaling):
```jsx
// For smoother transitions between breakpoints
<div className="p-fluid-md">     // 16px → 24px
<div className="p-fluid-lg">     // 24px → 32px
<div className="p-fluid-xl">     // 32px → 48px
<div className="gap-fluid-sm">   // 12px → 16px
```

---

## Layout Patterns

### Container with responsive padding:
```jsx
<div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
  <div className="space-y-6 md:space-y-8">
    {/* Content */}
  </div>
</div>
```

### Responsive Grid:
```jsx
// 1 column → 2 columns → 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <Card />
  <Card />
  <Card />
</div>

// 1 column → 2 columns
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card />
  <Card />
</div>
```

### Responsive Flex:
```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Responsive alignment
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <h2>Title</h2>
  <button>Action</button>
</div>
```

---

## Common Patterns

### Card with responsive sizing:
```jsx
<div className="
  bg-card 
  rounded-lg md:rounded-xl 
  p-4 md:p-6 lg:p-8
  shadow-lg
">
  <h3 className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4">
    Card Title
  </h3>
  <p className="text-sm md:text-base text-text-secondary">
    Description
  </p>
</div>
```

### Button with responsive size:
```jsx
<button className="
  px-4 py-2 md:px-6 md:py-3
  text-sm md:text-base
  rounded-lg md:rounded-xl
  bg-purple-main hover:bg-purple-hover
  transition-all
">
  Click Me
</button>
```

### Image with responsive sizing:
```jsx
<img 
  src="..." 
  alt="..."
  className="
    w-full 
    h-48 md:h-64 lg:h-80
    object-cover 
    rounded-lg md:rounded-xl
  "
/>
```

---

## Show/Hide Elements

```jsx
// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="block md:hidden">Mobile only</div>

// Show only on tablet
<div className="hidden md:block lg:hidden">Tablet only</div>
```

---

## Mobile-First Best Practices

### ✅ Do:
```jsx
// Start with mobile, add larger breakpoints
<div className="p-4 md:p-6 lg:p-8">

// Use natural breakpoint progression
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Stack on mobile, row on desktop
<div className="flex-col md:flex-row">
```

### ❌ Don't:
```jsx
// Don't start with desktop sizes
<div className="p-8 md:p-4"> // Wrong direction

// Don't skip logical breakpoints
<div className="text-sm 2xl:text-3xl"> // Too big jump

// Don't use fixed pixel widths
<div className="w-[1200px]"> // Not responsive
```

---

## Sidebar Aware Content

All pages wrapped in `DashboardLayout` automatically handle sidebar spacing:

```jsx
// This is handled automatically by DashboardLayout
// No need to add ml-64 or similar classes

<DashboardLayout>
  <div className="p-4 md:p-6 lg:p-8">
    {/* Your content - properly spaced */}
  </div>
</DashboardLayout>
```

---

## Screen Size Specific Styles

### When to use each breakpoint:

- **No prefix (mobile first)**: 0px - 767px
  - Base styles for mobile phones
  - Vertical layout, stacked elements
  - Touch-friendly tap targets (44px min)

- **md:** 768px+
  - Tablets in portrait
  - 2-column layouts work well
  - Show sidebar

- **lg:** 1024px+
  - Laptops, tablets in landscape
  - 3-column layouts
  - More whitespace

- **xl:** 1280px+
  - Desktops, large laptops
  - 4+ column layouts
  - Maximum comfortable reading width

- **2xl:** 1536px+
  - Large desktop monitors
  - Extra spacing
  - Hero sections can be larger

---

## Testing Checklist

Test your responsive design at these exact widths:

- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13/14)
- [ ] 414px (iPhone Plus)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape, Small Laptop)
- [ ] 1366px (14" Laptop)
- [ ] 1920px (24" Desktop)

---

## Performance Tips

1. Use Tailwind's responsive classes instead of custom media queries
2. Avoid excessive breakpoint variations (stick to 2-3 per property)
3. Use `clamp()` for smooth scaling without many breakpoints
4. Leverage `aspect-ratio` for responsive images/videos
5. Test on actual devices, not just browser resize

---

## Common Mistakes

### Mistake 1: Too many breakpoints
```jsx
// ❌ Overkill
<div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8">

// ✅ Better
<div className="p-4 md:p-6 lg:p-8">
```

### Mistake 2: Forgetting mobile
```jsx
// ❌ Desktop first
<div className="text-3xl md:text-2xl sm:text-xl">

// ✅ Mobile first
<div className="text-xl md:text-2xl lg:text-3xl">
```

### Mistake 3: Fixed widths
```jsx
// ❌ Not responsive
<div className="w-[800px]">

// ✅ Responsive
<div className="max-w-3xl w-full">
```

---

## Resources

- Tailwind Docs: https://tailwindcss.com/docs/responsive-design
- Can I Use (clamp): https://caniuse.com/css-math-functions
- Mobile viewport units: https://caniuse.com/viewport-unit-variants

---

**Quick Tip**: Use browser DevTools device toolbar (F12 → Toggle device toolbar) to test responsive designs quickly!
