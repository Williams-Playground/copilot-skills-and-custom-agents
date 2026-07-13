---
name: gallery-development
description: "Component and data synchronization for Next.js gallery project. Use when: updating gallery components, creating photo features, modifying mock data, integrating new images, adding filters or search. Enforces: component-data consistency, visual verification before commit, accessibility standards, dark mode support."
applyTo: "**/*.tsx"
---

# Photo Gallery & Portfolio: Component & Data Guidelines

## Core Principles

**1. Component Updates Must Include Data Synchronization**

Any component that consumes mock data (`mockPhotos`, `mockAdminData`, `AVAILABLE_TAGS`) requires coordinated updates:

```tsx
// ❌ WRONG: Component updated without checking mock data
export function GalleryGrid({ photos = [] }) {
  return photos.map(photo => (
    <img src={photo.url} />  // photo.url might not exist in mock data
  ));
}

// ✅ RIGHT: Component matches mock data structure
// 1. Check mock-photo-data.ts for Photo interface
// 2. Verify all properties used in component exist
// 3. If adding new properties, update mock data first
export function GalleryGrid({ photos = mockPhotos }) {
  return photos.map(photo => (
    <img src={photo.url} alt={photo.title} />  // Both url and title exist in mock
  ));
}
```

**When updating a component:**
- ✅ Read the relevant `mock-*.ts` file first
- ✅ Ensure component props match mock data structure
- ✅ Add new fields to mock data before using in component
- ✅ Update mock data with realistic values that match component's visual expectations

**2. Browser Verification Is Mandatory Before Commit**

Build success (`npm run build` passes) ≠ visual correctness. Always verify rendered output:

```bash
# Development workflow:
1. npm run dev                    # Start dev server
2. Open http://localhost:3000    # Test in browser
3. Interact with changes          # Hover, filter, search, scroll
4. Check dark mode (toggle)       # Dark mode CSS classes
5. Verify responsive sizes        # Desktop/tablet/mobile
6. Check accessibility attrs      # alt text, labels, ARIA
```

**What to verify in browser:**
- Images load and display correctly (not just exist as files)
- Hover states and animations work smoothly
- Filters, search, and pagination function end-to-end
- Dark mode styling applies to all elements
- Responsive breakpoints display correctly
- Text is readable with proper contrast
- Interactive elements have visible focus states

**3. Visual Design Quality = Functional Requirement**

Gallery components must maintain consistent design system and visual polish:

```tsx
// ❌ WRONG: Placeholder gradients instead of real images
<div className="bg-gradient-to-br from-blue-400 to-blue-600" />

// ✅ RIGHT: Actual images with proper object-fit and fallback styling
<img 
  src={photo.url} 
  alt={photo.title}
  className="w-full h-full object-cover bg-slate-200 dark:bg-slate-700"
/>
```

**Design standards enforced:**
- Use Tailwind classes from existing color/spacing system (no inline styles)
- Dark mode support via `dark:` prefix classes (always test toggle)
- Consistent shadows and borders with `card-base`, `card-elevated` classes
- Framer Motion animations for smooth transitions (respect `prefers-reduced-motion`)
- Responsive grid layouts with proper gap spacing
- Accessibility: alt text on all images, semantic HTML, keyboard navigation

## Component Patterns

### Gallery Image Component

**Must include:**
- `src` from mock data `photo.url`
- `alt` text from mock data `photo.title` or `photo.photographer`
- `object-cover` for consistent aspect ratio
- Background color fallback for loading state
- Direct `<img>` tag (not background image div)

```tsx
<img
  src={photo.url}
  alt={photo.title}
  className="w-full h-full object-cover bg-slate-200 dark:bg-slate-700"
/>
```

### Photo Metadata Display

**Must display:**
- `photo.title` (primary heading)
- `photo.tags` (filtered list, max 3 + "+X more")
- `photo.photographer` (if available, prefixed with "by")
- `photo.likes`, `photo.views`, `photo.downloads` (stats with icons)
- `photo.dateTaken` (optional, human-readable format)

**Example:**
```tsx
<h3 className="font-semibold text-slate-900 dark:text-white mb-2 truncate">
  {photo.title}
</h3>

{photo.photographer && (
  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
    by {photo.photographer}
  </div>
)}

<div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
  <div className="flex items-center gap-4">
    <span className="flex items-center gap-1">
      <Heart className="h-4 w-4" />
      {photo.likes}
    </span>
    <span className="flex items-center gap-1">
      <Eye className="h-4 w-4" />
      {photo.views}
    </span>
  </div>
</div>
```

### Filtering & Search

**Filter components must:**
- Reference `AVAILABLE_TAGS` from `mock-tag-data.ts`
- Support multi-select with visual indicators (badges, checkmarks)
- Filter `mockPhotos` using `.filter()` with exact tag matching (lowercase)
- Reset page to 1 when filters change
- Show "No results" message with helpful text

```tsx
// Mock data must have matching tags in lowercase
const mockPhotos = [
  { title: "...", tags: ["landscape", "nature", "outdoor"], ... },
  { title: "...", tags: ["portrait", "people"], ... },
];

// Component filters by checking tag inclusion
const filteredPhotos = mockPhotos.filter(photo => {
  const matchesTags = selectedTags.length === 0 || 
    selectedTags.some(tag => photo.tags.includes(tag.toLowerCase()));
  return matchesTags;
});
```

## Mock Data Requirements

### Photo Interface

**Required fields:**
```typescript
export interface Photo {
  id: string;                    // Unique identifier: "photo-1", "photo-2", etc.
  url: string;                   // Path to image: "/photo-1.png", NOT "/placeholder-*.jpg"
  title: string;                 // Human-readable: "Sunset Landscape", NOT generic
  tags: string[];                // lowercase array: ["landscape", "nature"]
  likes: number;                 // Realistic stat: 124-450
  downloads: number;             // Realistic stat: 12-89
  views: number;                 // Realistic stat: 500-2000
  photographer?: string;         // Optional: "Sarah Chen", "Marcus Johnson"
  dateTaken?: string;             // Optional ISO date: "2024-06-15"
}
```

**When adding photos:**
1. Ensure `url` points to actual image file in `/public` directory
2. If an image file is missing, the component must render a visible fallback using `onError` or a Next.js placeholder. Do not silently render a broken image tag. Example: `<img src={photo.url} alt={photo.title} onError={(e) => { e.currentTarget.src = "/placeholder.png"; }} />`
3. Use descriptive, theme-appropriate titles (not "Photo 1")
4. Assign 3-5 relevant tags (lowercase, common across similar photos)
5. Provide photographer name if available
6. Ensure the CSS container has `aspect-ratio: 4/3` applied (e.g., `className="aspect-[4/3]"`). Image files may be any dimension; `object-cover` will crop them to fit.

### Mock Data Co-location Principle

When components reference specific data structures, keep mock data and component in sync:

```
✅ SYNC: Component and Data Together
- Update mockPhotos → Update GalleryGrid to use all fields
- Add new Photo property → Update sample data before component
- Change tag structure → Update AVAILABLE_TAGS and tag filter logic together

❌ DRIFT: Component Uses Fields That Don't Exist in Mock
- Component: {photo.photographer}
- Mock data: photographer field missing or empty string
- Result: UI looks broken or shows blank spaces
```

## Development Workflow Checklist

Before committing component or data changes:

- [ ] **Data Sync**: All component property accesses exist in mock data with realistic values
- [ ] **Visual Verification**: Tested in browser at `http://localhost:3000`
  - [ ] Images display with correct dimensions and content
  - [ ] Hover states and animations work smoothly
  - [ ] Filters/search function end-to-end
  - [ ] Dark mode toggle shows proper styling
  - [ ] Responsive layout on mobile/tablet/desktop
- [ ] **Accessibility**: 
  - [ ] All images have descriptive `alt` text
  - [ ] Form controls have associated labels
  - [ ] Color contrast is sufficient (WCAG AA standard)
  - [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] **Code Quality**:
  - [ ] TypeScript strict mode passes (no `any`)
  - [ ] ESLint clean (no unused variables)
  - [ ] Imports reference correct paths (`@/components`, `@/lib`)
  - [ ] Tailwind classes are semantic (use system tokens, not arbitrary colors)
- [ ] **Dark Mode**: Toggle dark mode in DevTools → verify all elements have `dark:` class pairs

## Common Issues & Solutions

**Problem**: "Components won't display data from mock files"
- **Solution**: Check import path matches export: `import { mockPhotos } from '@/lib/mock-photo-data'`
- **Verify**: `mock-photo-data.ts` exports named export `mockPhotos`, not default

**Problem**: "Images show only colors/gradients, no visual detail"
- **Solution**: Ensure image files exist at path specified in mock data's `url` field
- **Verify**: `file /public/photo-1.png` returns "PNG image data" (not "cannot open")
- **Verify**: Image has substantial visual content (gradients + shapes, not just background)

**Problem**: "Filters don't work or show wrong results"
- **Solution**: Ensure mock data tags are lowercase and match filter comparison logic
- **Bad**: `tags: ["Landscape", "NATURE"]` vs filter checking `tag.toLowerCase()`
- **Good**: `tags: ["landscape", "nature"]` with exact string match

**Problem**: "Dark mode styling missing on new elements"
- **Solution**: Pair Tailwind light mode classes with `dark:` equivalents
- **Bad**: `className="text-slate-900"` (only light mode)
- **Good**: `className="text-slate-900 dark:text-white"`

**Problem**: "Build passes but images don't render in browser"
- **Solution**: Images may be cached. Hard refresh (`Cmd+Shift+R`) or clear `.next` folder
- **Verify**: Dev server is running and accessible at `http://localhost:3000`
- **Verify**: No console errors (`F12` → Console tab)

## Example: Adding a New Photo Feature

**Scenario**: Add a "featured badge" to highlight certain photos

**Step 1: Update mock data**
```typescript
// src/lib/mock-photo-data.ts
export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
  featured?: boolean;  // ← NEW FIELD
}

export const mockPhotos: Photo[] = [
  {
    id: "photo-1",
    url: "/photo-1.png",
    title: "Sunset Landscape",
    tags: ["landscape", "nature"],
    likes: 234,
    downloads: 45,
    views: 1200,
    photographer: "Sarah Chen",
    dateTaken: "2024-06-15",
    featured: true,  // ← SET VALUE
  },
  // ... rest of photos
];
```

**Step 2: Update component to use field**
```tsx
// src/components/gallery/GalleryGrid.tsx
{photo.featured && (
  <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-xs font-semibold rounded-full">
    Featured
  </div>
)}
```

**Step 3: Browser verification**
- Start dev server: `npm run dev`
- Navigate to gallery: `http://localhost:3000/gallery`
- Verify featured badge appears on photo-1 (yellow, readable)
- Toggle dark mode → badge colors adjust
- Test responsive: shrink viewport → badge stays visible

**Step 4: Commit**
- Both files updated: ✅ mock data + component
- Browser verified: ✅ badge displays correctly
- Dark mode tested: ✅ colors appropriate
- Responsive tested: ✅ fits in all breakpoints

## Performance & Optimization

- Use `mockPhotos.slice()` for pagination (don't fetch/generate)
- Memoize filtered results with `useMemo()` if filtering complex logic
- Lazy-load images with `loading="lazy"` attribute (when applicable)
- Use responsive image dimensions in Tailwind (no hardcoded pixel values for layout)
- Test performance in browser DevTools Lighthouse → aim for 90+ scores

## Related Standards

- **Accessibility**: WCAG 2.1 Level AA (keyboard nav, color contrast, alt text)
- **Responsive Design**: Mobile-first Tailwind breakpoints (sm, md, lg, xl)
- **Dark Mode**: Manual toggle in UI or DevTools; verify all relevant classes include `dark:` variants
- **Animation**: Framer Motion for smooth transitions, respect `prefers-reduced-motion`
- **Typing**: TypeScript strict mode required, no implicit `any`
