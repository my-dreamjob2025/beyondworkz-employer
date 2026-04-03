import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthInitializer from "../components/AuthInitializer";

import EmployerLandingPage from "../pages/landing/EmployerLandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const UserProfile = lazy(() => import("../pages/dashboard/UserProfile"));
const CompanyProfile = lazy(() => import("../pages/dashboard/CompanyProfile"));
const Credits = lazy(() => import("../pages/dashboard/Credits"));
const CreditsCheckout = lazy(() => import("../pages/dashboard/CreditsCheckout"));
const BuyCredits = lazy(() => import("../pages/dashboard/BuyCredits"));
const CandidatesSearch = lazy(() => import("../pages/dashboard/CandidatesSearch"));
const CandidatesSaved = lazy(() => import("../pages/dashboard/CandidatesSaved"));
const CandidatesShortlisted = lazy(() => import("../pages/dashboard/CandidatesShortlisted"));
const CandidatesUnlocked = lazy(() => import("../pages/dashboard/CandidatesUnlocked"));
const CandidateProfile = lazy(() => import("../pages/dashboard/CandidateProfile"));
const JobPostings = lazy(() => import("../pages/dashboard/JobPostings"));
const PostNewJob = lazy(() => import("../pages/dashboard/PostNewJob"));
const Applicants = lazy(() => import("../pages/dashboard/Applicants"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
const PlaceholderPage = lazy(() => import("../pages/dashboard/PlaceholderPage"));
const InterviewManagement = lazy(() => import("../pages/dashboard/InterviewManagement"));
const MessagesInbox = lazy(() => import("../pages/dashboard/MessagesInbox"));
const ReportsAnalytics = lazy(() => import("../pages/dashboard/ReportsAnalytics"));
const Billing = lazy(() => import("../pages/dashboard/Billing"));
const HelpSupport = lazy(() => import("../pages/dashboard/HelpSupport"));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const HomeRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <EmployerLandingPage />;
};

const AppRoutes = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthInitializer>
        <Routes>
          <Route path="/" element={<HomeRoute />} />

          <Route
            path="/login"
            element={(
              <PublicRoute>
                <Login />
              </PublicRoute>
            )}
          />
          <Route
            path="/register"
            element={(
              <PublicRoute>
                <Register />
              </PublicRoute>
            )}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <DashboardLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="jobs" element={<JobPostings />} />
            <Route
              path="jobs/new"
              element={
                <Suspense fallback={<PageLoader />}>
                  <PostNewJob />
                </Suspense>
              }
            />
            <Route
              path="jobs/:jobId/edit"
              element={
                <Suspense fallback={<PageLoader />}>
                  <PostNewJob />
                </Suspense>
              }
            />
            <Route path="applicants" element={<Applicants />} />
            <Route path="candidates" element={<CandidatesSearch />} />
            <Route path="candidates/saved" element={<CandidatesSaved />} />
            <Route path="candidates/shortlisted" element={<CandidatesShortlisted />} />
            <Route path="candidates/unlocked" element={<CandidatesUnlocked />} />
            <Route path="candidates/profile" element={<CandidateProfile />} />
            <Route
              path="interviews"
              element={
                <Suspense fallback={<PageLoader />}>
                  <InterviewManagement />
                </Suspense>
              }
            />
            <Route
              path="messages"
              element={
                <Suspense fallback={<PageLoader />}>
                  <MessagesInbox />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ReportsAnalytics />
                </Suspense>
              }
            />
            <Route path="credits" element={<Credits />} />
            <Route
              path="credits/buy"
              element={
                <Suspense fallback={<PageLoader />}>
                  <BuyCredits />
                </Suspense>
              }
            />
            <Route path="credits/checkout" element={<CreditsCheckout />} />
            <Route
              path="billing"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Billing />
                </Suspense>
              }
            />
            <Route
              path="support"
              element={
                <Suspense fallback={<PageLoader />}>
                  <HelpSupport />
                </Suspense>
              }
            />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthInitializer>
    </Router>
  );
};

export default AppRoutes;
