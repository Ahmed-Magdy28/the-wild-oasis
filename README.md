# The Wild Oasis

The Wild Oasis is a hotel management dashboard built for staff members who need to manage daily operations from one place. The app brings together cabins, bookings, guests, check-in and check-out workflows, account management, and business insights in a single interface.

This project is built with React, TypeScript, and Vite, and uses Supabase for backend services. Data fetching and server state are handled with TanStack React Query, while the UI is styled with `styled-components`.

## Features

- Secure authentication and protected routes
- Dashboard with business stats and charts
- Cabin management with create, update, and delete flows
- Booking management with detailed booking views
- Guest management tools
- Check-in and check-out actions for current stays
- App settings and account update screens
- Dark mode support

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack React Query
- Supabase
- Styled Components
- React Hook Form
- React Router
- Recharts

## Project Structure

The codebase is organized by feature so product areas are easier to maintain:

- `src/features` contains domain features like cabins, bookings, guests, dashboard, settings, authentication, and check-in/out
- `src/pages` contains route-level pages
- `src/services` contains API and Supabase logic
- `src/ui` contains reusable UI building blocks
- `src/hooks` and `src/context` contain shared app logic

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at `http://localhost:4000`

## Available Scripts

- `npm run dev` starts the Vite development server on port `4000`
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest

## Notes

- The app is connected to Supabase through the service setup in `src/services/supabase.ts`
- React Query Devtools are included during development
- Toast notifications and route protection are already wired into the app shell
