# Developer The Explorer

Developer The Explorer is a full-stack event platform for the "Developer The Explorer" camp.
It includes a modern React frontend, Supabase-based authentication and data access, and a lightweight Express backend.

## Table of Contents

- Overview
- Features
- Repository Structure
- Architecture
- Tech Stack
- Prerequisites
- Environment Configuration
- Local Development
- Application Routes
- Authentication Flow
- Booking and Payment Flow
- Supabase Requirements
- Build and Deployment
- Scripts Reference
- Troubleshooting
- Security Notes
- Contribution Guide
- Current Limitations
- License

## Overview

This project is designed to:

- Market and present event details for Developer The Explorer.
- Allow users to sign in and manage event participation.
- Handle seat booking logic and ticket tiers.
- Integrate payment flow (Razorpay-based checkout from frontend invocation).
- Support password recovery and protected dashboard flows.

## Features

- Public landing and event information pages
- Login with Supabase auth
- Auth-guarded pages for event/booking experience
- Booking form with validation
- Dynamic ticket-tier behavior based on booking counts
- Integration path for order creation via Supabase Edge Function
- Password recovery handling with PKCE-ready auth configuration
- SPA routing with deployment-friendly redirect config (Netlify)

## Repository Structure

```text
DeveloperTheExplorer/
├─ backend/
│  ├─ index.js
│  └─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ dashboard/
│  │  │  ├─ signup.jsx
│  │  │  ├─ Event.jsx
│  │  │  ├─ Bookslot.jsx
│  │  │  ├─ useAuthGuard.jsx
│  │  │  └─ useUserProfile.js
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ supabase/
│  │  └─ supabase.js
│  ├─ netlify.toml
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

## Architecture

1. Frontend (React + Vite)
- Handles UI, routing, and user interactions.
- Uses Supabase JS client for auth/session/user queries.
- Uses guarded routes/pages for authenticated flows.

2. Supabase (external service)
- Auth provider for login/session management.
- Database source for booking and user-related records.
- Edge Function entry point for order creation logic.

3. Backend (Express)
- Currently minimal and exposes a simple root endpoint.
- Can be expanded for custom server-side business logic.

## Tech Stack

Frontend:
- React 19
- Vite 7
- React Router
- Tailwind CSS 4
- Lucide icons, Framer Motion, GSAP

Auth and data:
- Supabase JS client

Backend:
- Express 5

Deployment:
- Netlify-ready frontend config via netlify.toml

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm
- Supabase project (URL + key)
- Razorpay setup for payment flow (when booking flow is used)

## Environment Configuration

Create a file named .env inside frontend with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_or_publishable_key
```

Used by:
- frontend/supabase/supabase.js

Notes:
- Variables prefixed with VITE_ are exposed to frontend build.
- Use publishable/anon-safe keys only on frontend.

## Local Development

### 1. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Run frontend dev server

```bash
cd frontend
npm run dev
```

Expected default URL:
- http://localhost:5173

### 3. Run backend service

In a separate terminal:

```bash
cd backend
node index.js
```

Expected backend URL:
- http://localhost:8000

Current endpoint:
- GET / returns a small JSON payload.

## Application Routes

Configured in frontend/src/App.jsx:

- / -> Landing page
- /login -> Login page
- /event -> Event dashboard page
- /bookslot -> Slot booking page
- /terms -> Terms and conditions
- /cancellations -> Cancellations and refund policy
- /privacy -> Privacy policy
- /update-password -> Password recovery/update flow
- * -> 404 page

## Authentication Flow

Supabase client setup in frontend/supabase/supabase.js uses:

- flowType: pkce
- detectSessionInUrl: true
- persistSession: true
- autoRefreshToken: true

Behavior summary:

1. User signs in from dashboard/signup.jsx.
2. Supabase creates session.
3. App listens to auth state in App.jsx.
4. URL tokens/query params from callback are cleaned after processing.
5. Guarded pages (for example booking/event experience) rely on useAuthGuard to redirect unauthenticated users.

## Booking and Payment Flow

Primary logic in frontend/src/dashboard/Bookslot.jsx:

1. Guard checks active user session.
2. System checks whether user already has a successful booking.
3. System checks booking counts/cap.
4. Ticket tier and pricing are derived in UI logic.
5. Frontend invokes Supabase Edge Function create-order.
6. Razorpay checkout opens using returned order details.
7. On dismiss/cancel, booking status is updated as cancelled.
8. On successful flow, user is redirected to event page.

Important:
- Keep pricing and validation authoritative on server/edge function side where possible.
- Frontend should send minimal trusted inputs, not final payable amount.

## Supabase Requirements

This project expects Supabase resources aligned with code usage:

- Auth enabled for email/password and recovery flows.
- Table: bookings (fields inferred from usage)
	- id
	- user_id
	- payment_status
	- ticket_type
	- amount
- Edge Function: create-order
	- Must return order and integration data required by Razorpay flow.

You should also apply:

- Row Level Security policies for bookings access/update.
- Restrictive policies to avoid cross-user access.
- Server-side validation for seat limits and ticket calculation.

## Build and Deployment

### Frontend build

```bash
cd frontend
npm run build
```

Output directory:
- frontend/dist

### Frontend deployment notes

Netlify config is already present in frontend/netlify.toml:

- Publish directory: dist
- Build command: npm run build
- SPA redirect: /* -> /index.html (200)

### Backend deployment notes

Current backend is minimal and can be hosted on any Node-compatible platform.
If you expand backend responsibilities, add a start script and environment-based port handling.

## Scripts Reference

Frontend (frontend/package.json):

- npm run dev: start dev server
- npm run build: create production build
- npm run preview: preview local build output
- npm run lint: run eslint checks

Backend (backend/package.json):

- npm test: placeholder script

Run backend directly:

- node index.js

## Troubleshooting

1. Blank page or auth redirect loop
- Confirm frontend .env values are correct.
- Ensure allowed redirect URLs are configured in Supabase auth settings.
- Verify callback URL and app base URL match your environment.

2. Login works but protected page redirects
- Check Supabase session persistence.
- Inspect useAuthGuard behavior and browser storage policies.

3. Booking flow fails at order creation
- Verify Supabase Edge Function create-order is deployed.
- Check function logs for payload or validation errors.

4. Payment popup does not proceed
- Ensure Razorpay script/integration is loaded where required.
- Verify order id/key values returned by function are valid.

5. Client-side routes fail after deploy
- Confirm SPA rewrite rule is active (already set for Netlify).

## Security Notes

- Do not place service-role secrets in frontend env files.
- Validate price/ticket eligibility on server or edge function.
- Apply strict RLS policies for all user data tables.
- Sanitize/validate all inputs before persistence.

## Contribution Guide

Recommended workflow:

1. Create feature branch.
2. Implement scoped changes.
3. Run frontend lint/build locally.
4. Test auth and booking flows.
5. Open PR with change summary and screenshots for UI updates.

## Current Limitations

- Backend API is currently very limited.
- Some business-critical logic appears frontend-driven and should be reinforced server-side.
- No automated test suite is currently defined in this repository.

## License

No license file is currently present at repository root.
If this project is intended for open-source use, add a standard license file (for example MIT).
