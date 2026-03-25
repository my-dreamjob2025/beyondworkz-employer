import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Job Details" },
  { id: 3, label: "Salary" },
  { id: 4, label: "Screening" },
  { id: 5, label: "Preview & Publish" },
];

const initialJob = {
  hiringFor: "",
  title: "",
  jobType: "Full Time",
  openings: 1,
  city: "",
  area: "",
  description: "",
  responsibilities: "",
  skills: ["Sales", "Communication"],
  minExperience: "",
  education: "",
  salaryType: "Salary Range",
  minSalary: "15000",
  maxSalary: "25000",
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
  screening: {
    experience: true,
    locationComfort: true,
    immediateJoin: false,
    salaryComfort: false,
    customQuestions: [],
    preferredExperience: "",
    preferredEducation: "",
    autoShortlist: true,
  },
};

const StepHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
        <p className="text-slate-500 mt-1">
          Provide the details below to create your job listing.
        </p>
      </div>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-[#1447E6] border border-[#1447E6]/10 rounded-lg bg-[#EEF2FF] hover:bg-[#E0EAFF] transition-colors"
      >
        Use Templates
      </button>
    </div>
  );
};

const Stepper = ({ activeStep }) => {
  return (
    <ol className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isCompleted = step.id < activeStep;

        return (
          <li key={step.id} className="flex-1 flex items-center">
            <div className="flex items-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  isCompleted
                    ? "bg-[#1447E6] text-white"
                    : isActive
                    ? "bg-[#1447E6]/10 text-[#1447E6]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {step.id}
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  isActive || isCompleted ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-3 bg-slate-200" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

const BasicInfoStep = ({ job, setJob }) => {
  const handleChange = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpeningsChange = (delta) => {
    setJob((prev) => ({
      ...prev,
      openings: Math.max(1, prev.openings + delta),
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Basic Job Information
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Provide the basic details to start creating your job listing. Marked
        fields are mandatory.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Hiring For*
          </label>
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
            value={job.hiringFor}
            onChange={(e) => handleChange("hiringFor", e.target.value)}
          >
            <option value="">Your Company</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Job Title / Designation*
          </label>
          <input
            type="text"
            placeholder="Eg. Sales Executive"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
            value={job.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Job Type*</label>
          <div className="inline-flex rounded-full bg-slate-50 p-1">
            {["Full Time", "Part Time", "Contract", "Internship"].map((type) => {
              const isActive = job.jobType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("jobType", type)}
                  className={`px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition-colors ${
                    isActive
                      ? "bg-[#1447E6] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Number of Openings*
          </label>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2">
            <button
              type="button"
              onClick={() => handleOpeningsChange(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-slate-500 hover:bg-white"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-semibold text-slate-900">
              {job.openings}
            </span>
            <button
              type="button"
              onClick={() => handleOpeningsChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-lg text-slate-500 hover:bg-white"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">City*</label>
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
            value={job.city}
            onChange={(e) => handleChange("city", e.target.value)}
          >
            <option value="">Select City</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Area / Locality*
          </label>
          <input
            type="text"
            placeholder="Enter area or locality"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
            value={job.area}
            onChange={(e) => handleChange("area", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const JobDetailsStep = ({ job, setJob }) => {
  const handleChange = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }));
  };

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    setJob((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
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
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Job Details</h2>
      <p className="text-sm text-slate-500 mb-6">
        Add detailed information to help candidates understand the role better.
        Marked fields are mandatory.
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Job Description*
          </label>
          <textarea
            rows={4}
            placeholder="Describe the primary purpose and overall expectations of this role..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent resize-none"
            value={job.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Key Responsibilities*
          </label>
          <textarea
            rows={4}
            placeholder="• List the core day-to-day responsibilities..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent resize-none"
            value={job.responsibilities}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Required Skills*
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium text-[#1447E6]"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-[#1447E6]/80 hover:text-[#1447E6]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Add skills (e.g. Marketing, CRM)"
              className="flex-1 min-w-[200px] rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
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
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1447E6] hover:bg-[#1237b5] transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Minimum Experience*
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              value={job.minExperience}
              onChange={(e) => handleChange("minExperience", e.target.value)}
            >
              <option value="">Select experience</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Education*
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              value={job.education}
              onChange={(e) => handleChange("education", e.target.value)}
            >
              <option value="">Select education requirement</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const SalaryStep = ({ job, setJob }) => {
  const handleChange = (field, value) => {
    setJob((prev) => ({ ...prev, [field]: value }));
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
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Salary & Compensation
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Provide salary details to attract the right candidates.
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Salary Type
          </label>
          <div className="inline-flex rounded-full bg-slate-50 p-1">
            {["Fixed Salary", "Salary Range", "Commission Based"].map((type) => {
              const isActive = job.salaryType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("salaryType", type)}
                  className={`px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition-colors ${
                    isActive
                      ? "bg-[#1447E6] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Minimum Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                ₹
              </span>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                value={job.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Maximum Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                ₹
              </span>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                value={job.maxSalary}
                onChange={(e) => handleChange("maxSalary", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Salary Period
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              value={job.salaryPeriod}
              onChange={(e) => handleChange("salaryPeriod", e.target.value)}
            >
              <option value="Per Month">Per Month</option>
              <option value="Per Year">Per Year</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">
            Additional Benefits
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              ["healthInsurance", "Health Insurance"],
              ["travelAllowance", "Travel Allowance"],
              ["pf", "PF"],
              ["esi", "ESI"],
              ["incentives", "Incentives"],
            ].map(([key, label]) => {
              const checked = job.benefits[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleBenefit(key)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 ${
                    checked
                      ? "border-[#1447E6] bg-[#EEF2FF] text-[#1447E6]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      checked
                        ? "border-[#1447E6] bg-[#1447E6] text-white"
                        : "border-slate-300 bg-white"
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
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              Incentive or Bonus
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              ["performance", "Performance Bonus"],
              ["joining", "Joining Bonus"],
              ["commission", "Commission"],
            ].map(([key, label]) => {
              const checked = job.bonuses[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleBonus(key)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 ${
                    checked
                      ? "border-[#1447E6] bg-[#EEF2FF] text-[#1447E6]"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      checked
                        ? "border-[#1447E6] bg-[#1447E6] text-white"
                        : "border-slate-300 bg-white"
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
    </div>
  );
};

const ScreeningStep = ({ job, setJob }) => {
  const toggleField = (field) => {
    setJob((prev) => ({
      ...prev,
      screening: {
        ...prev.screening,
        [field]: !prev.screening[field],
      },
    }));
  };

  const handleChange = (field, value) => {
    setJob((prev) => ({
      ...prev,
      screening: {
        ...prev.screening,
        [field]: value,
      },
    }));
  };

  const [questionInput, setQuestionInput] = useState("");

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
        customQuestions: prev.screening.customQuestions.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Candidate Screening
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Add screening questions to filter the most relevant candidates.
      </p>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">
            Pre-screening Questions
          </p>
          <div className="space-y-2">
            {[
              ["experience", "Do you have relevant experience for this role?"],
              ["locationComfort", "Are you comfortable with the job location?"],
              ["immediateJoin", "Are you available to join immediately?"],
              ["salaryComfort", "Are you comfortable with the salary range?"],
            ].map(([key, label]) => {
              const checked = job.screening[key];
              return (
                <label
                  key={key}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <button
                    type="button"
                    onClick={() => toggleField(key)}
                    className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      checked
                        ? "border-[#1447E6] bg-[#1447E6] text-white"
                        : "border-slate-300 bg-white"
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
          <p className="text-sm font-medium text-slate-700">
            Custom Screening Question
          </p>
          <div className="space-y-2">
            {job.screening.customQuestions.map((q, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-700">{q}</span>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Add your own question for candidates"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
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
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#1447E6] border border-[#1447E6]/20 bg-white hover:bg-[#EEF2FF] transition-colors"
            >
              Add Question
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Preferred Experience
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              value={job.screening.preferredExperience}
              onChange={(e) =>
                handleChange("preferredExperience", e.target.value)
              }
            >
              <option value="">Select experience level</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Preferred Education
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
              value={job.screening.preferredEducation}
              onChange={(e) =>
                handleChange("preferredEducation", e.target.value)
              }
            >
              <option value="">Select education level</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">Auto Shortlist</p>
            <p className="text-xs text-slate-500">
              Automatically shortlist candidates who meet all selected criteria.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleField("autoShortlist")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              job.screening.autoShortlist ? "bg-[#F97316]" : "bg-slate-300"
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
    </div>
  );
};

const PreviewStep = ({ job }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Review Your Job Post
      </h2>
      <p className="text-sm text-slate-500">
        Check all details before publishing your job. You can go back and edit
        any section.
      </p>

      <div className="space-y-6">
        <section className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">
              Basic Information
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p>
              <span className="text-slate-500">Job Title</span>
              <br />
              <span className="text-slate-900 font-medium">
                {job.title || "-"}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Hiring Type</span>
              <br />
              <span className="text-slate-900 font-medium">
                {job.hiringFor || "Internal"}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Job Type</span>
              <br />
              <span className="text-slate-900 font-medium">{job.jobType}</span>
            </p>
            <p>
              <span className="text-slate-500">Openings</span>
              <br />
              <span className="text-slate-900 font-medium">
                {job.openings}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Location</span>
              <br />
              <span className="text-slate-900 font-medium">
                {job.city || "-"}
                {job.area ? `, ${job.area}` : ""}
              </span>
            </p>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">Job Details</p>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Job Description</p>
              <p className="text-slate-800 whitespace-pre-line">
                {job.description || "-"}
              </p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Key Responsibilities</p>
              <p className="text-slate-800 whitespace-pre-line">
                {job.responsibilities || "-"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <p>
                <span className="text-slate-500">Skills Required</span>
                <br />
                <span className="text-slate-900 font-medium">
                  {job.skills.join(", ") || "-"}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Experience</span>
                <br />
                <span className="text-slate-900 font-medium">
                  {job.minExperience || "-"}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Education</span>
                <br />
                <span className="text-slate-900 font-medium">
                  {job.education || "-"}
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">
              Salary & Benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p>
              <span className="text-slate-500">Salary Range</span>
              <br />
              <span className="text-slate-900 font-medium">
                ₹{job.minSalary || "0"} - ₹{job.maxSalary || "0"} /{" "}
                {job.salaryPeriod === "Per Month" ? "month" : "year"}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Additional Benefits</span>
              <br />
              <span className="text-slate-900 font-medium">
                {Object.entries(job.benefits)
                  .filter(([, v]) => v)
                  .map(([k]) => k)
                  .join(", ") || "-"}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Bonus / Incentives</span>
              <br />
              <span className="text-slate-900 font-medium">
                {Object.entries(job.bonuses)
                  .filter(([, v]) => v)
                  .map(([k]) => k)
                  .join(", ") || "-"}
              </span>
            </p>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">
              Screening Questions
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <ul className="space-y-2">
              {[
                ["experience", "Do you have relevant experience for this role?"],
                ["locationComfort", "Are you comfortable with the job location?"],
                ["immediateJoin", "Are you available to join immediately?"],
                ["salaryComfort", "Are you comfortable with the salary range?"],
              ]
                .filter(([key]) => job.screening[key])
                .map(([key, label]) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{label}</span>
                  </li>
                ))}
              {job.screening.customQuestions.map((q, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border border-slate-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Job Visibility
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              className="flex-1 rounded-xl border-2 border-[#1447E6] bg-[#EEF2FF] px-4 py-3 text-left"
            >
              <p className="text-sm font-semibold text-slate-900">
                Standard Listing
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Visible to all candidates matching criteria in standard search
                results.
              </p>
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-left hover:border-slate-300"
            >
              <p className="text-sm font-semibold text-slate-900">
                Featured Listing
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Promoted at the top of search results and highlighted in emails.
              </p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const PostNewJob = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [job, setJob] = useState(initialJob);

  const isFirstStep = activeStep === 1;
  const isLastStep = activeStep === steps.length;

  const goBack = () => {
    if (isFirstStep) {
      navigate("/dashboard/jobs");
    } else {
      setActiveStep((prev) => Math.max(1, prev - 1));
    }
  };

  const goNext = () => {
    if (!isLastStep) {
      setActiveStep((prev) => Math.min(steps.length, prev + 1));
    }
  };

  const handleSaveDraft = () => {
    // TODO: Integrate with backend draft API
    console.log("Save draft", job);
  };

  const handlePublish = () => {
    // TODO: Integrate with backend publish API and credits flow
    console.log("Publish job", job);
  };

  let content = null;
  if (activeStep === 1) content = <BasicInfoStep job={job} setJob={setJob} />;
  if (activeStep === 2) content = <JobDetailsStep job={job} setJob={setJob} />;
  if (activeStep === 3) content = <SalaryStep job={job} setJob={setJob} />;
  if (activeStep === 4) content = <ScreeningStep job={job} setJob={setJob} />;
  if (activeStep === 5) content = <PreviewStep job={job} />;

  return (
    <div className="space-y-6">
      <StepHeader activeStep={activeStep} />
      <Stepper activeStep={activeStep} />
      {content}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={isLastStep ? handlePublish : goNext}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#1447E6] hover:bg-[#1237b5] flex items-center gap-2"
          >
            {isLastStep ? "Publish Job" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNewJob;

