const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "React Developer",
    location: "Pune",
    time: "10:45 AM",
    preview: "Hi, I am available tomorrow for interview.",
    unread: 2,
    active: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Designer",
    location: "Bangalore",
    time: "09:15 AM",
    preview: "Thank you for sharing the company details and JD...",
    unread: 0,
    active: false,
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Backend Engineer",
    location: "Delhi",
    time: "Yesterday",
    preview: "I will check the assessment and share an update...",
    unread: 0,
    active: false,
  },
];

const messages = [
  {
    id: 1,
    from: "candidate",
    text: "Hello! I wanted to follow up on my application for the React Developer position.",
    meta: "Yesterday, 4:30 PM",
  },
  {
    id: 2,
    from: "employer",
    text: "Hi Rahul, thanks for reaching out. Your profile looks great. We would like to schedule a technical interview round with you.",
    meta: "Yesterday, 5:15 PM",
  },
  {
    id: 3,
    from: "candidate",
    text: "That sounds wonderful. What times work best for your team?",
    meta: "Yesterday, 5:45 PM",
  },
  {
    id: 4,
    from: "employer",
    text: "Are you available sometime tomorrow morning? Say around 11:30 AM?",
    meta: "Today, 9:30 AM",
  },
  {
    id: 5,
    from: "candidate",
    text: "Hi, I am available for interview tomorrow.",
    meta: "Today, 10:45 AM",
  },
];

const MessagesInbox = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Messages / Inbox</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage conversations with candidates.
          </p>
        </div>
        <div className="hidden md:block">
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
              placeholder="Search candidate name or message"
              className="pl-9 pr-3 py-2 text-sm rounded-full border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent w-72"
            />
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1fr)] gap-5 min-h-[520px]">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Recent Conversations</h2>
          </div>
          <div className="flex-1 divide-y divide-slate-100">
            {conversations.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm ${
                  item.active ? "bg-[#EEF2FF]" : "hover:bg-slate-50"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-xs font-semibold text-slate-700">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.role} • {item.location}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap">
                      {item.time}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className="text-[11px] text-slate-500 truncate">{item.preview}</p>
                    {item.unread > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#2563EB] text-[10px] font-semibold text-white">
                        {item.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-sm font-semibold text-slate-700">
                RS
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm">
                  <p className="font-semibold text-slate-900">Rahul Sharma</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-emerald-600">Online</span>
                </div>
                <p className="text-xs text-slate-500">React Developer • Bangalore, India</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                View Profile
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8]"
              >
                Schedule Interview
              </button>
            </div>
          </div>

          <div className="flex-1 px-5 py-4 space-y-3 bg-slate-50/60">
            {messages.map((msg) => {
              const isEmployer = msg.from === "employer";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isEmployer ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[70%] space-y-1">
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                        isEmployer
                          ? "bg-[#2563EB] text-white rounded-br-sm"
                          : "bg-white text-slate-900 rounded-bl-sm border border-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p
                      className={`text-[10px] ${
                        isEmployer ? "text-slate-200 text-right" : "text-slate-400"
                      }`}
                    >
                      {msg.meta}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
              >
                <span className="sr-only">Attach file</span>
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
                    d="M15 7l-6 6a2 2 0 103 3l6-6a4 4 0 00-6-6l-6 6"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
              >
                <span className="sr-only">Insert emoji</span>
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
                    d="M14.828 14.828A4 4 0 019.172 14M9 10h.01M15 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full pl-3 pr-10 py-2.5 rounded-full border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8]"
                >
                  <span className="sr-only">Send message</span>
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
                      d="M5 12l14-7-3 14-4-5-5-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-base font-semibold text-slate-700">
              RS
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Rahul Sharma</p>
              <p className="text-xs text-[#2563EB] font-medium">React Developer</p>
              <p className="text-xs text-slate-500">Bangalore, India</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Experience</p>
              <p className="mt-0.5">4.5 Years</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Top Skills</p>
              <p className="mt-0.5">React.js, TypeScript, Next.js, Redux</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Expected Salary</p>
              <p className="mt-0.5">₹ 18,00,000 / yr</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Education</p>
              <p className="mt-0.5">B.Tech in Computer Science</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Current Company</p>
              <p className="mt-0.5">TechFlow Solutions</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              View Full Profile
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Shortlist Candidate
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Unlock Contact
            </button>
            <button
              type="button"
              className="w-full mt-1 px-4 py-2.5 rounded-full bg-[#2563EB] text-xs font-semibold text-white hover:bg-[#1D4ED8]"
            >
              Schedule Interview
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default MessagesInbox;

