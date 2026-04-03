import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNotifications, notificationIconType } from "../../hooks/useNotifications";
import { BrandLogoWithWordmark } from "../brand/BrandMark";

const EmployerHeader = ({ onMenuClick = () => {} }) => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();
  const notificationsEnabled = Boolean(user) && !authLoading;
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications(notificationsEnabled);

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const creditBalance =
    user?.companyProfile?.creditBalance ?? user?.creditBalance ?? 0;

  const allCount = notifications.length;

  const companyLabel =
    user?.companyProfile?.companyDetails?.companyName?.trim?.() || "Employer account";

  return (
    <header className="sticky top-0 z-40 flex-shrink-0 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="-ml-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <BrandLogoWithWordmark onClick={() => navigate("/dashboard")} />
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <div
            className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 sm:hidden"
            title="Credits remaining"
          >
            <svg className="h-3.5 w-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172a4 4 0 00-.828 2.172z" />
            </svg>
            {Number(creditBalance).toLocaleString()}
          </div>
          <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 sm:flex">
            <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172a4 4 0 00-.828 2.172z" />
            </svg>
            {Number(creditBalance).toLocaleString()} Credits
          </div>

        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
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
                {allCount > 0 ? (
                  <button
                    type="button"
                    className="text-xs font-medium text-[#2563EB] hover:underline"
                    disabled={unreadCount === 0}
                    onClick={() => markAllRead()}
                  >
                    Mark all as read
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">No alerts</span>
                )}
              </div>

              <div className="px-4 pb-2 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`pb-2 relative ${
                    activeTab === "all" ? "text-[#2563EB]" : "hover:text-slate-700"
                  }`}
                >
                  <span>All</span>
                  <span
                    className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] border text-[10px] ${
                      activeTab === "all"
                        ? "border-[#2563EB] text-[#2563EB]"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {allCount}
                  </span>
                  {activeTab === "all" && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("unread")}
                  className={`pb-2 relative ${
                    activeTab === "unread"
                      ? "text-[#2563EB]"
                      : "hover:text-slate-700"
                  }`}
                >
                  <span>Unread</span>
                  <span
                    className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] border text-[10px] ${
                      activeTab === "unread"
                        ? "border-[#2563EB] text-[#2563EB]"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {unreadCount}
                  </span>
                  {activeTab === "unread" && (
                    <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-500">
                    No notifications yet.
                  </p>
                ) : (
                  notifications
                    .filter((n) => (activeTab === "unread" ? n.unread : true))
                    .map((notification, index) => {
                      const isPrimary = index === 0;
                      const iconType = notificationIconType(notification.type);

                      return (
                        <div
                          key={notification.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => markRead(notification.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") markRead(notification.id);
                          }}
                          className={`px-4 py-3 flex gap-3 text-sm ${
                            isPrimary
                              ? "bg-[#2563EB1A]"
                              : "bg-white hover:bg-slate-50"
                          } border-b border-slate-100 last:border-b-0`}
                        >
                          <div className="mt-1">
                            {iconType === "document" && (
                              <div className="w-8 h-8 rounded-lg bg-[#2563EB1A] flex items-center justify-center text-[#2563EB]">
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
                            {iconType === "calendar" && (
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
                            {iconType === "alert" && (
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

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                              {notification.title}
                            </p>
                            {notification.message ? (
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notification.message}</p>
                            ) : null}
                            <p className="text-xs text-slate-500 mt-1">
                              {notification.time || notification.timeLabel}
                            </p>
                          </div>
                          {notification.unread ? (
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" aria-hidden />
                          ) : null}
                        </div>
                      );
                    })
                )}
              </div>

              {allCount > 0 ? (
                <button
                  type="button"
                  className="w-full text-center text-xs font-semibold text-[#2563EB] py-3 border-t border-slate-100 hover:bg-slate-50 rounded-b-xl"
                >
                  View all notifications
                </button>
              ) : null}
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex min-w-0 items-center gap-2 rounded-lg py-1 pl-1 pr-1 hover:bg-slate-50 sm:gap-2 sm:pl-2 sm:pr-2"
            aria-expanded={showProfileMenu}
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "E"}
            </div>
            <div className="hidden min-w-0 text-left sm:block">
              <p className="truncate text-sm font-medium text-slate-800">
                {user?.firstName || user?.email?.split("@")[0] || "User"}
              </p>
              <p className="truncate text-xs text-slate-500">{companyLabel}</p>
            </div>
            <svg
              className="hidden h-3 w-3 flex-shrink-0 text-slate-400 sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 max-w-[90vw] bg-white rounded-xl shadow-xl border border-slate-200 z-20">
              <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "E"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.firstName || "User Name"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user?.phone || user?.email || "—"}
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
                    <span className="ml-2 text-[10px] font-semibold text-[#2563EB] bg-[#2563EB1A] rounded-full px-2 py-0.5">
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
      </div>
    </header>
  );
};

export default EmployerHeader;
