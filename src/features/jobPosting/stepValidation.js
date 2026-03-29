/**
 * Client-side step checks (fast feedback). Server remains source of truth for publish rules.
 */

export function validateStep(stepId, job, { companyNameFallback = "" } = {}) {
  switch (stepId) {
    case 1: {
      const hiring = job.hiringFor?.trim() || String(companyNameFallback || "").trim();
      if (!hiring) return "Select who you are hiring for (add a company name on your profile if empty).";
      if (!job.title?.trim()) return "Job title is required.";
      if (!job.jobType) return "Select a job type.";
      if (!job.openings || job.openings < 1) return "Number of openings must be at least 1.";
      if (!job.city?.trim()) return "City is required.";
      if (!job.area?.trim()) return "Area / locality is required.";
      return null;
    }
    case 2: {
      if (!job.description?.trim() || job.description.trim().length < 20) {
        return "Description must be at least 20 characters.";
      }
      if (!job.responsibilities?.trim() || job.responsibilities.trim().length < 10) {
        return "Responsibilities must be at least 10 characters.";
      }
      if (!job.skills?.length) return "Add at least one skill.";
      if (!job.minExperience?.trim()) return "Select minimum experience.";
      if (!job.education?.trim()) return "Select education requirement.";
      return null;
    }
    case 3: {
      if (!job.minSalary?.toString().trim() || !job.maxSalary?.toString().trim()) {
        return "Enter minimum and maximum salary.";
      }
      return null;
    }
    case 4:
      return null;
    case 5:
      return null;
    default:
      return null;
  }
}

export function validatePublish(job, { companyNameFallback = "" } = {}) {
  for (let s = 1; s <= 3; s += 1) {
    const err = validateStep(s, job, { companyNameFallback });
    if (err) return err;
  }
  return null;
}
