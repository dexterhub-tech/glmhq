# Design Document: Telegram Floating Button

## Overview

This feature implements a persistent, animated floating action button (FAB) that provides quick access to the GLM Telegram channel. The button will be implemented as a reusable React component integrated into the root layout, ensuring it appears on all pages. The design emphasizes visibility, accessibility, and smooth animations while maintaining the existing design language of the GLM HQ website.

## Architecture

### Component Structure

```
app/
├── layout.tsx (modified - integrates TelegramButton)
└── components/
    └── TelegramButton.tsx (new - floating button component)
```

### Integration Approach

The TelegramButton component will be added to the root layout (`app/layout.tsx`) at the same level as other global components (NavBar, Footer, PWAInstallPrompt). This ensures the button appears on all pages without requiring individual page modifications.

## Components and Interfaces

### TelegramButton Component

**File:** `app/components/TelegramButton.tsx`

**Purpose:** Renders a fixed-position floating button with Telegram icon, animation, and "messages" callout.

**Props:** None (uses hardcoded URL for simplicity)

**Key Features:**
- Fixed positioning (bottom-right corner)
- Telegram SVG icon
- "Messages" text callout/badge
- CSS animations (pulse, hover effects)
- Responsive design for mobile and desktop
- Opens link in new tab with security attributes

### Component Interface

```typescript
// TelegramButton.tsx
const TelegramButton: React.FC = () => {
  // Component implementation
}

export default TelegramButton;
```

## Data Models

No complex data models are required for this feature. The component uses:

- **Telegram URL:** Static string constant `"https://t.me/glmchannel"`
- **Component State:** No internal state required (purely presentational)


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After analyzing the acceptance criteria, most requirements for this feature are specific examples or visual design concerns rather than universal properties. The feature is primarily about rendering a specific UI component with specific attributes, which is best validated through example-based tests rather than property-based tests.

**No universal properties identified for property-based testing.**

The acceptance criteria are best validated through:
- Unit tests verifying component rendering
- Integration tests checking component presence across pages
- Visual regression tests for styling consistency
- Accessibility tests for touch target sizes

## Visual Design

### Positioning
- **Desktop:** Fixed position at `bottom: 24px`, `right: 24px`
- **Mobile:** Fixed position at `bottom: 80px`, `right: 16px` (adjusted to avoid PWA prompt)
- **Z-index:** `40` (below navbar at z-50, above page content)

### Button Styling
- **Shape:** Circular button with rounded corners
- **Size:** 
  - Desktop: 64px × 64px
  - Mobile: 56px × 56px (minimum 44px for accessibility)
- **Background:** Telegram brand color `#0088cc` or `#229ED9`
- **Icon:** White Telegram plane icon (SVG)
- **Shadow:** Elevated shadow for depth (`shadow-lg`)

### Callout Badge
- **Position:** Positioned above or to the left of the button
- **Text:** "Messages" in uppercase or title case
- **Background:** White or light background with slight transparency
- **Text Color:** Dark text for contrast
- **Border:** Optional subtle border or shadow
- **Typography:** Inter font, small size (12-14px)

### Animations
1. **Pulse Animation:** Subtle scale pulse (1.0 → 1.05 → 1.0) every 2-3 seconds
2. **Hover Effect:** Scale up slightly (1.05) and increase shadow
3. **Tap/Click Effect:** Brief scale down (0.95) for tactile feedback
4. **Entrance Animation:** Fade in and slide up when page loads

### Responsive Behavior
- Callout text may be hidden on very small screens (<360px width)
- Button size adjusts for mobile (56px) vs desktop (64px)
- Position adjusts to avoid overlapping with PWA install prompt

## Error Handling

### Edge Cases
1. **Missing Telegram URL:** Component should still render but log warning (defensive programming)
2. **Slow Network:** Button should render immediately (no external dependencies)
3. **JavaScript Disabled:** Link should still be functional as standard anchor tag
4. **Small Screens:** Button should not obstruct critical content (adjusted positioning)

### Accessibility Considerations
- `aria-label` attribute for screen readers: "Open GLM Telegram channel"
- Sufficient color contrast for callout text
- Minimum touch target size (44×44px) for mobile
- Keyboard accessible (focusable link)
- `rel="noopener noreferrer"` for security when opening new tab

## Testing Strategy

### Unit Tests
Since this feature consists primarily of UI rendering with specific attributes, unit tests will be the primary testing approach:

1. **Component Rendering Tests**
   - Verify TelegramButton component renders without errors
   - Check that Telegram icon SVG is present
   - Verify "messages" callout text is displayed
   - Confirm link has correct href attribute (`https://t.me/glmchannel`)
   - Verify link opens in new tab (`target="_blank"`)
   - Check security attributes (`rel="noopener noreferrer"`)

2. **Styling Tests**
   - Verify button has fixed positioning classes
   - Check minimum size requirements (44×44px for mobile)
   - Confirm animation classes are applied
   - Verify z-index is appropriate

3. **Integration Tests**
   - Verify component is imported in root layout
   - Check component renders on multiple page routes
   - Confirm button doesn't overlap with navbar or footer

4. **Accessibility Tests**
   - Verify aria-label is present and descriptive
   - Check keyboard focusability
   - Verify touch target size meets accessibility guidelines

### Manual Testing
- Visual verification of animations across browsers
- Test on actual mobile devices for touch responsiveness
- Verify positioning doesn't obstruct content on various screen sizes
- Check appearance on different page backgrounds

### Testing Tools
- **React Testing Library:** For component rendering and interaction tests
- **Jest:** Test runner and assertion library
- **@testing-library/user-event:** For simulating user interactions
- **@testing-library/jest-dom:** For enhanced DOM assertions

## Implementation Notes

### Technology Stack
- **React 18+** with TypeScript
- **Next.js 14+** App Router
- **Tailwind CSS** for styling
- **Lucide React** or inline SVG for Telegram icon

### Performance Considerations
- Use CSS animations (not JavaScript) for optimal performance
- Inline SVG icon to avoid additional HTTP requests
- No external dependencies beyond existing project libraries
- Component is lightweight (<100 lines of code)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- CSS animations with fallbacks for older browsers
- Fixed positioning supported in all target browsers

### Future Enhancements
- Configurable URL via environment variable
- Dismissible callout badge (hide after first interaction)
- Analytics tracking for button clicks
- Multiple social media buttons (expandable FAB)
- Customizable position (left/right, top/bottom)
