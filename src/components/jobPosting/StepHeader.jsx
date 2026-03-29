const StepHeader = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
      <p className="text-slate-500 mt-1 text-sm sm:text-base max-w-xl">
        Complete each step to publish. You can save a draft anytime and return later from Job
        Postings.
      </p>
    </div>
    <button
      type="button"
      disabled
      title="Templates coming soon"
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-400 border border-slate-200 rounded-lg bg-slate-50 cursor-not-allowed shrink-0"
    >
      Use Templates
    </button>
  </div>
);

export default StepHeader;
