const CandidateProfile = () => {
  return (
    <div className="space-y-6">
      <button
        type="button"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Back to Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        {/* Left main column */}
        <div className="space-y-5">
          {/* Header card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-base font-semibold text-slate-700">
                MC
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">
                  Michael Chen
                </h1>
                <p className="text-sm text-slate-600">
                  Senior Sales Executive
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>New York, NY</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    5 Years Experience
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Active 2 days ago
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                42 Credits Left
              </span>
            </div>
          </div>

          {/* About */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">About</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Results-driven Sales Executive with over 5 years of experience in
              B2B software sales. Proven track record of exceeding quotas and
              building long-lasting relationships with enterprise clients.
              Skilled in lead generation, contract negotiation, and CRM
              management. Passionate about leveraging data to drive sales
              strategies and improve customer success metrics.
            </p>
          </section>

          {/* Skills */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Sales",
                "Communication",
                "Lead Generation",
                "CRM",
                "Customer Handling",
                "Negotiation",
                "B2B Sales",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Work Experience
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">
                  Senior Sales Executive
                </p>
                <p className="text-xs text-slate-500">
                  TechCorp Solutions Inc. • Mar 2021 - Present • 3 yrs 5 mos
                </p>
                <p className="mt-2 leading-relaxed">
                  Leading enterprise sales initiatives across the East Coast
                  region. Consistently exceeded annual sales quotas by 120%.
                  Managed a portfolio of 50+ enterprise accounts and
                  successfully implemented new CRM processes that reduced sales
                  cycle length by 15%.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">
                  Sales Representative
                </p>
                <p className="text-xs text-slate-500">
                  GlobalTrade Systems • Jan 2019 - Feb 2021 • 2 yrs 2 mos
                </p>
                <p className="mt-2 leading-relaxed">
                  Handled inbound and outbound lead generation. Conducted
                  product demonstrations for mid-market clients. Maintained a
                  high customer satisfaction rate and contributed to a 30%
                  increase in regional market share over two years.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2">
            <h2 className="text-sm font-semibold text-slate-900">Education</h2>
            <div className="flex items-start gap-3 text-sm text-slate-700">
              <div className="mt-1">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  Bachelor of Business Administration (BBA)
                </p>
                <p className="text-xs text-slate-500">
                  New York University • Graduated in 2018
                </p>
              </div>
            </div>
          </section>

          {/* Additional info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-sm">
              <p className="text-slate-400 text-xs">Expected Salary</p>
              <p className="mt-1 font-semibold text-slate-900">
                $85,000 - $100,000 / year
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-sm">
              <p className="text-slate-400 text-xs">Availability to Join</p>
              <p className="mt-1 font-semibold text-slate-900">
                Serving Notice Period (15 Days)
              </p>
            </div>
          </section>

          {/* Resume */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-sm">
            <h2 className="text-sm font-semibold text-slate-900">Resume</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500">
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
                      d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414L14 3.586A2 2 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    Michael_Chen_Resume_2024.pdf
                  </p>
                  <p className="text-xs text-slate-500">1.2 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  className="text-[#2563EB] font-semibold"
                >
                  View
                </button>
                <button
                  type="button"
                  className="text-[#2563EB] font-semibold"
                >
                  Download
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c.5304 0 1.0391-.2107 1.4142-.5858C13.7893 10.0391 14 9.5304 14 9s-.2107-1.0391-.5858-1.4142C13.0391 7.2107 12.5304 7 12 7s-1.0391.2107-1.4142.5858C10.2107 7.9609 10 8.4696 10 9s.2107 1.0391.5858 1.4142C10.9609 10.7893 11.4696 11 12 11z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v.01M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Contact Details Locked
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Unlock this candidate&apos;s profile to view their email and
                  phone number.
                </p>
              </div>
              <button
                type="button"
                className="w-full mt-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-[#F97316] hover:bg-[#CC5705]"
              >
                Unlock Contact (-1 Credit)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2 text-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Recruiter Actions
            </h2>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs"
            >
              <span>Shortlist Candidate</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs"
            >
              <span>Save Candidate</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs"
            >
              <span>Schedule Interview</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs"
            >
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

