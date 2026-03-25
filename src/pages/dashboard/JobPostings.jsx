import { useNavigate } from "react-router-dom";

const JobPostings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Postings</h1>
          <p className="text-slate-600 mt-1">
            Create and manage your job listings.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs/new")}
          className="px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ backgroundColor: "#1447E6" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post a Job
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-12 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
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
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          No jobs posted yet
        </h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Create your first job posting to start attracting qualified
          candidates.
        </p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/jobs/new")}
          className="px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#1447E6" }}
        >
          Post Your First Job
        </button>
      </div>
    </div>
  );
};

export default JobPostings;
