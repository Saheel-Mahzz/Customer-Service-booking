# Developer Setup Guide (`setup.md`)

This guide provides step-by-step instructions to get the development environment running locally and outlines the core project architecture.

---

## 1. Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`
- **Git**

---

## 2. Getting Started

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd <project-folder-name>

npm install

# Static JSON Base URL
VITE_STATIC_API_BASE_URL=/api/v1

# MockAPI.io Base URL (Dynamic Mutations)
VITE_MOCK_API_BASE_URL=https://<your-mockapi-id>.mockapi.io/api/v1

npm run dev
  
  Running Tests
# Run tests in watch mode
pnpm run test

# Run tests once (CI mode)
pnpm run test:run

# Open Vitest UI dashboard
pnpm run test:ui

# Generate code coverage report
pnpm run coverage
