import { Link } from "react-router-dom";
import { employerCanPostJobs, employerVerificationLabel } from "../../utils/employerVerification";

export default function EmployerVerificationBanner({ companyProfile }) {
  if (!companyProfile || employerCanPostJobs(companyProfile)) return null;

  const st = companyProfile.profileStatus;
  let tone = "amber";
  let title = "Complete company verification to post jobs";
  if (st === "pending_review") {
    tone = "blue";
    title = "Verification in progress";
  } else if (st === "rejected") {
    tone = "red";
    title = "Company verification was declined";
  } else if (st === "suspended") {
    tone = "red";
    title = "Company account suspended";
  } else if (st === "needs_revision") {
    tone = "amber";
    title = "Admin requested profile updates";
  }

  const styles = {
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    blue: "border-blue-200 bg-blue-50 text-blue-950",
    red: "border-red-200 bg-red-50 text-red-950",
  };

  return (
    <div
      className={`mb-6 rounded-xl border px-4 py-3 text-sm ${styles[tone] || styles.amber}`}
      role="status"
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 opacity-90">
        Status: {employerVerificationLabel(st)}
        {companyProfile.adminQuery ? ` — ${companyProfile.adminQuery}` : ""}
      </p>
      {st !== "suspended" ? (
        <Link
          to="/dashboard/company-profile"
          className="mt-2 inline-block font-semibold text-[#2563EB] hover:underline"
        >
          Open company profile
        </Link>
      ) : null}
    </div>
  );
}
