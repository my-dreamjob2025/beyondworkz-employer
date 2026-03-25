# Beyond Workz - Employer Portal

Employer panel for Beyond Workz job portal. Employers can register, manage company profile, post jobs, and view applicants.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4
- Redux Toolkit
- React Router 6

## Setup

1. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend API (default: `http://localhost:5001/api`).

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Ensure the Beyond Workz backend is running with employer auth routes enabled.

## Features

- **Auth**: OTP-based login and registration (employer-specific)
- **Dashboard**: Overview with stats and quick actions
- **Company Profile**: Manage company details
- **Job Postings**: Create and manage job listings
- **Applicants**: View applications (placeholder for future API integration)
- **Settings**: Account and notification preferences

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── auth/       # Auth left panel (employer branding)
│   └── layout/     # Header, Sidebar
├── hooks/          # useAuth
├── layouts/        # DashboardLayout
├── pages/          # Route pages
│   ├── auth/       # Login, Register
│   ├── dashboard/  # Dashboard, CompanyProfile, JobPostings, etc.
│   └── common/     # PageNotFound
├── routes/         # AppRoutes, ProtectedRoute
├── services/       # api, authService
├── store/          # Redux store, authSlice
└── styles/         # globals.css
```

## Design

Follows Beyond Workz design system:
- Primary blue: `#1447E6`
- Accent orange: `#F97316`
- Same auth layout as employee panel (left illustration + right form)
# beyondworkz-employer
