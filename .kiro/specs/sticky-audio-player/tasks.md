# Implementation Plan

- [x] 1. Create AudioPlayerContext and Provider





  - Create new file `app/contexts/AudioPlayerContext.tsx`
  - Define AudioPlayerContextType interface with currentMessage, isPlaying, isPlayerVisible, and control functions
  - Implement AudioPlayerProvider component with state management for current message, playing state, and player visibility
  - Create playMessage, togglePlayPause, and closePlayer functions
  - Manage audio element ref and lifecycle within the provider
  - Export useAudioPlayer custom hook for consuming the context
  - _Requirements: 1.1, 1.2, 2.1, 4.2_

- [ ]* 1.1 Write property test for player initialization
  - **Property 1: Player initialization on play**
  - **Validates: Requirements 1.1, 1.2**


- [x] 2. Create StickyAudioPlayer component




  - Create new file `app/components/StickyAudioPlayer.tsx`
  - Implement fixed-position container with proper z-index and styling
  - Display message thumbnail, title, and preacher name from context
  - Add close button with X icon that calls closePlayer
  - Ensure component only renders when isPlayerVisible is true
  - Add responsive styling for mobile and desktop viewports
  - _Requirements: 1.3, 1.4, 4.1, 6.1_

- [ ]* 2.1 Write property test for player positioning
  - **Property 2: Player positioning persistence**
  - **Validates: Requirements 1.3**

- [ ]* 2.2 Write property test for message information display
  - **Property 3: Complete message information display**
  - **Validates: Requirements 1.4, 3.1, 4.1, 5.1**

- [x] 3. Implement playback controls in StickyAudioPlayer





  - Add play/pause button that toggles playback state
  - Implement skip backward button (10 seconds)
  - Implement skip forward button (10 seconds)
  - Add visual feedback for playing vs paused states
  - Use Lucide React icons for consistent styling
  - _Requirements: 3.1, 3.2_

- [ ]* 3.1 Write property test for play/pause toggle
  - **Property 8: Play/pause toggle**
  - **Validates: Requirements 3.2**

- [x] 4. Add progress bar and time display





  - Create progress bar using range input element
  - Display current time and total duration
  - Implement handleSeek function to update audio currentTime
  - Add timeupdate event listener to update progress
  - Format time display as MM:SS
  - Style progress bar with custom CSS
  - _Requirements: 3.3_

- [ ]* 4.1 Write property test for progress bar seeking
  - **Property 9: Progress bar seeking**
  - **Validates: Requirements 3.3**

- [x] 5. Implement volume control





  - Add volume slider using range input
  - Add mute/unmute button with volume icons
  - Implement handleVolumeChange function
  - Implement toggleMute function
  - Sync volume state with audio element
  - _Requirements: 3.4_

- [ ]* 5.1 Write property test for volume control
  - **Property 10: Volume control adjustment**
  - **Validates: Requirements 3.4**


- [x] 6. Add download button to player



  - Add download button with download icon
  - Set href to current message's audioUrl
  - Add download attribute for proper file naming
  - Style button to match existing download buttons
  - Ensure download doesn't interrupt playback
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 6.1 Write property test for download functionality
  - **Property 14: Download button functionality**
  - **Validates: Requirements 5.2**

- [ ]* 6.2 Write property test for download non-interruption
  - **Property 15: Download doesn't interrupt playback**
  - **Validates: Requirements 5.3**


- [x] 7. Handle audio playback events



  - Add ended event listener to reset play button state
  - Add loadedmetadata event listener to get duration
  - Add error event listener for error handling
  - Display loading state while audio is loading
  - Show error message if audio fails to load
  - _Requirements: 3.5_

- [ ]* 7.1 Write property test for playback end state
  - **Property 11: Playback end state reset**
  - **Validates: Requirements 3.5**


- [x] 8. Update RecentMessagesSection to use AudioPlayerContext



  - Wrap RecentMessagesSection with AudioPlayerProvider (or wrap at page level)
  - Import and use useAudioPlayer hook
  - Change play button from Link to button element
  - Call playMessage(message) on play button click instead of navigation
  - Keep download button functionality unchanged
  - _Requirements: 1.5, 2.1_

- [ ]* 8.1 Write property test for no navigation on play
  - **Property 4: No navigation on play**
  - **Validates: Requirements 1.5**

- [ ]* 8.2 Write property test for message switching
  - **Property 5: Message switching replaces audio**
  - **Validates: Requirements 2.1**

- [x] 9. Update MessagesPage to integrate sticky player







  - Wrap page content with AudioPlayerProvider
  - Import and conditionally render StickyAudioPlayer component
  - Add dynamic bottom padding to main content when player is visible
  - Calculate padding based on player height
  - Ensure player appears above all other content
  - _Requirements: 1.1, 6.4_

- [ ]* 9.1 Write property test for content padding
  - **Property 18: Content padding when player visible**
  - **Validates: Requirements 6.4**

- [x] 10. Implement message switching logic





  - Update playMessage function to handle switching between messages
  - Reset currentTime to 0 when loading new message
  - Update player display information when message changes
  - Maintain player visibility during message switches
  - Cancel previous audio load if still in progress
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 10.1 Write property test for playback position reset
  - **Property 6: Playback position reset on switch**
  - **Validates: Requirements 2.3**

- [ ]* 10.2 Write property test for player state updates
  - **Property 7: Player state updates on message switch**
  - **Validates: Requirements 2.2, 2.4**

- [x] 11. Implement close player functionality




  - Update closePlayer function to set isPlayerVisible to false
  - Stop audio playback when closing
  - Reset currentMessage to null
  - Clean up audio element resources
  - Ensure player can be reopened after closing
  - _Requirements: 4.2, 4.3, 4.4_

- [ ]* 11.1 Write property test for close button functionality
  - **Property 12: Close button functionality**
  - **Validates: Requirements 4.2**

- [ ]* 11.2 Write property test for player reopening
  - **Property 13: Player reopening after close**
  - **Validates: Requirements 4.4**


- [x] 12. Add responsive mobile styling



  - Add mobile-specific CSS classes for viewports below 768px
  - Adjust player height and padding for mobile
  - Ensure all controls have minimum 44x44px touch targets
  - Test layout on various mobile screen sizes
  - Adjust thumbnail size for mobile
  - Stack controls vertically if needed on small screens
  - _Requirements: 6.1, 6.2_

- [ ]* 12.1 Write property test for responsive layout
  - **Property 16: Responsive layout adaptation**
  - **Validates: Requirements 6.1**

- [ ]* 12.2 Write property test for touch target sizing
  - **Property 17: Touch target sizing**
  - **Validates: Requirements 6.2**


- [x] 13. Add accessibility features




  - Add ARIA labels to all control buttons
  - Ensure keyboard navigation works for all controls
  - Add focus indicators to interactive elements
  - Test with screen reader
  - Add role="region" and aria-label to player container
  - Ensure proper tab order


- [x] 14. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.
