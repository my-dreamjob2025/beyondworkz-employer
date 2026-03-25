const CandidatesSearch = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Search Candidates
          </h1>
          <p className="text-slate-600 mt-1">
            Find the right candidates from our talent pool using filters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-slate-500">Searching For</span>
              <div className="inline-flex rounded-full bg-slate-50 p-1">
                {["Freshers only", "Experienced only", "Any"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    className={`px-4 py-1.5 text-xs md:text-sm rounded-full font-medium ${
                      idx === 2
                        ? "bg-[#1447E6] text-white shadow-sm"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  placeholder="Enter job title, skills, or role"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Current City / Region
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Select location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Active
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Experience (Min)
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Any</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Experience (Max)
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Any</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Expected Salary (Min)
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Any</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Expected Salary (Max)
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1447E6] focus:border-transparent">
                    <option>Any</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Minimum Education
                </label>
                <div className="flex flex-wrap gap-2">
                  {["10th Pass", "12th Pass", "ITI", "Diploma", "Graduate", "Post Graduate"].map(
                    (label) => (
                      <button
                        key={label}
                        type="button"
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          label === "Graduate"
                            ? "bg-[#1447E6] text-white border-[#1447E6]"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Reset
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1447E6] hover:bg-[#1237b5]"
              >
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
                    d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                Search Candidates
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              How Database Credits Work
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Every time you unlock a candidate&apos;s contact details (phone
              number, email, or resume), one credit is deducted from your
              balance. Previewing profiles without contact info is free.
            </p>
            <button
              type="button"
              className="mt-4 px-4 py-2.5 rounded-full text-sm font-semibold text-[#F97316] border border-[#FED7AA] bg-[#FFF7ED]"
            >
              Buy Credits
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <p className="text-sm font-semibold text-slate-900">How it Works</p>
            <ol className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">1. Search & Filter</span>
                <br />
                Use the form to define exactly what you are looking for.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2. Review Matches</span>
                <br />
                Browse through candidates matching your criteria for free.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3. Connect</span>
                <br />
                Use credits to unlock full profiles and contact them directly.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesSearch;

