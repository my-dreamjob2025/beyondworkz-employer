import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fetchEmployerJobs } from "../../services/jobPostingService";
import {
  fetchApplicationSummary,
  fetchRecentApplications,
} from "../../services/applicationService";

function formatJobDate(iso) {
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

function formatRelativeTime(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 48) return `${hrs}h ago`;
    return formatJobDate(iso);
  } catch {
    return "";
  }
}

const statusBadge = {
  draft: "bg-amber-50 text-amber-900 border-amber-200",
  published: "bg-emerald-50 text-emerald-900 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);
  const [appSummary, setAppSummary] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  const [recentAppItems, setRecentAppItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setJobsLoading(true);
      setJobsError(null);
      setSummaryError(null);
      try {
        const [jobRes, sumRes, recentRes] = await Promise.all([
          fetchEmployerJobs(),
          fetchApplicationSummary(),
          fetchRecentApplications(8),
        ]);
        if (cancelled) return;

        if (jobRes.success && Array.isArray(jobRes.jobs)) {
          const sorted = [...jobRes.jobs].sort(
            (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
          );
          setJobs(sorted);
        } else {
          setJobsError(jobRes?.message || "Could not load jobs.");
        }

        if (sumRes.success) {
          setAppSummary(sumRes);
        } else {
          setSummaryError(sumRes?.message || "Could not load application stats.");
        }

        if (recentRes.success && Array.isArray(recentRes.items)) {
          setRecentAppItems(recentRes.items);
        }
      } catch (e) {
        if (!cancelled) {
          setJobsError(e.response?.data?.message || e.message || "Could not load dashboard.");
        }
      } finally {
        if (!cancelled) setJobsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const activePublishedCount = useMemo(
    () => jobs.filter((j) => j.status === "published").length,
    [jobs]
  );
  const draftCount = useMemo(() => jobs.filter((j) => j.status === "draft").length, [jobs]);

  const recentJobs = useMemo(() => jobs.slice(0, 6), [jobs]);

  const totalApps = appSummary?.total ?? 0;
  const interviewsN = appSummary?.interviewsScheduled ?? 0;

  const metrics = useMemo(
    () => [
      {
        label: "Active Jobs",
        value: String(activePublishedCount),
        sub:
          draftCount > 0
            ? `${draftCount} draft${draftCount === 1 ? "" : "s"} · ${jobs.length} total`
            : jobs.length > 0
              ? `${jobs.length} total in account`
              : "Publish a job to go live",
        icon: "briefcase",
        subColor: "text-slate-500",
      },
      {
        label: "Total Applications",
        value: String(totalApps),
        sub:
          totalApps === 0
            ? "No applications yet — share published jobs"
            : `${appSummary?.byStatus?.shortlisted ?? 0} shortlisted · ${appSummary?.byStatus?.hired ?? 0} hired`,
        icon: "users",
        subColor: "text-slate-500",
      },
      {
        label: "Interviews Scheduled",
        value: String(interviewsN),
        sub: interviewsN === 0 ? "Mark candidates as interview in Applications" : "In interview pipeline",
        icon: "calendar",
        subColor: "text-slate-500",
      },
      {
        label: "Credits Remaining",
        value: String(user?.companyProfile?.creditBalance ?? 0),
        sub: "From your company profile — buy more in Credits",
        icon: "link",
        subColor: "text-slate-500",
      },
    ],
    [
      user?.companyProfile?.creditBalance,
      activePublishedCount,
      draftCount,
      jobs.length,
      totalApps,
      interviewsN,
      appSummary?.byStatus?.shortlisted,
      appSummary?.byStatus?.hired,
    ],
  );

  const recentActivity = useMemo(() => {
    const statusPhrase = {
      submitted: "Applied to",
      shortlisted: "Shortlisted for",
      interview_scheduled: "Interview stage ·",
      rejected: "Rejected for",
      hired: "Hired for",
    };
    return recentAppItems.map((row) => {
      const jobTitle = row.job?.title || "a role";
      const phrase = statusPhrase[row.status] || "Applied to";
      return {
        id: row.id,
        text: `${row.applicantName} — ${phrase} ${jobTitle}`,
        time: formatRelativeTime(row.appliedAt),
        icon: row.status === "interview_scheduled" ? "calendar" : "document",
      };
    });
  }, [recentAppItems]);

  const totalCredits = user?.companyProfile?.creditsTotal ?? 0;
  const usedCredits = user?.companyProfile?.creditsUsed ?? 0;
  const creditPct =
    totalCredits > 0 ? Math.min(100, Math.round((usedCredits / totalCredits) * 100)) : 0;

  const MetricIcon = ({ name }) => {
    const icons = {
      briefcase: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      users: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      calendar: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      link: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172a4 4 0 00-.828 2.172z"
          />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  const ActivityIcon = ({ name }) => {
    const icons = {
      document: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      calendar: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      check: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      message: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900">{m.value}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{m.label}</p>
                <p className={`text-sm mt-1 ${m.subColor}`}>{m.sub}</p>
              </div>
              <div className="text-slate-400">
                <MetricIcon name={m.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Jobs</h2>
            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="text-sm font-medium text-[#2563EB] hover:underline"
            >
              View All
            </button>
          </div>
          {(jobsError || summaryError) && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {[jobsError, summaryError].filter(Boolean).join(" ")}
            </p>
          )}
          {jobsLoading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
              Loading jobs…
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-600">
              <p className="font-medium text-slate-900">No job postings yet</p>
              <p className="mt-2">Create a job to see it listed here.</p>
              <button
                type="button"
                onClick={() => navigate("/dashboard/jobs/new")}
                className="mt-4 px-4 py-2 rounded-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1248C1] transition-colors"
              >
                Post a Job
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => {
                const location = [job.city, job.area].filter(Boolean).join(", ") || "—";
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {job.title?.trim() || "Untitled draft"}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize shrink-0 ${statusBadge[job.status] || statusBadge.draft}`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {job.jobType}
                          {job.openings ? ` · ${job.openings} opening${job.openings > 1 ? "s" : ""}` : ""}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">{location}</p>
                        <p className="text-xs text-slate-400 mt-2">
                          Updated {formatJobDate(job.updatedAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {job.status !== "closed" ? (
                          <button
                            type="button"
                            onClick={() => navigate(`/dashboard/jobs/${job.id}/edit`)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#2563EB] border border-[#2563EB1A] bg-[#2563EB1A] hover:bg-[#B6CBF8] transition-colors"
                          >
                            {job.status === "draft" ? "Continue" : "Edit"}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => navigate("/dashboard/jobs")}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50"
                        >
                          All jobs
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Credits Usage</h3>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all"
                style={{ width: `${creditPct}%` }}
              />
            </div>
            <p className="text-sm text-slate-600 mb-2">
              {usedCredits} used
              {totalCredits > 0 ? ` of ${totalCredits} total` : ""}
            </p>
            <p className="text-sm text-slate-500 mb-4">
              {totalCredits > 0
                ? "Balance comes from your account profile after purchases."
                : "Purchase credits to unlock contacts and boost listings."}
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/credits/buy")}
              className="w-full py-2 rounded-lg font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Buy More Credits
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-slate-500">No application activity yet.</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={String(item.id)} className="flex gap-3">
                    <ActivityIcon name={item.icon} />
                    <div>
                      <p className="text-sm text-slate-600">{item.text}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
