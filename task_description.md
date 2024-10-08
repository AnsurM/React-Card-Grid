# Senior Front End Engineering Challenge: React Card Grid Application

## Table of Contents

- [Background](#background)
- [Objective](#objective)
- [Requirements](#requirements)
  - [React Application Setup](#react-application-setup)
  - [API Integration](#api-integration)
  - [Grid View Layout](#grid-view-layout)
  - [Responsive Design](#responsive-design)
  - [Modal Functionality](#modal-functionality)
  - [Accessibility](#accessibility)
  - [Loading](#loading)
  - [Testing](#testing)
- [Bonus Features](#bonus-features)
- [Deliverables](#deliverables)
- [Evaluation Criteria](#evaluation-criteria)

## Background

This project aims to create a React application that displays a responsive grid of GIFs fetched from the Giphy API. The application should use TypeScript and styled-components, focusing on best practices for accessibility and following the Accessible Rich Internet Applications (WAI-ARIA) 1.3 patterns.

## Objective

Develop a responsive React application that fetches and displays images from the Giphy API in a grid view. The application should dynamically adjust the number of images based on the available screen space, ensuring that the cards remain square and utilize the space efficiently.

## Requirements

### React Application Setup

- Set up a React application using the latest browser technologies
- Use functional components and React hooks for state management
- Implement styled-components for styling
- Utilize TypeScript for type safety
- Integrate a common setup of eslint and prettier

### API Integration

- Integrate with the Giphy API to fetch trending GIFs
  - API: https://developers.giphy.com/docs/api/endpoint/#trending
- Display the GIFs from the initial load

### Grid View Layout

- Display fetched GIFs in a grid layout with square cards
- Use `item -> images -> original -> url` from the API response
- Each card should contain:
  - The image (60% of card height)
  - A title (40% of card height, left-aligned and vertically centered)
- Implement a responsive grid that adjusts cards per row based on screen width
- Minimum card width: 160px
- Spacing between cards: 16px
- Use CSS Grid for layout

### Responsive Design

- Dynamically adjust to different screen sizes
- Handle window resizing while maintaining square aspect ratio of cards

### Modal Functionality

- Implement a modal view that opens when a card is clicked
- Modal should occupy 80% of the window space and overlay the main content
- Display the selected image prominently with title and a close button/icon

### Accessibility

- Ensure both list view and modal follow common accessibility patterns
- Implement keyboard navigation, focus management, and screen reader compatibility

### Loading

- Display a loading indicator while fetching images from the API

### Testing

- Write tests to verify accessibility features
- Consider using Jest with @testing-library/react

## Bonus Features

- Implement smooth transitions for card-to-modal animation
- Add a search feature for finding specific GIFs by title
- Utilize react-router for navigation

## Deliverables

1. A GitHub repository containing the source code
2. A README.md file with setup and running instructions

## Evaluation Criteria

- Code Quality: Clean and readable code
- Functionality: Meets specified requirements and handles edge cases
- User Experience: Responsive, intuitive, and visually appealing interface
- Bonus Features: Implementation of additional features beyond core requirements

Good luck with your implementation!
