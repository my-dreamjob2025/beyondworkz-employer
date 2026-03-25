import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    { label: "Active Jobs", value: "12", sub: "+2 this week", icon: "briefcase", subColor: "text-emerald-600" },
    { label: "Total Applications", value: "486", sub: "+34 today", icon: "users", subColor: "text-emerald-600" },
    { label: "Interviews Scheduled", value: "24", sub: "Upcoming in next 7 days", icon: "calendar", subColor: "text-slate-600" },
    { label: "Credits Remaining", value: "425", sub: "Will expire in 45 days", icon: "link", subColor: "text-slate-600" },
  ];

  const recentJobs = [
    { title: "Product Manager", status: "Active", location: "Bangalore (Hybrid)", date: "Oct 15, 2023", applications: 142, dbMatches: 38 },
    { title: "UX Designer", status: "Active", location: "Remote", date: "Oct 12, 2023", applications: 86, dbMatches: 12 },
  ];

  const recentActivity = [
    { text: "Rahul Sharma applied for Product Manager", time: "2 hours ago", icon: "document" },
    { text: "Interview scheduled with Priya Patel", time: "4 hours ago", icon: "calendar" },
    { text: "UX Designer job post approved", time: "Yesterday, 10:30 AM", icon: "check" },
    { text: "Feedback submitted for Amit Kumar", time: "Yesterday, 09:15 AM", icon: "message" },
  ];

  const MetricIcon = ({ name }) => {
    const icons = {
      briefcase: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      users: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      calendar: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.172 1.172a4 4 0 00-.828 2.172z" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  const ActivityIcon = ({ name }) => {
    const icons = {
      document: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      calendar: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      check: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      message: (
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    };
    return icons[name] || null;
  };

  return (
    <div className="space-y-6">
      {/* Draft Alert Banner */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#FFF7ED] border border-orange-200">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-slate-900">Finish posting &apos;Senior Frontend Engineer&apos;</p>
            <p className="text-sm text-slate-600">Your draft was saved 2 hours ago. Complete the posting to start receiving applications.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs")}
          className="px-4 py-2 rounded-lg font-semibold text-white bg-[#1447E6] hover:opacity-90 transition-opacity flex-shrink-0"
        >
          Continue Draft
        </button>
      </div>

      {/* Metric Cards */}
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
        {/* Recent Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Jobs</h2>
            <button
              type="button"
              onClick={() => navigate("/dashboard/jobs")}
              className="text-sm font-medium text-[#1447E6] hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{job.title}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {job.date}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-slate-600">
                      <span>{job.applications} Applications</span>
                      <span>{job.dbMatches} DB Matches</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard/applicants")}
                      className="px-4 py-2 rounded-lg font-medium text-white bg-[#1447E6] hover:opacity-90 transition-opacity"
                    >
                      View Applications
                    </button>
                    <button type="button" className="p-2 rounded-lg hover:bg-slate-100">
                      <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Credits Usage */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Credits Usage</h3>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#1447E6] rounded-full" style={{ width: "42.5%" }} />
            </div>
            <p className="text-sm text-slate-600 mb-2">425 Used of 1000 Total</p>
            <p className="text-sm text-slate-500 mb-4">You have 575 credits remaining in your current plan.</p>
            <button
              type="button"
              className="w-full py-2 rounded-lg font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Buy More Credits
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.text} className="flex gap-3">
                  <ActivityIcon name={item.icon} />
                  <div>
                    <p className="text-sm text-slate-600">{item.text}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
