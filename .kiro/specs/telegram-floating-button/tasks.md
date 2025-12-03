# Implementation Plan

- [x] 1. Create TelegramButton component with basic structure





  - Create new file `app/components/TelegramButton.tsx`
  - Implement React functional component with TypeScript
  - Add Telegram SVG icon inline
  - Add "messages" callout text
  - Add link to https://t.me/glmchannel with proper attributes (target="_blank", rel="noopener noreferrer")
  - Add aria-label for accessibility
  - _Requirements: 1.1, 1.3, 3.1, 5.1, 5.3_
-

- [x] 2. Implement styling and positioning




  - Add Tailwind CSS classes for fixed positioning (bottom-right)
  - Style button as circular with Telegram brand color (#0088cc or #229ED9)
  - Set appropriate sizes (64px desktop, 56px mobile)
  - Style callout badge with readable text and background
  - Add shadow effects for depth
  - Ensure z-index is appropriate (z-40)
  - Implement responsive positioning adjustments for mobile
  - _Requirements: 1.2, 1.5, 3.2, 3.3, 3.5, 4.1, 4.2, 4.4, 4.5_
-

- [x] 3. Add CSS animations




  - Implement pulse animation (subtle scale effect every 2-3 seconds)
  - Add hover state with scale and shadow effects
  - Add click/tap feedback animation
  - Add entrance animation (fade in and slide up)
  - Use CSS animations/transitions (not JavaScript)
  - _Requirements: 2.1, 2.2, 2.5_




- [ ] 4. Integrate component into root layout

  - Import TelegramButton component in `app/layout.tsx`
  - Add component to layout JSX (after Footer, before PWAInstallPrompt)
  - Verify component renders on all pages
  - _Requirements: 1.4, 5.2_

- [ ]* 5. Write unit tests for TelegramButton component
  - Test component renders without errors
  - Verify Telegram icon is present
  - Verify "messages" callout text is displayed
  - Check link href is correct (https://t.me/glmchannel)
  - Verify link opens in new tab (target="_blank")
  - Check security attributes (rel="noopener noreferrer")
  - Verify aria-label is present
  - Test button has minimum size (44x44px)
  - Verify fixed positioning classes are applied
  - _Requirements: 1.1, 1.3, 3.1, 4.2, 5.1_

- [ ]* 6. Write integration tests
  - Verify component is imported in layout
  - Test component renders on home page
  - Test component renders on messages page

  - Test component renders on auxano-centers page
  - Verify button doesn't overlap with navbar
  - _Requirements: 1.4, 1.5, 5.2_

- [x] 7. Final checkpoint - Verify implementation



  - Manually test button on all pages
  - Verify animations work smoothly
  - Test on mobile devices or responsive mode
  - Check accessibility with keyboard navigation
  - Ensure button doesn't obstruct content
  - Ensure all tests pass, ask the user if questions arise
