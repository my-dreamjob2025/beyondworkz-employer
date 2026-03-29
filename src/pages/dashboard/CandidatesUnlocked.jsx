import { useMemo, useState } from "react";

const CandidatesUnlocked = () => {
  const [selectedCount] = useState(0);
  const unlocked = useMemo(() => [], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Unlocked Candidates
          </h1>
          <p className="text-slate-600 mt-1">
            Contact unlocks are not tracked in the API yet—use Applications for candidate contact details
            you already have from applicants.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Export Contacts
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-full text-white bg-[#2563EB] hover:bg-[#1248C1]"
          >
            Download Data
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="relative">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, skill, or job role"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              "Job Role",
              "Experience",
              "Location",
              "Availability",
              "Interview Status",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {label}
                <svg
                  className="w-3 h-3 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Bulk actions */}
        {selectedCount > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-slate-600">
              <span className="font-semibold">{selectedCount}</span> Candidate Selected
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs md:text-sm"
              >
                Download Contacts
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs md:text-sm"
              >
                Send Bulk Message
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-full bg-[#2563EB] text-white text-xs md:text-sm font-semibold hover:bg-[#1248C1]"
              >
                Schedule Interviews
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Candidate cards */}
      <div className="space-y-4">
        {unlocked.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-600">
            <p className="font-medium text-slate-900">No unlocked contacts</p>
            <p className="mt-2">Unlock candidate contacts from search or saved lists to see them here.</p>
          </div>
        ) : (
          unlocked.map((c, idx) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-2 rounded border-slate-300" />
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {c.name}
                  </h2>
                  <p className="text-xs text-slate-500">{c.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {c.location} • Last Active: {c.lastActive}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                  idx === 0
                    ? "bg-blue-50 text-[#2563EB]"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)] gap-4 text-xs text-slate-700">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-slate-400 text-[11px]">Phone</p>
                  <p className="mt-0.5 font-medium text-slate-900">
                    {c.phone}
                  </p>
                </div>
                <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <p className="text-slate-400 text-[11px]">Email</p>
                  <p className="mt-0.5 font-medium text-slate-900 truncate">
                    {c.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-400 text-[11px]">Experience</p>
                  <p className="mt-0.5 text-slate-800">{c.experience}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[11px]">Expected Salary</p>
                  <p className="mt-0.5 text-slate-800">{c.expectedSalary}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 text-[11px]">Top Skills</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {c.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
              <p className="text-xs text-slate-500">
                Unlocked: {c.unlockedAgo}
              </p>
              <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                <button
                  type="button"
                  onClick={() => window.location.assign("/dashboard/candidates/profile")}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#2563EB] text-white hover:bg-[#1248C1]"
                >
                  {idx === 0 ? "Call Candidate" : "Schedule Interview"}
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidatesUnlocked;

