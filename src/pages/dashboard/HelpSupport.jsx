const HelpSupport = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Help &amp; Support</h1>
        <p className="text-sm text-slate-600 mt-1">
          Get help using BeyondWorkz.
        </p>
      </header>

      <section className="max-w-xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
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
                    d="M12 8c-1.657 0-3 .895-3 2 0 .828.5 1.5 1.5 1.5h1a1.5 1.5 0 011.5 1.5v.5M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Help Center / FAQs</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Find answers to common questions about hiring, credits, and billing.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Contact Support
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Mon – Sun 9:00 AM – 7:00 PM
            </p>

            <div className="space-y-2 text-sm">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800"
              >
                <span>Chat with Support</span>
                <span className="text-xs text-slate-400">Open chat</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-amber-300 bg-[#FFFBEB] hover:bg-[#FEF3C7] text-slate-800"
              >
                <span>Chat on WhatsApp</span>
                <span className="text-[11px] text-amber-600 font-semibold">
                  Recommended
                </span>
              </button>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-slate-700">Email Support</span>
                <a
                  href="mailto:support@beyondworkz.com"
                  className="text-xs font-medium text-[#2563EB] hover:underline"
                >
                  support@beyondworkz.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Product Guides
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                <button type="button" className="text-[#2563EB] hover:underline">
                  How to Post a Job
                </button>
              </li>
              <li>
                <button type="button" className="text-[#2563EB] hover:underline">
                  How Credits Work
                </button>
              </li>
              <li>
                <button type="button" className="text-[#2563EB] hover:underline">
                  How to Unlock Candidate Contacts
                </button>
              </li>
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Contact Sales
            </p>
            <p className="text-xs text-slate-600">
              Need custom hiring plans or bulk credit packages?
            </p>
            <button
              type="button"
              className="mt-1 w-full px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpSupport;

