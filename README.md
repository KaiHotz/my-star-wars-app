# My Star Wars App 🌟

A modern React application for exploring the Star Wars universe! Browse and search through characters, films, planets, species, starships, and vehicles using data from the [Star Wars API (SWAPI)](https://swapi.dev/).

## ✨ Features

- **Universal Search** - Search across all Star Wars categories simultaneously with real-time results
- **Category Browsing** - Explore detailed information about:
  - 👤 People (Characters)
  - 🎬 Films
  - 🌍 Planets
  - 👽 Species
  - 🚀 Starships
  - 🚗 Vehicles
- **Infinite Scrolling** - Load more items seamlessly with pagination support
- **Grid & List Views** - Toggle between different display modes for category items
- **Edit & Delete** - Modify character data with form validation (people category)
- **Dark/Light Theme** - Switch between themes for comfortable viewing
- **Responsive Design** - Optimized for both desktop and mobile devices
- **Internationalization** - Built-in i18n support with react-intl

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query) for server state
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation
- **Styling**: SCSS with CSS variables for theming
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Component Development**: [Storybook](https://storybook.js.org/)
- **Linting**: ESLint + Stylelint

## 📁 Project Structure

```
src/
├── api/              # API client and SWAPI integration
│   ├── httpClient.ts # Axios instance configuration
│   └── swapi/        # SWAPI-specific hooks and types
├── components/       # Shared components (Card, Header, Layouts, etc.)
├── pages/            # Page components (Search, Category)
├── routes/           # Route configuration
├── ui-kit/           # Reusable UI components library
│   ├── components/   # Button, Input, Modal, Select, Spinner, etc.
│   ├── hooks/        # Custom hooks (useDebounce, useTheme, etc.)
│   ├── providers/    # Theme provider
│   └── styles/       # Global styles, variables, fonts
└── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/KaiHotz/my-star-wars-app.git

# Navigate to the project directory
cd my-star-wars-app

# Install dependencies
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://swapi.dev/api
```

### Development

```bash
# Start the development server
yarn dev

# Run Storybook for component development
yarn storybook
```

### Building

```bash
# Type check and build for production
yarn build

# Preview the production build
yarn preview
```

### Testing & Linting

```bash
# Run tests
yarn test

# Run all linting (TypeScript, ESLint, Stylelint)
yarn lint

# Fix linting issues
yarn lint:fix

# Run CI checks (lint + tests)
yarn ci
```

### Deployment

```bash
# Deploy to GitHub Pages
yarn deploy
```

## 📜 Available Scripts

| Script                 | Description              |
| ---------------------- | ------------------------ |
| `yarn dev`             | Start development server |
| `yarn build`           | Build for production     |
| `yarn preview`         | Preview production build |
| `yarn test`            | Run tests with Vitest    |
| `yarn lint`            | Run all linters          |
| `yarn lint:fix`        | Fix linting issues       |
| `yarn storybook`       | Start Storybook          |
| `yarn storybook:build` | Build Storybook          |
| `yarn deploy`          | Deploy to GitHub Pages   |

## 🎨 UI Kit

The application includes a custom UI kit with reusable components:

- **Backdrop** - Overlay component for modals
- **Button** - Versatile button with multiple variants
- **ContextMenu** - Dropdown context menu
- **Forms** - Form, FormInput, FormSelect components
- **Hint** - Tooltip/hint component
- **Input** - Text input with adornments and clear functionality
- **Label** - Form labels
- **MenuButton** - Dropdown menu trigger button
- **Modal** - Dialog/modal component
- **Select** - Dropdown select powered by react-select
- **Spinner** - Loading indicator

## 🌐 API

This application uses the [Star Wars API (SWAPI)](https://swapi.dev/) - a free, open API for Star Wars data.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.dev/) for providing the Star Wars data
- The Star Wars franchise for the amazing universe
