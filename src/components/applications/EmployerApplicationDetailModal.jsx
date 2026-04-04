import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  fetchEmployerApplicationById,
  updateApplicationInterview,
  updateApplicationStatus,
} from "../../services/applicationService";

const FLAG_LABELS = [
  ["experience", "We will review your experience against the role"],
  ["locationComfort", "Comfort working at this location matters"],
  ["immediateJoin", "Immediate availability is a plus"],
  ["salaryComfort", "Salary fit may be part of screening"],
];

const STATUS_META = {
  submitted: { label: "Submitted", badge: "bg-slate-100 text-slate-800 ring-slate-200/80" },
  shortlisted: { label: "Shortlisted", badge: "bg-sky-50 text-sky-900 ring-sky-200/80" },
  interview_scheduled: { label: "Interview", badge: "bg-violet-50 text-violet-900 ring-violet-200/80" },
  rejected: { label: "Rejected", badge: "bg-red-50 text-red-800 ring-red-200/80" },
  hired: { label: "Hired", badge: "bg-emerald-50 text-emerald-900 ring-emerald-200/80" },
};

function toDatetimeLocalValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

function formatAppliedDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatMonthYear(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function initials(name) {
  if (!name?.trim()) return "?";
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function truncateFileName(name, max = 42) {
  if (!name || name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

function SectionCard({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-900/[0.04] ${className}`}
    >
      {title ? (
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      ) : null}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </section>
  );
}

export default function EmployerApplicationDetailModal({
  applicationId,
  open,
  onClose,
  onApplicationUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");
  const [savingInterview, setSavingInterview] = useState(false);
  const [statusBusy, setStatusBusy] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    scheduledAt: "",
    meetingLink: "",
    notes: "",
  });
  const [interviewSavedMsg, setInterviewSavedMsg] = useState("");

  useEffect(() => {
    if (!open || !applicationId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      setPayload(null);
      setInterviewSavedMsg("");
      try {
        const res = await fetchEmployerApplicationById(applicationId);
        if (cancelled) return;
        if (res.success && res.application) {
          setPayload(res.application);
          const inv = res.application.interview || {};
          setInterviewForm({
            scheduledAt: toDatetimeLocalValue(inv.scheduledAt),
            meetingLink: inv.meetingLink || "",
            notes: inv.notes || "",
          });
        } else setError(res.message || "Could not load application.");
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || e.message || "Could not load application.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, applicationId]);

  async function patchPipelineStatus(next) {
    if (!applicationId || statusBusy) return;
    if (next === "rejected" && !window.confirm("Reject this candidate for this role?")) return;
    setStatusBusy(true);
    try {
      const res = await updateApplicationStatus(applicationId, next);
      if (res.success && res.application) {
        setPayload((p) => (p ? { ...p, status: res.application.status } : p));
        onApplicationUpdated?.();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatusBusy(false);
    }
  }

  async function handleSaveInterview(e) {
    e.preventDefault();
    if (!applicationId) return;
    setSavingInterview(true);
    setInterviewSavedMsg("");
    try {
      const body = {
        meetingLink: interviewForm.meetingLink,
        notes: interviewForm.notes,
      };
      if (interviewForm.scheduledAt) {
        body.scheduledAt = new Date(interviewForm.scheduledAt).toISOString();
      } else {
        body.scheduledAt = "";
      }
      const res = await updateApplicationInterview(applicationId, body);
      if (res.success && res.application) {
        setPayload((p) =>
          p
            ? {
                ...p,
                status: res.application.status,
                interview: res.application.interview,
              }
            : p
        );
        const inv = res.application.interview || {};
        setInterviewForm({
          scheduledAt: toDatetimeLocalValue(inv.scheduledAt),
          meetingLink: inv.meetingLink || "",
          notes: inv.notes || "",
        });
        setInterviewSavedMsg("Saved.");
        onApplicationUpdated?.();
      } else {
        setInterviewSavedMsg(res.message || "Could not save.");
      }
    } catch (err) {
      setInterviewSavedMsg(err.response?.data?.message || err.message || "Could not save.");
    } finally {
      setSavingInterview(false);
    }
  }

  if (!open) return null;

  const app = payload;
  const scr = app?.screening;
  const ack = scr?.acknowledgments || {};
  const customAnswers = Array.isArray(scr?.customAnswers) ? scr.customAnswers : [];
  const cp = app?.candidateProfile;
  const resume = app?.resume;
  const inv = app?.interview || {};
  const st = app?.status;
  const meta = STATUS_META[st] || STATUS_META.submitted;

  /* Portal to document.body avoids overflow/transform on <main> clipping or warping the fixed overlay (oval “spotlight” in some browsers). */
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-detail-title"
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl ring-1 ring-slate-900/10 sm:rounded-3xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200/90 bg-white px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-lg font-semibold text-white shadow-md">
                {app ? initials(app.candidate?.name) : "—"}
              </div>
              <div className="min-w-0">
                <p id="application-detail-title" className="truncate text-xl font-semibold tracking-tight text-slate-900">
                  {loading ? "Loading…" : app?.candidate?.name || "Candidate"}
                </p>
                {app ? (
                  <p className="mt-0.5 text-sm text-slate-500">
                    {app.job?.title ? (
                      <span className="font-medium text-slate-700">{app.job.title}</span>
                    ) : (
                      "Role"
                    )}
                    {app.appliedAt ? (
                      <>
                        {" "}
                        · Applied {formatAppliedDate(app.appliedAt)}
                      </>
                    ) : null}
                  </p>
                ) : null}
                {app ? (
                  <span
                    className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {app && !loading ? (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
              <span className="mr-1 self-center text-xs font-medium text-slate-500">Pipeline</span>
              <button
                type="button"
                disabled={statusBusy || st === "shortlisted"}
                onClick={() => patchPipelineStatus("shortlisted")}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Shortlist
              </button>
              <button
                type="button"
                disabled={statusBusy || st === "interview_scheduled"}
                onClick={() => patchPipelineStatus("interview_scheduled")}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Interview stage
              </button>
              <button
                type="button"
                disabled={statusBusy || st === "hired"}
                onClick={() => patchPipelineStatus("hired")}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Hire
              </button>
              <button
                type="button"
                disabled={statusBusy || st === "rejected"}
                onClick={() => patchPipelineStatus("rejected")}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-800 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-[#2563EB]" />
              <p className="mt-4 text-sm">Loading application…</p>
            </div>
          ) : error ? (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
          ) : app ? (
            <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
              <div className="space-y-6 lg:col-span-3">
                <SectionCard title="Contact">
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div className="flex gap-3">
                      <span className="mt-0.5 text-slate-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <div>
                        <dt className="text-xs text-slate-500">Email</dt>
                        <dd className="text-sm font-medium text-slate-900 break-all">{app.candidate?.email || "—"}</dd>
                      </div>
                    </div>
                    {app.candidate?.phone ? (
                      <div className="flex gap-3">
                        <span className="mt-0.5 text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </span>
                        <div>
                          <dt className="text-xs text-slate-500">Phone</dt>
                          <dd className="text-sm font-medium text-slate-900">{app.candidate.phone}</dd>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex gap-3 sm:col-span-2">
                      <span className="mt-0.5 text-slate-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <div>
                        <dt className="text-xs text-slate-500">Location</dt>
                        <dd className="text-sm text-slate-800">{cp?.location || app.candidate?.city || "—"}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="mt-0.5 text-slate-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      <div>
                        <dt className="text-xs text-slate-500">Experience</dt>
                        <dd className="text-sm text-slate-800">{app.candidate?.experience || "—"}</dd>
                      </div>
                    </div>
                  </dl>
                </SectionCard>

                {cp ? (
                  <SectionCard title="Profile">
                    {cp.headline ? <p className="text-base font-semibold text-slate-900">{cp.headline}</p> : null}
                    {cp.bio ? (
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{cp.bio}</p>
                    ) : null}
                    {Array.isArray(cp.skills) && cp.skills.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cp.skills.map((s) => (
                          <span
                            key={s}
                            className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                      {cp.linkedin ? (
                        <a
                          href={cp.linkedin.startsWith("http") ? cp.linkedin : `https://${cp.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#2563EB] hover:underline"
                        >
                          LinkedIn
                        </a>
                      ) : null}
                      {cp.github ? (
                        <a
                          href={cp.github.startsWith("http") ? cp.github : `https://${cp.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#2563EB] hover:underline"
                        >
                          GitHub
                        </a>
                      ) : null}
                      {cp.portfolio ? (
                        <a
                          href={cp.portfolio.startsWith("http") ? cp.portfolio : `https://${cp.portfolio}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#2563EB] hover:underline"
                        >
                          Portfolio
                        </a>
                      ) : null}
                    </div>
                  </SectionCard>
                ) : (
                  <SectionCard title="Profile">
                    <p className="text-sm text-slate-500">No extended profile on file.</p>
                  </SectionCard>
                )}

                {cp?.blueCollar ? (
                  <SectionCard title="Role fit">
                    <ul className="space-y-1 text-sm text-slate-700">
                      {cp.blueCollar.hasDrivingLicense != null ? (
                        <li>Driving license: {cp.blueCollar.hasDrivingLicense ? "Yes" : "No"}</li>
                      ) : null}
                      {cp.blueCollar.hasBikeOrScooty != null ? (
                        <li>Bike / scooty: {cp.blueCollar.hasBikeOrScooty ? "Yes" : "No"}</li>
                      ) : null}
                      {Array.isArray(cp.blueCollar.preferredAreas) && cp.blueCollar.preferredAreas.length ? (
                        <li>Preferred areas: {cp.blueCollar.preferredAreas.join(", ")}</li>
                      ) : null}
                    </ul>
                  </SectionCard>
                ) : null}

                {Array.isArray(cp?.experience) && cp.experience.length > 0 ? (
                  <SectionCard title="Work experience">
                    <ul className="space-y-4">
                      {cp.experience.map((ex) => (
                        <li
                          key={ex.id || `${ex.jobTitle}-${ex.company}`}
                          className="relative border-l-2 border-slate-200 pl-4"
                        >
                          <p className="font-semibold text-slate-900">
                            {ex.jobTitle}
                            <span className="font-normal text-slate-400"> · </span>
                            {ex.company}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {formatMonthYear(ex.dateOfJoining)} — {ex.current ? "Present" : formatMonthYear(ex.relievingDate) || "—"}
                          </p>
                          {ex.description ? (
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{ex.description}</p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                ) : null}

                {Array.isArray(cp?.education) && cp.education.length > 0 ? (
                  <SectionCard title="Education">
                    <ul className="space-y-2 text-sm text-slate-700">
                      {cp.education.map((ed) => (
                        <li key={ed.id || ed.degree}>
                          {[ed.level, ed.degree].filter(Boolean).join(" · ")} — {ed.institution || "—"}
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                ) : null}

                <SectionCard title="Cover letter">
                  {app.coverLetter?.trim() ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{app.coverLetter}</p>
                  ) : (
                    <p className="text-sm text-slate-500">No cover letter submitted.</p>
                  )}
                </SectionCard>

                {FLAG_LABELS.some(([k]) => ack[k]) || customAnswers.length > 0 ? (
                  <SectionCard title="Screening">
                    {FLAG_LABELS.some(([k]) => ack[k]) ? (
                      <ul className="space-y-2 text-sm text-slate-700">
                        {FLAG_LABELS.filter(([k]) => ack[k]).map(([key, label]) => (
                          <li key={key} className="flex gap-2">
                            <span className="text-emerald-600" aria-hidden>
                              ✓
                            </span>
                            {label}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {customAnswers.length > 0 ? (
                      <div className={FLAG_LABELS.some(([k]) => ack[k]) ? "mt-6 space-y-4 border-t border-slate-100 pt-6" : "space-y-4"}>
                        {customAnswers.map((row, i) => (
                          <div key={i}>
                            <p className="text-xs font-medium text-slate-500">{row.question}</p>
                            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">{row.answer || "—"}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </SectionCard>
                ) : null}
              </div>

              <div className="space-y-6 lg:col-span-2">
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm ring-1 ring-slate-900/[0.04]">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resume</h3>
                  {resume?.url ? (
                    <div className="mt-4">
                      <a
                        href={resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1d4ed8]"
                      >
                        <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Open resume
                      </a>
                      {resume.fileName ? (
                        <p
                          className="mt-3 truncate text-center text-xs text-slate-500"
                          title={resume.fileName}
                        >
                          {truncateFileName(resume.fileName)}
                        </p>
                      ) : null}
                      {resume.expiresIn ? (
                        <p className="mt-2 text-center text-xs text-amber-800/90">
                          Secure link · refreshes in ~{Math.round(resume.expiresIn / 60)} min
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">No resume on file.</p>
                  )}
                </div>

                <SectionCard title="Role">
                  <p className="text-sm font-semibold text-slate-900">{app.job?.title || "—"}</p>
                  {[app.job?.city, app.job?.area].filter(Boolean).length ? (
                    <p className="mt-1 text-sm text-slate-600">{[app.job?.city, app.job?.area].filter(Boolean).join(", ")}</p>
                  ) : null}
                </SectionCard>

                <form
                  onSubmit={handleSaveInterview}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-900/[0.04]"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Schedule interview</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Add a time and meeting link. Saving a date moves the candidate to <strong>Interview</strong> when they
                    are still in Submitted or Shortlisted.
                  </p>
                  {inv.scheduledAt ? (
                    <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs font-medium text-violet-900">
                      Scheduled: {formatDateTime(inv.scheduledAt)}
                    </p>
                  ) : null}
                  <label className="mt-4 block">
                    <span className="text-xs font-medium text-slate-600">Date &amp; time</span>
                    <input
                      type="datetime-local"
                      value={interviewForm.scheduledAt}
                      onChange={(e) => setInterviewForm((f) => ({ ...f, scheduledAt: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </label>
                  <label className="mt-3 block">
                    <span className="text-xs font-medium text-slate-600">Meeting link</span>
                    <input
                      type="url"
                      value={interviewForm.meetingLink}
                      onChange={(e) => setInterviewForm((f) => ({ ...f, meetingLink: e.target.value }))}
                      placeholder="https://meet.google.com/…"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </label>
                  <label className="mt-3 block">
                    <span className="text-xs font-medium text-slate-600">Notes</span>
                    <textarea
                      value={interviewForm.notes}
                      onChange={(e) => setInterviewForm((f) => ({ ...f, notes: e.target.value }))}
                      rows={3}
                      placeholder="Instructions for the candidate"
                      className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                    />
                  </label>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={savingInterview}
                      className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
                    >
                      {savingInterview ? "Saving…" : "Save schedule"}
                    </button>
                    {interviewSavedMsg ? (
                      <span
                        className={`text-xs font-medium ${
                          interviewSavedMsg === "Saved." ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {interviewSavedMsg}
                      </span>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
