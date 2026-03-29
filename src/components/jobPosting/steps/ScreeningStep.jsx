import { useState } from "react";
import FormShell from "../FormShell";
import { EDUCATION_OPTIONS, MIN_EXPERIENCE_OPTIONS } from "../../../features/jobPosting/constants";

const field =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent";

const PRESCREEN = [
  ["experience", "Do you have relevant experience for this role?"],
  ["locationComfort", "Are you comfortable with the job location?"],
  ["immediateJoin", "Are you available to join immediately?"],
  ["salaryComfort", "Are you comfortable with the salary range?"],
];

const ScreeningStep = ({ job, setJob }) => {
  const [questionInput, setQuestionInput] = useState("");

  const toggleField = (screenerKey) => {
    setJob((prev) => ({
      ...prev,
      screening: {
        ...prev.screening,
        [screenerKey]: !prev.screening[screenerKey],
      },
    }));
  };

  const handleScreeningChange = (key, value) => {
    setJob((prev) => ({
      ...prev,
      screening: { ...prev.screening, [key]: value },
    }));
  };

  const addQuestion = () => {
    const value = questionInput.trim();
    if (!value) return;
    setJob((prev) => ({
      ...prev,
      screening: {
        ...prev.screening,
        customQuestions: [...prev.screening.customQuestions, value],
      },
    }));
    setQuestionInput("");
  };

  const removeQuestion = (index) => {
    setJob((prev) => ({
      ...prev,
      screening: {
        ...prev.screening,
        customQuestions: prev.screening.customQuestions.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <FormShell
      title="Candidate screening"
      description="Optional pre-screen questions and preferences. You can refine this later without republishing core role details."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Pre-screening toggles</p>
          <div className="space-y-2">
            {PRESCREEN.map(([key, label]) => {
              const checked = job.screening[key];
              return (
                <label key={key} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => toggleField(key)}
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      checked ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-slate-300 bg-white"
                    }`}
                  >
                    {checked ? "✓" : ""}
                  </button>
                  {label}
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Custom questions</p>
          <div className="space-y-2">
            {job.screening.customQuestions.map((q, index) => (
              <div
                key={`${index}-${q.slice(0, 12)}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm gap-2"
              >
                <span className="text-slate-700 break-words">{q}</span>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-slate-400 hover:text-slate-600 text-xs shrink-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a short question for applicants"
              className={`${field} placeholder-slate-400 flex-1`}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addQuestion();
                }
              }}
            />
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#2563EB] border border-[#2563EB1A] bg-white hover:bg-[#2563EB1A] transition-colors shrink-0"
            >
              Add question
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="prefExp">
              Preferred experience
            </label>
            <select
              id="prefExp"
              className={field}
              value={job.screening.preferredExperience}
              onChange={(e) => handleScreeningChange("preferredExperience", e.target.value)}
            >
              <option value="">No preference</option>
              {MIN_EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="prefEdu">
              Preferred education
            </label>
            <select
              id="prefEdu"
              className={field}
              value={job.screening.preferredEducation}
              onChange={(e) => handleScreeningChange("preferredEducation", e.target.value)}
            >
              <option value="">No preference</option>
              {EDUCATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">Auto-shortlist</p>
            <p className="text-xs text-slate-500 max-w-md">
              When enabled, candidates who match toggles above can be highlighted in your pipeline
              (workflow rules can evolve independently).
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={job.screening.autoShortlist}
            onClick={() => toggleField("autoShortlist")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
              job.screening.autoShortlist ? "bg-[#F97316]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                job.screening.autoShortlist ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </FormShell>
  );
};

export default ScreeningStep;
