import { useEffect, useMemo, useState } from "react";
import { fetchEmployerApplications } from "../../services/applicationService";

const INTERVIEW_STATUSES = [
  { key: "scheduled", label: "Scheduled", color: "text-blue-600", dot: "bg-blue-500" },
  { key: "completed", label: "Completed", color: "text-emerald-600", dot: "bg-emerald-500" },
  { key: "cancelled", label: "Cancelled", color: "text-rose-500", dot: "bg-rose-500" },
];

const INTERVIEW_TYPES = ["All types", "Online", "In‑person", "Phone"];
const JOB_ROLES_BASE = ["All roles"];
const STATUSES = ["All status", "Scheduled", "Completed", "Cancelled"];

const getMonthDaysMatrix = (year, monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const weeks = [];
  let currentDay = 1 - startWeekday;

  while (currentDay <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(null);
      } else {
        week.push(currentDay);
      }
      currentDay += 1;
    }
    weeks.push(week);
  }

  return weeks;
};

const InterviewManagement = () => {
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const monthLabel = today.toLocaleString("en-IN", { month: "long", year: "numeric" });

  const [selectedDate, setSelectedDate] = useState(() => today.getDate());
  const [selectedType, setSelectedType] = useState("All types");
  const [selectedRole, setSelectedRole] = useState("All roles");
  const [selectedStatus, setSelectedStatus] = useState("All status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchEmployerApplications();
        if (cancelled || !res.success || !Array.isArray(res.items)) return;
        const pipeline = res.items.filter((a) => a.status === "interview_scheduled");
        setInterviews(
          pipeline.map((a) => ({
            id: a.id,
            name: a.candidate?.name || "Candidate",
            role: a.job?.title || "Role",
            type: "—",
            date: a.appliedAt
              ? new Date(a.appliedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—",
            time: "—",
            interviewer: "—",
            status: "Scheduled",
          }))
        );
      } catch {
        if (!cancelled) setInterviews([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => getMonthDaysMatrix(year, monthIndex), [year, monthIndex]);

  const jobRoles = useMemo(() => {
    const titles = [...new Set(interviews.map((i) => i.role).filter(Boolean))];
    return [...JOB_ROLES_BASE, ...titles.filter((t) => t !== "Role")];
  }, [interviews]);

  const filteredInterviews = interviews.filter((item) => {
    if (selectedType !== "All types" && item.type !== "—" && item.type !== selectedType.replace("‑", "-"))
      return false;
    if (selectedRole !== "All roles" && item.role !== selectedRole) return false;
    if (selectedStatus !== "All status" && item.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Interview Management</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage and track scheduled candidate interviews.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1248C1] text-sm font-semibold text-white shadow-sm"
        >
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#6E97F2] border border-[#B6CBF8]">
            +
          </span>
          Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Interview Calendar
              </p>
              <p className="text-lg font-semibold text-slate-900">{monthLabel}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <span className="sr-only">Previous month</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 6l-6 6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <span className="sr-only">Next month</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-rows-6 gap-1">
            {weeks.map((week, wi) => (
              <div key={String(wi)} className="grid grid-cols-7 gap-1">
                {week.map((day, di) => {
                  if (!day) {
                    return <div key={`${wi}-${di}`} className="h-10 rounded-lg" />;
                  }
                  const isSelected = day === selectedDate;
                  const isToday =
                    day === today.getDate() &&
                    monthIndex === today.getMonth() &&
                    year === today.getFullYear();
                  return (
                    <button
                      key={`${wi}-${di}`}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`relative h-10 rounded-lg text-sm transition border ${
                        isSelected
                          ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{day}</span>
                      {isToday && !isSelected && (
                        <span className="absolute inset-x-2 bottom-1 h-1 rounded-full bg-[#2563EB]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <footer className="mt-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              {INTERVIEW_STATUSES.map((status) => (
                <div key={status.key} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                  <span className={`font-medium ${status.color}`}>{status.label}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="text-xs font-medium text-[#2563EB] hover:underline"
              onClick={() => setIsModalOpen(true)}
            >
              + Quick schedule
            </button>
          </footer>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Interview pipeline</p>
              <p className="text-xs text-slate-500">
                {filteredInterviews.length} candidate
                {filteredInterviews.length === 1 ? "" : "s"} in interview stage (update status in
                Applications).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search candidate or job role"
                className="w-48 md:w-60 px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
          </header>

          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            >
              {INTERVIEW_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            >
              {jobRoles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            >
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 flex-1">
            {filteredInterviews.map((item) => (
              <article
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700">
                        {item.role}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {item.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M12 8v4l3 2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        </svg>
                        {item.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 21v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Interviewer: {item.interviewer}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-stretch md:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium ${
                        item.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Cancelled"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Completed"
                            ? "bg-emerald-500"
                            : item.status === "Cancelled"
                              ? "bg-rose-500"
                              : "bg-blue-500"
                        }`}
                      />
                      {item.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      View Candidate
                    </button>
                    {item.status === "Scheduled" && (
                      <>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-xs font-medium text-rose-600 hover:bg-rose-100"
                        >
                          Cancel Interview
                        </button>
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1248C1]"
                        >
                          Join Meeting
                        </button>
                      </>
                    )}
                    {item.status === "Completed" && (
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-full bg-amber-500 text-xs font-semibold text-white hover:bg-amber-600"
                      >
                        View Feedback
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {filteredInterviews.length === 0 && (
              <div className="flex flex-1 items-center justify-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl py-10">
                No interviews match the selected filters.
              </div>
            )}
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Schedule Interview</h2>
                <p className="text-xs text-slate-500">Set up an interview with the candidate.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <form className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100 mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                  ?
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Candidate</p>
                  <p className="text-xs text-slate-500">Select a candidate when scheduling from a profile</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Job Role</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]">
                    <option value="">Select job role</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Interview Type</label>
                  <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs font-medium">
                    <button
                      type="button"
                      className="flex-1 px-3 py-2 bg-[#2563EB] text-white"
                    >
                      Online
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-3 py-2 text-slate-600 hover:bg-slate-50"
                    >
                      In-person
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-3 py-2 text-slate-600 hover:bg-slate-50"
                    >
                      Phone
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">Meeting Link</label>
                <input
                  type="text"
                  placeholder="e.g. https://meet.google.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Interviewer</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]">
                    <option>Select Interviewer</option>
                    <option>HR Team</option>
                    <option>Design Lead</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="Add notes or instructions"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                  Send reminder to candidate
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1248C1]"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;

