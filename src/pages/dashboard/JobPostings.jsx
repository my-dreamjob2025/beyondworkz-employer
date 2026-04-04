import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchEmployerJobs, patchJobStatus } from "../../services/jobPostingService";

const statusStyles = {
  draft: "bg-amber-50 text-amber-900 border-amber-200",
  published: "bg-emerald-50 text-emerald-900 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

const JobPostings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const apiStatus = useMemo(() => {
    const raw = (searchParams.get("status") || "").toLowerCase();
    if (raw === "active") return "published";
    if (raw === "draft" || raw === "published" || raw === "closed") return raw;
    return null;
  }, [searchParams]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetchEmployerJobs(apiStatus ? { status: apiStatus } : {});
      if (res.success && Array.isArray(res.jobs)) {
        setJobs(res.jobs);
      } else {
        setError(res.message || "Could not load jobs.");
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Could not load jobs.");
    } finally {
      setLoading(false);
    }
  }, [apiStatus]);

  useEffect(() => {
    load();
  }, [load]);

  const goToApplicants = (jobId, e) => {
    e?.stopPropagation?.();
    navigate(`/dashboard/applicants?jobId=${encodeURIComponent(jobId)}`);
  };

  const handleRowOpen = (j) => {
    if (j.status === "draft") {
      navigate(`/dashboard/jobs/${j.id}/edit`);
      return;
    }
    navigate(`/dashboard/applicants?jobId=${encodeURIComponent(j.id)}`);
  };

  const handleClose = async (jobId) => {
    if (!window.confirm("Close this job? Candidates will no longer see it as active.")) return;
    setBusyId(jobId);
    try {
      const res = await patchJobStatus(jobId, "closed");
      if (res.success && res.job) {
        setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, ...res.job } : j)));
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Could not close job.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job postings</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Create drafts, publish when ready, and close roles when filled. Open a published or closed role
            to see applicants, profiles, and interviews.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs/new")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-xl bg-[#2563EB] hover:bg-[#1248C1] transition-colors shadow-sm shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post a job
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm flex flex-wrap items-center justify-between gap-2">
          <span>{error}</span>
          <button type="button" className="text-sm font-semibold underline" onClick={load}>
            Retry
          </button>
        </div>
      )}

      {apiStatus ? (
        <p className="text-sm text-slate-600">
          Showing:{" "}
          <span className="font-medium text-slate-900 capitalize">
            {searchParams.get("status") === "active" ? "active (published)" : apiStatus}
          </span>
          .{" "}
          <button
            type="button"
            className="text-[#2563EB] font-semibold hover:underline"
            onClick={() => navigate("/dashboard/jobs")}
          >
            Clear filter
          </button>
        </p>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-20 text-slate-500 text-sm">Loading jobs…</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">No jobs yet</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm">
            Publish your first role to appear in candidate search (employee app integration can consume
            the same API later).
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/jobs/new")}
            className="px-6 py-3 text-white font-semibold rounded-xl bg-[#2563EB] hover:bg-[#1248C1] transition-colors"
          >
            Post your first job
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 hidden md:table-cell">Location</th>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">Applications</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Updated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((j) => {
                  const appCount = typeof j.applicationCount === "number" ? j.applicationCount : 0;
                  const openRole = j.status === "published" || j.status === "closed";
                  return (
                    <tr
                      key={j.id}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleRowOpen(j);
                        }
                      }}
                      onClick={() => handleRowOpen(j)}
                      className="hover:bg-slate-50/80 cursor-pointer"
                    >
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowOpen(j);
                          }}
                          className="text-left w-full"
                        >
                          <p
                            className={`font-semibold ${openRole ? "text-[#2563EB] hover:underline" : "text-slate-900"}`}
                          >
                            {j.title || "Untitled draft"}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {j.jobType}
                            {j.openings ? ` · ${j.openings} opening${j.openings > 1 ? "s" : ""}` : ""}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 sm:hidden">
                            {appCount} application{appCount === 1 ? "" : "s"}
                          </p>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-slate-600 hidden md:table-cell">
                        {[j.city, j.area].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-4 text-center hidden sm:table-cell">
                        <span className="inline-flex min-w-[2rem] justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-semibold text-slate-800">
                          {appCount}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[j.status] || statusStyles.draft}`}
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 hidden sm:table-cell whitespace-nowrap">
                        {formatDate(j.updatedAt)}
                      </td>
                      <td className="px-4 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex flex-wrap items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={(e) => goToApplicants(j.id, e)}
                            className="text-[#2563EB] font-semibold hover:underline text-xs sm:text-sm"
                          >
                            Applicants
                          </button>
                          {j.status !== "closed" ? (
                            <button
                              type="button"
                              onClick={() => navigate(`/dashboard/jobs/${j.id}/edit`)}
                              className="text-[#2563EB] font-semibold hover:underline text-xs sm:text-sm"
                            >
                              {j.status === "draft" ? "Continue" : "Edit"}
                            </button>
                          ) : null}
                          {j.status === "published" ? (
                            <button
                              type="button"
                              disabled={busyId === j.id}
                              onClick={() => handleClose(j.id)}
                              className="text-slate-600 font-medium hover:text-slate-900 text-xs sm:text-sm disabled:opacity-50"
                            >
                              {busyId === j.id ? "Closing…" : "Close"}
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
