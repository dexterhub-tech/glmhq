# Requirements Document

## Introduction

This feature adds a persistent, animated Telegram icon button that appears on all pages of the GLM HQ website. The button provides quick access to the GLM Telegram channel and includes a visible "messages" callout to encourage user engagement.

## Glossary

- **Floating Button**: A fixed-position UI element that remains visible as users scroll through the page
- **GLM Telegram Channel**: The official Telegram communication channel at https://t.me/glmchannel
- **Animation**: Visual motion effects applied to the button to attract user attention
- **Callout**: A text label or badge that provides context about the button's purpose

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want to see a Telegram button on every page, so that I can easily access the GLM Telegram channel without searching for the link.

#### Acceptance Criteria

1. WHEN a user visits any page on the website THEN the system SHALL display a Telegram icon button in a fixed position
2. WHEN a user scrolls the page THEN the system SHALL maintain the Telegram button's visibility and position
3. WHEN a user clicks the Telegram button THEN the system SHALL open the URL "https://t.me/glmchannel" in a new browser tab
4. THE system SHALL render the Telegram button on all pages including home, about, messages, auxano-centers, giving, vision, become-member, and make-decision pages
5. THE system SHALL ensure the Telegram button does not obstruct critical page content or navigation elements

### Requirement 2

**User Story:** As a website visitor, I want the Telegram button to be visually engaging with animation, so that I notice it and understand it's an interactive element.

#### Acceptance Criteria

1. WHEN the Telegram button is displayed THEN the system SHALL apply smooth animation effects to attract attention
2. WHEN a user hovers over the Telegram button THEN the system SHALL provide visual feedback through hover state changes
3. THE system SHALL implement animations that are subtle and non-disruptive to the user experience
4. THE system SHALL ensure animations perform smoothly across desktop and mobile devices
5. THE system SHALL use CSS animations or transitions for optimal performance

### Requirement 3

**User Story:** As a website visitor, I want to see a "messages" callout on the Telegram button, so that I understand the button's purpose before clicking it.

#### Acceptance Criteria

1. WHEN the Telegram button is displayed THEN the system SHALL show a visible "messages" text label or badge
2. THE system SHALL position the callout text in a way that is readable and associated with the Telegram icon
3. THE system SHALL style the callout text to be legible against various page backgrounds
4. WHEN a user views the button on mobile devices THEN the system SHALL ensure the callout remains visible and readable
5. THE system SHALL maintain consistent callout styling across all pages

### Requirement 4

**User Story:** As a mobile user, I want the Telegram button to be easily tappable and positioned appropriately, so that I can access the channel without difficulty on my device.

#### Acceptance Criteria

1. WHEN a user views the site on a mobile device THEN the system SHALL position the Telegram button in a touch-friendly location
2. THE system SHALL ensure the Telegram button has a minimum touch target size of 44x44 pixels for mobile accessibility
3. WHEN a user taps the Telegram button on mobile THEN the system SHALL respond immediately without delay
4. THE system SHALL ensure the button does not overlap with mobile navigation elements or the PWA install prompt
5. THE system SHALL maintain button visibility across different mobile screen sizes and orientations

### Requirement 5

**User Story:** As a developer, I want the Telegram button to be implemented as a reusable component, so that it can be easily maintained and updated across the application.

#### Acceptance Criteria

1. THE system SHALL implement the Telegram button as a standalone React component
2. THE system SHALL integrate the Telegram button component into the root layout to ensure global visibility
3. WHEN the Telegram URL needs to be updated THEN the system SHALL allow changes in a single location
4. THE system SHALL follow the existing project's TypeScript and styling conventions
5. THE system SHALL ensure the component is properly typed with TypeScript interfaces
