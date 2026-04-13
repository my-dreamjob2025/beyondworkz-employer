/** Company profile from /employer/me */
export function employerCanPostJobs(companyProfile) {
  if (!companyProfile) return false;
  if (companyProfile.verified === true && companyProfile.profileStatus === "approved") return true;
  if (companyProfile.verified === true && companyProfile.profileStatus === "pending") return true;
  return false;
}

export function employerVerificationLabel(profileStatus) {
  const labels = {
    pending: "Draft — not submitted for verification",
    pending_review: "Under admin review",
    approved: "Verified",
    rejected: "Verification declined",
    needs_revision: "Admin requested changes",
    suspended: "Account suspended",
  };
  return labels[profileStatus] || profileStatus || "—";
}

export function employerProfileLockedForEdits(companyProfile) {
  return companyProfile?.profileStatus === "pending_review";
}
