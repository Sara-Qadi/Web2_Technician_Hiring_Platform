# Technician Hiring Platform - Frontend

## Project Overview

This repository contains the frontend application for the Technician Hiring Platform. It provides the UI for job owners to create and manage job posts, technicians to discover and respond to work, and admins to review and manage platform activity. The frontend consumes a separate Laravel REST API.

## Platform Concept

The platform addresses the gap between people who need on-demand technical services and technicians who can deliver them. The frontend focuses on the workflow of creating job requests, matching them with technicians, and managing the lifecycle of those requests through status, submissions, and communication.

## User Roles & High-Level Flow

- Job owners create job posts, review submissions, and manage job status.
- Technicians browse available posts, submit proposals, and manage their profiles.
- Admins oversee users, review pending approvals, and monitor platform metrics.

## Frontend Responsibilities

- UI and routing for role-specific areas (job owner, technician, admin).
- Form handling and client-side state via Angular services and RxJS.
- API integration via HttpClient, including token-based authentication.
- Visualization of dashboards/reports using Chart.js via ng2-charts.

## Tech Stack

- Framework: Angular 19
- State management: Angular services + RxJS (no external state library)
- Styling/UI: Angular Material, Bootstrap 5, Font Awesome, Bootstrap Icons
- Charts: Chart.js via ng2-charts
- Build tools: Angular CLI, TypeScript, Karma/Jasmine

## Prerequisites

- Node.js 18.13+ or 20.x (compatible with Angular 19)
- npm (package-lock.json is included)

## Local Setup & Run

```bash
git clone <repo-url>
cd Technician-Hiring-project
npm install
```

Configure the API base URL (see Environment Configuration below), then run:

```bash
npm start
```

The app will be available at `http://localhost:4200`.

Build for production:

```bash
npm run build
```

## Environment Configuration

The frontend calls a Laravel REST API and needs a base API URL.

Current state:

- Several services use hardcoded URLs like `http://localhost:8000/api` and `http://127.0.0.1:8000/api`.

Recommended setup:

1. Add `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
2. Define a single `apiBaseUrl` in those files.
3. Replace hardcoded URLs in services with `environment.apiBaseUrl`.

This keeps local, staging, and production configurations consistent.

## Authentication Flow

- Login and registration call the API and receive a token.
- The token is stored in `localStorage` under the key `token`.
- An HTTP interceptor (`AuthInterceptor`) adds `Authorization: Bearer <token>` to outgoing requests when a token is present.
- Logout removes the token from `localStorage`.

## API Integration

- The frontend uses Angular `HttpClient` services to communicate with the backend.
- Base URLs are currently embedded in services and include the `/api` prefix.
- Error handling is done at call sites (component/service subscriptions); there is no global error interceptor configured.

## Project Structure

```text
src/
  app/
    modules/            # Feature modules (admin, job_owner, technician, etc.)
    services/           # API services (auth, jobs, proposals, profiles, etc.)
    auth.interceptor.ts # Attaches Bearer token to requests
    app.config.ts       # App providers and HTTP setup
  assets/               # Static assets
  index.html            # App shell
  styles.css            # Global styles
```

## Common Commands

```bash
npm start        # Start dev server
npm run build    # Production build
```
