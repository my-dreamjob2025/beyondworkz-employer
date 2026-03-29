import FormShell from "../FormShell";
import { JOB_CITY_OPTIONS, JOB_TYPES } from "../../../features/jobPosting/constants";

const field =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent";

const BasicInfoStep = ({ job, setJob, companyNameFallback }) => {
  const handleChange = (fieldKey, value) => {
    setJob((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleOpeningsChange = (delta) => {
    setJob((prev) => ({
      ...prev,
      openings: Math.max(1, (Number(prev.openings) || 1) + delta),
    }));
  };

  const primaryOrg = companyNameFallback?.trim() || "Your organization";
  const clientValue = "Client / third-party hire";
  const presetValues = new Set(["", primaryOrg, clientValue]);
  const showCustomHiring = Boolean(job.hiringFor && !presetValues.has(job.hiringFor));

  return (
    <FormShell
      title="Basic Job Information"
      description="Marked fields are mandatory. Location and role basics help candidates find this job in search."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="hiringFor">
            Hiring for*
          </label>
          <select
            id="hiringFor"
            className={field}
            value={job.hiringFor || ""}
            onChange={(e) => handleChange("hiringFor", e.target.value)}
          >
            <option value="">Select hiring entity</option>
            <option value={primaryOrg}>{primaryOrg}</option>
            <option value={clientValue}>Client / third-party hire</option>
            {showCustomHiring ? (
              <option value={job.hiringFor}>{job.hiringFor}</option>
            ) : null}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="title">
            Job title / designation*
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Sales Executive"
            className={`${field} placeholder-slate-400`}
            value={job.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Job type*</span>
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-50 p-1">
            {JOB_TYPES.map((type) => {
              const isActive = job.jobType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("jobType", type)}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                    isActive ? "bg-[#2563EB] text-white shadow-sm" : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Number of openings*</span>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2">
            <button
              type="button"
              onClick={() => handleOpeningsChange(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-slate-500 hover:bg-white"
              aria-label="Decrease openings"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-semibold text-slate-900">{job.openings}</span>
            <button
              type="button"
              onClick={() => handleOpeningsChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-slate-500 hover:bg-white"
              aria-label="Increase openings"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="city">
            City*
          </label>
          <select
            id="city"
            className={field}
            value={job.city}
            onChange={(e) => handleChange("city", e.target.value)}
          >
            <option value="">Select city</option>
            {JOB_CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="area">
            Area / locality*
          </label>
          <input
            id="area"
            type="text"
            placeholder="e.g. Andheri East, HSR Layout"
            className={`${field} placeholder-slate-400`}
            value={job.area}
            onChange={(e) => handleChange("area", e.target.value)}
          />
        </div>
      </div>
    </FormShell>
  );
};

export default BasicInfoStep;
