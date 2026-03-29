import { useNavigate } from "react-router-dom";
import EmployerLandingHeader from "../../components/landing/EmployerLandingHeader";
import EmployerLoginForm from "../../components/landing/EmployerLoginForm";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <EmployerLandingHeader />

      <section
        className="pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-screen flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #B6CBF8 0%, #E8E8E8 50%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Hero */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#F97316] text-white text-sm font-semibold mb-6">
                #1 Hiring Platform in 2026
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0D3388] leading-tight">
                Hire the Right Talent with Beyond Workz
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                Access thousands of skilled professionals and hire faster with smart
                recruitment tools designed for modern employers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 rounded-lg font-semibold text-white bg-[#2563EB] hover:opacity-90 transition-opacity"
                >
                  Start Hiring
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 rounded-lg font-semibold text-[#2563EB] border-2 border-[#2563EB] bg-white hover:bg-[#2563EB1A] transition-colors"
                >
                  Post a Job
                </button>
              </div>
              <div className="mt-10 space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Right - Login Form Card with tabs */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 lg:p-8">
                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                  >
                    Request a Free Demo
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm bg-[#2563EB] text-white"
                  >
                    Register/Log In
                  </button>
                </div>
                <EmployerLoginForm noCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
