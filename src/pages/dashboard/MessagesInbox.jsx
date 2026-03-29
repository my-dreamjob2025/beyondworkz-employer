import { useMemo } from "react";

const MessagesInbox = () => {
  const conversations = useMemo(() => [], []);
  const messages = useMemo(() => [], []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Messages / Inbox</h1>
          <p className="text-sm text-slate-600 mt-1">
            In-product messaging is not connected yet; there is no live inbox data.
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
            {conversations.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-slate-500">
                No conversations yet.
              </p>
            ) : (
              conversations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    item.active ? "bg-[#2563EB1A]" : "hover:bg-slate-50"
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
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[320px]">
          {conversations.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6 text-center text-sm text-slate-500">
              Select a conversation when messaging is connected.
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-sm font-semibold text-slate-700">
                    —
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Candidate</p>
                    <p className="text-xs text-slate-500">—</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 px-5 py-4 space-y-3 bg-slate-50/60 min-h-[200px]">
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
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="w-full pl-3 pr-10 py-2.5 rounded-full border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1248C1]"
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
            </>
          )}
        </div>

        <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hidden lg:flex flex-col justify-center min-h-[320px]">
          <p className="text-sm text-slate-500 text-center">
            Candidate details will appear here when a thread is selected.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default MessagesInbox;

