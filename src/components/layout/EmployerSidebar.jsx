import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EmployerSidebar = ({ mobileOpen = false, onMobileOpenChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [openGroups, setOpenGroups] = useState({
    Jobs: false,
    "Candidate Database": false,
  });
  const [loggingOut, setLoggingOut] = useState(false);

  const closeMobile = () => {
    onMobileOpenChange?.(false);
  };

  const handleNavigate = (path) => {
    if (mobileOpen) closeMobile();
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "grid" },
    {
      label: "Jobs",
      path: "/dashboard/jobs",
      icon: "briefcase",
      children: [
        { label: "All Jobs", path: "/dashboard/jobs" },
        { label: "Active Jobs", path: "/dashboard/jobs?status=active" },
        { label: "Draft Jobs", path: "/dashboard/jobs?status=draft" },
        { label: "Closed Jobs", path: "/dashboard/jobs?status=closed" },
        { label: "Post New Job", path: "/dashboard/jobs/new" },
      ],
    },
    {
      label: "Candidate Database",
      path: "/dashboard/candidates",
      icon: "users",
      children: [
        { label: "Search Candidates", path: "/dashboard/candidates" },
        { label: "Saved Candidates", path: "/dashboard/candidates/saved" },
        {
          label: "Shortlisted Candidates",
          path: "/dashboard/candidates/shortlisted",
        },
        {
          label: "Unlocked Candidates",
          path: "/dashboard/candidates/unlocked",
        },
      ],
    },
    {
      label: "Interview Management",
      path: "/dashboard/interviews",
      icon: "calendar",
    },
    { label: "Messages / Inbox", path: "/dashboard/messages", icon: "message" },
  ];

  const bottomNavItems = [
    { label: "Reports & Analytics", path: "/dashboard/reports", icon: "chart" },
    { label: "Credits & Usage", path: "/dashboard/credits", icon: "credit" },
    { label: "Billing", path: "/dashboard/billing", icon: "dollar" },
    { label: "Help & Support", path: "/dashboard/support", icon: "help" },
  ];

  const iconSize = "w-[18px] h-[18px] flex-shrink-0";
  const Icon = ({ name, className = iconSize }) => {
    const icons = {
      grid: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      briefcase: (
        <svg
          className={className}
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
      ),
      users: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      calendar: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      message: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      chart: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      credit: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      dollar: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      help: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      chevronDown: (
        <svg
          className={className}
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
      ),
      chevronRight: (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  const sidebarNav = (
    <nav className="flex-1 overflow-y-auto p-4 space-y-1 pt-6">
      {navItems.map((item) => {
        if (item.children) {
          const isGroupActive = item.children.some((c) => isActive(c.path));
            const isOpen = openGroups[item.label] ?? false;
          return (
            <div key={item.label}>
              <button
                onClick={() =>
                  setOpenGroups((prev) => ({
                    ...prev,
                    [item.label]: !isOpen,
                  }))
                }
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isGroupActive
                    ? "bg-[#EEF2FF] text-[#2563EB]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={item.icon}
                    className={`${iconSize} ${
                      isGroupActive ? "text-[#2563EB]" : "text-slate-500"
                    }`}
                  />
                  {item.label}
                </div>
                <Icon
                  name="chevronDown"
                  className={`w-3 h-3 flex-shrink-0 transition-transform ${
                    isOpen ? "" : "-rotate-90"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {item.children.map((child) => (
                    <button
                      key={child.path}
                      onClick={() => handleNavigate(child.path)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                        isActive(child.path)
                          ? "text-[#2563EB] font-medium bg-blue-50"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              active
                ? "bg-[#EEF2FF] text-[#2563EB]"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon
              name={item.icon}
              className={`${iconSize} ${active ? "text-[#2563EB]" : "text-slate-500"}`}
            />
            {item.label}
            {item.label === "Candidate Database" && (
              <Icon
                name="chevronRight"
                className="w-3 h-3 flex-shrink-0 ml-auto text-slate-400"
              />
            )}
          </button>
        );
      })}

      <div className="my-4 border-t border-slate-200" />

      {bottomNavItems.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
              active
                ? "bg-[#EEF2FF] text-[#2563EB]"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon
              name={item.icon}
              className={`${iconSize} ${active ? "text-[#2563EB]" : "text-slate-500"}`}
            />
            {item.label}
          </button>
        );
      })}

      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
          Credits Remaining
        </p>
        <p className="text-3xl font-bold text-[#F97316]">8</p>
        <button
          type="button"
          onClick={() => handleNavigate("/dashboard/credits/buy")}
          className="w-full mt-3 py-2 rounded-lg text-sm font-semibold text-white bg-[#F97316] hover:bg-[#ea580c] transition-colors"
        >
          Buy Credits
        </button>
        <button
          type="button"
          disabled={loggingOut}
          onClick={async () => {
            if (loggingOut) return;
            setLoggingOut(true);
            await logout();
            setLoggingOut(false);
            if (mobileOpen) closeMobile();
            navigate("/login", { replace: true });
          }}
          className="w-full mt-2 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-60 transition-colors"
        >
          {loggingOut ? "Signing out..." : "Logout"}
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        {sidebarNav}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={closeMobile}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
            {sidebarNav}
          </aside>
        </div>
      )}
    </>
  );
};

export default EmployerSidebar;
