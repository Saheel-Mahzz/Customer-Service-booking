# Application Architecture Documentation (`architecture.md`)

## 1. Overview & Tech Stack
This application is built using a modern frontend stack focused on type safety, modular design, and maintainable component architecture.

- **Build Tool / Bundler:** Vite
- **UI & Styling:** Tailwind CSS + Shadcn UI components
- **HTTP Client:** Axios
- **Schema Validation:**  Zod
- **UI Notifications:** Sonner

---

## 2. Folder Structure
The project follows a **Feature-Based Architecture**. Code is co-located by module domain under `src/features/` rather than grouped by generic file types.

```text
src/
├── assets/                  # Static assets (images, icons, fonts)
├── components/              # Shared/Global reusable UI components (Shadcn primitives)
│   └── ui/                  # Raw Shadcn components (Button, Input, Dialog)
├── config/                  # Global configuration (Axios instances, environment variables)
├── features/                # Feature modules
│   └── serviceListing/      # Example feature domain
│       ├── components/      # UI components specific to service listing
│       ├── hooks/           # Custom hooks for state/data-fetching logic
│       ├── services/        # API calls specific to service listing
│       └── types/           # TypeScript interfaces/types for service listing
├── hooks/                   # Shared application-level custom hooks
├── lib/                     # Utility functions and library wrappers (e.g., utils.ts for cn helper)
├── routes/                  # Route definitions and navigation setups
└── types/                   # Shared TypeScript definitions