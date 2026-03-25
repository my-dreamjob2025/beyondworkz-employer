import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logos/beyondworkzlogo.png";

const EmployerHeader = ({ onMenuClick = () => {} }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "application",
      title: "Rahul Sharma applied for React Developer",
      time: "2 minutes ago",
      cta: "View Application",
      unread: true,
      iconType: "document",
    },
    {
      id: 2,
      type: "interview",
      title: "Interview scheduled with Priya Patel at 11:30 AM today",
      time: "1 hour ago",
      cta: "View Interview",
      unread: false,
      iconType: "calendar",
    },
    {
      id: 3,
      type: "credits",
      title: "You have only 2 credits left",
      time: "3 hours ago",
      cta: "Buy Credits",
      unread: false,
      iconType: "alert",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
  const allCount = notifications.length;

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
          onClick={onMenuClick}
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button type="button" onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
          <img src={logo} alt="BeyondWorkz" className="h-7 w-auto" />
          <span className="font-bold hidden sm:inline" style={{ color: "#2563EB" }}>
            BeyondWorkz
          </span>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4 relative">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-sm font-medium">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172a4 4 0 00-.828 2.172z" />
          </svg>
          425 Credits
        </div>

        <div className="relative">
          <button
            type="button"
            className="relative p-2 rounded-lg hover:bg-slate-100"
            aria-label="Notifications"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[360px] max-w-[90vw] bg-white rounded-xl shadow-xl border border-slate-200 z-20">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">
                  Notifications
                </p>
                <button
                  type="button"
                  className="text-xs font-medium text-[#1447E6] hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="px-4 pb-2 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`pb-2 relative ${
                    activeTab === "all" ? "text-[#1447E6]" : "hover:text-slate-700"
                  }`}
                >
                  <span>All</span>
                  <span
                    className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] border text-[10px] ${
                      activeTab === "all"
                        ? "border-[#1447E6] text-[#1447E6]"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {allCount}
                  </span>
                  {activeTab === "all" && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#1447E6] rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("unread")}
                  className={`pb-2 relative ${
                    activeTab === "unread"
                      ? "text-[#1447E6]"
                      : "hover:text-slate-700"
                  }`}
                >
                  <span>Unread</span>
                  <span
                    className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] border text-[10px] ${
                      activeTab === "unread"
                        ? "border-[#1447E6] text-[#1447E6]"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {unreadCount}
                  </span>
                  {activeTab === "unread" && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#1447E6] rounded-full" />
                  )}
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {notifications
                  .filter((n) => (activeTab === "unread" ? n.unread : true))
                  .map((notification, index) => {
                    const isPrimary = index === 0;

                    return (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 flex gap-3 text-sm ${
                          isPrimary
                            ? "bg-[#EEF2FF]"
                            : "bg-white hover:bg-slate-50"
                        } border-b border-slate-100 last:border-b-0`}
                      >
                        <div className="mt-1">
                          {notification.iconType === "document" && (
                            <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#1447E6]">
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                          )}
                          {notification.iconType === "calendar" && (
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
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
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          {notification.iconType === "alert" && (
                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
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
                                  d="M12 9v3m0 4h.01M4.293 19h15.414a1 1 0 00.894-1.447l-7.707-14a1 1 0 00-1.788 0l-7.707 14A1 1 0 004.293 19z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notification.time}
                          </p>
                          <button
                            type="button"
                            className="mt-2 text-xs font-semibold text-[#1447E6]"
                          >
                            {notification.cta}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <button
                type="button"
                className="w-full text-center text-xs font-semibold text-[#1447E6] py-3 border-t border-slate-100 hover:bg-slate-50 rounded-b-xl"
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-[#1447E6] flex items-center justify-center text-white font-semibold text-sm">
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "E"}
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 max-w-[90vw] bg-white rounded-xl shadow-xl border border-slate-200 z-20">
              <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1447E6] flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "E"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.firstName || "User Name"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user?.phone || "+91 9964758692"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              <div className="py-2 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
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
                        d="M5.121 17.804A7 7 0 1118 10a7 7 0 01-12.879 7.804z"
                      />
                    </svg>
                  </span>
                  <span>View Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard/company-profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
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
                        d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M7 11h10M7 15h6"
                      />
                    </svg>
                  </span>
                  <span>Company Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard/credits");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>Billing & Credits</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
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
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618V15.5a2.5 2.5 0 11-2-2.45V9.382L13 12 7 9l-6 3 6 3 6-3"
                      />
                    </svg>
                  </span>
                  <span className="flex-1 flex items-center justify-between">
                    <span>Refer & Earn</span>
                    <span className="ml-2 text-[10px] font-semibold text-[#1447E6] bg-[#EEF2FF] rounded-full px-2 py-0.5">
                      New
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/dashboard/support");
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span>Help & Support</span>
                </button>
              </div>

              <div className="border-t border-slate-100 mt-1" />

              <button
                type="button"
                onClick={async () => {
                  if (loggingOut) return;
                  setLoggingOut(true);
                  await logout();
                  setLoggingOut(false);
                  setShowProfileMenu(false);
                  navigate("/login", { replace: true });
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-b-xl"
              >
                <span className="w-4 h-4 flex items-center justify-center">
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EmployerHeader;
