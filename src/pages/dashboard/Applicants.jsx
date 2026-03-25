const mockJob = {
  title: "Product Manager",
  location: "Pune",
  experience: "2–4 years",
  applications: 42,
  shortlisted: 12,
  interviews: 6,
};

const mockApplicants = [
  {
    id: 1,
    initials: "RS",
    name: "Rahul Sharma",
    experience: "3 Years",
    skills: "React, Node, TypeScript",
    appliedDate: "22 March 2026",
    status: "Applied",
    statusColor: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    initials: "AM",
    name: "Aditi Menon",
    experience: "5 Years",
    skills: "React, Next.js, Redux",
    appliedDate: "20 March 2026",
    status: "Shortlisted",
    statusColor: "bg-amber-50 text-amber-600",
  },
  {
    id: 3,
    initials: "VK",
    name: "Vikram Kumar",
    experience: "2 Years",
    skills: "React, CSS, HTML",
    appliedDate: "18 March 2026",
    status: "Interview Scheduled",
    statusColor: "bg-violet-50 text-violet-600",
  },
];

const Applicants = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
          <p className="text-slate-600 mt-1">
            Candidates who applied for this job.
          </p>
        </div>
      </div>

      {/* Job Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">
            Job Overview
          </p>
          <h2 className="text-xl font-semibold text-slate-900">
            {mockJob.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Location: {mockJob.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Experience: {mockJob.experience}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {mockJob.applications}
            </p>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Applications
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {mockJob.shortlisted}
            </p>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Shortlisted
            </p>
          </div>
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {mockJob.interviews}
            </p>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Interviews
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-full hover:bg-slate-50"
            >
              View Job Details
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#1447E6] rounded-full hover:bg-[#1237b5]"
            >
              Edit Job
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + Filters */}
      <div className="space-y-4">
        {/* Tabs row */}
        <div className="flex flex-wrap items-center gap-6 text-sm border-b border-slate-200 pb-2">
          {[
            ["All Applications", mockJob.applications],
            ["Shortlisted", mockJob.shortlisted],
            ["Interview Scheduled", mockJob.interviews],
            ["Rejected", 6],
            ["Hired", 0],
          ].map(([label, count], index) => {
            const isActive = index === 0;
            return (
              <button
                key={label}
                type="button"
                className={`relative pb-2 text-sm font-medium ${
                  isActive
                    ? "text-[#1447E6]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`${isActive ? "text-[#1447E6]" : "text-slate-400"} ml-1`}
                >
                  {count}
                </span>
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#1447E6] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search + filters row */}
        <div className="flex flex-wrap items-center gap-3">
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
              placeholder="Search candidate name or skill"
              className="pl-9 pr-3 py-2 text-sm rounded-full border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent w-[320px] max-w-full"
            />
          </div>
          {["Experience", "Skills", "Education", "Location"].map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
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

      {/* Bulk actions bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">2</span> candidates selected
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 text-xs md:text-sm font-medium text-slate-700 rounded-full border border-slate-200 hover:bg-slate-50"
            >
              Shortlist Candidates
            </button>
            <button
              type="button"
              className="px-3 py-2 text-xs md:text-sm font-medium text-slate-700 rounded-full border border-slate-200 hover:bg-slate-50"
            >
              Schedule Interviews
            </button>
            <button
              type="button"
              className="px-3 py-2 text-xs md:text-sm font-medium text-slate-700 rounded-full border border-slate-200 hover:bg-slate-50"
            >
              Export Selected
            </button>
            <button
              type="button"
              className="px-3 py-2 text-xs md:text-sm font-semibold text-red-600 rounded-full border border-red-200 bg-red-50 hover:bg-red-100"
            >
              Reject Candidates
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-50">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="px-4 py-3 text-left">Candidate</th>
                <th className="px-4 py-3 text-left">Experience</th>
                <th className="px-4 py-3 text-left">Skills</th>
                <th className="px-4 py-3 text-left">Applied Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockApplicants.map((applicant, index) => (
                <tr key={applicant.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 align-middle">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                      defaultChecked={index < 2}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">
                        {applicant.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {applicant.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-slate-700">
                    {applicant.experience}
                  </td>
                  <td className="px-4 py-3 align-middle text-slate-600">
                    {applicant.skills}
                  </td>
                  <td className="px-4 py-3 align-middle text-slate-700">
                    {applicant.appliedDate}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${applicant.statusColor}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-2 text-slate-400">
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">Star</span>
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
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.539 1.118l-3.383-2.46a1 1 0 00-1.176 0l-3.383 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.383-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
                          />
                        </svg>
                      </button>
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">Add note</span>
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                      <button type="button" className="p-1 hover:text-slate-600">
                        <span className="sr-only">View CV</span>
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
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <button type="button" className="p-1 hover:text-red-600">
                        <span className="sr-only">Reject</span>
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
