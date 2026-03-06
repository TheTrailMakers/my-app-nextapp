# Trek Page UI Layout Guide

## Desktop Layout (1024px and above)

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEADER NAVIGATION                             │
│                  Back to Treks (link)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│           1. HERO BANNER (Full Width)                            │
│              Trek Name & Description                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│     2. TREK DATA WITH ICONS (8 data points)                     │
│  [Difficulty] [Duration] [Location] [Best Months]               │
│  [Best For] [Accommodation] [Pickup] [Dropoff]                  │
└─────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────┬─────────────────────────┐
│                                       │                         │
│   MAIN CONTENT (2/3 width)           │  BOOKING SIDEBAR (1/3)  │
│                                       │  (Sticky)               │
│  3. Brief Description                │                         │
│     About This Trek                  │  Select Dates           │
│                                       │  ├─ Departure Card 1    │
│  4. Safety Standards                 │  ├─ Departure Card 2    │
│     (Yellow highlight)               │  ├─ Departure Card 3    │
│                                       │  └─ ...                 │
│  5. Image Carousel                   │                         │
│     Trek Story                       │  [Request Price]        │
│     (with nav arrows & dots)         │                         │
│                                       │                         │
│  6. Detailed Itinerary               │                         │
│     [Day 1] ▼                        │                         │
│     [Day 2] ▼                        │                         │
│     [Day 3] ▼                        │                         │
│     etc.                             │                         │
│                                       │                         │
│  7. What to Pack                     │                         │
│     Essential Gear | Personal Items  │                         │
│                                       │                         │
│  8. How to Prepare                   │                         │
│     [1] Physical Training            │                         │
│     [2] Acclimatization              │                         │
│     [3] Gear Test                    │                         │
│     [4] Mental Preparation           │                         │
│                                       │                         │
│  9. Trek in Different Seasons        │                         │
│     [Spring] [Summer]                │                         │
│     [Autumn] [Winter]                │                         │
│                                       │                         │
│  10. FAQ                             │                         │
│      What is fitness level? ▼       │                         │
│      Is altitude sickness? ▼        │                         │
│      Can beginners join? ▼          │                         │
│                                       │                         │
│  Inclusions / Exclusions             │                         │
│  ✓ Included Items                   │                         │
│  ✕ Not Included Items               │                         │
│                                       │                         │
└───────────────────────────────────────┴─────────────────────────┘
```

## Mobile Layout (under 1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEADER NAVIGATION                             │
│                  Back to Treks (link)                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│           1. HERO BANNER (Full Width)                            │
│              Trek Name & Description                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│     2. TREK DATA WITH ICONS (Stacked, 2 columns)                │
│  [Difficulty] [Duration]                                        │
│  [Location] [Best Months]                                       │
│  [Best For] [Accommodation]                                     │
│  [Pickup] [Dropoff]                                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  3. Brief Description                                            │
│     About This Trek                                              │
│                                                                   │
│  4. Safety Standards                                             │
│     (Yellow highlight)                                           │
│                                                                   │
│  5. Image Carousel                                               │
│     Trek Story                                                   │
│                                                                   │
│  6. Detailed Itinerary                                           │
│     [Day 1] ▼                                                    │
│     [Day 2] ▼                                                    │
│     [Day 3] ▼                                                    │
│                                                                   │
│  7. What to Pack                                                 │
│     Essential Gear (full width)                                 │
│     Personal Items (full width)                                 │
│                                                                   │
│  8. How to Prepare                                               │
│     [1] Physical Training                                        │
│     [2] Acclimatization                                          │
│     [3] Gear Test                                                │
│     [4] Mental Preparation                                       │
│                                                                   │
│  9. Trek in Different Seasons                                    │
│     [Spring] [Summer]                                            │
│     [Autumn] [Winter]                                            │
│                                                                   │
│  10. FAQ                                                         │
│      What is fitness level? ▼                                   │
│      Is altitude sickness? ▼                                    │
│      Can beginners join? ▼                                      │
│                                                                   │
│  Inclusions / Exclusions                                         │
│  ✓ Included Items                                               │
│  ✕ Not Included Items                                           │
│                                                                   │
│                                                                   │
│  (Extra space for bottom booking bar)                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│   11. STICKY BOOKING SECTION (Fixed Bottom)                      │
│                                                                   │
│  [Check Dates ↓]        [Book Now →]                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

WHEN "Check Dates" IS CLICKED:
┌─────────────────────────────────────────────────────────────────┐
│  Available Dates                                          X      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Departure Card 1                                               │
│  [Select]  Feb 15 - Feb 19  ₹12,500  [████░] 4 seats           │
│                                                                   │
│  Departure Card 2                                               │
│  [Select]  Feb 22 - Feb 26  ₹12,500  [██████] SOLD OUT         │
│                                                                   │
│  Departure Card 3                                               │
│  [Select]  Mar 1 - Mar 5    ₹12,500  [██░░░░] 6 seats          │
│                                                                   │
│  ... (scrollable)                                               │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [Close]                                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Color Specifications

### Primary Colors
- **Dark Background**: `#000000` (black)
- **Primary Blue**: `#60a5fa` (blue-400)
- **Secondary Blue**: `#3b82f6` (blue-500)

### Supporting Colors
- **Safety Yellow**: `#ca8a04` (yellow-600 text), `bg-yellow-950/30` (background)
- **Success Green**: `#22c55e` (green-400)
- **Danger Red**: `#ef4444` (red-400)

### Neutral Grays
- **Text Primary**: `#f3f4f6` (gray-100)
- **Text Secondary**: `#d1d5db` (gray-300)
- **Text Tertiary**: `#9ca3af` (gray-400)
- **Borders**: `#1f2937` (gray-800)
- **Card Backgrounds**: `#111827` (gray-900)

## Component Spacing

### Vertical Spacing
- **Section gaps**: `py-12` (3rem)
- **Section margins**: `mb-12` (3rem)
- **Subsection gaps**: `mb-6` (1.5rem)
- **Item gaps**: `mb-4` (1rem)

### Horizontal Spacing
- **Container padding**: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop)
- **Card padding**: `p-4` to `p-6`
- **Gap between items**: `gap-3` to `gap-8`

### Responsive Container
- **Max width**: `max-w-7xl` (80rem / 1280px)
- **Margin**: `mx-auto` (centered)

## Typography

### Headings
- **H1 (Hero)**: `text-5xl md:text-6xl font-bold`
- **H2 (Section)**: `text-3xl font-bold`
- **H3 (Subsection)**: `text-2xl font-bold`
- **H4 (Card)**: `text-xl font-bold`

### Body Text
- **Primary**: `text-gray-300` (secondary text)
- **Secondary**: `text-gray-400` (tertiary text)
- **Small**: `text-sm` with `text-gray-400`
- **Leading**: `leading-relaxed` (body), `leading-tight` (headings)

## Interactive Elements

### Buttons
- **Desktop Booking**: Full width, `bg-blue-500 hover:bg-blue-600`
- **Mobile Buttons**: `px-4 py-3 rounded-lg font-semibold`
- **Secondary**: `bg-gray-800 hover:bg-gray-700`

### Cards
- **Default Border**: `border border-gray-800`
- **Hover Border**: `border-blue-400/30` (with transition)
- **Border Radius**: `rounded-lg`
- **Background**: `bg-gray-900` (most cards)

### Transitions
- **Default**: `transition` (all properties, smooth)
- **Duration**: 200-300ms
- **Effects**: Color changes, border changes, transform

## Accessibility Features

✓ Semantic HTML (header, section, main, button, details)
✓ Keyboard navigation (details/summary elements)
✓ Color contrast (WCAG AA compliant)
✓ Icon + text combinations
✓ Clear focus states on interactive elements
✓ Mobile-touch friendly (min 44px targets)
✓ Proper heading hierarchy
✓ Alt text on images

## Mobile-First Responsive Strategy

1. **Mobile (320px - 767px)**
   - Single column layout
   - Touch-friendly buttons
   - Full-width cards
   - Sticky bottom bar for actions

2. **Tablet (768px - 1023px)**
   - 2-column grids for data
   - Grid layouts for season cards
   - Bottom sticky booking bar

3. **Desktop (1024px+)**
   - 2-column main + 1-column sidebar
   - Sticky sidebar on right
   - Multiple column grids
   - Flex layouts optimized

## Browser Testing Checklist

- [x] Chrome/Chromium
- [x] Firefox
- [x] Safari
- [x] Edge
- [x] Mobile Safari (iOS)
- [x] Chrome Mobile (Android)
- [x] View with reduced motion enabled
- [x] Viewport widths: 320px, 768px, 1024px, 1440px

## Performance Notes

- Image carousel uses lazy loading
- Itinerary items open/close on demand (no hidden content loaded)
- Departure cards max height: 384px (overflow scroll)
- Mobile overlay has `fixed` positioning for better performance
- No animation on first page load (preserves reduce-motion preference)

## Future Enhancement Opportunities

1. Add dynamic data from database (accommodations, pickup times, etc.)
2. Implement estimated difficulty calculations
3. Add user ratings/reviews below FAQ
4. Add related treks section at bottom
5. Implement image optimization with Next.js Image component
6. Add booking calendar month view
7. Add weather tooltip on seasonal cards
8. Add share buttons for social media
9. Implement analytics on section views
10. Add accessibility statement link
