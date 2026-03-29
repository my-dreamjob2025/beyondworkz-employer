import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-slate-200">404</h1>
      <p className="text-slate-600 mt-2">Page not found</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#2563EB" }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PageNotFound;
