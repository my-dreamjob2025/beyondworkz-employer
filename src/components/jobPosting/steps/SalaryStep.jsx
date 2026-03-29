import FormShell from "../FormShell";
import { SALARY_PERIODS, SALARY_TYPES } from "../../../features/jobPosting/constants";

const field =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent";

const BENEFIT_ROWS = [
  ["healthInsurance", "Health insurance"],
  ["travelAllowance", "Travel allowance"],
  ["pf", "PF"],
  ["esi", "ESI"],
  ["incentives", "Incentives"],
];

const BONUS_ROWS = [
  ["performance", "Performance bonus"],
  ["joining", "Joining bonus"],
  ["commission", "Commission"],
];

const SalaryStep = ({ job, setJob }) => {
  const handleChange = (key, value) => {
    setJob((prev) => ({ ...prev, [key]: value }));
  };

  const toggleBenefit = (key) => {
    setJob((prev) => ({
      ...prev,
      benefits: { ...prev.benefits, [key]: !prev.benefits[key] },
    }));
  };

  const toggleBonus = (key) => {
    setJob((prev) => ({
      ...prev,
      bonuses: { ...prev.bonuses, [key]: !prev.bonuses[key] },
    }));
  };

  return (
    <FormShell
      title="Salary & compensation"
      description="Transparent pay ranges improve trust and reduce mismatched applicants."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Salary type</span>
          <div className="flex flex-wrap gap-1 rounded-xl bg-slate-50 p-1">
            {SALARY_TYPES.map((type) => {
              const isActive = job.salaryType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("salaryType", type)}
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="minSalary">
              Minimum (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
              <input
                id="minSalary"
                type="text"
                inputMode="decimal"
                className={`${field} pl-7`}
                value={job.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value.replace(/[^\d.,]/g, ""))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="maxSalary">
              Maximum (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">₹</span>
              <input
                id="maxSalary"
                type="text"
                inputMode="decimal"
                className={`${field} pl-7`}
                value={job.maxSalary}
                onChange={(e) => handleChange("maxSalary", e.target.value.replace(/[^\d.,]/g, ""))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="salaryPeriod">
              Period
            </label>
            <select
              id="salaryPeriod"
              className={field}
              value={job.salaryPeriod}
              onChange={(e) => handleChange("salaryPeriod", e.target.value)}
            >
              {SALARY_PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Benefits</p>
          <div className="flex flex-wrap gap-2">
            {BENEFIT_ROWS.map(([key, label]) => {
              const checked = job.benefits[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleBenefit(key)}
                  className={`px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2 ${
                    checked
                      ? "border-[#2563EB] bg-[#2563EB1A] text-[#2563EB]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      checked ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Bonus / incentives</p>
          <div className="flex flex-wrap gap-2">
            {BONUS_ROWS.map(([key, label]) => {
              const checked = job.bonuses[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleBonus(key)}
                  className={`px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium flex items-center gap-2 ${
                    checked
                      ? "border-[#2563EB] bg-[#2563EB1A] text-[#2563EB]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      checked ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </FormShell>
  );
};

export default SalaryStep;
