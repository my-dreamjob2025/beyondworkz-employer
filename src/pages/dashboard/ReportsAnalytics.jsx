import { useEffect, useMemo, useState } from "react";
import {
  fetchApplicationSummary,
  fetchRecentApplications,
} from "../../services/applicationService";

const STATUS_LABEL = {
  submitted: "Submitted",
  shortlisted: "Shortlisted",
  interview_scheduled: "Interview",
  rejected: "Rejected",
  hired: "Hired",
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

const ReportsAnalytics = () => {
  const [summary, setSummary] = useState(null);
  const [recentRaw, setRecentRaw] = useState([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadError("");
      try {
        const [sum, recent] = await Promise.all([
          fetchApplicationSummary(),
          fetchRecentApplications(25),
        ]);
        if (cancelled) return;
        if (sum.success) setSummary(sum);
        else setLoadError(sum.message || "");
        if (recent.success && Array.isArray(recent.items)) setRecentRaw(recent.items);
      } catch (e) {
        if (!cancelled) setLoadError(e.response?.data?.message || e.message || "Failed to load.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const metricCards = useMemo(() => {
    const total = summary?.total ?? 0;
    const by = summary?.byStatus || {};
    const interviews = summary?.interviewsScheduled ?? 0;
    const hired = by.hired ?? 0;
    return [
      {
        label: "Applications Received",
        value: String(total),
        delta: `${by.submitted ?? 0} new · ${by.shortlisted ?? 0} shortlisted`,
        deltaColor: "text-slate-500",
        iconBg: "bg-blue-50",
      },
      {
        label: "Profile Unlocks",
        value: "0",
        delta: "Not tracked in this version",
        deltaColor: "text-slate-400",
        iconBg: "bg-amber-50",
      },
      {
        label: "Interviews Scheduled",
        value: String(interviews),
        delta: "Candidates in interview stage",
        deltaColor: "text-slate-500",
        iconBg: "bg-violet-50",
      },
      {
        label: "Hires Made",
        value: String(hired),
        delta: "Marked hired in Applications",
        deltaColor: "text-slate-500",
        iconBg: "bg-emerald-50",
      },
    ];
  }, [summary]);

  const recentApplications = useMemo(() => {
    return recentRaw.map((row) => ({
      id: row.id,
      initials: (row.applicantName || "?")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      name: row.applicantName || "—",
      role: row.job?.title || "—",
      appliedDate: formatDate(row.appliedAt),
      experience: "—",
      status: STATUS_LABEL[row.status] || row.status,
      statusColor:
        row.status === "hired"
          ? "bg-emerald-50 text-emerald-800"
          : row.status === "rejected"
            ? "bg-red-50 text-red-800"
            : row.status === "interview_scheduled"
              ? "bg-violet-50 text-violet-800"
              : row.status === "shortlisted"
                ? "bg-blue-50 text-blue-800"
                : "bg-slate-100 text-slate-800",
    }));
  }, [recentRaw]);

  return (
    <div className="space-y-6">
      {loadError ? (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{loadError}</p>
      ) : null}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1248C1]"
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
          <div className="h-56 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-center text-sm text-slate-600">
            <p className="font-semibold text-slate-800">Status breakdown</p>
            <ul className="text-left text-xs space-y-1">
              <li>Submitted: {summary?.byStatus?.submitted ?? 0}</li>
              <li>Shortlisted: {summary?.byStatus?.shortlisted ?? 0}</li>
              <li>Interview: {summary?.byStatus?.interview_scheduled ?? 0}</li>
              <li>Rejected: {summary?.byStatus?.rejected ?? 0}</li>
              <li>Hired: {summary?.byStatus?.hired ?? 0}</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Candidate Sources</h2>
              <p className="text-xs text-slate-500">Where your candidates are coming from.</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            Applications currently come from the public job board only. Source attribution is not
            recorded yet.
          </p>
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
              {recentApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-500">
                    No recent applications to display.
                  </td>
                </tr>
              ) : (
                recentApplications.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 align-middle">
                      <input type="checkbox" className="rounded border-slate-300" />
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsAnalytics;

