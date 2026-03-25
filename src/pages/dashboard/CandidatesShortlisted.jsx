const shortlisted = [
  {
    id: 1,
    name: "Rahul Sharma",
    title: "React Developer",
    location: "Pune",
    lastActive: "2 days ago",
    experience: "3 Years",
    expectedSalary: "₹6 LPA",
    status: "Interview Scheduled (22 Mar | 11:30 AM)",
    topSkills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Priya Patel",
    title: "Frontend Engineer",
    location: "Bangalore",
    lastActive: "5 hours ago",
    experience: "5 Years",
    expectedSalary: "₹12 LPA",
    status: "Shortlisted",
    topSkills: ["Vue.js", "JavaScript", "Tailwind"],
  },
];

const CandidatesShortlisted = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Shortlisted Candidates
          </h1>
          <p className="text-slate-600 mt-1">
            Manage candidates selected for the hiring process.
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
            className="px-4 py-2 rounded-full text-white bg-[#1447E6] hover:bg-[#1237b5]"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-6 text-sm border-b border-slate-200 pb-2">
          {[
            ["All", 24],
            ["Interview Scheduled", 8],
            ["Interview Completed", 3],
            ["Hired", 1],
            ["Rejected", 12],
          ].map(([label, count], idx) => {
            const active = idx === 0;
            return (
              <button
                key={label}
                type="button"
                className={`relative pb-2 text-sm font-medium ${
                  active ? "text-[#1447E6]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`ml-1 text-xs ${
                    active ? "text-[#1447E6]" : "text-slate-400"
                  }`}
                >
                  {count}
                </span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#1447E6] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
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
              placeholder="Search candidate name, skill, or job role"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              "Job Role",
              "Experience",
              "Location",
              "Interview Status",
              "Availability",
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
      </div>

      {/* Bulk actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="text-slate-600">
          <span className="font-semibold">1</span> Candidate Selected
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs md:text-sm"
          >
            Schedule Interviews
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs md:text-sm"
          >
            Send Messages
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-full bg-[#1447E6] text-white text-xs md:text-sm font-semibold hover:bg-[#1237b5]"
          >
            Mark as Hired
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs md:text-sm"
          >
            Reject Candidates
          </button>
        </div>
      </div>

      {/* Candidate cards */}
      <div className="space-y-4">
        {shortlisted.map((c, idx) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-2 rounded border-slate-300"
                  defaultChecked={idx === 0}
                />
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
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                    idx === 0
                      ? "bg-blue-50 text-[#1447E6]"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-slate-600">
              <div>
                <p className="text-slate-400">Experience</p>
                <p className="mt-0.5 text-slate-800">{c.experience}</p>
              </div>
              <div>
                <p className="text-slate-400">Expected Salary</p>
                <p className="mt-0.5 text-slate-800">{c.expectedSalary}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-slate-400">Top Skills</p>
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

            <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
              <p className="text-xs text-slate-500">
                Shortlisted: {idx === 0 ? "2 days ago" : "4 days ago"}
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
                  className="px-4 py-2 rounded-full bg-[#1447E6] text-white hover:bg-[#1237b5]"
                >
                  {idx === 0 ? "Reschedule Interview" : "Schedule Interview"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesShortlisted;

