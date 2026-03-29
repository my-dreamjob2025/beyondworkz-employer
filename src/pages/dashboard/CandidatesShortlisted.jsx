import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchEmployerApplications } from "../../services/applicationService";

const PIPELINE = ["shortlisted", "interview_scheduled", "hired", "rejected"];

const TAB_CONFIG = [
  { key: "all", label: "All pipeline" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview_scheduled", label: "Interview scheduled" },
  { key: "hired", label: "Hired" },
  { key: "rejected", label: "Rejected" },
];

function statusLabel(status) {
  const map = {
    shortlisted: "Shortlisted",
    interview_scheduled: "Interview scheduled",
    hired: "Hired",
    rejected: "Rejected",
    submitted: "Applied",
  };
  return map[status] || status;
}

function statusBadgeClass(status) {
  if (status === "hired") return "bg-emerald-50 text-emerald-800";
  if (status === "rejected") return "bg-red-50 text-red-700";
  if (status === "interview_scheduled") return "bg-blue-50 text-[#2563EB]";
  return "bg-amber-50 text-amber-800";
}

const CandidatesShortlisted = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetchEmployerApplications();
        if (cancelled || !res.success || !Array.isArray(res.items)) {
          if (!cancelled) setItems([]);
          return;
        }
        const pipeline = res.items.filter((a) => PIPELINE.includes(a.status));
        if (!cancelled) setItems(pipeline);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tabCounts = useMemo(() => {
    const counts = { all: items.length };
    for (const s of PIPELINE) counts[s] = 0;
    for (const a of items) {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((a) => {
      if (activeTab !== "all" && a.status !== activeTab) return false;
      if (!q) return true;
      const name = (a.candidate?.name || "").toLowerCase();
      const email = (a.candidate?.email || "").toLowerCase();
      const title = (a.job?.title || "").toLowerCase();
      return name.includes(q) || email.includes(q) || title.includes(q);
    });
  }, [items, activeTab, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shortlisted candidates</h1>
          <p className="text-slate-600 mt-1">
            Candidates you have moved past the initial application (from Applications).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button
            type="button"
            disabled
            title="Export is not available yet."
            className="px-4 py-2 rounded-full border border-slate-200 text-slate-400 cursor-not-allowed"
          >
            Export list
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/interviews")}
            className="px-4 py-2 rounded-full text-white bg-[#2563EB] hover:bg-[#1248C1]"
          >
            Interview pipeline
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 text-sm border-b border-slate-200 pb-2">
          {TAB_CONFIG.map(({ key, label }) => {
            const active = activeTab === key;
            const count = tabCounts[key] ?? 0;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`relative pb-2 text-sm font-medium ${
                  active ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>{label}</span>
                <span className={`ml-1 text-xs ${active ? "text-[#2563EB]" : "text-slate-400"}`}>
                  {count}
                </span>
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, or job title"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-600">
            <p className="font-medium text-slate-900">No candidates in this view</p>
            <p className="mt-2">
              Update application status to Shortlisted or later in{" "}
              <Link to="/dashboard/applicants" className="text-[#2563EB] font-medium hover:underline">
                Applications
              </Link>
              .
            </p>
          </div>
        ) : (
          filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
                    {(a.candidate?.name || "?")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {a.candidate?.name || "Candidate"}
                    </h2>
                    <p className="text-xs text-slate-500">{a.candidate?.email || "—"}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {a.job?.title || "Job"}
                      {a.job?.city ? ` · ${a.job.city}` : ""}
                      {a.job?.area ? `, ${a.job.area}` : ""}
                    </p>
                  </div>
                </div>
                <span
                  className={`self-start px-3 py-1 rounded-full text-[11px] font-medium ${statusBadgeClass(
                    a.status
                  )}`}
                >
                  {statusLabel(a.status)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                <div>
                  <p className="text-slate-400">Experience (from profile)</p>
                  <p className="mt-0.5 text-slate-800">{a.candidate?.experience || "—"}</p>
                </div>
                <div>
                  <p className="text-slate-400">Applied</p>
                  <p className="mt-0.5 text-slate-800">
                    {a.appliedAt
                      ? new Date(a.appliedAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
                <Link
                  to="/dashboard/applicants"
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 inline-flex items-center justify-center"
                >
                  Manage in Applications
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidatesShortlisted;
