# Accessibility Testing Guide for Sticky Audio Player

## Overview
This guide provides instructions for testing the accessibility features implemented in the Sticky Audio Player component.

## Implemented Accessibility Features

### 1. ARIA Labels and Roles
- **Player Container**: `role="region"` with `aria-label="Audio player"`
- **All Control Buttons**: Descriptive `aria-label` attributes
- **Progress Bar**: `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext`
- **Volume Control**: `role="slider"` with appropriate ARIA attributes
- **Play/Pause Button**: `aria-pressed` attribute to indicate state
- **Mute Button**: `aria-pressed` attribute to indicate mute state
- **Icons**: `aria-hidden="true"` to prevent screen reader announcement of decorative icons

### 2. Keyboard Navigation
All controls are keyboard accessible with the following shortcuts:

| Key | Action |
|-----|--------|
| `Space` or `K` | Toggle play/pause |
| `←` (Left Arrow) | Skip backward 10 seconds |
| `→` (Right Arrow) | Skip forward 10 seconds |
| `↑` (Up Arrow) | Increase volume by 10% |
| `↓` (Down Arrow) | Decrease volume by 10% |
| `M` | Toggle mute |
| `Escape` | Close player |
| `Tab` | Navigate between controls |

### 3. Focus Indicators
- All interactive elements have visible focus indicators using `focus:ring-2` classes
- Custom focus styles for slider thumbs with box-shadow and scale effects
- Focus indicators use high contrast colors for visibility

### 4. Screen Reader Support
- Live region announcements for playback state changes
- Descriptive labels for all controls
- Time information with proper ARIA labels
- Message information properly labeled

### 5. Touch Target Sizing
- All buttons meet minimum 44x44px touch target size on mobile
- Larger touch targets on mobile for better accessibility

### 6. Proper Tab Order
Controls are ordered logically:
1. Skip backward button
2. Play/pause button
3. Skip forward button
4. Download button
5. Close button
6. Progress bar
7. Volume controls (desktop only)

## Manual Testing Checklist

### Keyboard Navigation Testing
- [ ] Press Tab to navigate through all controls
- [ ] Verify focus indicators are visible on all controls
- [ ] Test Space/K key to toggle play/pause
- [ ] Test arrow keys for seeking and volume control
- [ ] Test M key to toggle mute
- [ ] Test Escape key to close player
- [ ] Verify keyboard shortcuts don't interfere with input fields

### Screen Reader Testing (NVDA/JAWS on Windows, VoiceOver on Mac/iOS)

#### Windows (NVDA/JAWS)
1. Start NVDA or JAWS
2. Navigate to the messages page
3. Click play on a message
4. Verify screen reader announces:
   - "Audio player region"
   - Current message title and preacher
   - Playback state (Playing/Paused)
5. Tab through controls and verify each announces its purpose
6. Test progress bar and verify it announces current time and duration
7. Test volume control and verify it announces volume percentage

#### macOS (VoiceOver)
1. Enable VoiceOver (Cmd + F5)
2. Navigate to the messages page
3. Click play on a message
4. Use VoiceOver cursor to explore the player
5. Verify all controls are announced correctly
6. Test keyboard navigation with VoiceOver

#### iOS (VoiceOver)
1. Enable VoiceOver in Settings > Accessibility
2. Navigate to the messages page
3. Tap play on a message
4. Swipe right to navigate through controls
5. Verify all controls are announced
6. Test touch target sizes are adequate

#### Android (TalkBack)
1. Enable TalkBack in Settings > Accessibility
2. Navigate to the messages page
3. Tap play on a message
4. Swipe right to navigate through controls
5. Verify all controls are announced
6. Test touch target sizes are adequate

### Focus Management Testing
- [ ] Verify focus doesn't get trapped in the player
- [ ] Verify focus indicators are visible on all interactive elements
- [ ] Test focus order is logical and follows visual layout
- [ ] Verify focus is maintained when player appears/disappears

### Color Contrast Testing
- [ ] Verify all text meets WCAG AA contrast requirements (4.5:1 for normal text)
- [ ] Verify focus indicators have sufficient contrast
- [ ] Test in high contrast mode (Windows) or increased contrast (macOS)

### Responsive Testing
- [ ] Test on mobile devices (iOS and Android)
- [ ] Verify touch targets are at least 44x44px
- [ ] Test keyboard navigation on desktop
- [ ] Verify player doesn't obstruct content

## Automated Testing Recommendations

While manual testing is essential for accessibility, consider adding these automated tests:

### Unit Tests (Jest + React Testing Library)
```typescript
// Test ARIA attributes
test('player has correct ARIA attributes', () => {
  render(<StickyAudioPlayer />);
  const player = screen.getByRole('region', { name: 'Audio player' });
  expect(player).toBeInTheDocument();
});

// Test keyboard navigation
test('Space key toggles play/pause', () => {
  render(<StickyAudioPlayer />);
  fireEvent.keyDown(window, { key: ' ' });
  // Assert play/pause was toggled
});

// Test focus indicators
test('all controls are keyboard accessible', () => {
  render(<StickyAudioPlayer />);
  const buttons = screen.getAllByRole('button');
  buttons.forEach(button => {
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});
```

### Accessibility Testing Tools
- **axe-core**: Automated accessibility testing
- **jest-axe**: Jest integration for axe-core
- **eslint-plugin-jsx-a11y**: Linting for accessibility issues
- **Lighthouse**: Chrome DevTools accessibility audit

## WCAG 2.1 Compliance

The implementation aims to meet WCAG 2.1 Level AA standards:

### Perceivable
- ✅ Text alternatives for non-text content (alt text, ARIA labels)
- ✅ Time-based media controls (play, pause, seek)
- ✅ Sufficient color contrast

### Operable
- ✅ Keyboard accessible
- ✅ No keyboard traps
- ✅ Adequate time for interactions
- ✅ Clear focus indicators
- ✅ Adequate touch target sizes (44x44px minimum)

### Understandable
- ✅ Predictable navigation order
- ✅ Clear labels and instructions
- ✅ Consistent behavior

### Robust
- ✅ Valid HTML/ARIA
- ✅ Compatible with assistive technologies
- ✅ Semantic markup

## Known Limitations

1. **Screen Reader Testing**: Requires manual testing with actual screen readers
2. **Keyboard Shortcuts**: May conflict with browser or OS shortcuts in some cases
3. **Mobile Keyboard Navigation**: Limited keyboard support on mobile devices (by design)

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Inclusive Components](https://inclusive-components.design/)
