import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";

const CandidatesSaved = () => {
  const { user } = useAuth();
  const [selectedCount] = useState(0);
  const saved = useMemo(() => [], []);
  const creditsRemaining = user?.companyProfile?.creditBalance ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Candidates</h1>
          <p className="text-slate-600 mt-1">
            Saved profiles are not stored in the platform yet—this list stays empty until that feature is
            built.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Export List
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-full text-red-600 border border-red-200 hover:bg-red-50"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        <div className="space-y-4">
          {/* Search + filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="relative flex-1">
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
              <button
                type="button"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1248C1]"
              >
                Search
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["Location", "Experience", "Skills", "Education", "Availability"].map(
                (label) => (
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
                )
              )}
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
                  Shortlist Candidates
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs md:text-sm"
                >
                  Unlock Contacts
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs md:text-sm"
                >
                  Remove from Saved
                </button>
              </div>
            </div>
          )}

          {/* Candidate cards */}
          <div className="space-y-4">
            {saved.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-600">
                <p className="font-medium text-slate-900">No saved candidates</p>
                <p className="mt-2">Saved profiles will appear here when you add them from search.</p>
              </div>
            ) : (
              saved.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">
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
                  <p className="text-xs text-slate-500">Saved {c.savedAgo}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-600">
                  <div>
                    <p className="text-slate-400">Experience</p>
                    <p className="mt-0.5 text-slate-800">{c.experience}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Expected Salary</p>
                    <p className="mt-0.5 text-slate-800">{c.expectedSalary}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Education</p>
                    <p className="mt-0.5 text-slate-800">{c.education}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Skills</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.skills.map((skill) => (
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

                <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Shortlist
                    </button>
                    <button
                      type="button"
                      onClick={() => window.location.assign("/dashboard/candidates/profile")}
                      className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      View Profile
                    </button>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1248C1]"
                  >
                    Unlock Contact (1 Credit)
                  </button>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar credits card */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              Credits Remaining
            </p>
            <p className="text-3xl font-bold text-[#F97316]">{creditsRemaining}</p>
            <button
              type="button"
              className="w-full mt-4 py-2.5 rounded-full text-sm font-semibold text-white bg-[#F97316] hover:bg-[#CC5705]"
            >
              Buy Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesSaved;

