const metricCards = [
  {
    label: "Applications Received",
    value: "1,248",
    delta: "+12% this month",
    deltaColor: "text-emerald-600",
    iconBg: "bg-blue-50",
  },
  {
    label: "Profile Unlocks",
    value: "342",
    delta: "+5% this month",
    deltaColor: "text-emerald-600",
    iconBg: "bg-amber-50",
  },
  {
    label: "Interviews Scheduled",
    value: "89",
    delta: "-2% this month",
    deltaColor: "text-rose-600",
    iconBg: "bg-violet-50",
  },
  {
    label: "Hires Made",
    value: "14",
    delta: "+1% this month",
    deltaColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

const trendPoints = [30, 55, 48, 70, 65];

const recentApplications = [
  {
    id: 1,
    initials: "RS",
    name: "Rahul Sharma",
    role: "React Developer",
    appliedDate: "20 March 2026",
    experience: "3 Years",
    status: "Shortlisted",
    statusColor: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 2,
    initials: "SL",
    name: "Sarah Lin",
    role: "Product Designer",
    appliedDate: "19 March 2026",
    experience: "5 Years",
    status: "In Review",
    statusColor: "bg-amber-50 text-amber-700",
  },
];

const ReportsAnalytics = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Reports &amp; Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track job performance and manage candidate applications.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 bg-white"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5h12M9 12h12M9 19h12M5 5h.01M5 12h.01M5 19h.01"
              />
            </svg>
            Export Report
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4"
              />
            </svg>
            Download Applications
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 lg:p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-xl">
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
              placeholder="Search candidate name or job role"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-full border border-slate-200 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
          {["Job Title", "Application Status", "Location", "Date Range"].map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs md:text-sm font-medium border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              {label}
              <svg
                className="w-3 h-3 text-slate-500"
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

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                <p className={`mt-1 text-xs font-medium ${card.deltaColor}`}>{card.delta}</p>
              </div>
              <div className={`${card.iconBg} rounded-xl w-9 h-9 flex items-center justify-center`}>
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 19h16M4 13l4-4 4 4 6-6"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)] gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Applications Trend</h2>
              <p className="text-xs text-slate-500">Weekly applications over the last month.</p>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Last 5 Weeks
            </button>
          </div>
          <div className="h-56">
            <svg viewBox="0 0 320 160" className="w-full h-full">
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="320" height="160" fill="white" />
              {[1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  x2="300"
                  y1={30 + i * 22}
                  y2={30 + i * 22}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
              <polyline
                fill="url(#trendFill)"
                stroke="none"
                points={`40,140 40,${140 - trendPoints[0]} 100,${140 - trendPoints[1]} 160,${
                  140 - trendPoints[2]
                } 220,${140 - trendPoints[3]} 280,${140 - trendPoints[4]} 280,140`}
              />
              <polyline
                fill="none"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={`40,${140 - trendPoints[0]} 100,${140 - trendPoints[1]} 160,${
                  140 - trendPoints[2]
                } 220,${140 - trendPoints[3]} 280,${140 - trendPoints[4]}`}
              />
              {[0, 1, 2, 3, 4].map((index) => {
                const x = 40 + index * 60;
                const y = 140 - trendPoints[index];
                return (
                  <circle
                    key={String(index)}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke="#2563EB"
                    strokeWidth="2"
                  />
                );
              })}
              {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"].map((label, index) => {
                const x = 40 + index * 60;
                return (
                  <text
                    key={label}
                    x={x}
                    y={152}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6B7280"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Candidate Sources</h2>
              <p className="text-xs text-slate-500">Where your candidates are coming from.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="10"
                  strokeDasharray="220 60"
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-slate-500">100%</p>
                <p className="text-[11px] font-medium text-slate-900">Total</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 text-xs">
              {[
                ["Job Posting", 45, "bg-blue-500"],
                ["Database Unlock", 30, "bg-amber-500"],
                ["Direct Application", 15, "bg-violet-500"],
                ["Referral", 10, "bg-emerald-500"],
              ].map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-slate-600">{label}</span>
                  </div>
                  <span className="font-medium text-slate-900">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Recent Applications</h2>
            <p className="text-xs text-slate-500">
              Latest applications across all your active jobs.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Bulk Actions
            <svg
              className="w-3 h-3 text-slate-500"
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
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-50">
                <th className="px-5 py-3 text-left w-10">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="px-5 py-3 text-left">Candidate</th>
                <th className="px-5 py-3 text-left">Job Role</th>
                <th className="px-5 py-3 text-left">Applied Date</th>
                <th className="px-5 py-3 text-left">Experience</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApplications.map((applicant, index) => (
                <tr key={applicant.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 align-middle">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                      defaultChecked={index === 0}
                    />
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">
                        {applicant.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{applicant.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 align-middle text-slate-700">{applicant.role}</td>
                  <td className="px-5 py-3 align-middle text-slate-700">
                    {applicant.appliedDate}
                  </td>
                  <td className="px-5 py-3 align-middle text-slate-700">
                    {applicant.experience}
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${applicant.statusColor}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-2 text-slate-400">
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">View details</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                          />
                        </svg>
                      </button>
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">Download CV</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4"
                          />
                        </svg>
                      </button>
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">More actions</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsAnalytics;

