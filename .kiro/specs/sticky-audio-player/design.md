# Design Document

## Overview

The sticky audio player feature introduces a persistent audio playback interface that remains docked at the bottom of the messages page. This design eliminates the need for page navigation when playing messages, creating a seamless browsing and listening experience similar to modern music streaming applications.

The implementation leverages React's Context API for state management, ensuring the player state is accessible across components while maintaining a single source of truth for the currently playing message.

## Architecture

### Component Hierarchy

```
MessagesPage
├── MessagesPageHero
├── RecentMessagesSection
│   └── MessageCard (multiple)
│       └── PlayButton (triggers player)
└── StickyAudioPlayer (conditionally rendered)
    ├── PlayerControls
    ├── ProgressBar
    └── VolumeControl
```

### State Management

The application will use React Context to manage the audio player state globally within the messages page. This approach allows:

- Any message card to trigger playback
- The sticky player to access and control the current message
- State persistence across component re-renders
- Clean separation between UI and audio logic

### Context Structure

```typescript
interface AudioPlayerContextType {
  currentMessage: Message | null;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  playMessage: (message: Message) => void;
  togglePlayPause: () => void;
  closePlayer: () => void;
}
```

## Components and Interfaces

### 1. AudioPlayerProvider

A context provider component that wraps the messages page and manages all audio player state.

**Responsibilities:**
- Maintain current message state
- Control audio element lifecycle
- Provide playback control functions to children
- Handle audio element events (play, pause, ended, timeupdate)

**Props:**
- `children: ReactNode` - Child components to wrap

**State:**
- `currentMessage: Message | null` - Currently loaded message
- `isPlaying: boolean` - Playback state
- `isPlayerVisible: boolean` - Player visibility state
- `audioRef: RefObject<HTMLAudioElement>` - Reference to audio element

### 2. StickyAudioPlayer

The fixed-position player component displayed at the bottom of the viewport.

**Responsibilities:**
- Render player UI with message information
- Display playback controls
- Handle user interactions
- Manage audio element

**Props:**
- None (consumes context)

**UI Elements:**
- Message thumbnail (small, square)
- Message title (truncated if needed)
- Preacher name
- Play/pause button
- Skip backward button (10 seconds)
- Skip forward button (10 seconds)
- Progress bar with time display
- Volume control
- Download button
- Close button

**Styling:**
- Fixed position at bottom of viewport
- Full width with max-width constraint
- White background with shadow
- Z-index to stay above page content
- Responsive padding and sizing

### 3. Modified RecentMessagesSection

Update the existing component to integrate with the audio player context.

**Changes:**
- Wrap with AudioPlayerProvider
- Modify play button to call `playMessage()` instead of navigating
- Remove Link wrapper from play button
- Keep download button functionality unchanged

### 4. Modified MessagesPage

Update to include the sticky player and add bottom padding when player is visible.

**Changes:**
- Wrap content with AudioPlayerProvider
- Conditionally render StickyAudioPlayer
- Add dynamic padding-bottom to main content when player is visible

## Data Models

### Message Interface

```typescript
interface Message {
  id: number;
  title: string;
  preacher: string;
  date: string;
  image: string | StaticImageData;
  audioUrl: string;
}
```

This interface already exists and requires no modifications.

### Player State

```typescript
interface PlayerState {
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
}
```

## 
Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After reviewing the prework analysis, several properties are logically redundant or can be combined. The reflection below identifies these redundancies:

**Property Reflection:**
- Properties 1.1 and 1.2 both test player initialization and can be combined into a single comprehensive property
- Properties 2.2 and 2.4 both verify player state during message switching and can be consolidated
- Properties 3.1, 4.1, and 5.1 all test UI element presence and can be combined into one property
- Properties 1.4 and 2.4 overlap in testing displayed information and can be merged

**Consolidated Properties:**

Property 1: Player initialization on play
*For any* message in the messages list, clicking the play button should display the sticky player at the bottom of the viewport with the correct audio loaded and playback started
**Validates: Requirements 1.1, 1.2**

Property 2: Player positioning persistence
*For any* scroll position on the messages page, when the sticky player is visible, it should maintain fixed positioning at the bottom of the viewport
**Validates: Requirements 1.3**

Property 3: Complete message information display
*For any* message loaded in the sticky player, the player should display the message's thumbnail, title, preacher name, and all required playback controls
**Validates: Requirements 1.4, 3.1, 4.1, 5.1**

Property 4: No navigation on play
*For any* message, clicking the play button should not change the current URL or navigate away from the messages page
**Validates: Requirements 1.5**

Property 5: Message switching replaces audio
*For any* two messages A and B, if message A is playing and the user clicks play on message B, the audio source should change to message B's audio URL
**Validates: Requirements 2.1**

Property 6: Playback position reset on switch
*For any* message switch, the new message's playback position should start at 0 seconds
**Validates: Requirements 2.3**

Property 7: Player state updates on message switch
*For any* message switch, the sticky player should remain visible and display the new message's information (title, preacher, thumbnail)
**Validates: Requirements 2.2, 2.4**

Property 8: Play/pause toggle
*For any* player state (playing or paused), clicking the play/pause button should toggle to the opposite state
**Validates: Requirements 3.2**

Property 9: Progress bar seeking
*For any* valid time position within the audio duration, setting the progress bar to that position should update the audio's currentTime to match
**Validates: Requirements 3.3**

Property 10: Volume control adjustment
*For any* volume value between 0 and 1, adjusting the volume control to that value should set the audio element's volume property to match
**Validates: Requirements 3.4**

Property 11: Playback end state reset
*For any* message, when audio playback reaches the end, the isPlaying state should become false
**Validates: Requirements 3.5**

Property 12: Close button functionality
*For any* visible player, clicking the close button should hide the player and stop audio playback
**Validates: Requirements 4.2**

Property 13: Player reopening after close
*For any* message, if the player is closed and the user clicks play on that message, the player should become visible again
**Validates: Requirements 4.4**

Property 14: Download button functionality
*For any* message in the player, the download button should have an href attribute matching the message's audioUrl
**Validates: Requirements 5.2**

Property 15: Download doesn't interrupt playback
*For any* playing message, clicking the download button should not change the isPlaying state
**Validates: Requirements 5.3**

Property 16: Responsive layout adaptation
*For any* viewport width below the mobile breakpoint (768px), the sticky player should apply mobile-specific styling classes
**Validates: Requirements 6.1**

Property 17: Touch target sizing
*For any* interactive control in the sticky player on mobile viewports, the minimum touch target size should be at least 44x44 pixels
**Validates: Requirements 6.2**

Property 18: Content padding when player visible
*For any* page state where the sticky player is visible, the messages page content should have bottom padding equal to or greater than the player height
**Validates: Requirements 6.4**

## Error Handling

### Audio Loading Errors

**Scenario:** Audio file fails to load or is unavailable

**Handling:**
- Display error message in player: "Unable to load audio"
- Provide retry button
- Log error to console for debugging
- Prevent play button from being stuck in loading state

### Network Interruptions

**Scenario:** Network connection is lost during playback

**Handling:**
- Audio element will naturally pause when buffering fails
- Display "Buffering..." indicator if playback stalls
- Resume automatically when connection restored
- No manual intervention required from user

### Invalid Message Data

**Scenario:** Message object is missing required fields

**Handling:**
- Validate message object before loading into player
- Display fallback values for missing fields (e.g., "Unknown" for preacher)
- Log warning to console
- Prevent player from entering broken state

### Rapid Message Switching

**Scenario:** User clicks play on multiple messages in quick succession

**Handling:**
- Cancel previous audio load if still in progress
- Only load the most recently selected message
- Use cleanup in useEffect to abort pending operations
- Prevent race conditions with proper state management

## Testing Strategy

### Unit Testing

The implementation will use Jest and React Testing Library for unit tests. Unit tests will cover:

**Component Rendering:**
- StickyAudioPlayer renders with correct message information
- Player controls are present and properly labeled
- Close button is visible and accessible

**User Interactions:**
- Play button click triggers playMessage function
- Close button click hides player and stops audio
- Download button has correct href attribute

**Edge Cases:**
- Player handles missing message fields gracefully
- Player doesn't render when currentMessage is null
- Volume control handles boundary values (0 and 1)

### Property-Based Testing

The implementation will use fast-check for property-based testing in TypeScript/JavaScript. Each property test will run a minimum of 100 iterations.

**Test Configuration:**
```typescript
import fc from 'fast-check';

// Example configuration
fc.assert(
  fc.property(messageArbitrary, (message) => {
    // Test property
  }),
  { numRuns: 100 }
);
```

**Generators (Arbitraries):**

```typescript
// Message generator
const messageArbitrary = fc.record({
  id: fc.integer({ min: 1, max: 1000 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  preacher: fc.string({ minLength: 1, maxLength: 50 }),
  date: fc.date().map(d => d.toLocaleDateString()),
  image: fc.constant('/test-image.jpg'),
  audioUrl: fc.webUrl()
});

// Volume generator (0 to 1)
const volumeArbitrary = fc.double({ min: 0, max: 1 });

// Time position generator
const timePositionArbitrary = (maxDuration: number) => 
  fc.double({ min: 0, max: maxDuration });

// Viewport width generator
const viewportWidthArbitrary = fc.integer({ min: 320, max: 1920 });
```

**Property Test Tags:**
Each property-based test will include a comment tag in this format:
```typescript
// Feature: sticky-audio-player, Property 1: Player initialization on play
```

### Integration Testing

Integration tests will verify the interaction between components:

- AudioPlayerProvider correctly provides context to children
- RecentMessagesSection play buttons trigger player display
- Player state persists across component re-renders
- Multiple message cards can all trigger the same player instance

### Manual Testing Checklist

- [ ] Player appears when clicking play on any message
- [ ] Player stays at bottom while scrolling
- [ ] Switching messages updates player content
- [ ] All playback controls work correctly
- [ ] Download button downloads correct file
- [ ] Close button hides player and stops audio
- [ ] Player is responsive on mobile devices
- [ ] Touch targets are appropriately sized on mobile
- [ ] No content is hidden behind player

## Implementation Notes

### Performance Considerations

**Audio Element Reuse:**
- Use a single audio element instance managed by the context
- Update the src attribute when switching messages rather than creating new elements
- This prevents memory leaks and improves performance

**Lazy Rendering:**
- Only render StickyAudioPlayer when isPlayerVisible is true
- Reduces initial render cost
- Player mounts/unmounts cleanly

**Event Listener Cleanup:**
- Properly remove audio event listeners in useEffect cleanup
- Prevents memory leaks from orphaned listeners
- Use AbortController for fetch operations if implementing streaming

### Accessibility

**Keyboard Navigation:**
- All controls must be keyboard accessible
- Implement proper tab order
- Add keyboard shortcuts (Space for play/pause, Arrow keys for seeking)

**Screen Reader Support:**
- Add ARIA labels to all controls
- Announce playback state changes
- Provide text alternatives for icon buttons

**Focus Management:**
- Maintain focus when player appears/disappears
- Ensure focus doesn't get trapped in player
- Visible focus indicators on all interactive elements

### Browser Compatibility

**Audio Format Support:**
- Primary format: MP3 (universal support)
- Fallback: Provide error message if audio format unsupported
- Test on Safari, Chrome, Firefox, Edge

**CSS Features:**
- Use position: fixed for player (widely supported)
- Provide fallback for CSS custom properties if used
- Test sticky positioning behavior across browsers

### Mobile Considerations

**Touch Gestures:**
- Ensure adequate touch target sizes (minimum 44x44px)
- Prevent accidental closes with confirmation if needed
- Support swipe gestures for seeking (optional enhancement)

**Viewport Height:**
- Account for mobile browser chrome (address bar, toolbars)
- Use fixed pixel height rather than vh units for reliability
- Test on iOS Safari and Chrome mobile

**Performance:**
- Minimize repaints when updating progress bar
- Use CSS transforms for animations (GPU accelerated)
- Debounce progress bar updates if needed

## Future Enhancements

While not part of the initial implementation, these enhancements could be considered:

1. **Playlist Mode:** Automatically play next message when current ends
2. **Playback Speed Control:** Allow 0.5x, 1x, 1.5x, 2x speed options
3. **Persistent State:** Remember playback position across page refreshes
4. **Keyboard Shortcuts:** Global shortcuts for play/pause, skip, volume
5. **Mini Player Mode:** Collapsible player showing only essential controls
6. **Waveform Visualization:** Visual representation of audio waveform
7. **Chapters/Timestamps:** Support for message chapters or bookmarks
8. **Share Current Time:** Generate shareable links to specific timestamps
