import { EMPLOYER_EMPLOYMENT_TYPES } from "../../constants/employerFormOptions";

export const JOB_POST_STEPS = [
  { id: 1, label: "Basic Info", key: "basic" },
  { id: 2, label: "Job Details", key: "details" },
  { id: 3, label: "Salary", key: "salary" },
  { id: 4, label: "Screening", key: "screening" },
  { id: 5, label: "Preview & Publish", key: "preview" },
];

export const JOB_TYPES = [...EMPLOYER_EMPLOYMENT_TYPES];

export const SALARY_TYPES = ["Fixed Salary", "Salary Range", "Commission Based"];

export const SALARY_PERIODS = ["Per Month", "Per Year"];

export const LISTING_TYPES = {
  STANDARD: "standard",
  FEATURED: "featured",
};

/** Major Indian cities — extend in one place as the product grows */
export const JOB_CITY_OPTIONS = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Coimbatore",
  "Kochi",
  "Chandigarh",
];

export const MIN_EXPERIENCE_OPTIONS = [
  "Fresher",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-8 years",
  "8-12 years",
  "12+ years",
];

export const EDUCATION_OPTIONS = [
  "10th pass",
  "12th pass",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "Doctorate",
  "Any graduate",
];

export const DEFAULT_SCREENING = {
  experience: true,
  locationComfort: true,
  immediateJoin: false,
  salaryComfort: false,
  customQuestions: [],
  preferredExperience: "",
  preferredEducation: "",
  autoShortlist: true,
};

export const createInitialJobState = (overrides = {}) => ({
  hiringFor: "",
  title: "",
  jobType: "Full Time",
  openings: 1,
  city: "",
  area: "",
  description: "",
  responsibilities: "",
  skills: [],
  minExperience: "",
  education: "",
  salaryType: "Salary Range",
  minSalary: "",
  maxSalary: "",
  salaryPeriod: "Per Month",
  benefits: {
    healthInsurance: true,
    travelAllowance: true,
    pf: true,
    esi: false,
    incentives: false,
  },
  bonuses: {
    performance: true,
    joining: false,
    commission: false,
  },
  screening: { ...DEFAULT_SCREENING },
  listingType: LISTING_TYPES.STANDARD,
  ...overrides,
});

export function mapApiJobToForm(job) {
  if (!job) return createInitialJobState();
  return createInitialJobState({
    hiringFor: job.hiringFor ?? "",
    title: job.title ?? "",
    jobType: job.jobType ?? "Full Time",
    openings: job.openings ?? 1,
    city: job.city ?? "",
    area: job.area ?? "",
    description: job.description ?? "",
    responsibilities: job.responsibilities ?? "",
    skills: Array.isArray(job.skills) ? job.skills : [],
    minExperience: job.minExperience ?? "",
    education: job.education ?? "",
    salaryType: job.salaryType ?? "Salary Range",
    minSalary: job.minSalary ?? "",
    maxSalary: job.maxSalary ?? "",
    salaryPeriod: job.salaryPeriod ?? "Per Month",
    benefits: { ...createInitialJobState().benefits, ...(job.benefits || {}) },
    bonuses: { ...createInitialJobState().bonuses, ...(job.bonuses || {}) },
    screening: {
      ...DEFAULT_SCREENING,
      ...(job.screening || {}),
      customQuestions: Array.isArray(job.screening?.customQuestions)
        ? job.screening.customQuestions
        : [],
    },
    listingType: job.listingType === LISTING_TYPES.FEATURED ? LISTING_TYPES.FEATURED : LISTING_TYPES.STANDARD,
  });
}

export function buildJobPayload(form, status, { companyNameFallback = "" } = {}) {
  const fallback = String(companyNameFallback || "").trim();
  const hiringFor = form.hiringFor?.trim() || fallback;
  return {
    status,
    hiringFor,
    title: form.title?.trim() || "",
    jobType: form.jobType,
    openings: Number(form.openings) || 1,
    city: form.city?.trim() || "",
    area: form.area?.trim() || "",
    description: form.description?.trim() || "",
    responsibilities: form.responsibilities?.trim() || "",
    skills: form.skills || [],
    minExperience: form.minExperience?.trim() || "",
    education: form.education?.trim() || "",
    salaryType: form.salaryType,
    minSalary: String(form.minSalary ?? "").trim(),
    maxSalary: String(form.maxSalary ?? "").trim(),
    salaryPeriod: form.salaryPeriod,
    benefits: form.benefits,
    bonuses: form.bonuses,
    screening: {
      ...DEFAULT_SCREENING,
      ...form.screening,
      customQuestions: form.screening?.customQuestions || [],
    },
    listingType: form.listingType || LISTING_TYPES.STANDARD,
  };
}
