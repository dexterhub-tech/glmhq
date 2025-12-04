# Requirements Document

## Introduction

This feature transforms the message playback experience by implementing a sticky audio player that remains docked at the bottom of the messages page. Users can click on any message to play it without navigating away from the messages list, allowing seamless browsing and playback of multiple messages in succession.

## Glossary

- **Sticky Player**: An audio player component that remains fixed at the bottom of the viewport while users scroll through the messages page
- **Messages Page**: The page displaying the list of available messages at `/messages`
- **Message Card**: An individual message item in the messages list containing title, preacher, date, thumbnail, and action buttons
- **Player Dock**: The fixed bottom area where the sticky player is displayed
- **Active Message**: The message currently loaded in the sticky player

## Requirements

### Requirement 1

**User Story:** As a user, I want to click on a message's play button and have it play in a sticky player at the bottom of the page, so that I can continue browsing other messages while listening.

#### Acceptance Criteria

1. WHEN a user clicks the play button on any message card THEN the system SHALL display a sticky audio player at the bottom of the viewport
2. WHEN the sticky player is displayed THEN the system SHALL load and begin playing the selected message's audio
3. WHEN the sticky player is visible THEN the system SHALL remain fixed at the bottom of the viewport during page scrolling
4. WHEN a message is playing THEN the system SHALL display the message thumbnail, title, preacher name, and playback controls in the sticky player
5. WHEN the sticky player is active THEN the system SHALL not navigate the user away from the messages page

### Requirement 2

**User Story:** As a user, I want to switch between different messages without leaving the messages page, so that I can quickly sample multiple messages.

#### Acceptance Criteria

1. WHEN a user clicks play on a different message while another is playing THEN the system SHALL replace the current audio with the newly selected message
2. WHEN switching between messages THEN the system SHALL maintain the sticky player's visibility at the bottom of the page
3. WHEN a new message is loaded THEN the system SHALL reset the playback position to the beginning
4. WHEN switching messages THEN the system SHALL update the player's displayed information to match the new message

### Requirement 3

**User Story:** As a user, I want to control audio playback from the sticky player, so that I can play, pause, seek, and adjust volume without scrolling.

#### Acceptance Criteria

1. WHEN the sticky player is visible THEN the system SHALL display play/pause, skip forward, skip backward, and volume controls
2. WHEN a user clicks the play/pause button THEN the system SHALL toggle between playing and paused states
3. WHEN a user interacts with the progress bar THEN the system SHALL update the audio playback position
4. WHEN a user adjusts the volume control THEN the system SHALL change the audio volume accordingly
5. WHEN audio playback ends THEN the system SHALL reset the play button to its initial state

### Requirement 4

**User Story:** As a user, I want to close the sticky player when I'm done listening, so that I can reclaim screen space.

#### Acceptance Criteria

1. WHEN the sticky player is visible THEN the system SHALL display a close button
2. WHEN a user clicks the close button THEN the system SHALL hide the sticky player and stop audio playback
3. WHEN the player is closed THEN the system SHALL release audio resources
4. WHEN the player is closed and a user clicks play on another message THEN the system SHALL display the sticky player again

### Requirement 5

**User Story:** As a user, I want to download messages from the sticky player, so that I can save them for offline listening.

#### Acceptance Criteria

1. WHEN the sticky player is visible THEN the system SHALL display a download button
2. WHEN a user clicks the download button THEN the system SHALL initiate a download of the current message's audio file
3. WHEN downloading THEN the system SHALL continue playing the audio without interruption

### Requirement 6

**User Story:** As a user on a mobile device, I want the sticky player to be responsive and touch-friendly, so that I can easily control playback on smaller screens.

#### Acceptance Criteria

1. WHEN the sticky player is displayed on mobile devices THEN the system SHALL adapt the layout to fit smaller viewports
2. WHEN displayed on mobile THEN the system SHALL ensure all controls are touch-accessible with appropriate sizing
3. WHEN the sticky player is visible on mobile THEN the system SHALL not obstruct critical page content
4. WHEN the page content extends behind the player THEN the system SHALL add appropriate padding to prevent content overlap
