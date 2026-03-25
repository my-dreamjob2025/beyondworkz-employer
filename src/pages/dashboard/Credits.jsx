import { useNavigate } from "react-router-dom";

const usageStats = [
  { label: "Job Posts", value: 15 },
  { label: "Contact Unlocks", value: 24 },
  { label: "Database Downloads", value: 3 },
];

const usageHistory = [
  {
    date: "22 March 2026",
    action: "Unlock Contact",
    candidateOrJob: "Rahul Sharma",
    credits: "-1",
    status: "Completed",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
  {
    date: "20 March 2026",
    action: "Job Post",
    candidateOrJob: "React Developer",
    credits: "0",
    status: "Failed",
    statusColor: "text-rose-700 bg-rose-50",
  },
  {
    date: "18 March 2026",
    action: "Unlock Contact",
    candidateOrJob: "Priya Singh",
    credits: "-1",
    status: "Completed",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
  {
    date: "15 March 2026",
    action: "Database Download",
    candidateOrJob: "Frontend Candidates Q1",
    credits: "-1",
    status: "Completed",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
  {
    date: "12 March 2026",
    action: "Credit Purchase",
    candidateOrJob: "Pro Pack",
    credits: "+50",
    status: "Completed",
    statusColor: "text-emerald-700 bg-emerald-50",
  },
];

const Credits = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Credits &amp; Usage</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track your credit balance and how credits are used.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/credits/checkout")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316] text-sm font-semibold text-white hover:bg-[#ea580c]"
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
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 6h14M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          Buy Credits
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Available Credits
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">8</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Credits Used
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">42</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total Purchased
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">50</p>
        </div>
      </section>

      <section className="bg-[#F5F7FF] rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#2563EB] text-xs font-semibold">
            i
          </span>
          <p>
            <span className="font-semibold">How credits are consumed</span> – 1 Job Post = 1 Credit,
            1 Candidate Contact Unlock = 1 Credit
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white rounded-xl border border-slate-200 overflow-hidden">
          {usageStats.map((stat) => (
            <div key={stat.label} className="px-6 py-4 flex flex-col items-center text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FFF7ED] rounded-2xl border border-orange-200 shadow-sm px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Need More Credits?</p>
          <p className="text-xs text-slate-600 mt-0.5">
            Buy credit packs to continue posting jobs and unlocking candidate contacts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/credits/checkout")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316] text-xs font-semibold text-white hover:bg-[#ea580c]"
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
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 6h14M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
          Buy Credits
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Usage History</h2>
            <p className="text-xs text-slate-500">
              Detailed log of how credits have been used.
            </p>
          </div>
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
                placeholder="Search job or candidate name"
                className="pl-9 pr-3 py-2 text-xs rounded-full border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent w-56"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Action Type
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
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Date Range
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
                  d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-50">
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Action</th>
                <th className="px-5 py-3 text-left">Candidate or Job</th>
                <th className="px-5 py-3 text-left">Credits Used</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usageHistory.map((row) => (
                <tr key={row.date + row.action} className="hover:bg-slate-50">
                  <td className="px-5 py-3 align-middle text-slate-700">{row.date}</td>
                  <td className="px-5 py-3 align-middle text-slate-700">{row.action}</td>
                  <td className="px-5 py-3 align-middle text-slate-700">
                    {row.candidateOrJob}
                  </td>
                  <td
                    className={`px-5 py-3 align-middle font-medium ${
                      row.credits.startsWith("+") ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {row.credits}
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${row.statusColor}`}
                    >
                      {row.status}
                    </span>
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

export default Credits;

