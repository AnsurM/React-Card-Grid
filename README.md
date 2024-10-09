# 🎴 React Card Grid Application

## Table of Contents

- [📝 Overview](#📝-overview)
- [👀 Preview](#👀-preview)
- [✨ Features](#✨-features)
- [🛠️ Technologies Used](#🛠️-technologies-used)
- [🏗️ Project Structure](#🏗️-project-structure)
- [🚀 Getting Started](#🚀-getting-started)
  - [📋 Prerequisites](#📋-prerequisites)
  - [⚙️ Installation](#⚙️-installation)
- [🖥️ Usage](#🖥️-usage)
- [🚢 Deployment](#🚢-deployment)
- [🧪 Testing](#🧪-testing)
- [♿ Accessibility](#♿-accessibility)
- [🚀 Next Steps](#🚀-next-steps)
- [📄 License](#📄-license)

## 📝 Overview

This React application displays a responsive grid of GIFs fetched from the Giphy API. It features a dynamic layout that adjusts based on screen size, modal functionality for detailed views, and adheres to accessibility best practices.

## 👀 Preview

<p align="center">
  <img src="./public/preview.gif" alt="React Card Grid Application Preview">
</p>

## ✨ Features

- 📱 Responsive grid layout of GIFs with dynamic rendering:
  - Number of cards adjusts based on screen size
  - Utilizes a resize event listener for real-time adaptation
  - Renders 20 cards for smaller screens and 50 for larger screens (width >= 1920px)
- 🔍 Modal view for detailed GIF display
- ♿ Accessibility features including:
  - Keyboard navigation using Tab and Arrow keys for efficient browsing
  - Screen reader compatibility for improved accessibility
  - Visual focus indicators on GridCards to highlight the selected card during keyboard navigation and mouse hovers
- ⏳ Loading indicators during API fetches:
  - SkeletonLoaders displayed in GridCards during initial API call and subsequent fetches
  - SkeletonLoader shown in Modal while GIF details are being loaded
  - Provides visual feedback to users, enhancing perceived performance and user experience

## 🛠️ Technologies Used

- ⚛️ React (with Hooks)
- 📘 TypeScript
- ⚡ Vite
- 💅 styled-components
- 🌐 CSS Grid
- 🖼️ Giphy API
- 🧪 Jest and React Testing Library

## 🏗️ Project Structure

The project follows a well-organized structure to enhance maintainability and scalability. Here's an overview of the main directories and files:

```
src/
├── assets/
│   └── icons/
├── components/
│   ├── Card/
│   ├── ErrorIndicator/
│   ├── GifGrid/
│   ├── Loaders/
│   ├── Modal/
│   ├── NoResults/
│   └── Pagination/
├── utils/
│   └── api/
│   └── constants.ts
│   └── types.ts
├── App.tsx
├── app.styles.ts
├── index.css
├── main.tsx
└── vite-env.d.ts
```

- 📁 `assets/`: Contains static assets like icons used in the application.
- 📁 `components/`: Houses all React components used in the app, each in its own directory with associated styles.
  - 🎴 `Card/`: Renders individual GIF cards.
  - ❗ `ErrorIndicator/`: Displays error messages
  - 🖼️ `GifGrid/`: Manages the grid layout of GIF cards.
  - ⏳ `Loaders/`: Contains loading indicators and skeleton loaders.
  - 🔍 `Modal/`: Handles the detailed view of a selected GIF.
  - 🚫 `NoResults/`: Shows a message when no results are found.
  - 📄 `Pagination/`: Manages pagination controls.
- 🛠️ `utils/`: Contains utility functions and API-related code.
  - 🌐 `api/`: Handles API calls to the Giphy service.
  - 📄 `constants.ts`: Contains constants used throughout the application.
  - 📄 `types.ts`: Contains TypeScript types used throughout the application.
- 📄 `App.tsx`: The main application component.
- 💅 `app.styles.ts`: Styled components for the main App component.
- 🎨 `index.css`: Global CSS styles.
- 🚀 `main.tsx`: Entry point of the application.
- 📝 `vite-env.d.ts`: TypeScript declarations for Vite.

This structure promotes a modular approach, making it easier to maintain and extend the application. Each component is self-contained with its own styles and logic, following best practices for React development.

## 🚀 Getting Started

### 📋 Prerequisites

- 📦 Node.js (version 12 or later)
- 📦 npm or yarn

### ⚙️ Installation

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

4. Copy the `.env.example` file to create a `.env` file in the root directory and add your Giphy API key:
   ```
   VITE_GIPHY_API_KEY=your_api_key_here
   VITE_GIPHY_API_URL=https://api.giphy.com/v1/gifs
   ```

## 🖥️ Usage

To start the development server:

```
npm start
```

or

```
yarn start
```

The application will be available at `http://localhost:5173`.

## 🚢 Deployment

This project is deployed on Amazon S3 and CloudFront through a CI/CD pipeline using GitHub Actions. The deployment process is automated and triggered on every push to the main branch. Here's an overview of the deployment steps:

1. The GitHub Actions workflow is defined in the `.github/workflows/deploy.yml` file.
2. When code is pushed to the main branch, the workflow is triggered.
3. The workflow runs on an Ubuntu latest environment.
4. It checks out the code, installs dependencies, and builds the project using npm.
5. During the build process, environment variables (including API keys) are securely injected from GitHub Secrets.
6. After a successful build, the AWS CLI is set up using a GitHub Action.
7. The built files are then synced to an Amazon S3 bucket using the `aws s3 sync` command.
8. Finally, a CloudFront invalidation is created to ensure the latest version of the site is served to users.

The entire process ensures that the latest version of the application is always available on the production environment.

🌐 Checkout the live site here: https://dj4xvloye0w0y.cloudfront.net/

## 🧪 Testing

To be added soon.

## ♿ Accessibility

The application is designed with accessibility in mind, following WAI-ARIA 1.3 patterns. Key features include:

- ⌨️ Keyboard navigation for all interactive elements using Tab and Arrow keys
- 🔍 Proper focus management
- 🔊 Screen reader compatibility for all components
- 🏗️ Semantic HTML structure for all components

## 🚀 Next Steps

As we continue to improve and expand this application, here are some key areas we're focusing on:

### 🔧 Refactoring

- Move functions such as resize, keypress, and clickOutside listeners to reusable hooks to reduce code duplication and improve maintainability.

### 🧪 Testing

- Implement extensive unit, end-to-end, and integration tests as the app grows, ensuring robust functionality and easier maintenance.

### 🔬 Enhancements

- Integrate feature flags for easier deployment and A/B testing.
- Implement observability tools like Sentry and SonarCloud for better monitoring and code quality analysis.

### 🖼️ Performance Optimization

- Research and implement image caching strategies to improve load times and reduce bandwidth usage.

### 🔄 Continuous Integration

- Set up GitHub Actions to perform automated tests in the cloud and generate reports for test coverage.

### 🛡️ Error Handling

- Implement an Error Boundary to gracefully handle errors and prevent the entire application from crashing.

These next steps will help us improve the application's performance, maintainability, and overall user experience.

## 📄 License

This project is licensed under the MIT License.
