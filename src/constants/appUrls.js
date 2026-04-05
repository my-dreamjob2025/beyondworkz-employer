/**
 * Job seeker (employee) app — public marketing & job search. Set VITE_EMPLOYEE_APP_URL in .env for production.
 * @example VITE_EMPLOYEE_APP_URL=https://jobs.beyondworkz.com
 */
export const EMPLOYEE_APP_ORIGIN = (
  import.meta.env.VITE_EMPLOYEE_APP_URL || "http://localhost:5173"
).replace(/\/$/, "");

export const employeePublicUrls = {
  jobs: `${EMPLOYEE_APP_ORIGIN}/jobs`,
  companies: `${EMPLOYEE_APP_ORIGIN}/companies`,
  salaryCalculator: `${EMPLOYEE_APP_ORIGIN}/salary-calculator`,
  resumeBuilder: `${EMPLOYEE_APP_ORIGIN}/resume-builder`,
  careerResources: `${EMPLOYEE_APP_ORIGIN}/career-resources`,
  about: `${EMPLOYEE_APP_ORIGIN}/about`,
  mission: `${EMPLOYEE_APP_ORIGIN}/mission`,
  careers: `${EMPLOYEE_APP_ORIGIN}/careers`,
  privacy: `${EMPLOYEE_APP_ORIGIN}/privacy`,
  terms: `${EMPLOYEE_APP_ORIGIN}/terms`,
};

/** Same app (employer) — use with react-router <Link to={...}> */
export const employerAppPaths = {
  dashboard: "/dashboard",
  postJob: "/dashboard/jobs/new",
  browseCandidates: "/dashboard/candidates",
  pricing: "/dashboard/credits",
  register: "/register",
  login: "/login",
};
