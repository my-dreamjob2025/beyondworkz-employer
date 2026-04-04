import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchEmployerJobs } from "../../services/jobPostingService";
import {
  fetchEmployerApplications,
  updateApplicationStatus,
} from "../../services/applicationService";
import EmployerApplicationDetailModal from "../../components/applications/EmployerApplicationDetailModal";

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview_scheduled", label: "Interview" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

function formatAppliedDate(iso) {
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

const Applicants = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobId = searchParams.get("jobId") || "";
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [detailApplicationId, setDetailApplicationId] = useState(null);

  const loadJobs = useCallback(async () => {
    const res = await fetchEmployerJobs();
    if (res.success && Array.isArray(res.jobs)) {
      setJobs(res.jobs);
    }
  }, []);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchEmployerApplications(selectedJobId || undefined);
      if (!res.success) {
        setError(res.message || "Could not load applications.");
        setApplications([]);
        return;
      }
      setApplications(Array.isArray(res.items) ? res.items : []);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Could not load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [selectedJobId]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  function handleJobFilterChange(e) {
    const v = e.target.value;
    if (v) {
      setSearchParams({ jobId: v }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }

  const selectedJob = useMemo(
    () => (selectedJobId ? jobs.find((j) => String(j.id) === String(selectedJobId)) : null),
    [jobs, selectedJobId]
  );

  const filteredByJob = useMemo(() => {
    if (!selectedJobId) return applications;
    return applications.filter((a) => String(a.job?.id) === String(selectedJobId));
  }, [applications, selectedJobId]);

  const counts = useMemo(() => {
    const c = {
      all: filteredByJob.length,
      submitted: 0,
      shortlisted: 0,
      interview_scheduled: 0,
      rejected: 0,
      hired: 0,
    };
    for (const a of filteredByJob) {
      if (c[a.status] !== undefined) c[a.status] += 1;
    }
    return c;
  }, [filteredByJob]);

  const job = useMemo(() => {
    const loc = selectedJob
      ? [selectedJob.city, selectedJob.area].filter(Boolean).join(", ") || "—"
      : "—";
    return {
      title: selectedJob?.title?.trim() || (selectedJobId ? "Job" : "All jobs"),
      location: selectedJobId ? loc : "—",
      experience: selectedJob?.minExperience?.trim() || "—",
      applications: counts.all,
      shortlisted: counts.shortlisted,
      interviews: counts.interview_scheduled,
      rejected: counts.rejected,
      hired: counts.hired,
    };
  }, [selectedJob, selectedJobId, counts]);

  const tableRows = useMemo(() => {
    let rows = filteredByJob;
    if (tab !== "all") {
      rows = rows.filter((a) => a.status === tab);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((a) => {
        const name = (a.candidate?.name || "").toLowerCase();
        const email = (a.candidate?.email || "").toLowerCase();
        const skills = ""; // extend when API includes skills
        return name.includes(q) || email.includes(q) || skills.includes(q);
      });
    }
    return rows;
  }, [filteredByJob, tab, search]);

  const tabs = useMemo(
    () => [
      { id: "all", label: "All Applications", count: counts.all },
      { id: "shortlisted", label: "Shortlisted", count: counts.shortlisted },
      { id: "interview_scheduled", label: "Interview Scheduled", count: counts.interview_scheduled },
      { id: "rejected", label: "Rejected", count: counts.rejected },
      { id: "hired", label: "Hired", count: counts.hired },
    ],
    [counts]
  );

  async function handleStatusChange(applicationId, status) {
    setUpdatingId(applicationId);
    try {
      const res = await updateApplicationStatus(applicationId, status);
      if (res.success) {
        await loadApplications();
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Applications</h1>
          <p className="mt-1 text-slate-600">Candidates who applied to your jobs.</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <label className="text-xs font-medium text-slate-500" htmlFor="job-filter">
            Filter by job
          </label>
          <select
            id="job-filter"
            value={selectedJobId}
            onChange={handleJobFilterChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          >
            <option value="">All jobs</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title?.trim() || "Untitled"} ({j.status})
                {typeof j.applicationCount === "number" ? ` · ${j.applicationCount} applied` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-slate-500">Job overview</p>
          <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Location: {job.location}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Experience: {job.experience}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{job.applications}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Applications</p>
          </div>
          <div className="hidden h-10 w-px bg-slate-200 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{job.shortlisted}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Shortlisted</p>
          </div>
          <div className="hidden h-10 w-px bg-slate-200 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{job.interviews}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Interviews</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {selectedJobId ? (
              <button
                type="button"
                onClick={() => navigate(`/dashboard/jobs/${selectedJobId}/edit`)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Edit job
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1248C1]"
            >
              All jobs
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-6 border-b border-slate-200 pb-2 text-sm">
          {tabs.map(({ id: tid, label, count }) => {
            const isActive = tab === tid;
            return (
              <button
                key={tid}
                type="button"
                onClick={() => setTab(tid)}
                className={`relative pb-2 text-sm font-medium ${
                  isActive ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{label}</span>
                <span className={`${isActive ? "text-[#2563EB]" : "text-slate-400"} ml-1`}>{count}</span>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#2563EB]" />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email"
            className="w-full max-w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 text-left">Candidate</th>
                <th className="px-4 py-3 text-left">Experience</th>
                <th className="px-4 py-3 text-left">Job</th>
                <th className="px-4 py-3 text-left">Applied</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    Loading applications…
                  </td>
                </tr>
              ) : tableRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    No applications in this view. Publish jobs and have candidates apply from the job
                    board.
                  </td>
                </tr>
              ) : (
                tableRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                          {(row.candidate?.name || "?")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{row.candidate?.name || "—"}</p>
                          <p className="text-xs text-slate-500">{row.candidate?.email || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-700">{row.candidate?.experience || "—"}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 align-middle text-slate-700">
                      {row.job?.title || "—"}
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-700">{formatAppliedDate(row.appliedAt)}</td>
                    <td className="px-4 py-3 align-middle">
                      <select
                        value={row.status}
                        disabled={updatingId === row.id}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      >
                        {STATUS_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <button
                        type="button"
                        onClick={() => setDetailApplicationId(row.id)}
                        className="text-sm font-semibold text-[#2563EB] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EmployerApplicationDetailModal
        applicationId={detailApplicationId}
        open={detailApplicationId != null}
        onClose={() => setDetailApplicationId(null)}
        onApplicationUpdated={loadApplications}
      />
    </div>
  );
};

export default Applicants;
