import { useState } from "react";
import FormShell from "../FormShell";
import { EDUCATION_OPTIONS, MIN_EXPERIENCE_OPTIONS } from "../../../features/jobPosting/constants";

const field =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent";

const JobDetailsStep = ({ job, setJob }) => {
  const handleChange = (key, value) => {
    setJob((prev) => ({ ...prev, [key]: value }));
  };

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    setJob((prev) => ({
      ...prev,
      skills: prev.skills.includes(value) ? prev.skills : [...prev.skills, value],
    }));
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setJob((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  return (
    <FormShell
      title="Job details"
      description="Clear descriptions improve application quality and reduce back-and-forth."
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="description">
            Job description*
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe the role, team, and what success looks like..."
            className={`${field} placeholder-slate-400 resize-none`}
            value={job.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="responsibilities">
            Key responsibilities*
          </label>
          <textarea
            id="responsibilities"
            rows={4}
            placeholder={"• Bullet points work well\n• Day-to-day tasks and ownership"}
            className={`${field} placeholder-slate-400 resize-none`}
            value={job.responsibilities}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Required skills*</span>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-[#2563EB1A] px-3 py-1 text-xs font-medium text-[#2563EB]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-[#6E97F2] hover:text-[#2563EB]"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Add a skill and press Enter"
              className={`${field} placeholder-slate-400 flex-1 min-w-0`}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1248C1] transition-colors shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="minExperience">
              Minimum experience*
            </label>
            <select
              id="minExperience"
              className={field}
              value={job.minExperience}
              onChange={(e) => handleChange("minExperience", e.target.value)}
            >
              <option value="">Select experience</option>
              {MIN_EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="education">
              Education*
            </label>
            <select
              id="education"
              className={field}
              value={job.education}
              onChange={(e) => handleChange("education", e.target.value)}
            >
              <option value="">Select education requirement</option>
              {EDUCATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </FormShell>
  );
};

export default JobDetailsStep;
