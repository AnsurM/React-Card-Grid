# React Card Grid Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [License](#license)

## Overview

This React application displays a responsive grid of GIFs fetched from the Giphy API. It features a dynamic layout that adjusts based on screen size, modal functionality for detailed views, and adheres to accessibility best practices.

## Features

- Responsive grid layout of GIFs
- Dynamic resizing of cards based on screen width
- Modal view for detailed GIF display
- Accessibility features including keyboard navigation and screen reader compatibility
- Loading indicator during API fetches

## Technologies Used

- React (with Hooks)
- TypeScript
- Vite
- styled-components
- CSS Grid
- Giphy API
- Jest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/react-card-grid-app.git
   ```

2. Navigate to the project directory:

   ```
   cd react-card-grid-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Create a `.env` file in the root directory and add your Giphy API key:
   ```
   VITE_GIPHY_API_KEY=your_api_key_here
   VITE_GIPHY_API_URL=https://api.giphy.com/v1/gifs
   ```

## Usage

To start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at `http://localhost:5173`.

## Deployment

This project is deployed on Amazon S3 and CloudFront through a CI/CD pipeline.
Checkout the live site here: https://dj4xvloye0w0y.cloudfront.net/

## Testing

Run the test suite with:

```
npm test
```

or

```
yarn test
```

## Accessibility

The application is designed with accessibility in mind, following WAI-ARIA 1.3 patterns. Key features include:

- Keyboard navigation for all interactive elements
- Proper focus management
- Screen reader compatibility for all components
- Semantic HTML structure for all components

## License

This project is licensed under the MIT License.
