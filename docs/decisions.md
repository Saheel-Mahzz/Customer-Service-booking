## Decision 1: Hybrid Mocking Strategy (Public JSON Files + MockAPI.io)

* **What was chosen?**
  Used a hybrid mocking strategy: static JSON files in `public/api/v1` for read-only data, and **MockAPI.io** for features requiring write operations (POST, PUT, DELETE).

* **Why was it chosen?**
  * Static JSON files in `public/` are zero-cost and instant for GET requests that do not change.
  * MockAPI.io easily handles state changes and data mutations without setting up a real backend service.

* **What alternatives were considered?**
  1. Using static JSON files for everything.
  2. MSW (Mock Service Worker).

* **Why were the alternatives rejected?**
  * **Static JSON for everything:** Rejected because static files are read-only and cannot handle POST requests or save new data.
  * **MSW (Mock Service Worker):** MSW offers realistic network-level interception, but setting up service workers and mock handlers takes extra time and complexity. We chose a simpler hybrid approach to keep the setup quick and lightweight.

  ## Decision 2: Client-Side Routing (React Router DOM)

* **What was chosen?**
  **React Router DOM** (v6) for managing page navigation and client-side routing.

* **Why was it chosen?**
  * Industry standard with complete support for nested routes, dynamic parameters, and layout wrappers.
  * Declarative API makes it easy to define and maintain app routes inside feature-based structures.

* **What alternatives were considered?**
  1. TanStack Router
  2. Wouter
  3. Custom conditional rendering (State-driven tabs/views)

* **Why were the alternatives rejected?**
  * **TanStack Router:** Rejected due to steeper learning curve and extra boilerplate setup for current project needs.
  * **Wouter:** Extremely lightweight, but lacks deeper nested routing features and ecosystem support needed as the app scales.
  * **Custom State Navigation:** Fails to support browser history (back/forward buttons) and clean URL bookmarking.

  ## Decision 3 : URL-Based Query Parameters for State Management (Filter & Search)

* **What was chosen?**
  Used **URL Query Parameters** (`useSearchParams` / React Router) to store active filter, search, and pagination states instead of local component state (`useState`).

* **Why was it chosen?**
  * **State Persistence on Reload:** Preserves active filters and active views even when the user reloads/refreshes the page.
  * **Shareable & Bookmarkable URLs:** Users can copy-paste the URL (e.g., `?category=cleaning&page=2`) and share exact filtered views directly with others.
  * **Production-Ready API Integration:** Aligns with standard RESTful backend patterns, making future integration with real query-based APIs seamless.

* **What alternatives were considered?**
  1. Local React component state (`useState`).
  2. Global client state management (e.g., Zustand or Redux).

* **Why were the alternatives rejected?**
  * **Local State (`useState`):** State is immediately lost upon page refresh, breaking the browser back/forward buttons.
  * **Global State (Zustand/Redux):** Over-engineers filter tracking and still fails to make specific filtered states bookmarkable or shareable via URL.

  ## Decision 4: Unit & Component Testing Tool (Vitest)

* **What was chosen?**
  **Vitest** for running unit and component tests.

* **Why was it chosen?**
  * Built natively for Vite—uses the exact same build configuration, transformers, and plugins without extra setup.
  * Extremely fast execution time thanks to instant ESM support and concurrent test running.

* **What alternatives were considered?**
  1. Jest
  2. Manual testing only

* **Why were the alternatives rejected?**
  * **Jest:** Requires heavy Babel transform setups and dual-configuration to work smoothly alongside Vite projects.
  * **Manual Testing:** High risk of regression bugs when code updates or new features are added.

  ## Decision 5: UI Display Strategy (Table View vs Card View)

* **What was chosen?**
  Used **Table View** for `my-bookings` and **Card View** for `service-listing`.

* **Why was it chosen?**
  * **Table View (`my-bookings`):** Bookings data is dense and structured (dates, status, IDs, actions). Tables make it easy to compare items row-by-row and scan high volumes of data quickly.
  * **Card View (`service-listing`):** Services are visually driven (images, tags, highlights, price). Cards provide better visual hierarchy and look more attractive for browsing services.

* **What alternatives were considered?**
  1. Using Card View for both features.
  2. Using Table View for both features.

* **Why were the alternatives rejected?**
  * **Cards for Bookings:** Takes up too much vertical space and makes comparing structured booking data slow for the user.
  * **Tables for Service Listing:** Looks visually plain and doesn't showcase images or service highlights effectively.
  
  ## Decision 6: Directory Structure (Feature-Based Setup)

* **What was chosen?**
  Organized code by features inside `src/features/<feature-name>` instead of generic file layers (`src/components`, `src/hooks`).

* **Why was it chosen?**
  * Keeps everything related to a single feature (components, hooks, services, types) together in one place.
  * Makes it easier to add, modify, or delete features without searching through multiple global folders.

* **What alternatives were considered?**
  Layer-based folder structure (putting all components in one folder, all hooks in another).

* **Why were the alternatives rejected?**
  * **Layer-based structure:** As the application grows, navigating between distant folders for a single feature becomes messy and slow.