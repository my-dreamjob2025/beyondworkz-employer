import FormShell from "../FormShell";
import { LISTING_TYPES } from "../../../features/jobPosting/constants";

const benefitLabels = {
  healthInsurance: "Health insurance",
  travelAllowance: "Travel allowance",
  pf: "PF",
  esi: "ESI",
  incentives: "Incentives",
};

const bonusLabels = {
  performance: "Performance bonus",
  joining: "Joining bonus",
  commission: "Commission",
};

const PRESCREEN_LABELS = [
  ["experience", "Do you have relevant experience for this role?"],
  ["locationComfort", "Are you comfortable with the job location?"],
  ["immediateJoin", "Are you available to join immediately?"],
  ["salaryComfort", "Are you comfortable with the salary range?"],
];

const PreviewStep = ({ job, setJob }) => {
  const setListing = (type) => {
    setJob((prev) => ({ ...prev, listingType: type }));
  };

  return (
    <FormShell
      title="Review & visibility"
      description="Confirm details before publishing. Listing type is stored with the job for future featured placements."
    >
      <div className="space-y-6">
        <section className="border border-slate-200 rounded-xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Basics</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p>
              <span className="text-slate-500 block text-xs">Title</span>
              <span className="text-slate-900 font-medium">{job.title || "—"}</span>
            </p>
            <p>
              <span className="text-slate-500 block text-xs">Hiring for</span>
              <span className="text-slate-900 font-medium">{job.hiringFor || "—"}</span>
            </p>
            <p>
              <span className="text-slate-500 block text-xs">Type</span>
              <span className="text-slate-900 font-medium">{job.jobType}</span>
            </p>
            <p>
              <span className="text-slate-500 block text-xs">Openings</span>
              <span className="text-slate-900 font-medium">{job.openings}</span>
            </p>
            <p className="sm:col-span-2">
              <span className="text-slate-500 block text-xs">Location</span>
              <span className="text-slate-900 font-medium">
                {[job.city, job.area].filter(Boolean).join(", ") || "—"}
              </span>
            </p>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Description</p>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Overview</p>
              <p className="text-slate-800 whitespace-pre-line">{job.description || "—"}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Responsibilities</p>
              <p className="text-slate-800 whitespace-pre-line">{job.responsibilities || "—"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <p>
                <span className="text-slate-500 block text-xs">Skills</span>
                <span className="text-slate-900 font-medium">
                  {job.skills?.length ? job.skills.join(", ") : "—"}
                </span>
              </p>
              <p>
                <span className="text-slate-500 block text-xs">Experience / education</span>
                <span className="text-slate-900 font-medium">
                  {[job.minExperience, job.education].filter(Boolean).join(" · ") || "—"}
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Compensation</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p>
              <span className="text-slate-500 block text-xs">Range</span>
              <span className="text-slate-900 font-medium">
                ₹{job.minSalary || "0"} – ₹{job.maxSalary || "0"} /{" "}
                {job.salaryPeriod === "Per Month" ? "month" : "year"}
              </span>
            </p>
            <p>
              <span className="text-slate-500 block text-xs">Salary type</span>
              <span className="text-slate-900 font-medium">{job.salaryType}</span>
            </p>
            <p className="sm:col-span-2">
              <span className="text-slate-500 block text-xs">Benefits</span>
              <span className="text-slate-900 font-medium">
                {Object.entries(job.benefits || {})
                  .filter(([, v]) => v)
                  .map(([k]) => benefitLabels[k] || k)
                  .join(", ") || "—"}
              </span>
            </p>
            <p className="sm:col-span-2">
              <span className="text-slate-500 block text-xs">Bonuses</span>
              <span className="text-slate-900 font-medium">
                {Object.entries(job.bonuses || {})
                  .filter(([, v]) => v)
                  .map(([k]) => bonusLabels[k] || k)
                  .join(", ") || "—"}
              </span>
            </p>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Screening</p>
          <ul className="space-y-2 text-sm">
            {PRESCREEN_LABELS.filter(([key]) => job.screening[key]).map(([key, label]) => (
              <li key={key} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
            {job.screening.customQuestions.map((q, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
            {!PRESCREEN_LABELS.some(([k]) => job.screening[k]) &&
              !(job.screening.customQuestions || []).length && (
                <li className="text-slate-500">No screening questions selected.</li>
              )}
          </ul>
        </section>

        <section>
          <p className="text-sm font-semibold text-slate-900 mb-3">Listing visibility</p>
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={() => setListing(LISTING_TYPES.STANDARD)}
              className={`flex-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                job.listingType === LISTING_TYPES.STANDARD
                  ? "border-[#2563EB] bg-[#2563EB1A]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">Standard listing</p>
              <p className="text-xs text-slate-500 mt-1">
                Visible in search and job feeds for matching candidates.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setListing(LISTING_TYPES.FEATURED)}
              className={`flex-1 rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                job.listingType === LISTING_TYPES.FEATURED
                  ? "border-[#F97316] bg-[#F973161A]"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">Featured listing</p>
              <p className="text-xs text-slate-500 mt-1">
                Mark for promoted placement when credits or campaigns are enabled.
              </p>
            </button>
          </div>
        </section>
      </div>
    </FormShell>
  );
};

export default PreviewStep;
